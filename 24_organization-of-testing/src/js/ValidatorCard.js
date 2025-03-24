import { paymentSystems } from './PaymentSystems';

export default class ValidatorCard {
  static validateCardNumber(stringCardNumber) {
    const cardNumber = stringCardNumber.split('').map(Number);

    const sumDigit = cardNumber.reduce((acc, curValue, index) => {
      let value = curValue;

      if (index % 2 === 0) {
        value = curValue * 2;
        value = value < 9 ? value : value - 9;
      }

      return acc + value;
    }, 0);

    return sumDigit % 10 === 0;
  }

  static validatePaymentSystems(stringCardNumber) {
    const oneDigitID = stringCardNumber.slice(0, 1);
    const twoDigitID = stringCardNumber.slice(0, 2);

    return paymentSystems[oneDigitID] ?? paymentSystems[twoDigitID];
  }
}
