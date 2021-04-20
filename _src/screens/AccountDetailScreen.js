// ACCOUNTDETAILSCREEN.JS
// THIS FILE CONTAINS COMPONENTS FOR AND FUNCTIONS FOR INTERACTION WITH THE SERACH SCREEN.
// MORGAN IVERSON

/************* NODE MODULES *************/
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { List } from 'react-native-paper';

/************* LOCAL COMPONENTS/FUNCTIONS*************/
import { AuthContext } from '../navigation/AuthProvider'; 
import {getCurrentUserAccount, getContacts, getDateCreated } from '../functions/AccountProfile';
import { getConversations } from '../functions/Communication';

/************* ACCOUNT DETAIL SCREEN COMPONENT *************/
export default function AccountDetailScreen() {
    const user = useContext(AuthContext);
    const [account, setAccount] = useState({});
    const [profile, setProfile] = useState({});
    const [contacts, setContacts] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [dateCreated, setDate] = useState('');


    useEffect(() => {
        getDateCreated().then((d) => {
            console.log(d);
            setDate(d);
        });
        
        getAccountData()
            .then((a) => {
            console.log(a);
            setAccount(a);
            setProfile(a.PROFILE);
            //GET CONTACTS - NAME AND IMAGE
            getContacts().then((c) => {
                c = c.map((item, index) => {
                    return {title: item.value, 
                            img: item.img, 
                            key: (index + 1).toString(), 
                           }
                });
                console.log("CONTACTS: ", c);
                setContacts(c);

            })
            getConversations().then((c) => {
                c = c.map((item, index) => {
                    return {
                        title: item.title, 
                        time: item.time, 
                        key: (index + 1).toString(),                           }
                });
                console.log("CONVERSATIONS: ", c);
                setConversations(c);
            })

            //GET CONVERSATIONS - NAME ONLY
        })
    }, []);
    
    const getAccountData = async() => {
        //RETURN ACCOUNT OBJECT
        return await getCurrentUserAccount();
        //        console.log(a);
    }

    //CONTACT
    const RenderContact = ( {item} ) => {
        return (<List.Item
                title={item.title}
                titleNumberOfLines={1}
                titleStyle={styles.title}
                style = {styles.item}

                left = {
        () => <Image src = {(item.img == null) ? '' : item.img} style = {styles.profIMG}/>
        }
        />
        );
    }

    //CONVERSATION
    const RenderConversation = ( {item} ) => {
        return (<List.Item
                title={item.title}
                titleNumberOfLines={1}
                titleStyle={styles.title}
                style = {styles.item}
                right = {() => 
            <Text style = {styles.time}>{"Last Message: " +  item.time }</Text>
        }
    />
    );
}

return (
    <View style = {styles.container}> 

    <View style = {styles.detailBlock}>
    <Text style = {styles.detailHeader}> Account </Text>

    <View style = { styles.detailRow }> 
    <Text style = {styles.detailLabel}> Email: </Text>
    <Text style = {styles.detail}> { account.EMAIL } </Text>
    </View>

    <View style = { styles.detailRow }> 
    <Text style = {styles.detailLabel}> Date Created: </Text>
    <Text style = {styles.detail}> { dateCreated } </Text>
    </View>

    </View>

    <View style = {styles.detailBlock}>
    <Text style = {styles.detailHeader}> Profile </Text>

    <View style = { styles.detailRow }> 
    <Text style = {styles.detailLabel}> Name: </Text>
    <Text style = {styles.detail}> { profile.FNAME + " " + profile.LNAME } </Text>
    </View>
    
    <View style = { styles.detailRowIMG }> 
    <Text style = {styles.detailLabel}> Photo: </Text>
    <Image src =  { profile.img } style = {styles.IMG}/>
    </View>

    <View style = { styles.detailRow }> 
    <Text style = {styles.detailLabel}> Bio: </Text>
    <Text style = {styles.detail}> "{ profile.BIO }" </Text>
    </View>
    </View>


    <View style = {styles.detailBlock}>
    <Text style = {styles.detailHeader}> Contacts </Text>
        <View style = {styles.list}>

    <FlatList
    data = { contacts }
    renderItem = { RenderContact }
    />
    </View>
    </View>

    <View style = {styles.detailBlock}>
    <Text style = {styles.detailHeader}> Conversations </Text>
    <View style = {styles.list}>
    <FlatList
    data = { conversations }
    renderItem = { RenderConversation }
    />        
    </View>
    </View>


    </View>
)
}

/************* STYLES *************/
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        margin: 15, 
    }, 
    detailBlock: {
        alignItems: 'left', 
        padding: 10, 
    }, 
    detailRow: {
        marginBottom: 10, 
        fontSize: 15, 
        flexDirection: 'row',     
    }, 
    detailRowIMG: {
        alignItems: 'left', 
    },
    detailHeader: {
        //        fontWeight: 'bold', 
        fontStyle: 'italic', 
        fontSize: 25, 
    },
    detailLabel: {
        fontStyle: 'italic', 

    }, 
    detail: {
        color: '#555555', 
    }, 
    IMG: {
        width: 100, 
        height: 100, 

        borderRadius: '50%', 
        borderWidth: 1, 
        borderColor: 'lightgrey', 
        backgroundColor: 'lightgrey',

        marginBottom: 20,
        marginLeft: 50, 

    },
    time: {
        color: 'grey',
        fontStyle: 'italic'
    },
    item: {
        color: 'black', 
        borderBottomWidth: '1px',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: '1px',
        borderBottomColor: 'lightgrey',
    }, 
    title: {
        fontSize: 15,
        color: 'black',
        fontStyle: 'italic'
    }, 
    list: {
        borderWidth: 1, 
        borderColor: 'lightgrey', 
        marginTop: 15, 
    },   profIMG: {
        width: 30, 
        height: 30, 
        borderRadius: 15, 
        borderWidth: 1, 
        borderColor: 'lightgrey', 
        backgroundColor: 'lightgrey'
    },
});
