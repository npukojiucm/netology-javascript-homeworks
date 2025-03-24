/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

export default class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;

    this.changeInterval = null;
  }

  init() {
    this.gamePlay.start();
    this.addEventClik();
    this.changeInterval = setInterval(this.gamePlay.changeImgSection, 1000);
  }

  onImgClick(event) {
    const section = event.target.closest('.section');

    if (event.target.className === 'img') {
      event.target.remove();

      this.changeBackground(section, 'green');

      this.gamePlay.spanContentWin.textContent = +this.gamePlay.spanContentWin.textContent + 1;
    } else {
      this.gamePlay.spanContentLoss.textContent = +this.gamePlay.spanContentLoss.textContent + 1;

      this.changeBackground(section, 'red');
    }

    if (+this.gamePlay.spanContentLoss.textContent === 5) {
      alert('Конец игры!');

      clearInterval(this.changeInterval);
    }
  }

  addEventClik() {
    const container = document.querySelector('.container');

    return container.addEventListener('click', (e) => this.onImgClick(e));
  }

  changeBackground(tag, color, color2 = 'white') {
    const backgroundGreen = setInterval(() => {
      tag.style.background = color;
    }, 45);

    const backgroundWhite = setInterval(() => {
      tag.style.background = color2;
    }, 100);

    const clearBackground = setTimeout(() => {
      clearInterval(backgroundGreen);
      clearInterval(backgroundWhite);
    }, 200);

    return clearBackground;
  }
}
