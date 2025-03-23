import createHero from '../createHero';

test.each([
  {name: 'alex', type: 'Bowman', health: 100, level: 1, attack: 25, defence: 25 },
  {name: 'alex', type: 'Daemon', health: 100, level: 1, attack: 10, defence: 40 },
  {name: 'alex', type: 'Magician', health: 100, level: 1, attack: 10, defence: 40 },
  {name: 'alex', type: 'Swordsman', health: 100, level: 1, attack: 40, defence: 10 },
  {name: 'alex', type: 'Undead',  health: 100, level: 1, attack: 25, defence: 25 },
  {name: 'alex', type: 'Zombie',  health: 100, level: 1, attack: 40, defence: 10 }
])('creating a new instance of the class', ({ name, type, health, level, attack, defence}) => {
  const heroes = createHero(name, type);
  expect(heroes.name).toBe(name);
  expect(heroes.type).toBe(type);
  expect(heroes.health).toBe(health)
  expect(heroes.level).toBe(level);
  expect(heroes.attack).toBe(attack);
  expect(heroes.defence).toBe(defence);
});

test.each([
  { name: 'alex', type: 'Bowman', health: 100, level: 2, attack: 25, defence: 25 },
  { name: 'alex', type: 'Daemon', health: 100, level: 2, attack: 10, defence: 40 },
  { name: 'alex', type: 'Magician', health: 100, level: 2, attack: 10, defence: 40 },
  { name: 'alex', type: 'Swordsman', health: 100, level: 2, attack: 40, defence: 10 },
  { name: 'alex', type: 'Undead',  health: 100, level: 2, attack: 25, defence: 25 },
  { name: 'alex', type: 'Zombie',  health: 100, level: 2, attack: 40, defence: 10 }
])('testing the method levelUp()', ({ name, type, health, level, attack, defence }) => {
  const heroes = createHero(name, type);
  heroes.levelUp();
  expect(heroes.health).toBe(health)
  expect(heroes.level).toBe(level);
  expect(heroes.attack).toBe(attack + (attack * 0.2));
  expect(heroes.defence).toBe(defence + (defence * 0.2));
});

test('checking method exceptions levelUp() - "it is impossible to raise the level of the deceased" ', () =>
{
  const heroes = createHero('Alex', 'Bowman');
  heroes.health = 0;
  
  function check() {
    heroes.levelUp();
  }

  expect(check).toThrow('Нельзя повысить уровень умершего');
});

test.each([
  { name: 'alex', type: 'Bowman', health: 100, defence: 25, point: 50},
  { name: 'alex', type: 'Daemon', health: 100, defence: 40, point: 50,},
  { name: 'alex', type: 'Magician', health: 100, defence: 40, point: 50,},
  { name: 'alex', type: 'Swordsman', health: 100, defence: 10, point: 50,},
  { name: 'alex', type: 'Undead',  health: 100, defence: 25, point: 50,},
  { name: 'alex', type: 'Zombie',  health: 100, defence: 10, point: 50,},
])('testing the method damage(point)', ({ name, type, health, defence, point}) => {
  const heroes = createHero(name, type);
  heroes.damage(point);
  const damageHealth = health - (point * (1 - defence / 100));
  expect(heroes.health).toBe(damageHealth);
});

test('checking method exceptions damage(point) - "It is impossible to deal damage to the dead" ', () =>
{
  const heroes = createHero('Alex', 'Bowman');
  heroes.health = -1;
  
  function check() {
    heroes.damage(50);
  }

  expect(check).toThrow('Герой мёртв. Нельз нанести урон');
});

test('test create new Error, length name < 2', () => {
  function check() {
    createHero('1', 'Bowman')
  }
  expect(check).toThrow('Недопустимая длина имени (min - 2, max - 10');
});

test('test create new Error, length name > 10', () => {
  function check() {
    createHero('012345678910', 'Bowman')
  }
  expect(check).toThrow('Недопустимая длина имени (min - 2, max - 10');
});

test('test create new Error, wrong type of hero', () => {
  function check() {
    createHero('Alex', 'BowmanB')
  }
  expect(check).toThrow('Неверный тип героя');
});
