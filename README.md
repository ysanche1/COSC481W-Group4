# COSC481W-Group4


# ***Implementation Plan***
Below are the functions and features of ‘Chat App’ listed by who implemented them into the system.

### **Sign Up**
***Google Firebase Authentication***

<ins>Ben Bruursems:</ins> Email/6 character password using Firebase Authentication functions
<ins>Morgan Iverson: </ins> First/Last Name entry, Display of Sign Up Errors, Account/Profile Creation and Storage in Firebase Firestore

### Log In
***Google Firebase Authentication***

<ins>Ben Bruursems:</ins>  Email/Password login using  Firebase Authentication functions
<ins>Morgan Iverson:</ins> Display Login Errors

### Conversation/Chat
***React Native & Firebase Firestore***

<ins>Morgan Iverson:</ins> Show Current Users Conversations, Open Conversation Chatroom and stored messages on click, Bold Unread messages, Listen for new Conversations and Bold, Start New Conversation from User Contact List, Chat Menu, Send/Receive/Store Messages 

### Navigation
#### ***React Native Drawer Navigation***

<ins>Morgan Iverson:</ins> Basic Drawer Navigator, Various Stack Navigators, Home, Contact List, Chat Room, Conversations, Profile, Account Details, Edit Profile and Search Screens

### Profile
***React Native & Firebase Firestore***

<ins>Morgan Iverson:</ins> Display User Name and Bio, Edit Profile, View Account Details

### Contacts
***React Native & Firebase Firestore***

<ins>Morgan Iverson:</ins> Load User Contacts, View Contact Profile, Search App Users, Add Contacts from Search

### Sign Out
***Google Firebase Authentication***

<ins>Ben Bruursems:</ins> Sign Out current user using  Firebase Authentication functions

### UX Styles
***AdobeXD***

<ins>Yaneli Sanchez:</ins>  [AdobeXD UI Design](https://xd.adobe.com/view/4c2876a7-9336-45db-8ff7-44ac0d75146d-197b/)


#**_User Manual_**

The instructions of how to use ‘Chat App’ are listed below according to action. 


<table>
  <tr>
   <td colspan="2" ><strong><em>Authentication</em></strong>
<p>
<em>How to create an account and log into and sign out of your account on ’Chat App’.</em>
   </td>
  </tr>
  <tr>
   <td><strong><em>Sign Up</em></strong>
<ol>

<li><em>Select ‘New user? Join here’</em>

<li><em>Enter your first name, last name, email and a six character password </em>

<li><em>Press ‘Sign Up’</em>
</li>
</ol>
   </td>
   <td>(3)
   </td>
  </tr>
  <tr>
   <td><strong><em>Log In</em></strong>
<ol>

<li><em>Enter the email and six character password you created at sign up</em>

<li><em>Press ‘Login’</em>
</li>
</ol>
   </td>
   <td>(2)
   </td>
  </tr>
  <tr>
   <td><strong><em>Sign Out </em></strong>
<ol>

<li>Go to ‘Your Profile’ from Navigation Drawer

<li>Press ‘Sign Out’
</li>
</ol>
   </td>
   <td>(2)
   </td>
  </tr>
  <tr>
   <td colspan="2" ><strong><em>Navigation</em></strong>
<p>
<em>How to navigate between screens on ‘Chat App’.</em>
   </td>
  </tr>
  <tr>
   <td><strong><em>Navigation</em></strong>
<ol>

<li>Press the hamburger button <strong>&lt;Icon here></strong> on the upper left corner
</li>
</ol>
   </td>
   <td>(1)
   </td>
  </tr>
  <tr>
   <td colspan="2" ><strong><em>Account</em></strong>
<p>
<em>How to view and edit profile and view account details on ‘Chat App’.</em>
   </td>
  </tr>
  <tr>
   <td><strong><em>View Profile</em></strong>
<ol>

<li>Open Navigation Drawer

<li>Press ‘Your Profile’ 
</li>
</ol>
   </td>
   <td>(2)
   </td>
  </tr>
  <tr>
   <td><strong><em>Edit profile</em></strong>
<ol>

<li>Open Navigation Drawer

<li>Press ‘Your Profile’ 

<li>Select ‘Edit Profile’ 

<li>Enter changes to bio

<li>Press ‘Submit Changes’

<p>
*Image upload not functional
</li>
</ol>
   </td>
   <td>(5)
   </td>
  </tr>
  <tr>
   <td><strong><em>View Account Details</em></strong>
<ol>

<li>Open Navigation Drawer

<li>Press ‘Your Profile’ 

<li>Press ‘View Account Details’
</li>
</ol>
   </td>
   <td>(3)
   </td>
  </tr>
  <tr>
   <td colspan="2" ><strong><em>Contacts</em></strong>
<p>
<em>How to add contacts and view your contact list on ‘Chat App’.</em>
   </td>
  </tr>
  <tr>
   <td><strong><em>Add Contacts</em></strong>
<ol>

<li>Open Navigation Drawer

<li>Press ‘Search’ 

<li>Search by name (Accounts not already in contacts)

<li>View Profile on click

<li>Add contact from profile ro go back to search (reset)
</li>
</ol>
   </td>
   <td>(5)
   </td>
  </tr>
  <tr>
   <td><strong><em>View Contacts</em></strong>
<ol>

<li>Open Navigation Drawer

<li>Press ‘Contacts List’ 

<li>(Optional) Use the search bar to search contacts
</li>
</ol>
   </td>
   <td>(3)
   </td>
  </tr>
  <tr>
   <td colspan="2" ><strong><em>Chat</em></strong>
<p>
<em>How to start a new conversation, enter an existing conversation and view the menu of a conversation on ‘Chat App’.</em>
   </td>
  </tr>
  <tr>
   <td><strong><em>New Conversation</em></strong>
<ol>

<li>Open Navigation Drawer

<li>Press ‘Home’ (Conversations) 

<li>Select Chat Bubble Icon <strong>&lt;Icon here></strong> in upper right corner

<li>Use the search bar to enter the name of the user you are looking for

<li>Select a name to add them to the conversation

<li>Select ‘Chat Now!’
</li>
</ol>
   </td>
   <td>(6)
   </td>
  </tr>
  <tr>
   <td><strong><em>Existing Conversation</em></strong>
<ol>

<li>Open Navigation Drawer

<li>Press ‘Home’ (Conversations) 

<li>Select the Conversation you'd like to enter

<li>Start typing and press send
</li>
</ol>
   </td>
   <td>(4)
   </td>
  </tr>
  <tr>
   <td><strong><em>Conversation Menu</em></strong>
<ol>

<li>Open Navigation Drawer

<li>Press ‘Home’ (Conversations) 

<li>Select Conversation you'd like to enter

<li>Select the hamburger icon <strong>&lt;Icon here></strong> in the upper right corner

<li>(Optional) View chat member profile by pressing their name

<li>(Optional) Add members who are not already contacts
</li>
</ol>
   </td>
   <td>(6)
   </td>
  </tr>
</table>



