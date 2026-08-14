import * as signalR from "@microsoft/signalr";
import { NOTIFICATION_HUB_URL } from "../config/api";

class SignalRService {
  constructor() {
    this.connection = null;
    this.handlers = new Map();
  }

  async startConnection(getToken) {
    if (this.connection) {
      const state = this.connection.state;
      if (
        state === signalR.HubConnectionState.Connected ||
        state === signalR.HubConnectionState.Connecting ||
        state === signalR.HubConnectionState.Reconnecting
      ) {
        return this.connection;
      }
    }

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(NOTIFICATION_HUB_URL, {
        accessTokenFactory: () => getToken?.() ?? "",
      })
      .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
      .build();

    try {
      await this.connection.start();
      return this.connection;
    } catch (err) {
      console.error("SignalR connection failed", err);
      throw err;
    }
  }

  async stopConnection() {
    if (this.connection) {
      const connection = this.connection;
      this.connection = null;
      this.handlers.clear();
      await connection.stop();
    }
  }

  on(eventName, callback) {
    if (!this.connection) return;

    this.connection.off(eventName);
    this.connection.on(eventName, callback);
    this.handlers.set(eventName, callback);
  }

  off(eventName) {
    if (!this.connection) return;
    this.connection.off(eventName);
    this.handlers.delete(eventName);
  }
}

export default new SignalRService();
