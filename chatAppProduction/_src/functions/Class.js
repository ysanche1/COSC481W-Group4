import { firebase } from '../firebase/config.js';

//OBJECT CLASS 
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

export class Account extends FBObject{
    constructor(FNAME, EMAIL, UID, CONVERSATIONS){
        super();
        this.FNAME = FNAME;
        this.EMAIL = EMAIL;
        this.UID = UID;
        this.CONVERSATIONS = CONVERSATIONS;
        //CREATE PROFILE REF
    }

} 

export class Profile extends FBObject{
    constructor(FNAME, LNAME, IMG, AGE) {
        super();
        this.FNAME = FNAME;
        this.LNAME = LNAME;
        this.IMG = IMG;
    }

}

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

export class Contact{
    
}

