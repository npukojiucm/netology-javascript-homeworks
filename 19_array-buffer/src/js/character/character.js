export default class Character {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.health = 100;
    this.level = 1;
    this.attack = undefined;
    this.defence = undefined;
  }

  setAttack(distance) {
    const validDistance = {
      1: 1,
      2: 0.9,
      3: 0.8,
      4: 0.7,
      5: 0.6,
    };
    if (validDistance[distance]) {
      this.attack *= validDistance[distance];
      return this.attack;
    }
    throw new Error('Out of range');
  }

  getAttack() {
    return this.attack;
  }

  setStoned(distance) {
    this.attack = this.setAttack(distance) - Math.log2(distance) * 5;
    this.attack = Number(this.attack.toFixed());
    return this.attack;
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
