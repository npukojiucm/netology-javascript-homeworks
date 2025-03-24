import Chat from './Chat';

const chat = new Chat('.container', 'wss://websocket-server-ugmt.onrender.com');

chat.init();
