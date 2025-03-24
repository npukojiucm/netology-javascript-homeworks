/* eslint-disable func-names */
import goblin from './img/goblin.png';

function getRandomInt() {
  return Math.floor(Math.random() * 16);
}

function createElement() {
  const img = document.createElement('img');
  img.className = 'img';
  img.src = goblin;

  return img;
}

function changeSection() {
  const currentPosition = window.localStorage.getItem('position');
  let nextPosition = getRandomInt();

  while (nextPosition === currentPosition) {
    nextPosition = getRandomInt();
  }

  const sections = document.querySelectorAll('.section');
  const img = createElement();

  sections[currentPosition].firstChild.remove();
  sections[nextPosition].append(img);

  window.localStorage.setItem('position', nextPosition);
}

function start() {
  const startPosition = getRandomInt();
  const img = createElement();
  const sections = document.querySelectorAll('.section');

  window.localStorage.setItem('position', startPosition);

  return sections[startPosition].append(img);
}

start();
setInterval(changeSection, 1500);
