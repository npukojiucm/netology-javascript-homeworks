import Bowman from './Character/TypesCharacter/Bowman';
import Daemon from './Character/TypesCharacter/Daemon';
import Magician from './Character/TypesCharacter/Magician';
import Swordsman from './Character/TypesCharacter/Swordsman';
import Undead from './Character/TypesCharacter/Undead';
import Zombie from './Character/TypesCharacter/Zombie';

export default function createHero(name, type) {
  const heroes = {
    Bowman: {
      create(name, type) {
        return new Bowman(name, type);
      },
    },
    Daemon: {
      create(name, type) {
        return new Daemon(name, type);
      },
    },
    Magician: {
      create(name, type) {
        return new Magician(name, type);
      },
    },
    Swordsman: {
      create(name, type) {
        return new Swordsman(name, type);
      },
    },
    Undead: {
      create(name, type) {
        return new Undead(name, type);
      },
    },
    Zombie: {
      create(name, type) {
        return new Zombie(name, type);
      },
    },
  };
  if (name.length >= 2 && name.length <= 10) {
    if (heroes[type] !== undefined) return heroes[type].create(name, type);
    throw new Error('Неверный тип героя');
  }
  throw new Error('Недопустимая длина имени (min - 2, max - 10');
}
