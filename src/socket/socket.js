// src/services/websocket/socket.js

class SocketClient {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  connect(url) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      return this.socket;
    }

    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log("WebSocket Connected");
    };

    this.socket.onclose = () => {
      console.log("WebSocket Disconnected");
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      const callback = this.listeners.get(data.type);

      if (callback) {
        callback(data.payload);
      }
    };

    return this.socket;
  }

  disconnect() {
    this.socket?.close();
  }

  send(type, payload) {
    if (this.socket?.readyState !== WebSocket.OPEN) {
      return;
    }

    this.socket.send(
      JSON.stringify({
        type,
        payload,
      })
    );
  }

  subscribe(type, callback) {
    this.listeners.set(type, callback);
  }

  unsubscribe(type) {
    this.listeners.delete(type);
  }
}

export default new SocketClient();