import Card from './Card.js';

const CardList = ($parent, items) => {
  let $cardList = $parent.querySelector('.cardList');
  if ($cardList) {
    if (items) {
      items.forEach((item) => {
        $cardList.appendChild(Card(item));
      });
    }
  } else {
    $cardList = document.createElement('div');
    $cardList.classList.add('cardList');

    if (!items) {
      $cardList.style.display = 'block';
      $cardList.style.textAlign = 'center';
      $cardList.style.fontSize = '2rem';
      $cardList.textContent = '조건에 맞는 아이들이 없어요.';
    } else {
      items.forEach((item) => {
        $cardList.appendChild(Card(item));
      });
    }

    $parent.appendChild($cardList);
  }
};

export default CardList;
