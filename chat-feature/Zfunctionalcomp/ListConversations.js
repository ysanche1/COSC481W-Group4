//FUNCTIONS RELATED TO LOADING CONVERSATIONS INTO LISTING
const USERSESSIONSFDB;
const ACCOUNTFDB = 'USERS';

//GET THE MOST RECENT X CONVERSATIONS FROM USER SESSIONS
// UID -> ACCOUNT -> USERSESSIONS
function getConversations(UID) {
    const sessions = firestore()
        .collection("USERS")
        .doc(UID)
        .orderby('time')
        .limit(25);
    //WHAT TO RETURN 
}
