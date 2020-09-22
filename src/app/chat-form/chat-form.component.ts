import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {

  message: string;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
  }

  send() {
    this.chatService.sendMessage(this.message)
  }

  handleSubmit(event) {
    // keyCode 13 is the Enter key
    if (event.keyCode === 13) {
      this.send();
    }
  }

}
