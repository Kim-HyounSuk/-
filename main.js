import App from './src/app.js';

const $app = document.querySelector('#app');
const $nav = document.querySelector('.menu');
const $toTopBtn = document.querySelector('.toTopBtn');

$nav.addEventListener('click', (e) => {
  const $a = e.target.closest('a');
  if (!$a) return;

  const $isActive = $nav.querySelector('a.active');
  if ($isActive) {
    $isActive.classList.remove('active');
  }

  $a.classList.add('active');
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    $toTopBtn.classList.add('on');
  } else {
    $toTopBtn.classList.remove('on');
  }
});

$toTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

new App($app);
