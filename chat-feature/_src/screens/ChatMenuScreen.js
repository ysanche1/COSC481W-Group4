import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider'; 
import { List } from 'react-native-paper';
import { VIEW, SEARCH,  } from '../functions/AccountProfile';
import { getChatMembers } from '../functions/Communication';
import { useNavigation } from '@react-navigation/native';


export default function ChatMenuScreen({route}) {
//export default function ChatMenuScreen() {
//    console.log("CID: ", route.params.CID);
    const CID = route.params.CID;
    const user = useContext(AuthContext);
    const navigation = useNavigation();
    const [members, setMembers] = useState([]);

    useEffect(() => {
        getChatMembers(CID).then((members) => {
            console.log("MEMBERS: ", members);
            setMembers(members);
        });                         
    }, []);

     React.useLayoutEffect(() => {
        navigation.setOptions({title: route.params.roomtitle + " Details"})}, [navigation]);   
    
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