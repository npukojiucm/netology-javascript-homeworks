import Validator from "../reg";

test.each`
  arg                     | expected
  ${'Oleg123a'}           | ${'Oleg123a'}
  ${'Oleg_123a'}          | ${'Oleg_123a'}
  ${'Oleg-_123_-Kadabra'} | ${'Oleg-_123_-Kadabra'}
`(`Testing the method of the validateUserName class
  return $expected when $arg`, ({ arg, expected }) => {
  const validator = new Validator();
  expect(validator.validateUserName(arg)).toBe(expected);
});

test.each`
  arg                    | expected
  ${'+7900 000 00-00'}   | ${'+79000000000'}
  ${'8-(900)-00-00-000'} | ${'+79000000000'}
  ${'8 900 000 00 00'}   | ${'+79000000000'}
  ${'+86 900 000 00 00'} | ${'+869000000000'}
`(`Testing the method of the validatePhoneNumber class
  return $expected when $arg`, ({ arg, expected }) => {
  const validator = new Validator();
  expect(validator.validatePhoneNumber(arg)).toBe(expected);
});

// Testing exceptions //

test.each`
  arg                        | expected
  ${'Oleg12311'}             | ${/Ошибка формата имени. Имя должно:/}
  ${'Oleg_123a_'}            | ${/Ошибка формата имени. Имя должно:/}
  ${'Oleg-_123_-Kadabra123'} | ${/Ошибка формата имени. Имя должно:/}
`(`Testing the method of the validateUserName class
  return $expected when $arg`, ({ arg, expected }) => {
  const validator = new Validator();
  expect(() => {
    validator.validateUserName(arg);
  }).toThrow(expected);
});
