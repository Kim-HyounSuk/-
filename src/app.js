import './style.css';
import { BASE_URL } from './constants/routeInfo.js';
import Router from './router.js';
import { navigate } from './utils/navigate.js';

function App($container) {
  this.$container = $container;

  const init = () => {
    document.querySelector('.navBar').addEventListener('click', (e) => {
      const $target = e.target.closest('a');
      if (!$target) return;

      e.preventDefault();
      const targetURL = e.target.href.replace(BASE_URL, '');

      navigate(targetURL);
    });

    new Router($container);
  };

  init();
}

export default App;
