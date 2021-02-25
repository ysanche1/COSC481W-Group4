import { firebase } from '../firebase/config.js';

//OBJECT CLASS 
class FBObject {
    //RETURN STORABLE OBJECT (JSON)
    get() {
        return Object.assign({}, this);
    }
}

export class Account extends FBObject{
    constructor(FNAME, EMAIL, UID, SESSIONS, PROFILE){
        this.FNAME = FNAME;
        this.EMAIL = EMAIL;
        this.UID = UID;
        this.SESSIONS = SESSIONS;
        this.PROFILE = PROFILE;
        //CREATE PROFILE REF
    }

    //SYSTEM MESSAGE/CONVERSATION
    initialSession() {
        SESSIONS.push(new Conversation(0, 
                                       [this.UID], 
                                       [new Message(0, null, firebase.firestore.FieldValue.serverTimestamp(), "Hi! Welcome to [Chat App]!"),

                                       ]))
    }
} 

export class Profile extends FBObject{
    constructor(FNAME, LNAME, UID, IMG, AGE) {
        this.FNAME = FNAME;
        this.LNAME = LNAME;
        this.UID = UID;
        this.IMG = IMG;
    }

}

export class Conversation extends FBObject{
    constructor(SID, USERS, MESSAGES){

    }
}

export class Message extends FBObject{
    constructor(MID, USER, DATE, CONTENT) {

    }
}


