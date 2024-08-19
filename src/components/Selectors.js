import { fetchData } from '../api/fetchData.js';
import setIntersectionObserver from '../utils/intersectionObserver.js';
import CardList from './CardList.js';
import Spinner from './Spinner.js';

class Selectors {
  constructor($parent) {
    this.$parent = $parent;
    this.page = 1;
    this.numOfRows = 6;
    this.isLoading = false;

    this.template();
    this.init();
  }

  template() {
    const $selectors = document.createElement('form');
    $selectors.classList.add('selectors');

    $selectors.innerHTML = `
      <div class='selectWrap'>
        <select class='sido'>
          <option value='' checked>시 / 도</option>
        </select>
      </div>
      <div class='selectWrap'>
        <select class='sigungu'>
          <option value='' checked>시 / 군/ 구</option>
        </select>
      </div>
      <div class='selectWrap'>
        <select class='shelter'>
          <option value='' checked>보호소</option>
        </select>
      </div>
      <div class='selectWrap'>
        <select class='dog-cat'>
          <option value='' checked>강아지 / 고양이</option>
          <option value='417000'>강아지</option>
          <option value='422400'>고양이</option>
        </select>
      </div>
      <div class='selectWrap'>
        <select class='kind'>
          <option value='' checked>품종</option>
        </select>
      </div>
      <button type='submit'>조회</button>
    `;

    this.$parent.appendChild($selectors);

    this.$selectors = $selectors;
    this.$sido = $selectors.querySelector('.sido');
    this.$sigungu = $selectors.querySelector('.sigungu');
    this.$shelter = $selectors.querySelector('.shelter');
    this.$dogCat = $selectors.querySelector('.dog-cat');
    this.$kind = $selectors.querySelector('.kind');
    this.$submitBtn = $selectors.querySelector('button');
  }

  clearOptions($target) {
    if ($target === this.$sigungu) {
      $target.innerHTML = `<option value='' checked>시/군/구</option>`;
    }
    if ($target === this.$shelter) {
      $target.innerHTML = `<option value='' checked>보호소</option>`;
    }
    if ($target === this.$kind) {
      $target.innerHTML = `<option value='' checked>품종</option>`;
    }
  }

  async getOptions($target, { pathname, sido, up_kind_cd, sigungu } = {}) {
    const data = await fetchData({ pathname, sido, up_kind_cd, sigungu });
    const items = data.response.body.items.item;
    if (!items) return;

    this.clearOptions($target);

    const fragment = document.createDocumentFragment();

    items.forEach((item) => {
      const $option = document.createElement('option');
      if (up_kind_cd) {
        $option.value = item.kindCd;
        $option.textContent = item.knm;
      } else if (sido && sigungu) {
        $option.value = item.careRegNo;
        $option.textContent = item.careNm;
      } else {
        $option.value = item.orgCd;
        $option.textContent = item.orgdownNm;
      }
      fragment.appendChild($option);
    });

    $target.appendChild(fragment);
  }

  async handleSidoChange(e) {
    const sido = e.target.value;
    this.clearOptions(this.$sigungu);
    if (sido) {
      await this.getOptions(this.$sigungu, { pathname: '/sigungu', sido });
    }
  }

  async handleDogCatChange(e) {
    const dogCat = e.target.value;
    this.clearOptions(this.$kind);
    if (dogCat) {
      await this.getOptions(this.$kind, { pathname: '/kind', up_kind_cd: dogCat });
    }
  }

  async handleSigunguChage(e) {
    const sigungu = e.target.value;
    const sido = this.$sido.value;

    this.clearOptions(this.$shelter);
    if (sigungu) {
      await this.getOptions(this.$shelter, { pathname: '/shelter', sido, sigungu });
    }
  }

  async renderCardList() {
    if (this.isLoading) return;
    this.isLoading = true;
    this.$spinner = new Spinner(this.$parent);

    try {
      if (this.page === 1) {
        this.$parent.querySelector('.cardList')?.remove();
      }

      const data = await fetchData({
        pathname: '/abandonmentPublic',
        upkind: this.$dogCat.value,
        kind: this.$kind.value,
        upr_cd: this.$sido.value,
        org_cd: this.$sigungu.value,
        pageNo: this.page,
        numOfRows: this.numOfRows,
        care_reg_no: this.$shelter.value,
      });

      const items = data.response.body.items.item;

      CardList(this.$parent, items);
      this.page += 1;
    } catch (err) {
      console.error(err);
    } finally {
      this.isLoading = false;
      this.$spinner.remove();
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    this.page = 1;

    await this.renderCardList();
    setIntersectionObserver(this.renderCardList.bind(this), this.$parent);
  }

  bindEvents() {
    this.$sido.addEventListener('change', this.handleSidoChange.bind(this));
    this.$dogCat.addEventListener('change', this.handleDogCatChange.bind(this));
    this.$sigungu.addEventListener('change', this.handleSigunguChage.bind(this));
    this.$selectors.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async init() {
    await this.getOptions(this.$sido, { pathname: '/sido' });
    this.bindEvents();
    await this.renderCardList();
    setIntersectionObserver(this.renderCardList.bind(this), this.$parent);
  }
}

export default Selectors;
