//CLASS.JS
// THIS FILE CONTAINS CLASS FILES WHICH HELP FACILITATE STORAGE OF DATA IN GOOGLE FIREBASE FIRESTORE DATABASE. CLASSES INCLUDE: FBOBJECT, ACCOUNT, CONVERSATION, MESSAGE AND PROFILE
// MORGAN IVERSON

/************* NODE MODULES *************/
import { firebase } from '../firebase/config.js';

/************* CLASSES *************/

//FB OBJECT PARENT CLASS 
// ALLOW CONVERSTION OF CHILD CLASSES TO READABLE DATA FOR FIREBASE
class FBObject {
    //RETURN STORABLE OBJECT (JSON)
    //toFirestore
    get() {
        return Object.assign({}, this);
    }
    
    toFirestore() {
        return Object.assign({}, this);
    }
    
    fromFirestore(source) {
        return Object.assign(this, source);
    }
   
}

//ACCOUNT OBJECT TO GENERATE USER ACCOUNT FOR FB STORAGE
export class Account extends FBObject{
    constructor(EMAIL, UID, CONVERSATIONS, PROFILE){
        super();
        this.EMAIL = EMAIL;
        this.UID = UID;
        this.CONVERSATIONS = CONVERSATIONS;
        //CREATE PROFILE REF
        this.PROFILE = PROFILE;
        this.CONTACTS = [];
    }

} 

//CONVERSATIN OBJECT TO STORE NEWLU CREATED CONVERSATIUON DATA
export class Conversation extends FBObject{
    constructor(CID, USERS, MESSAGES, CREATEDAT){
        super();
        this.CID = CID;
        this.USERS = USERS;
        this.MESSAGES = MESSAGES;
        this.LASTMESSAGE = this.MESSAGES[this.MESSAGES.length - 1].TEXTCONTENT;
        this.LASTEDITED = this.MESSAGES[this.MESSAGES.length - 1].CREATEDAT;
    }
    
}

//MESSAGE OBJECT TO STORE GIFTED CHAT MESSAGE DATA
export class Message extends FBObject{
    constructor(MID, USER, TIME, TEXTCONTENT, IMGCONTENT) {
        const d = new Date();
        super();
        this.MID = MID;
        this.USER = USER;
        this.CREATEDAT = new Date().getTime(); //FB TIMESTAMP
        this.TIME = TIME; //VISUAL TIME
        this.TEXTCONTENT = TEXTCONTENT;
        this.IMGCONTENT = IMGCONTENT;
    }
}

//PROFILE OBJECT TO STORE PROFILE DATA
export class Profile extends FBObject{
    constructor(FNAME, LNAME, IMG, AGE) {
        super();
        this.FNAME = FNAME;
        this.LNAME = LNAME;
        this.IMG = IMG;
        this.BIO = "Hi, My name is " + this.FNAME + "! Let's Chat!";
    }

}

