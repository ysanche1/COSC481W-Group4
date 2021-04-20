// CHATMENUSCREEN.JS
// THIS FILE CONTAINS THE COMPONENTS FOR AND FUNCTIONS FOR INTERACTION WITH THE CHAT MENU SCREEN. 
// MORGAN IVERSON
/************* NODE MODULES *************/
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { List } from 'react-native-paper';

/************* LOCAL COMPONENTS/FUNCTIONS *************/
import { getChatMembers } from '../functions/Communication';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../navigation/AuthProvider'; 

/************* CONSTANTS *************/
import { VIEW, SEARCH} from '../functions/AccountProfile';

/************* CHAT MENU SCREEN COMPONENT *************/
export default function ChatMenuScreen({route}) {
    const CID = route.params.CID;
    const user = useContext(AuthContext);
    const navigation = useNavigation();
    const [members, setMembers] = useState([]);

    //GET CONVERSATION MEMBERE WHEN SCREEN RENDERS
    useEffect(() => {
        getChatMembers(CID).then((members) => {
            console.log("MEMBERS: ", members);
            setMembers(members);
        });                         
    }, []);

    //SET NAVIGATION HEADER
    React.useLayoutEffect(() => {
        navigation.setOptions({title: route.params.roomtitle + " Chat"})}, [navigation]);   

    //WHAT DO DO WHEN USER PRESSE SON MEMBER
    const memberPress = ({ item }) => {
        navigation.navigate('Profile', ({
            name: item.title, 
            uid: item.key, 
            img: item.img, 
            bio: item.bio, 
            WHICH: (item.isContact ? VIEW: SEARCH)
        }));
    }
    //ADD PROFILE SCREEN TO CHATSTACK

    //MEMBER ROW ITEM 
    const RenderMember = ({ item }) => {
        return ( <List.Item
                title = {item.title}
                titleNumberOfLines={1}
                titleStyle={styles.title}                
                style = {styles.item}
                left = {
                () => <Image src = {(item.img == null) ? '' : item.img} style = {styles.profIMG}/>
    }
        onPress = {() => {memberPress({item})}}
/>

    )}

    //HEADER OF FLAT LIST
    const ListHeader = () => {
        return <Text style = { styles.header }>Chat Members:</Text>
    }

    return (
        <View style = {styles.container }>
        <View style = { styles.block }>

        <FlatList
        style = { styles.list }
        data = { members }
        renderItem = { RenderMember }
        ListHeaderComponent = {ListHeader}

        />
        </View>
        </View>
    )
}

/************* STYLES *************/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10, 
    },
    block: {
        alignSelf: 'center', 
        width: '90%', 
    },
    item: {
        color: 'black', 
        borderBottomWidth: '1px',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: '1px',
        borderBottomColor: 'lightgrey',
    }, 
    header: {
        fontSize: 20, 
        fontStyle: 'italic', 
        marginTop: 10, 
        padding: 5, 
        borderBottomWidth: 1, 
        borderBottomColor: 'lightgrye'
    },
    title: {
        fontSize: 15,
        color: 'black',
        fontStyle: 'italic'
    },
    list: {
        marginTop: 15, 
        width: '90%', 
        height: '50%', 
        alignSelf: "center", 
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