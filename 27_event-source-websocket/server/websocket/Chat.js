/* eslint-disable */
const socketIO = require('socket.io');
const { chatMembers } = require('../data/db');

function chat(server) {
  const io = socketIO(server, {
    cors: {
      origin: ['http://localhost:8080', 'https://npukojiucm.github.io/EventSource-Websocket/1-task/'],
      method: ['GET', 'POST']
    },
  });

  io.use(async (socket, next) => {
    const { token } = socket.handshake.auth;
    const { nickname } = socket.handshake.query;

    if (token === undefined) {
      next(new Error('anonymous sessions are not allowed'));
    }


    socket.user = chatMembers.findUser(nickname);
    next();
  });

  io.on('connection', (socket) => {
    socket.user.id = socket.id;

    socket.broadcast.emit('connect_new_user', {
      user: {
        nickname: socket.user.nickname,
      }
    });
    socket.emit('me_connect', {
      user: {
        id: socket.user.id,
        nickname: socket.user.nickname,
      },
    });
    socket.emit('user_list', {
      users: chatMembers.users.filter((user) => user.id !== socket.user.id),
    });
    socket.emit('history_messages', {
      messages: chatMembers.history(),
    })

    socket.on('user_msg', async (msg) => {
      const { nickname, message } = msg;
      const date = new Date();
      const stringDate = date.toLocaleString();

      const _message = {
        id: socket.user.id,
        nickname,
        date: stringDate,
        message,
      };
      chatMembers.addMessage(_message);

      socket.emit('my_message', _message);
      socket.broadcast.emit('another_user_message', _message);
    });

    socket.on('disconnect', async (reason) => {
      if (reason === 'transport close') {
        socket.broadcast.emit('user_leave', {
          user: {
            nickname: socket.user.nickname,
          },
        });

        chatMembers.deleteUser(socket.user.nickname);
      }
    })
  });

  return io;
}

module.exports = chat;
