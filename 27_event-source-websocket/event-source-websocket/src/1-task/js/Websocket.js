/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable no-console */
import { io } from 'socket.io-client';

export default class WebsocketClient {
  constructor(wsServer, client = null) {
    this.wsServer = wsServer;
    this.client = client;

    this.addInMembersList = this.addInMembersList.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.messageStyle = this.messageStyle.bind(this);
    this.getMessage = this.getMessage.bind(this);
  }

  setConnect(objOptions, containerMembersList, containerChatMessages) {
    this.client = io(this.wsServer, objOptions);

    this.client.on('connect', () => console.log('connect'));
    this.client.on('me_connect', (message) => {
      this.addInMembersList(message.user, containerMembersList, 'me');
    });
    this.client.on('connect_new_user', (message) => {
      this.addInMembersList(message.user, containerMembersList, 'another');
    });
    this.client.on('user_list', (message) => {
      message.users.forEach((user) => {
        this.addInMembersList(user, containerMembersList, 'another');
      });
    });
    this.client.on('history_messages', (message) => {
      console.log(message);
      if (message.messages.length > 0) {
        message.messages.reverse().forEach((msg) => this.getMessage(msg, containerChatMessages));
      }
    });

    this.client.on('my_message', (message) => {
      this.getMessage(message, containerChatMessages, 'me');
    });
    this.client.on('another_user_message', (message) => {
      this.getMessage(message, containerChatMessages);
    });

    this.client.on('user_leave', (message) => {
      const li = containerMembersList.querySelectorAll('li');

      const userLeave = Array.from(li).find((item) => item.dataset.nickname === message.user.nickname);
      userLeave.remove();
    });
  }

  addInMembersList(arrUser, container, recipient) {
    let position = 'beforeend';
    let { nickname } = arrUser;

    if (recipient === 'me') {
      position = 'afterbegin';
      nickname = 'YOU';
    }

    return container.insertAdjacentHTML(position, `
    <li class="list-item" data-nickname="${nickname}">
      <div class="item-avatar"></div>
      <span class="item-nickname">${nickname}</span>
    </li>
    `);
  }

  sendMessage(nickname, message) {
    this.client.emit('user_msg', {
      nickname,
      message,
    });
  }

  getMessage(message, container, sender) {
    container.insertAdjacentHTML('afterbegin', this.messageStyle(message, sender));

    if (container.scrollHeight > 400) {
      container.scrollTop = container.scrollHeight;
    }
  }

  messageStyle(message, sender) {
    let { nickname, message: _message, date } = message;
    let alignStyle = '';

    if (sender === 'me') {
      nickname = 'YOU';
      alignStyle = 'align-style';
    }

    return `
      <div class="message ${alignStyle}">
        <p class="message-title">${nickname}, ${date}</p>
        <p class="message-text">${_message}</p>
      </div>`;
  }
}
