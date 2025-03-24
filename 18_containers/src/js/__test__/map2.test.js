import Settings from "../map2";

test('creating an instance of a class, default settings', () => {
  const setting1 = new Settings();
  expect(setting1.setting).toEqual(new Map([
    ['theme', 'dark'],
    ['music', 'trance'],
    ['difficulty', 'easy'],
  ]));
});

test.each([
  {
    id: 1,
    arg: { theme: 'light' },
    expected: new Map([
      ['theme', 'light'],
      ['music', 'trance'],
      ['difficulty', 'easy'],
    ]),
  },
  {
    id: 2,
    arg: { music: 'rock' },
    expected: new Map([
      ['theme', 'dark'],
      ['music', 'rock'],
      ['difficulty', 'easy'],
    ]),
  },
  {
    id: 3,
    arg: { difficulty: 'hard' },
    expected: new Map([
      ['theme', 'dark'],
      ['music', 'trance'],
      ['difficulty', 'hard'],
    ]),
  },
  {
    id: 4,
    arg: {
      difficulty: 'hard',
      theme: 'night',
      music: 'pop',
    },
    expected: new Map([
      ['theme', 'night'],
      ['music', 'pop'],
      ['difficulty', 'hard'],
    ]),
  },
])('creating an instance of a class, user settings - $id', ({ arg, expected }) => {
  const setting2 = new Settings(arg);
  expect(setting2.setting).toEqual(expected);
});
