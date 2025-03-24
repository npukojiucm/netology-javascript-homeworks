import GameSavingLoader from '../GameSavingLoader';
import GameSaving from '../GameSaving';
import { expect } from '@jest/globals';

const save = {
  id: 9,
  created: 1546300800,
  userInfo: {
    id: 1,
    name: 'Hitman',
    level: 10,
    points: 2000,
  },
};

test('', () => GameSavingLoader.load()
  .then((data) => {
    expect(data).toBeInstanceOf(GameSaving);
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('created');
    expect(data).toHaveProperty('userInfo');
  }));

test('', () => GameSavingLoader.asyncLoad()
  .then((data) => {
    expect(data).toBeInstanceOf(GameSaving);
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('created');
    expect(data).toHaveProperty('userInfo');
  }));
