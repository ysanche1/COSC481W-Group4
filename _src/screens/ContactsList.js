//CONTACTSLIST.JS
// THIS FILE CONTAINS COMPONENTS FOR AND FUNCTIONS FOR INTERACTION WITH THE CONTACTS LIST SCREEN.
// MORGAN IVERSON

/************* NODE MODULES *************/
import React, { useContext, useState, useEffect }  from 'react';
import { Dimensions, FlatList, View, StyleSheet, Text, Image } from 'react-native';
import { List, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import { AlphabetList } from 'react-native-section-alphabet-list';

/************* LOCAL COMPONENTS/FUNCTIONS *************/
import { getContacts, VIEW } from '../functions/AccountProfile';

/************* CONSTANTS *************/
const { width, height } = Dimensions.get('screen');

/************* CONTACTS LIST COMPONENT *************/
export default function ContactList() {
    const CONTACTS = [
        {
            value: 'John Doe', 
            key: '00001', 
            img:''
        }, 
        {
            value: 'Alex James', 
            key: '00002', 
            img: ''
        }, 
    ];
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState('');
    //console.log(contacts);

    //CREATE SORTED AND SCANNABLE AND SEARCHABLE CONTACTS LIST
    useEffect(() => {
        loadContacts();
    }, []);

    //LOAD USER CONTACTS
    const loadContacts = () => {
        getContacts().then((r) => {
            console.log(r);
            setContacts(r);
        });
    }

    //SHOW/HIDE CINTACTS BASED ON SERACH TERMS
    const handleSearch = (searchTerm) => {
        setSearch(searchTerm);
        if(searchTerm == '') setContacts(CONTACTS);
        else {
            setContacts(contacts.filter((item, index) => {
                return item.value.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
            }))
        }

    }
    //FILLE THIS WITH USER CONTACTS


    //GENERATE VISUAL FROM ITEM
    const RenderItem = ( item ) => {
        return (<ContactListing 
                name={item.value}
                uid = {item.key}
                bio = {item.bio}
                img = {item.img}
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

    //SERACH BAR SECTION LIST WITH ALPHABET SCROLL
    return (
        <View style = {styles.container}>
        <SearchBar 
        containerStyle = { styles.searchContainer }
        inputContainerStyle = { styles.searchInputContainer }
        inputStyle = { styles.searchInput }
        leftIconContainerStyle = { styles.searchIcon }
        round = {true}
        onChangeText = {(text) => {handleSearch(text)}}
value = {search}
/>
    <AlphabetList
data = { contacts }
indexLetterColor = {'black'}
renderCustomItem = { item => RenderItem(item)}
renderCustomSectionHeader = { section => RenderHeader(section) }

/>
    </View>
);
}

/************* COMPONENT FOR DISPLAYING INDIVIDUAL CONTACT DATA *************/
function ContactListing({name, uid, img, bio }){
    const navigation = useNavigation();
    //        console.log(navigation); //CURRENT ROUTE: CONTACTS

    const handlePress = () => {
        console.log("Profile for user " + uid + " open - " + name);


        navigation.navigate('ContactProfile', {
            name: name, 
            uid: uid, 
            img: img, 
            bio: bio,
            WHICH: VIEW,  
        });
    }
    return (
        <List.Item
        title={name}
        titleNumberOfLines={1}
        titleStyle={styles.name}
        style = {styles.item}

        left = {
        () => <Image src = {(img == null) ? '' : img} style = {styles.profIMG}/>
        }
    onPress = {(
               ) => handlePress()
              }
    />

        );
}

/************* STYLES *************/
const styles = StyleSheet.create({
    container: {
        width: {width},        
    }, 
    title:{
        color: 'black'
    }, 

    listTitle: {
        color: 'black',
        fontSize: 22, 
    },
    listDescription: {
        color: 'grey',
        fontSize: 16
    },
    listRight: {
        color: 'grey',
    }, 
    item: {
        color: 'black', 
        borderTopWidth: '1px',
        borderTopColor: 'lightgrey',
        borderBottomWidth: '1px',
        borderBottomColor: 'lightgrey',
    }, 
    name: {
        fontSize: 15,
        color: 'black',

    },
    profIMG: {
        width: 30, 
        height: 30, 
        borderRadius: 15, 
        borderWidth: 1, 
        borderColor: 'lightgrey', 
        backgroundColor: 'lightgrey'
    },
    searchContainer: {
        backgroundColor: 'transparent', height: 35, padding: 0, borderWidth: 0, borderTopColor: 'white'
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
    }


});


