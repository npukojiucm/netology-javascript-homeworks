/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
import WebsocketClient from './Websocket';

export default class Chat extends WebsocketClient {
  constructor(container, wsServer, client) {
    super(wsServer, client);

    this.container = document.querySelector(container);
    this.membersList = null;
    this.chatMessages = null;

    this.nickname = null;

    this.onInputDeleteMessageError = this.onInputDeleteMessageError.bind(this);
  }

  init() {
    this.loginChat();

    const form = document.forms['login-form'];
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;

      const response = await fetch('https://websocket-server-ugmt.onrender.com/api/login', {
        method: 'POST',
        body: new FormData(form),
      });
      const body = await response.json();

      form.reset();

      if (response.status !== 200) {
        const div = form.querySelector('div');
        div.insertAdjacentHTML('beforeend', `
        <span class="error-message">Такой пользователь уже существует<span></span>`);

        const input = form.elements[0];
        input.addEventListener('input', this.onInputDeleteMessageError);
        return;
      }

      form.style.display = 'none';
      this.showChat();

      const { token, nickname } = body.user;
      this.nickname = nickname;

      const options = {
        auth: {
          token,
        },
        query: {
          nickname,
        },
      };
      this.setConnect(options, this.membersList, this.chatMessages);
    });
  }

  onInputDeleteMessageError() {
    const form = document.forms['login-form'];
    const input = form.elements[0];
    const span = form.querySelector('span');

    if (span) {
      input.removeEventListener('input', this.onInputDeleteMessageError);
      return span.remove();
    }
  }

  loginChat() {
    const form = `
        <form class="login-form" name="login-form">
            <h1 class="form-title">Выберите псевдоним</h1>
            
            <div class="form-group">
              <input type="text" class="login-nickname" name="nickname" required>
            </div>

            <button class="btn login-submit" type="submit">Продолжить</button>
        `;

    return this.container.insertAdjacentHTML('beforeend', form);
  }

  showChat() {
    const chat = `
      <div class="chat-container">
        <div class="chat-members">
          <ul class="members-list"></ul>
        <div class="chat">
          <div class="chat-messages"></div>
          <input type="text" class="send-message" placeholder="Type your message here">
        </div>
      </div>
    `;

    this.container.insertAdjacentHTML('beforeend', chat);

    this.membersList = this.container.querySelector('.members-list');
    this.chatMessages = this.container.querySelector('.chat-messages');

    const input = this.container.querySelector('.send-message');
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();

        this.sendMessage(this.nickname, e.target.value);

        e.target.value = '';
      }
    });
  }
}
