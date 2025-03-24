import Daemon from '../daemon';

test('creating an instance of a class', () => {
  const daemon = new Daemon('Daemon', 'Daemon');
  expect(daemon).toBeInstanceOf(Daemon);
});

test.each`
arg  | expected
${1} | ${100}
${2} | ${90}
${3} | ${80}
${4} | ${70}
${5} | ${60}
`('test method setAttack', ({ arg, expected }) => {
  const daemon = new Daemon('Daemon', 'Daemon');
  daemon.attack = 100;
  daemon.setAttack(arg);
  expect(daemon.getAttack()).toBe(expected);
});

test('test method setStoned', () => {
  const daemon = new Daemon('Daemon', 'Daemon');
  daemon.attack = 100;
  expect(daemon.setStoned(2)).toBe(85);
});

// Testing exceptions //

test.each`
  arg       | expected
  ${6} | ${/^Out of range$/}
  ${7} | ${/^Out of range$/}
  ${8} | ${/^Out of range$/}
`('Testing exceptions the setAttack class method - returns $expected when $arg', ({ arg, expected }) => {
  const daemon = new Daemon('Daemon', 'Daemon');
  expect(() => {
    daemon.setAttack(arg);
  }).toThrow(expected);
});
