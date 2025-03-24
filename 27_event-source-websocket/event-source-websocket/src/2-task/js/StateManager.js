/* eslint-disable default-case */
/* eslint-disable no-return-assign */
import { observable } from 'mobx';
import WebsocketClient from './Websocket';

export default class StateManager extends WebsocketClient {
  constructor(wsServer, client = null) {
    super(wsServer, client);
    this.INSTANCES = observable([]);

    this.wsServer = wsServer;

    this.commandListener = this.commandListener.bind(this);
    this.addNewInstance = this.addNewInstance.bind(this);
    this.updateInstance = this.updateInstance.bind(this);
  }

  sendCommandOnServer(channel, message) {
    this.sendMessage(channel, message);
  }

  commandListener(message) {
    const { instance } = message;
    const { status } = instance;

    switch (status) {
      case ('Creating'):
        this.addNewInstance(instance);
        break;

      case ('Create'):
        this.updateInstance(instance);
        break;

      case ('Starting'):
        this.updateInstance(instance);
        break;

      case ('Start'):
        this.updateInstance(instance);
        break;

      case ('Stopping'):
        this.updateInstance(instance);
        break;
      case ('Stop'):
        this.updateInstance(instance);
        break;

      case ('Deleting'):
        this.updateInstance(instance);
        break;

      case ('Delete'):
        this.updateInstance(instance);
        this.deleteInstance(instance);
        break;

      default:
        break;
    }
  }

  addNewInstance(instance) {
    return this.INSTANCES.push(instance);
  }

  updateStateChange(instance, widget) {
    const { id } = instance;
    const index = this.INSTANCES.findIndex((_instance) => _instance.id === id);

    switch (widget) {
      case 'instance':
        this.INSTANCES[index].showInstance = true;
        break;
      case 'worklog':
        this.INSTANCES[index].showLog = true;
        break;
    }
  }

  updateInstance(instance) {
    const { id } = instance;
    const index = this.INSTANCES.findIndex((_instance) => _instance.id === id);

    return this.INSTANCES[index] = instance;
  }

  deleteInstance(instance) {
    const { id } = instance;
    const index = this.INSTANCES.findIndex((_instance) => _instance.id === id);

    return setTimeout(() => {
      this.INSTANCES.splice(index, 1);
    });
  }
}
