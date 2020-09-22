import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ChatMessage } from '../models/chat-message.model'
import * as firebase from 'firebase/app';
import { timeStamp } from 'console';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: any;
  chatMessages: AngularFireList<any>;
  chatMessage: ChatMessage;
  userName: Observable<string>;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    // this.afAuth.authState.subscribe(auth => {
    //   if (auth !== undefined && auth !== null) {
    //     this.user = auth;
    //   }
    // });
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    // const email = this.user.email;
    const email = 'this.user.email';
    this.chatMessages = this.getMessages();
    this.chatMessages.push(
      {// userName: this.userName,
      userName: 'yolo',
      message: msg,
      email: email,
      timeSent: timestamp}
    );

      console.log('Called sendMessage()');
  }

  getMessages(): AngularFireList<ChatMessage[]> {
    //query to create our message feed binding
    return this.db.list('messages', ref => {
      return ref.limitToLast(25).orderByKey()
    });
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
