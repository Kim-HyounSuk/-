import { fetchData } from '../api/fetchData.js';
import { getExpirationDate } from '../utils/utils.js';
import CardList from './CardList.js';
import Spinner from './Spinner.js';

class PageNation {
  constructor($parent) {
    this.$parent = $parent;
    this.page = 1;
    this.isLoading = false;
    this.numOfRows = 3;
    this.totalCount = 0;
    this.numOfPages = 3;
    this.totalPages = 1;
    this.curPageGroup = 1;

    this.init();
  }

  template() {
    const $pageNation = document.createElement('div');
    $pageNation.classList.add('pageNation');

    $pageNation.innerHTML = `
      <button class='prevBtn'>이전</button>
      <div class='pageContents'></div>
      <button class='nextBtn'>다음</button>
    `;

    this.$parent.appendChild($pageNation);

    this.$pageContents = $pageNation.querySelector('.pageContents');
    this.$prevBtn = $pageNation.querySelector('.prevBtn');
    this.$nextBtn = $pageNation.querySelector('.nextBtn');

    this.$prevBtn.addEventListener('click', this.handlePrevBtn.bind(this));
    this.$nextBtn.addEventListener('click', this.handleNextBtn.bind(this));
  }

  async renderCardList() {
    if (this.isLoading) return;
    this.isLoading = true;
    this.$parent.querySelector('.cardList')?.remove();
    this.$spinner = new Spinner(this.$parent);

    try {
      const data = await fetchData({
        pathname: '/abandonmentPublic',
        state: 'notice',
        endde: getExpirationDate(),
        pageNo: this.page,
        numOfRows: this.numOfRows,
      });

      this.totalCount = data.response.body.totalCount;
      this.totalPages = Math.ceil(this.totalCount / this.numOfRows);

      const items = data.response.body.items.item;

      CardList(this.$parent, items);
    } catch (err) {
      console.error(err);
    } finally {
      this.isLoading = false;
      this.$spinner.remove();
      this.renderNumOfPages();
    }
  }

  renderNumOfPages() {
    const startPage = (this.curPageGroup - 1) * this.numOfPages + 1;
    const endPage = Math.min(startPage + this.numOfPages - 1, this.totalPages);

    this.$pageContents.innerHTML = ``;

    for (let i = startPage; i <= endPage; i++) {
      const $span = document.createElement('button');

      $span.textContent = i;
      $span.classList.add('page-num');

      if (i === this.page) {
        $span.classList.add('cur-page');
      }

      $span.addEventListener('click', () => {
        this.page = i;
        this.renderCardList();
      });
      this.$pageContents.appendChild($span);
    }

    this.$prevBtn.disabled = this.curPageGroup === 1;
    this.$nextBtn.disabled = endPage === this.totalPages;
  }

  handleResize() {
    const query992 = window.matchMedia('(max-width: 992px)');
    const query512 = window.matchMedia('(max-width: 512px)');

    const updateNumOfRows = () => {
      let newNumOfRows;

      if (query512.matches) {
        newNumOfRows = 1;
      } else if (query992.matches) {
        newNumOfRows = 2;
      } else {
        newNumOfRows = 3;
      }

      if (this.numOfRows !== newNumOfRows) {
        this.numOfRows = newNumOfRows;
        this.renderCardList();
      }
    };

    query512.addEventListener('change', updateNumOfRows);
    query992.addEventListener('change', updateNumOfRows);

    updateNumOfRows();
  }

  handlePrevBtn() {
    if (this.curPageGroup > 1) {
      this.curPageGroup--;
      this.renderNumOfPages();
    }
  }

  handleNextBtn() {
    const maxPageGroup = Math.ceil(this.totalPages / this.numOfPages);
    if (this.curPageGroup < maxPageGroup) {
      this.curPageGroup++;
      this.renderNumOfPages();
    }
  }

  async init() {
    this.template();
    this.handleResize();
    await this.renderCardList();
    this.renderNumOfPages();
  }
}

export default PageNation;
