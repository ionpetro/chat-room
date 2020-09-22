export class ChatMessage {
  $key?: string;
  message?: string;
  userName?: string;
  email?: string;
  timeSent?: Date = new Date();
}
