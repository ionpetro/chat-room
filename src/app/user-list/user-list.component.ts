import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  users: User[];

  constructor(private chatService: ChatService) {
    chatService.getUsers().valueChanges().subscribe(users => {
      this.users = users;
    });
  }
}
