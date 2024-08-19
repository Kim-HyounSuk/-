const setIntersectionObserver = (callback, $parent) => {
  const options = {
    root: null,
    rootMargin: '16px',
    threshold: 1.0,
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        await callback();
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, options);

  const $target = document.createElement('div');
  $parent.appendChild($target);
  observer.observe($target);
};

export default setIntersectionObserver;
