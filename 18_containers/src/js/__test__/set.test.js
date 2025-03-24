import Team from "../set";

test.each`
  arg       | expected
  ${'Oleg'} | ${new Set(['Oleg'])}
  ${'Ivan'} | ${new Set(['Ivan'])}
  ${'Olya'} | ${new Set(['Olya'])}
`('testing the ADD class method - returns $expected when $arg', ({ arg, expected }) => {
  const team = new Team();
  team.add(arg);
  expect(team.members).toStrictEqual(expected);
});

test.each`
  arg                         | expected
  ${['Oleg', 'Ivan', 'Olya']} | ${new Set(['Oleg', 'Ivan', 'Olya'])}
  ${['Ivan', 'Oleg', 'Olya']} | ${new Set(['Ivan', 'Oleg', 'Olya'])}
  ${['Olya', 'Ivan', 'Oleg']} | ${new Set(['Olya', 'Ivan', 'Oleg'])}
`('testing the ADDALL class method - returns $expected when $arg', ({ arg, expected }) => {
  const team = new Team();
  team.addAll(arg);
  expect(team.members).toStrictEqual(expected);
});

test.each`
  arg                         | expected
  ${['Oleg', 'Ivan', 'Olya']} | ${['Oleg', 'Ivan', 'Olya']}
  ${['Ivan', 'Oleg', 'Olya']} | ${['Ivan', 'Oleg', 'Olya']}
  ${['Olya', 'Ivan', 'Oleg']} | ${['Olya', 'Ivan', 'Oleg']}
`('testing the TOARRAY class method - converting this.members -> array, $expected when $arg', ({ arg, expected }) => {
  const team = new Team();
  team.addAll(arg);
  team.toArray();
  expect(team.members).toStrictEqual(expected);
});

// Testing exceptions //

test.each`
  arg       | expected
  ${'Oleg'} | ${/^This player is already a member of the team$/}
  ${'Ivan'} | ${/^This player is already a member of the team$/}
  ${'Olya'} | ${/^This player is already a member of the team$/}
`('Testing exceptions the ADD class method - returns $expected when $arg', ({ arg, expected }) => {
  const team = new Team();
  team.add(arg);
  expect(() => {
    team.add(arg);
  }).toThrow(expected);
});
