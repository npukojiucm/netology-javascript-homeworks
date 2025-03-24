/* eslint-disable class-methods-use-this */
import goblin from '../img/goblin.png';

export default class GamePlay {
  constructor() {
    this.currentPosition = undefined;
    this.nextPosition = undefined;

    this.img = undefined;
    this.sections = document.querySelectorAll('.section');

    this.spanContentWin = document.querySelector('.content-win');
    this.spanContentLoss = document.querySelector('.content-loss');

    this.changeImgSection = this.changeImgSection.bind(this);
  }

  getRandomInt() {
    return Math.floor(Math.random() * 16);
  }

  createImgElement() {
    const img = document.createElement('img');

    img.className = 'img';
    img.src = goblin;

    return img;
  }

  changeImgSection() {
    this.nextPosition = this.getRandomInt();

    while (this.nextPosition === this.currentPosition) {
      this.nextPosition = this.getRandomInt();
    }

    if (this.sections[this.currentPosition].firstChild) {
      this.sections[this.currentPosition].firstChild.remove();
    }

    this.sections[this.nextPosition].append(this.img);

    this.currentPosition = this.nextPosition;
  }

  start() {
    this.currentPosition = this.getRandomInt();
    this.img = this.createImgElement();

    this.spanContentLoss.textContent = 0;
    this.spanContentWin.textContent = 0;

    return this.sections[this.currentPosition].append(this.img);
  }
}
