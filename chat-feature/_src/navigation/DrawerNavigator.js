import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { ProfileStack, ContactStack, ConversationStack, SearchStack } from './ScreenStacks';

const Drawer = createDrawerNavigator();

//PROFILE -> USER PROFILE
//TYPE; FRONT/SLIDE
export default function DrawerNavigator() {
    return (
        <Drawer.Navigator 
        initialRouteName="ProfileStack"
        title = 'Drawer Title'
        drawerPosition = 'left'
        drawerType = 'slide'
        drawerStyle = {styles.drawer}
        drawerContentOptions = {{
            activeTintColor: 'black', 
            inactiveTintColor: 'black', 
            activeBackgroundColor: 'lightgrey', 
            inactiveBackgroundColor: 'white', 
        }}
        >
        
        <Drawer.Screen name="Conversations" component={ConversationStack} options = {{title: 'Home'}}/>
                
        <Drawer.Screen name= "ProfileStack" component = {ProfileStack} options = {{title: 'Your profile'}}/>
        
        <Drawer.Screen name = 'Contacts' component= {ContactStack}/>
        
        <Drawer.Screen name = 'Search' component= {SearchStack}/>

        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    drawer: {
        backgroundColor: 'white', 
        color: 'black',
    }
    
})