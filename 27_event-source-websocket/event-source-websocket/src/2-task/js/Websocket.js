/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable no-console */
import { io } from 'socket.io-client';

export default class WebsocketClient {
  constructor(wsServer, client = null) {
    this.wsServer = wsServer;
    this.client = client;

    this.sendMessage = this.sendMessage.bind(this);
  }

  setConnect(arrObjChannelAndFunc) {
    this.client = io(this.wsServer, {
      path: '/instance',
    });

    this.client.on('connect', () => console.log('connect'));

    arrObjChannelAndFunc.forEach((object) => {
      this.client.on(object.channel, object.function);
    });
  }

  sendMessage(channel, message) {
    this.client.emit(channel, message);
  }
}
