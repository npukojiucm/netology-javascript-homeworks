import { expect, test } from '@jest/globals';
import sortHeroesHealth from '../task2.js';

test.each([
  {
    heroesObj: [
      { name: 'мечник', health: 10 },
      { name: 'маг', health: 100 },
      { name: 'лучник', health: 80 },
    ],
    expected: [
      { name: 'маг', health: 100 },
      { name: 'лучник', health: 80 },
      { name: 'мечник', health: 10 },
    ],
  },
  {
    heroesObj: [
      { name: 'мечник', health: 42 },
      { name: 'маг', health: 19 },
      { name: 'лучник', health: 93 },
    ],
    expected: [
      { name: 'лучник', health: 93 },
      { name: 'мечник', health: 42 },
      { name: 'маг', health: 19 },
    ],
  },
])('Тест сортировки %s', ({ heroesObj, expected }) => {
  const result = sortHeroesHealth(heroesObj);
  expect(result).toEqual(expected);
});
