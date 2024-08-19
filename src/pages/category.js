import Selectors from '../components/Selectors.js';

class Category {
  constructor($container) {
    this.$container = $container;

    this.init();
  }

  setState() {}

  template() {
    this.$container.innerHTML = `
      <section class="cpage sec01">
        <h2>많은 친구들이 <span style='color:#f4b3c2;'>엄마</span>, <span style='color:#a1dbf6;'>아빠</span>를 구해요!</h2>
      </section>
    `;

    this.$sec01 = this.$container.querySelector('.sec01');
  }

  insertElement() {
    new Selectors(this.$sec01);
  }

  init() {
    this.template();
    this.insertElement();
  }
}

export default Category;
