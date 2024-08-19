import PageNation from '../components/Pagenation.js';
import Selectors from '../components/Selectors.js';

class Main {
  constructor($container) {
    this.$container = $container;

    this.init();
  }

  setState() {}

  template() {
    this.$container.innerHTML = `
      <article class="mainBn">
        <div class="bnWrap">
          <h2>
            <span>One More Friend</span>
            <span>Thousands More Fun!</span>
          </h2>
          <div class="imgWrap">
            <img src="/img/puppies.png" alt="puppies" />
          </div>
        </div>
      </article>
      <section class="mpage sec01">
        <h2>[오래된 아이들] <span style='color:#f4b3c2;'>빨리</span> 데려가세요!</h2>
      </section>
      <section class="mpage sec02">
        <h2>많은 친구들이 <span style='color:#f4b3c2;'>엄마</span>, <span style='color:#a1dbf6;'>아빠</span>를 구해요!</h2>
      </section>
    `;

    this.$sec01 = this.$container.querySelector('.sec01');
    this.$sec02 = this.$container.querySelector('.sec02');
  }

  insertElement() {
    new PageNation(this.$sec01);
    new Selectors(this.$sec02);
  }

  init() {
    this.template();
    this.insertElement();
  }
}

export default Main;
