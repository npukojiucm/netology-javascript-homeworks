const { v4: uuid } = require('uuid');

module.exports.chatMembers = {
  users: [],
  messages: [],

  addUser(nickname) {
    let user;

    if (this.users.length) {
      user = this.users.find((member) => member.nickname === nickname);
      if (user) {
        return false;
      }
    }

    user = {
      nickname,
      token: uuid(),
      id: null,
    };
    this.users.push(user);

    return user.token;
  },

  findUser(nickname) {
    return this.users.find((user) => user.nickname === nickname);
  },

  deleteUser(nickname) {
    const index = this.users.findIndex((user) => user.nickname === nickname);
    return this.users.splice(index, 1);
  },

  addMessage(message) {
    return this.messages.push(message);
  },

  // eslint-disable-next-line consistent-return
  history() {
    const history = [];

    if (this.messages.length !== 0) {
      let length = this.messages.length;
      let count = 0;

      while (length > 0) {
        history.push(this.messages[length - 1]);
        length -= 1;
        count += 1;

        if (count === 20) break;
      }
    }
    return history;
  },
};

module.exports.db = [];
