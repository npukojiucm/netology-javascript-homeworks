// eslint-disable-next-line import/no-extraneous-dependencies
import { test, expect } from '@jest/globals';
import ValidatorCard from '../ValidatorCard';

test.each`
cardNumber               | expected
${'4916604236086017'}    | ${true}
${'4485771178801900'}    | ${true}
${'6011854270513967'}    | ${true}
${'6011448510967792'}    | ${true}
${'36039290664917'}      | ${true}
${'36399427858497'}      | ${true}

${'31572138173454'}      | ${false}
${'32473644983213'}      | ${false}
${'97832432784232'}      | ${false}
${'23847324632742'}      | ${false}
`('checking the Luhn algorithm, method validateCardNumber', ({ cardNumber, expected }) => {
  const validator = ValidatorCard.validateCardNumber(cardNumber);

  expect(validator).toBe(expected);
});

test.each`
cardNumber               | expected
${'4916604236086017'}    | ${'visa'}
${'4485771178801900'}    | ${'visa'}
${'6011854270513967'}    | ${'discover'}
${'6011448510967792'}    | ${'discover'}
${'36039290664917'}      | ${'diners-club'}
${'36399427858497'}      | ${'diners-club'}
`(`
  verification of membership in the payment system
  validatePaymentSystems method
  the payment system returns - $expected, when the card numbers - $cardNumber 
`, ({ cardNumber, expected }) => {
  const validator = ValidatorCard.validatePaymentSystems(cardNumber);

  expect(validator).toBe(expected);
});
