# COSC481W-Group4

# _**Project Report:** 'Chat App'_
1. [Information]()
2. [Introduction]()
3. [User Manual](#3-user-manual)
4. [Implementation Manual](#4-implementation-manual)
    1. [Conceptual Design]()
    2. [Functional Requirements](#2-functional-requirements)
    3. [System Requirements](#3-system-requirements)
    4. [Implementation Plan](#4-implementation-plan)
    5. [Application Programs]()
        1. [Create React Native Environment](#i-create-react-native-environment)
        2. [Download Source Code](#ii-how-to-download-chat-app-source-code-from-github)
        3. [Connect App to Firebase](#iii-how-to-connect-chat-app-to-google-firebase)
        4. [Install Node Modules](#iv-how-to-install-node-modules)
        5. [Run App](#v-how-to-run-chat-app)
    6. [Descriptiion of Programs]()
  

## **_3. User Manual_**
The instructions of how to use ‘Chat App’ are listed below according to action. 
<table> <tr> <td colspan="2" ><strong><em>Authentication</em></strong><p><em>How to create an account and log into and sign out of your account on ’Chat App’.</em> </td> </tr> <tr> <td><em>Sign Up</em><ol><li><em>Select ‘New user? Join here’</em><li><em>Enter your first name, last name, email and a six character password </em><li><em>Press ‘Sign Up’</em></li></ol> </td> <td>(3) </td> </tr> <tr> <td><em>Log In</em><ol><li><em>Enter the email and six character password you created at sign up</em><li><em>Press ‘Login’</em></li></ol> </td> <td>(2) </td> </tr> <tr> <td><em>Sign Out </em><ol><li>Go to ‘Your Profile’ from Navigation Drawer<li>Press ‘Sign Out’</li></ol> </td> <td>(2) </td> </tr> <tr> <td colspan="2" ><strong><em>Navigation</em></strong><p><em>How to navigate between screens on ‘Chat App’.</em> </td> </tr> <tr> <td><em>Navigation</em><ol><li>Press the hamburger button <strong>&lt;Icon here></strong> on the upper left corner</li></ol> </td> <td>(1) </td> </tr> <tr> <td colspan="2" ><strong><em>Account</em></strong><p><em>How to view and edit profile and view account details on ‘Chat App’.</em> </td> </tr> <tr> <td><em>View Profile</em><ol><li>Open Navigation Drawer<li>Press ‘Your Profile’ </li></ol> </td> <td>(2) </td> </tr> <tr> <td><em>Edit profile</em><ol><li>Open Navigation Drawer<li>Press ‘Your Profile’ <li>Select ‘Edit Profile’ <li>Enter changes to bio<li>Press ‘Submit Changes’<p>*Image upload not functional</li></ol> </td> <td>(5) </td> </tr> <tr> <td><em>View Account Details</em><ol><li>Open Navigation Drawer<li>Press ‘Your Profile’ <li>Press ‘View Account Details’</li></ol> </td> <td>(3) </td> </tr> <tr> <td colspan="2" ><strong><em>Contacts</em></strong><p><em>How to add contacts and view your contact list on ‘Chat App’.</em> </td> </tr> <tr> <td><em>Add Contacts</em><ol><li>Open Navigation Drawer<li>Press ‘Search’ <li>Search by name (Accounts not already in contacts)<li>View Profile on click<li>Add contact from profile ro go back to search (reset)</li></ol> </td> <td>(5) </td> </tr> <tr> <td><em>View Contacts</em><ol><li>Open Navigation Drawer<li>Press ‘Contacts List’ <li>(Optional) Use the search bar to search contacts</li></ol> </td> <td>(3) </td> </tr> <tr> <td colspan="2" ><strong><em>Chat</em></strong><p><em>How to start a new conversation, enter an existing conversation and view the menu of a conversation on ‘Chat App’.</em> </td> </tr> <tr> <td><em>New Conversation</em><ol><li>Open Navigation Drawer<li>Press ‘Home’ (Conversations) <li>Select Chat Bubble Icon <strong>&lt;Icon here></strong> in upper right corner<li>Use the search bar to enter the name of the user you are looking for<li>Select a name to add them to the conversation<li>Select ‘Chat Now!’</li></ol> </td> <td>(6) </td> </tr> <tr> <td><em>Existing Conversation</em><ol><li>Open Navigation Drawer<li>Press ‘Home’ (Conversations) <li>Select the Conversation you'd like to enter<li>Start typing and press send</li></ol> </td> <td>(4) </td> </tr> <tr> <td><em>Conversation Menu</em><ol><li>Open Navigation Drawer<li>Press ‘Home’ (Conversations) <li>Select Conversation you'd like to enter<li>Select the hamburger icon <strong>&lt;Icon here></strong> in the upper right corner<li>(Optional) View chat member profile by pressing their name<li>(Optional) Add members who are not already contacts</li></ol> </td> <td>(6) </td> </tr></table>
[Back to Top](#project-report-chat-app)


# **_4. Implementation Manual_**


## _2. Functional Requirements_


The functional requirements of ‘Chat App’ are listed below according to the function category.


**User Authentication**

_Sign Up_

Users should be able to create an account using their first and last name, email and a six character password. 

_Login_

Users should be able to log into their account using their email and the six character password entered at sign up. 

_Sign Out_

Users should be able to log out of their account. 

_Error Catching_

Users should see errors on screen when completing the log in or sign up process. 

**Account/Profile Management**

_Profile View_

Users should be able to view their profile which shows their name and bio. 

_Profile Edit_

Users should be able to change their Profile bio. 

_Account Details View_

Users should be able to view the details of their account including name, email, profile details, contacts and conversations.

**Contacts Management**

_Contacts List_

Users should be able to see user contacts and view contact profiles. 

_Search Contacts_

Users should be able to search app users and add them as contacts.

**Conversations Management**

_Conversations View_

Users should be able to see a listing of all their conversations.

_Conversation Details_

Users should be able to see the members of a conversation in a chat menu.

_Conversations Notifications_

Users should be able to see bolded unread messages, conversations and see Sent/Receive/Store messages. 

_Conversations Create_

Users should be able to start new conversations from users in their contact list. 

**Message Management**

_Message Create_

Users should be able to send a message through any existing conversations.

**Navigation**

_Navigation Drawer_

Users should be able to navigate the app using the navigation drawer. 



[Back to Top](#project-report-chat-app)


## **_3. System Requirements_**

The system requirements of ‘Chat App’ are listed below according to the function category.

**User Authentication**

_Sign Up_

Users will enter their first and last name, email and password on the sign up screen. Once an account is created through Google Firebase Functions an Account and Profile objects will be created and stored in Google Firebase Firestore. The Account object holds the Profile object and is then stored in a collection called, ‘ACCOUNTS’ in Google Firestore according to the UID generated by Google Firebase Authentication at Sign Up. The user is then directed out of the Authentication Stack and to the home screen of the app.

_Login_

Users will enter their email and password for the account they created at sign up. After a successful login the user is directed out of the  Authentication Stack and to the home screen of the app.

_Sign Out_

Users will press the sign out button from their Profile screen which will sign them out using Google Firebase Authentication functions. They will no longer have access to the App Stack and be moved into the Authentication stack. 

_Error Catching_

If login or sign up is unsuccessful the methods will return error messages which are displayed on screen. 

**Account/Profile Management**

_Profile View_

When the users navigate to the ‘You Profile’ screen via the Navigation Drawer the data stored according to their UID in the ACCOUNTS collection on Google Firestore is pulled, specifically the Profile object which holds their name and bio. That data is then displayed on screen.

_Profile Edit_

The user can navigate to the Edit Profile page where they can type a new bio and press submit changes to update the value stored in their Account object which is stored in Google Firestore ACCOUNTS collection.

_Account Details View_

When the user navigates to view their account details data is pulled from their Account object stored in Google Firestore ACCOUNTS collection including name, email, account creation date and time, profile, conversations and contacts. The data is displayed on screen. 

**Contacts Management**

_Contacts List_

When a user navigates to Contacts List from the Navigation Drawer their Accounts stored in Google Firestore ACCOUNTS collection is pulled. The CONTACTS array containing the UID’s of all their contacts in the Account object then mapped to pull profile information from the ACCOUNTS collection. The data is then sent to a list for viewing. 

_Search Contacts_

The Users can navigate to the search screen which will pull the name and UID of all the Account objects listed in the Google Firestore ACCOUNTS collection. The accounts pulled are that of all UIDs not existing in the current user’s contacts list. The data is then displayed in a list for viewing. 

**Conversations Management**

_Conversations View_

When the user enters their home screen their Accounts stored in Google Firestore ACCOUNTS collection is pulled, specifically the CONVERSATIONS array. This array contains objects which store a CID, conversation ID, and UNREADMESSAGES, which is the number of unread messages the current user has for this conversation. The CID’s are then mapped to pull the data stored by CID in the CONVERSATIONS collection stored in Google Firestore. Each conversation object’s data is pushed to the app for viewing. 

_Conversation Details_

When in a conversation the user can view the conversation’s members. The data is pulled by the conversations CID from the CONVERSATIONS collection in Google Firestore.  The USERS array containing the UID’s of all users in the conversation is pulled and mapped to get the profile data of each user from the Account object stored by UID in the ACCOUNTS collection. The data is then shown in a list on screen. 

_Conversations Notifications_

When the user enters their home screen their Accounts stored in Google Firestore ACCOUNTS collection is pulled, specifically the CONVERSATIONS array. This array contains objects which store a CID, conversation ID, and UNREADMESSAGES, which is the number of unread messages the current user has for this conversation. If the user’s UNREAD MESSAGES is greater than 0 then the row containing the conversation’s information is bolded. The app constantly listens for changes. 

_Conversations Create_

The users can create a new conversation from the New Chat screen. This screen renders a list of the users contacts by pulling the array of UID’s titled CONTACTS from the users’ Account object stored in the ACCOUNTS collection of Google Firestore and mapping them to listable objects for on screen viewing. 

**Message Management**

_Message Create_

The user can type in their message once they enter a conversation and press send. The details of that message are stored in a Message object which is added to the Conversation’s object stored by CID in the CONVERSATIONS collection in Google Firestore. The message’s text content is set as the LASTMESSAGE and the message’s time is set as the LASTEDITED value for the Conversation object. The members of the conversation will have snapshots triggered when the message is sent which will bolden the conversations row on the Home screen and show the message’s text content and time. 

**Navigation**

_Navigation Drawer_

Users can access the various Navigations stack from the Navigation drawer. 

[Back to Top](#project-report-chat-app)


## **_4. Implementation Plan_**
Below are the functions and features of ‘Chat App’ listed by who implemented them into the system.

 **Sign Up**
 
_Google Firebase Authentication_

<ins>Ben Bruursems:</ins> Email/6 character password using Firebase Authentication functions

<ins>Morgan Iverson: </ins> First/Last Name entry, Display of Sign Up Errors, Account/Profile Creation and Storage in Firebase Firestore

 **Log In**
 
_Google Firebase Authentication_

<ins>Ben Bruursems:</ins>  Email/Password login using  Firebase Authentication functions

<ins>Morgan Iverson:</ins> Display Login Errors

 **Conversation/Chat**
 
_React Native & Firebase Firestore_

<ins>Morgan Iverson:</ins> Show Current Users Conversations, Open Conversation Chatroom and stored messages on click, Bold Unread messages, Listen for new Conversations and Bold, Start New Conversation from User Contact List, Chat Menu, Send/Receive/Store Messages 

 **Navigation**
 
 _React Native Drawer Navigation_

<ins>Morgan Iverson:</ins> Basic Drawer Navigator, Various Stack Navigators, Home, Contact List, Chat Room, Conversations, Profile, Account Details, Edit Profile and Search Screens

 **Profile**
 
_React Native & Firebase Firestore_

<ins>Morgan Iverson:</ins> Display User Name and Bio, Edit Profile, View Account Details

 **Contacts**
 
_React Native & Firebase Firestore_

<ins>Morgan Iverson:</ins> Load User Contacts, View Contact Profile, Search App Users, Add Contacts from Search

 **Sign Out**
 
_Google Firebase Authentication_

<ins>Ben Bruursems:</ins> Sign Out current user using  Firebase Authentication functions

 **UX Styles**
 
_AdobeXD_

<ins>Yaneli Sanchez:</ins>  [AdobeXD UI Design](https://xd.adobe.com/view/4c2876a7-9336-45db-8ff7-44ac0d75146d-197b/)

**Project Report**

_User Manual_

<ins>Morgan Iverson:</ins> Sample Outputs and User Instructions

_Implementation Manual_

<ins>Ben Bruursema:</ins> Firebase Connection

<ins>Yhayh Thabet:</ins> Functional Requirements

<ins>Morgan Iverson:</ins> System Requirements, Conceptual Design, Implementation Plan, Node Modules, Github Download, Code Listing, React Native Environment Set Up


[Back to Top](#project-report-chat-app)

## **_5. Application programs_**
This document lists instructions for setting up the development environment to edit and run ‘Chat App’.

### **_i.Create React Native Environment_**
These are instructions on how to create an environment to run a React Native App.

1. Ensure you have NodeJS installed [Installation Guide Here](https://www.tutorialspoint.com/nodejs/nodejs_environment_setup.htm)
2. Go to Terminal
3. Install create-react-native-app
```npm install -g create-react-native-app```

4. cd to where you want your app to be
5. Create your project by entering the following line in Terminal

```create-react-native-app MyProjectName```


### **_ii. How to download ‘Chat App’ source code from Github_**
Below is a link to download a zip file containing the ‘Chat App’ source code from the main branch: 
[https://github.com/ysanche1/COSC481W-Group4/archive/refs/heads/main.zip](https://github.com/ysanche1/COSC481W-Group4/archive/refs/heads/main.zip)

These are instructions on how to add files to your React Native App.

1. Copy the unzipped files (‘_src’ folder and‘package.json’ file) into your project folder (where App.js is located)
2. Open App.js
3. Replace the entire contents of the file with the following code

```
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Providers from './_src/navigation/index.js';

export default function App() {
  return (<Providers/>);
}
```


### **_iii. How connect ‘Chat App’ to Google Firebase_**
These are instructions on how to permit access of your App to Google Firebase features including, Authentication and Firestore.
 1. 




### **_iv. How to Install Node Modules_**
These are instructions on how to install the Node Modules required to run ‘Chat App’.

**Option 1:**
1. Ensure you have Node or Yarn installed on your computer
2. Ensure the ‘package.json’ file copied from Github is in the same folder as App.js
3. Enter Terminal 
4. cd into the project folder (where App.js)
5. Run the following command in terminal
```npm install```

**Option 2:**
1. Ensure you have Node or Yarn installed on your computer
2. Ensure the ‘package.json’ file copied from Github is in the same folder as App.js
3. Enter Terminal 
4. cd into the project folder (where App.js)
5. Run the following command in terminal where <package-name> is the name of the module(s) to be installed
```
npm install <package-name> <package-name> <package-name>
```

This is a listing of the node modules and their source. 



### **_v. How to run ‘Chat App’_**
These are instructions on how to run ‘Chat App’ from terminal.

1. Ensure you have the node module ‘expo’ installed
2. Enter Terminal 
3. cd into the project folder (where App.js)
4. Enter the following line into terminal
```expo start```

[Back to Top](#project-report-chat-app)


## **_Description of Programs_**
This is a description of all the source files for ‘Chat App’.

**_components_**

This folder holds all components for ‘Chat App’ specifically buttons.

| _Buttons.js_ - This file holds all the button components (ProfileButton, AddConversationButton, FormButton/FormButtonText)


**_firebase_**

This folder holds the configuration file for firebase.

| _config.js_ -This file contains the object containing keys for firebase connection.


**_functions_**

This folder contains all the functions to run ‘Chat App’.

| _AccountProfile.js_ - This file contains functions for user account and profile management including, getting/editing Profile data and getting account Data such as contacts and conversations.

| _Authentication.js_ - This file contains functions for user authentication to facilitate login, sign up, sign out and account/profile creation.

| _Class.js_ - This file contains class files which help facilitate storage of data in Google Firebase Firestore database. Classes include: FBObject, Account, Conversation, Message and Profile

| _Communcation.js_ - This file contains functions for user communication including functions that get all user conversations for display, load messages of each conversation for viewing, store chat messages in firebase, listen for new messages sent in conversation, and others.


**_navigation_**

This folder contains all the components to facilitate navigation of ‘Chat App’.

| _AuthProvider.js_ - This file defines the context which tells the application if the current user is logged in or not. 

| _AuthStack.js_ - This file facilitates the navigation abilities for two screens login and sign up. 

| _DrawerNavigator.js_ - This file contains the drawer navigator which facilitates movement between various stacks of ‘Chat App’.

| _index.js_ - This file contains the provider which holds all the routes for ‘Chat App’ navigation.

| _Routes.js_ - This file contains all the stacks fro navigation of ‘Chat App’ and decides which stack the current user can access. 

| _ScreenStacks.js_ - This file contains all the stacks for signed up users to access when they are logged in. 

**_screens_**

This folder contains of the screen components of ‘Chat App’

| _AccountDetailScreen.js_ - This file contains the components and functions for interaction with for the Account Detail Screen. 

| _ChatMenuScreen.js_ - This file contains the components for and functions for interaction with the Chat Menu Screen. 

| _ChatRoomScreen.js_ - This file contains the components for and functions for interaction with the Chat Room Screen. 

| _ContactsList.js_ - This file contains the components for and functions for interaction with  the Contacts List Screen. 

| _ConversationScreen.js_ - This file contains the components for and functions for interaction with the Conversation Listing/Home Screen. 

| _EditProfile.js_ - This file contains the components for and functions for interaction with the Edit Profile Screen. 

| _LoginScreen.js_ - This file contains the components for and functions for interaction with the Login Screen. 

| _NewChatScreen.js_ - This file contains the components for and functions for interaction with the New Chat creation Screen. 

| _ProfileScreen.js_ - This file contains the components for and functions for interaction with the Profile Screen and defines which type of profile and what data is to be shown. 

| _SearchScreen.js_ - This file contains the components for and functions for interaction with the Search Screen. 

| _SignUpScreen.js_ - This file contains the components for and functions for interaction with the Sign Up Screen. 


[Back to Top](#project-report-chat-app)

