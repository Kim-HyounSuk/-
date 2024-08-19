import { transDateForm } from '../utils/utils.js';
import Map from './Map.js';

class Modal {
  constructor(item) {
    this.item = item;

    this.init();
  }

  templete() {
    const sexCd =
      this.item.sexCd === 'M'
        ? `<i class="fa-solid fa-mars" style='color:blue;'></i>`
        : `<i class="fa-solid fa-venus" style='color:red;'></i>`;
    const kindCd =
      this.item.kindCd.substring(0, 3) === '[개]'
        ? `<i class="fa-solid fa-dog"></i><span>[${this.item.kindCd.substring(4)}]</span>`
        : `<i class="fa-solid fa-cat"></i><span>[${this.item.kindCd.substring(5)}]</span>`;
    const noticeSdt = transDateForm(this.item.noticeSdt);
    const noticeEdt = transDateForm(this.item.noticeEdt);
    const happenDt = transDateForm(this.item.happenDt, ['년 ', '월 ', '일 ']);

    const modalWrap = document.createElement('div');
    modalWrap.classList.add('modalWrap');

    modalWrap.innerHTML = `
      <div class='modal'>
        <button class='closeBtn'>닫기</button>
        <div class='modalTop'>
          <div class='modalTitle'>
            <span>${this.item.noticeNo}</span>
            <h2>${kindCd}</h2>
            <span>보호기간:</span>
            <span>${noticeSdt} ~ ${noticeEdt}</span>
          </div>
          <div class='modalMd'>
            <div class='imgWrap'>
              <img src=${this.item.popfile} />
            </div>
            <div class='modalContents'>
              <span>품종</span>
              <span>${kindCd}</span>
              <span>성별</span>
              <span>${sexCd}</span>
              <span>나이</span>
              <span>${this.item.age}</span>
              <span>색상</span>
              <span>${this.item.colorCd}</span>
              <span>체중</span>
              <span>${this.item.weight}</span>
              <span>상태</span>
              <span>${this.item.processState}</span>
              <span>접수일시</span>
              <span>${happenDt}</span>
              <span>발견장소</span>
              <span>${this.item.happenPlace}</span>
              <span>보호센터</span>
              <span>${this.item.careNm}</span>
              <span class='no-before'></span>
              <span>${this.item.careAddr}</span>
              <span class='no-before'></span>
              <span>${this.item.careTel}</span>
              <span>담당자</span>
              <span>${this.item.chargeNm}</span>
              <span class='no-before'></span>
              <span>${this.item.officetel}</span>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modalWrap);

    this.$modalWrap = modalWrap;
    this.$modal = modalWrap.querySelector('.modal');
    this.$closeBtn = modalWrap.querySelector('.closeBtn');
  }

  openModal() {
    requestAnimationFrame(() => {
      this.$modalWrap.classList.add('show');
    });
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.$modalWrap.classList.remove('show');
    setTimeout(() => {
      this.$modalWrap.remove();
      document.body.style.overflow = 'auto';
    }, 300);
  }

  bindEvent() {
    this.$closeBtn.addEventListener('click', this.closeModal.bind(this));
    this.$modalWrap.addEventListener('click', (e) => {
      if (e.target === this.$modalWrap) this.closeModal();
    });
  }

  init() {
    this.templete();
    this.openModal();
    this.bindEvent();
    new Map(this.$modal, { address: this.item.careAddr, info: this.item.careNm });
  }
}

export default Modal;
