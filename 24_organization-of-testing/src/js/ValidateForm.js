import ValidatorCard from './ValidatorCard';

export default class ValdiateForm {
  constructor(form) {
    this.form = document.getElementById(form);
    this.input = this.form.querySelector('input');
    this.btn = this.form.querySelector('button');

    this.activeCardIcon = null;

    this.onBtnClick = this.onBtnClick.bind(this);
    this.btn.addEventListener('click', this.onBtnClick);

    this.onInputInput = this.onInputInput.bind(this);
    this.input.addEventListener('input', this.onInputInput);
  }

  onBtnClick(event) {
    let response;
    event.preventDefault();

    const countNumber = new Set([13, 15, 16, 18, 19]);
    const cardNumber = this.input.value;

    if (!countNumber.has(cardNumber.length)) {
      response = `
        <p>
          Номер карты должен содержать 13, 15, 16, 18 или 19 цифр
        </p>`;
    }

    if (countNumber.has(cardNumber.length) && ValidatorCard.validateCardNumber(cardNumber)) {
      response = `
        <p>
            Номер карты ${cardNumber} валидный
        </p>`;
    }

    if (countNumber.has(cardNumber.length) && !ValidatorCard.validateCardNumber(cardNumber)) {
      response = `
        <p>
            Номер карты ${cardNumber} невалидный
        </p>`;
    }

    return this.form.insertAdjacentHTML('afterend', response);
  }

  onInputInput() {
    const cardNumber = this.input.value;
    const paymentSystem = ValidatorCard.validatePaymentSystems(cardNumber);

    if (this.activeCardIcon) {
      this.activeCardIcon.classList.add('non-visible');
    }

    if (paymentSystem) {
      this.activeCardIcon = document.getElementById(paymentSystem);
      this.activeCardIcon.classList.remove('non-visible');
    }
  }
}
