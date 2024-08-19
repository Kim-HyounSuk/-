import { transDateForm } from '../utils/utils.js';
import Modal from './Modal.js';

const Card = (item) => {
  const sexCd =
    item.sexCd === 'M'
      ? `<i class="fa-solid fa-mars" style='color:blue;'></i>`
      : `<i class="fa-solid fa-venus" style='color:red;'></i>`;
  const kindCd =
    item.kindCd.substring(0, 3) === '[개]'
      ? `<i class="fa-solid fa-dog"></i><span>[${item.kindCd.substring(4)}]</span>`
      : item.kindCd.substring(0, 5) === '[고양이]'
      ? `<i class="fa-solid fa-cat"></i><span>[${item.kindCd.substring(5)}]</span>`
      : item.kindCd;
  const noticeSdt = transDateForm(item.noticeSdt);
  const noticeEdt = transDateForm(item.noticeEdt);

  const $card = document.createElement('div');
  $card.classList.add('card');

  $card.innerHTML = `
      <div class='imgWrap'>
        <img src='${item.popfile}' alt='' />
      </div>
      <div class='cardContent'>
        <div>
          ${kindCd}
          ${sexCd}
          <span>${item.happenDt}</span>
        </div>
        <div>
          <span>${item.noticeNo}</span>
        </div>
        <div>
          <i class="fa-solid fa-location-dot"></i>
          <span>${item.careAddr}</span>
        </div>
        <div>
          <i class="fa-regular fa-calendar"></i>
          <span>${noticeSdt} ~ ${noticeEdt}</span>
        </div>
      </div>
  `;

  $card.addEventListener('click', (e) => {
    e.stopPropagation();

    new Modal(item);
  });

  return $card;
};

export default Card;
