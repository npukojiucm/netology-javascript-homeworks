const app = require('./app');
const socketChat = require('./websocket/Chat');
const socketInstance = require('./websocket/InstanceManager');

const server = app.listen(3000, () => {
  console.log('App is running on http://localhost:3000');
});
socketChat(server);
socketInstance(server);
