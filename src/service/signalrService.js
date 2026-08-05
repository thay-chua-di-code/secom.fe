import * as signalR from "@microsoft/signalr";
import { NOTIFICATION_HUB_URL } from "../config/api";

class SignalRService {
  constructor() {
    this.connection = null;
  }

  async startConnection(token) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(NOTIFICATION_HUB_URL, {
        accessTokenFactory: () => token ?? "",
      })
      .withAutomaticReconnect()
      .build();

    try {
      await this.connection.start();
      console.log("SignalR Connected");
    } catch (err) {
      console.error(err);
    }
  }

  stopConnection() {
    if (this.connection) {
      this.connection.stop();
    }
  }

  onReceiveMessage(callback) {
    this.connection.on("ReceiveMessage", callback);
  }

  async sendMessage(receiverId, content) {
    await this.connection.invoke("SendMessage", receiverId, content);
  }
}

export default new SignalRService();
