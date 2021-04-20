/************* NODE MODULES *************/
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

/************* LOCAL  COMPONENTS (STACKS) *************/
import { ProfileStack, ContactStack, ConversationStack, SearchStack } from './ScreenStacks';

/************* CONSTANTS *************/
const Drawer = createDrawerNavigator();

/************* DRAWER NAVIGATOR *************/
export default function DrawerNavigator() {
    return (
        <Drawer.Navigator 
        initialRouteName="Conversations"
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
                
        <Drawer.Screen name= "ProfileStack" component = {ProfileStack} options = {{title: 'Your Profile'}}/>
        
        <Drawer.Screen name = 'Contacts' component= {ContactStack}/>
        
        <Drawer.Screen name = 'Search' component= {SearchStack}/>

        </Drawer.Navigator>
    );
}

/************* STYLES *************/
const styles = StyleSheet.create({
    drawer: {
        backgroundColor: 'white', 
        color: 'black',
    }
    
})