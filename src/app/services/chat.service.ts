import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ChatMessage } from '../models/chat-message.model'
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: firebase.User;
  chatMessages: AngularFireList<any>;
  chatMessage: ChatMessage;
  userName: string;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    console.log(afAuth);
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;

      }

      this.getUser().valueChanges().subscribe(a => {
        this.userName = (a as any).displayName;
      });

    });
  }


  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.object(path);
  }

  getUsers () {
    const path = '/users/';
    return this.db.list(path);
  }

  sendMessage(msg: string): void {
    const timeStamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.getMessages();
    this.chatMessages.push(
      {
      userName: this.userName,
      message: msg,
      email: email,
      timeSent: timeStamp
    }
    );

      console.log('Called sendMessage()');
  }

  getMessages(): AngularFireList<ChatMessage[]> {
    //query to create our message feed binding
    return this.db.list('/messages' , ref =>
      ref.limitToLast(25).orderByKey()
    );
  }

  getTimeStamp():string {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                 (now.getUTCMonth() + 1) + '/' +
                 now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                 now.getUTCMinutes() + ':' +
                 now.getUTCSeconds();
    return `${date} ${time}`;
  }
}
