export default class Character {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.health = 100;
    this.level = 1;
    this.attack = undefined;
    this.defence = undefined;
  }

  levelUp() {
    if (this.health > 0) {
      this.level += 1;
      this.health = 100;
      this.attack += (this.attack * 0.2);
      this.defence += (this.defence * 0.2);
      return;
    }
    throw new Error('Нельзя повысить уровень умершего');
  }

  damage(points) {
    if (this.health >= 0) {
      this.health -= points * (1 - this.defence / 100);
      return this.health;
    }
    throw new Error('Герой мёртв. Нельз нанести урон');
  }
}
