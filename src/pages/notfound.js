class NotFound {
  constructor($container) {
    this.$container = $container;

    this.init();
  }

  setState() {}

  template() {
    this.$container.innerHTML = `
      <section class="notFoundPage">
        <h2>404 Not Found!</h2>
      </section>
    `;
  }

  init() {
    this.template();
  }
}

export default NotFound;
