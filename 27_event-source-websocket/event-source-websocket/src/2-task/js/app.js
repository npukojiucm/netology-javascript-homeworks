import Instances from './Instances';
import StateManager from './StateManager';
import WorkLog from './WorkLog';

const stateManager = new StateManager('wss://websocket-server-ugmt.onrender.com');
stateManager.setConnect([{
  channel: 'command_response',
  function: stateManager.commandListener,
}]);

const instances = new Instances('.container', stateManager);
instances.init();

const worklog = new WorkLog('.container', stateManager);
worklog.init();
