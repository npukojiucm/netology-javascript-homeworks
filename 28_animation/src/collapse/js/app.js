const btn = document.querySelector('.collapse-btn');
const text = document.querySelector('.collapse-item');

btn.addEventListener('click', (e) => {
  text.classList.toggle('active');
});
