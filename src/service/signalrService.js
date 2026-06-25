import * as signalR from "@microsoft/signalr";

class SignalRService {
  constructor() {
    this.connection = null;
  }

  async startConnection(token) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5000/chatHub", {
        accessTokenFactory: () => token,
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
