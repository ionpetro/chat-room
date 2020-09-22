import { Component, OnChanges, OnInit, ɵɵNgOnChangesFeature } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})

export class FeedComponent implements OnInit, OnChanges {

  feed: Observable<any[]>;
  constructor(db:AngularFireDatabase, private chatService: ChatService) {
    this.feed = db.list('messages', ref =>
    ref.limitToLast(25).orderByKey()).valueChanges();

  }

  ngOnInit(): void {
    console.log('initializing...')
    // this.feed = this.chatService.getMessages();
  }

  ngOnChanges() {
    // this returns an Observable
    // this.feed = this.chatService.getMessages();

  }


}
