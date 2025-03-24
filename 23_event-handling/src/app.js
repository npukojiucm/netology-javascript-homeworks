import GameController from './js/GameController';
import GamePlay from './js/GamePlay';

const gamePlay = new GamePlay();
const gameCtrl = new GameController(gamePlay);

gameCtrl.init();
