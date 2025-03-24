import ErrorRepository from "../map";

test.each`
  arg  | expected
  ${1} | ${'Key error'}
  ${2} | ${'Value error'}
  ${3} | ${'Syntax error'}
`('testing the translate class method - returns $expected when $arg', ({ arg, expected }) => {
  const error = new ErrorRepository();
  expect(error.translate(arg)).toBe(expected);
});

test.each`
  arg  | expected
  ${0} | ${'Unknown error'}
  ${'a'} | ${'Unknown error'}
  ${{}} | ${'Unknown error'}
`('testing the translate class method, check incorrect value - returns $expected when $arg', ({ arg, expected }) => {
  const error = new ErrorRepository();
  expect(error.translate(arg)).toBe(expected);
});
