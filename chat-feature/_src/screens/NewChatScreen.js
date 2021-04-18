import React, { useState, useEffect, useContext } from 'react';
import { Dimensions, View, Text, FlatList, TextInput, ListItem, Keyboard, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { useNavigation } from '@react-navigation/native';

import { shouldUseActivityState } from 'react-native-screens';
import { List, Divider, Title } from 'react-native-paper';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import { SearchBar } from 'react-native-elements';
import { AlphabetList } from 'react-native-section-alphabet-list';

import { createConversation } from '../functions/Communication';
import { getContacts } from '../functions/AccountProfile';

const { width, height } = Dimensions.get('screen');


/** TO DO:
-> CHECK ADD/REMOVE (ADD ALL/REMOVE ALL MEMEBRS LIST CORRECT)
    -> SEND LIST OF UID (members.map)
 -> PULL USER CONTACTS
 -> DISPLAY ON TOP OF CONVERSATION LIST (BLACK OPAQUE BACKGROUND)
 https://stackoverflow.com/questions/31101445/in-react-native-how-do-i-put-a-view-on-top-of-another-view-with-part-of-it-lyi 
 **/


export default function NewChatScreen(){
    const { user } = useContext( AuthContext );
    const navigation = useNavigation();
    const [userContacts, setUserContacts] = useState([]);
    const [contacts, setContacts] = useState(userContacts); //set to current user contacts name only
    const [search, setSearch] = useState('');
    const [members, setMembers] = useState([]);
    const [chat, setChat] = useState(false);
    
    useEffect(() => {
        //         console.log(members);
        setContacts(showList());       //UPDATE VISIBLE LIST
        console.log("Members: ", members);
        setChat(members.length >= 1);

    }, [members]); //ON STATE CHNAGE OF MEMEBERS

    useEffect(() => {
    }, [chat]); //ON STATE CHNAGE OF CHAT

    useEffect(() => {
        loadContacts();
    }, []);

    //LOAD USER CONTACTS
    const loadContacts = () => {
        getContacts().then((r) => {
            console.log(r);
            setUserContacts(r);
            setContacts(r);
        });
    }
    //SHOW/HIDE CINTACTS BASED ON SERACH TERMS
    const handleSearch = (searchTerm) => {
        setSearch(searchTerm);
//        console.log("Console: ", userContacts);
        if(searchTerm == '') setContacts(showList());
        else {
            setContacts(userContacts.filter((item) => {
                return (item.value.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0);
            })); 
        }
    }

    //CONTACT LISTING
    const RenderItem = ( item ) => {
//        console.log(item);
        return  (<List.Item 
                 style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: 'lightgrey', color: 'black', backgroundColor: 'white' }} 
                 title = {item.value}
                 titleStyle = {{color: 'black'}}
                 left = {
                 () => <Image src = {item.img} style = {styles.profIMG}/>
    }
        onPress = { () => {
                   addMember({name: item.value, UID: item.key})
    }}
/>
    );
}
    
    //LETTER HEADINGS
    const RenderHeader = ( section ) => {
        return (<View style={{height: 25, backgroundColor: 'lightgrey'}}>
                <Text style={{color: 'white', fontSize: 15, marginLeft: 10, marginTop: 3}}>{section.title}</Text>
                </View>
               );
    }

const removeMember = (UID) => {
//    console.log("Remove UID: ", UID);
    var m = members.filter(item => item.UID != UID);
    //    console.log(m);
    setMembers(m);
}

const addMember = (o) => {
    setMembers(members.concat(o));
    handleSearch('');
}

const showList = () => {
//        console.log(userContacts);
    return userContacts.filter((item) => {
        return members.findIndex((m) => {return m.UID == item.key}) < 0;
    });
}

const startChat = () => {    
    if(chat) {
        console.log(chat);
        var chatUIDList = members.map(item => item.UID);
        //chatUIDList.push() //current user uid
//        console.log(chatUIDList);
        // SEND TO CREATECONV FUNCTION -> CATCH ERRORS -> IF NON GO TOT CHAT SCREEN WITH CID PROP
//        console.log(chatUIDList.concat(user.uid));
        createConversation(chatUIDList.concat(user.uid)).then(() => {navigation.navigate("Conversations")});
    }
}

const setUpChat = ()  => {
    //GET USER NAMES 0 -> SET CHAT NAME?
    //
}

return (
    <View
    style={styles.container}
    >

    <View> 
    <Text style = {{color: 'grey', fontWeight: 'bold'}}> Start Chat With: </Text> 
    <MemberList data = { members } onPress = { removeMember }/>
    </View>

    <View style = { styles.searchChatRow } >

    <SearchBar 
    containerStyle = { styles.searchContainer }
    inputContainerStyle = { styles.searchInputContainer }
    inputStyle = { styles.searchInput }
    leftIconContainerStyle = { styles.searchIcon }
    round = {true}
    onChangeText = {(input) => handleSearch(input)}
value = {search}
/>
    <TouchableOpacity 
style = { chat ? styles.chatButton : styles.chatButtonDisabled }
onPress = { startChat }
>
    <Text style = { styles.chatButtonText }>
        Chat Now
            </Text>
</TouchableOpacity>
</View>

<AlphabetList
data = { contacts }
indexLetterColor = {'black'}
renderCustomItem = { (item) => RenderItem(item)}
renderCustomSectionHeader = { section => RenderHeader(section) }/>


    </View>
);
}

//BLOCK CONTAINING MEMEBER NAME
function MemberComponent({ onPress, name, UID }) {
    return <View style = {styles.memberBlock}> 
        <TouchableOpacity onPress =  {() => { onPress( UID )}} >
            <Text style = {styles.memberName}>{ name }</Text>
</TouchableOpacity>
</View>

}

// LISTING OF CHAT MEMBER BLOCKS
function MemberList({ data, onPress }){
    return <View
    style = {styles.memberContainer}> 
        {data.map((item) => {
//                  console.log(item);
         return <MemberComponent 
         onPress = { onPress } 
    name =  { item.name  } 
    key = { item.UID }
    UID = {item.UID }
    />
})
}</View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
        width: '100%',
        height:{height}, 
        alignSelf: 'center',
    }, 
    XIcon: {
        alignSelf: 'center', 
        marginBottom: 15, 
        marginTop: 15, 
    }, 
    searchChatRow: {
        width: '100%',
        flexDirection: 'row', 
        backgroundColor: 'white', 
        borderBottomWidth: 1, 
        borderBottomColor: 'lightgrey', 
    },
    list: {
        width: '100%',
    }, 
    memberBlock: {
        color: 'black', 
        height:40, 
        minWidth: 100, 
        backgroundColor: 'lightgrey', 
        borderWidth: 1, 
        borderColor: 'darkgrey', 
        padding: 10,
        marginTop: 10, 
        marginLeft: 10,
        marginBottom: 10, 
        borderRadius: 3,
        flexDirection: 'row',
        justifyContent: 'center'
    }, 
    memberName: {
        fontWeight: 'bold', 
        color: 'white',
        fontSize: 13, 
    }, 
    memberContainer: {
        width: '100%', 
        margin: 5,
        flexDirection: 'row', 
        flexWrap: "wrap", 
    }, 
    chatButton: {
        backgroundColor: "lightgreen",
        height: 35, 
        width: 65, 
        borderRadius: 5, 
        alignItems: "center",
        paddingTop: 11, 
        margin: 10, 

    }, 
    chatButtonDisabled: {
        backgroundColor: "lightgrey", 
        height: 35, 
        width: 65, 
        borderRadius: 5, 
        alignItems: "center",
        paddingTop: 11, 
        margin: 10, 
    }, 
    chatButtonText: {
        fontWeight: 'bold', 
        color: 'white', 
        fontSize: 10, 
    }, 
    searchContainer: {
        backgroundColor: 'white', height: 35, paddingTop: 0, borderWidth: 0, 
        borderTopColor: 'transparent', 
        width:"80%", 
        marginTop: 10, 
    },
    searchInputContainer: {
        backgroundColor: 'transparent', height: 30
    },
    searchInput: {
        backgroundColor: 'transparent', color: 'black', height: 30, 
        fontSize: 15,
    }, 
    searchIcon: {
        backgroundColor: 'transparent', color: 'black', height: 25
    },  
    profIMG: {
        width: 30, 
        height: 30, 
        borderRadius: 15, 
        borderWidth: 1, 
        borderColor: 'lightgrey', 
        backgroundColor: 'lightgrey'
    },

});