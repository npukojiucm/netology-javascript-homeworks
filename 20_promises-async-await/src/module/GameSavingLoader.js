import json from './parser';
import read from './reader';
import GameSaving from './GameSaving';

export default class GameSavingLoader {
  static load() {
    return read()
      .then((data) => json(data))
      .then((saving) => new GameSaving(JSON.parse(saving)));
  }

  static async asyncLoad() {
    try {
      const file = await read();
      const hero = await json(file);
      return new GameSaving(JSON.parse(hero));
    } catch (err) { return err; }
  }
}
