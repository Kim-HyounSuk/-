import { routes } from './constants/routeInfo.js';
import NotFound from './pages/notfound.js';

function Router($container) {
  this.$container = $container;
  let curPage = undefined;

  const findMatchRoute = () => routes.find((route) => route.path.test(location.pathname));

  const route = () => {
    curPage = null;
    const TargetPage = findMatchRoute()?.element || NotFound;
    curPage = new TargetPage(this.$container);
  };

  const init = () => {
    window.addEventListener('historychange', ({ detail }) => {
      const { to, isReplace } = detail;

      if (isReplace || to === location.pathname) {
        history.replaceState(null, '', to);
      } else {
        history.pushState(null, '', to);
      }

      route();
    });

    window.addEventListener('popstate', () => {
      route();
    });
  };

  init();
  route();
}

export default Router;
