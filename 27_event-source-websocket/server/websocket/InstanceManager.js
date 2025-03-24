/* eslint-disable no-case-declarations */
const socketIO = require('socket.io');
const { v4: uuid } = require('uuid');

const timeOut = 3000;

function socketInstance(server) {
  const io = socketIO(server, {
    path: '/instance',
    cors: {
      origin: 'http://localhost:8080',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    socket.on('command', async (message) => {
      let id;
      const { command } = message;
      const date = () => new Date().toLocaleString();

      switch (command) {
        case 'Create':
          id = uuid();

          socket.emit('command_response', {
            status: 'Ok',
            instance: {
              date: date(),
              id,
              info: 'Creating and launching a server...',
              status: 'Creating',
              showInstance: false,
              showLog: false,
            },
          });

          setTimeout(() => {
            socket.emit('command_response', {
              status: 'Ok',
              instance: {
                date: date(),
                id,
                info: 'The server has been created',
                status: 'Create',
                showInstance: false,
                showLog: false,
              },
            });
          }, timeOut);

          break;

        case 'Start':
          id = message.instance.id;

          socket.emit('command_response', {
            status: 'Ok',
            instance: {
              date: date(),
              id,
              info: 'Starting the server...',
              status: 'Starting',
              showInstance: false,
              showLog: false,
            },
          });

          setTimeout(() => {
            socket.emit('command_response', {
              status: 'Ok',
              instance: {
                date: date(),
                id,
                info: 'The server is running',
                status: 'Start',
                showInstance: false,
                showLog: false,
              },
            });
          }, timeOut);

          break;

        case 'Stop':
          id = message.instance.id;

          socket.emit('command_response', {
            status: 'Ok',
            instance: {
              date: date(),
              id,
              info: 'Stopping the server...',
              status: 'Stopping',
              showInstance: false,
              showLog: false,
            },
          });

          setTimeout(() => {
            socket.emit('command_response', {
              status: 'Ok',
              instance: {
                date: date(),
                id,
                info: 'The server is stopped',
                status: 'Stop',
                showInstance: false,
                showLog: false,
              },
            });
          }, timeOut);
          break;

        case 'Remove':
          id = message.instance.id;

          socket.emit('command_response', {
            status: 'Ok',
            instance: {
              date: date(),
              id,
              info: 'Deleting the server...',
              status: 'Deleting',
              showInstance: false,
              showLog: false,
            },
          });

          setTimeout(() => {
            socket.emit('command_response', {
              status: 'Ok',
              message: 'The server has been deleted',
              instance: {
                date: date(),
                id,
                info: 'The server has been deleted',
                status: 'Delete',
                showInstance: false,
                showLog: false,
              },
            });
          }, timeOut);

          break;

        default:
          socket.emit('command_response', {
            status: 'Error',
            message: 'Unknown command',
          });
      }
    });
  });

  return io;
}

module.exports = socketInstance;
