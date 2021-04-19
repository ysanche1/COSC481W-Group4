// SEARCHSCREEN.JS
// THIS FILE CONTAINS COMPONENTS FOR AND FUNCTIONS FOR INTERACTION WITH THE SERACH SCREEN.
// MORGAN IVERSON

/************* NODE MODULES *************/
import React, { useContext, useState, useEffect }  from 'react';
import { Dimensions, FlatList, View, StyleSheet, Text, Image } from 'react-native';
import { List, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import { AlphabetList } from 'react-native-section-alphabet-list';

/************* LOCAL  COMPONENTS/FUNCTIONS *************/
import { getUsers } from '../functions/AccountProfile';

/************* CONSTANTS *************/
const { width, height } = Dimensions.get('screen');
import { SEARCH } from '../functions/AccountProfile';

/************* SERACH SCREEN COMPONENT *************/
export default function SearchScreen() {
    const [USERS, SETUSERS] = useState([]);1
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const navigation = useNavigation();
    //console.log(contacts);

    //CREATE SORTED AND SCANNABLE AND SEARCHABLE CONTACTS LIST
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
        
        getUsers().then ((r) => {
            console.log(r); 
            SETUSERS(r);
            setUsers(r);
        });// -> RETURN {NAME, UID, IMG}
            
        });
        return unsubscribe;
    }, [navigation]);


    //SHOW/HIDE CINTACTS BASED ON SERACH TERMS
    const handleSearch = (searchTerm) => {
        setSearch(searchTerm);
        if(searchTerm == '') setUsers(USERS);
        else {
            setUsers(USERS.filter((item, index) => {
                return item.value.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
            }))
        }

    }
    //FILLE THIS WITH USER CONTACTS


    //GENERATE VISUAL FROM ITEM
    const RenderItem = ( {item} ) => {
        return (<List.Item
                title={item.value}
                titleNumberOfLines={1}
                titleStyle={styles.name}
                style = {styles.item}

                left = {
                () => <Image src = { item.img } style = {styles.profIMG}/>
    }
        onPress = {() => {
                   /*NAVIGATE TO PROFILE: OPTION TO ADD CONTACT*/
                   navigation.navigate('SearchProfile', {
                   name: item.value, 
                   uid: item.key, 
                   img: item.img, 
                   bio: item.bio,
                   thisUser: false,  
                   searching: true, 
                   WHICH: SEARCH, 
                   goBack: 'Search'
                  });
    }
    }
/>
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
    <FlatList
data = { users }
renderItem = { RenderItem }
/>
    </View>
);
}

/************* STYLES *************/
const styles = StyleSheet.create({
    container: {
        width: {width},  
        backgroundColor: 'white',
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
        backgroundColor: 'white', height: 35, padding: 0, 
        borderBottomWidth: '1px',
        borderBottomColor: 'lightgrey',
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


