import { getData } from './serviceData.js';
const createItemPagination = (hrefLink, textContent, active) => {
  const li = document.createElement('li');
  li.classList.add('pagination__item');
  const a = document.createElement('a');
  a.classList.add('pagination__link');
  a.textContent = textContent;
  a.href = hrefLink;
  if (active) {
    a.classList.add('pagination__link--active');
  }
  li.append(a);
  return li;
};
export const pagination = (wrapper, pages, page, count) => {
	const paginationList = document.createElement('ul');
	paginationList.classList.add('pagination__list');
  const isNotStart = page - Math.floor(count / 2) > 1;
  const isEnd = page + Math.floor(count / 2) > pages;

  if (count > pages) {
    count = pages;
  }

	for (let i = 0; i < count; i++) {
		let n = i + 1;
    if (isNotStart) {
      if (isEnd) {
        n = pages - count + i + 1;
      }else {
        n = page - Math.floor(count / 2) + i;
      }
    }
		const li = createItemPagination(`index.html?page=${n}`, n, page === n);
    paginationList.append(li);
	}
  const firstItem = document.createElement('a');
  firstItem.classList.add('pagination__arrow', 'pagination__arrow--start');
  firstItem.innerHTML = `
    <svg width="25" height="11" viewBox="0 0 25 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.94687 10.7852L0.913671 6.08789V4.98438L9.94687 0.287109V1.625L2.43711 5.53125L9.94687 9.44727V10.7852ZM24.018 10.7852L14.9848 6.08789V4.98438L24.018 0.287109V1.625L16.5082 5.53125L24.018 9.44727V10.7852Z" fill="currentColor"/>
    </svg>
  `;
  firstItem.href = isNotStart ? 'pets.html' : '';
  const prevItem = document.createElement('a');
  prevItem.classList.add('pagination__arrow', 'pagination__arrow--prev');
  prevItem.innerHTML = `
    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.98242 10.7852L0.949219 6.08789V4.98438L9.98242 0.287109V1.625L2.47266 5.53125L9.98242 9.44727V10.7852Z" fill="currentColor"/>
    </svg>
  `;
  const nextItem = document.createElement('a');
  nextItem.classList.add('pagination__arrow', 'pagination__arrow--next');
  nextItem.innerHTML = `
    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.04102 6.08789L0.0078125 10.7852V9.44727L7.51758 5.53125L0.0078125 1.625V0.287109L9.04102 4.98438V6.08789Z" fill="currentColor"/>
    </svg>
  `;
  const endItem = document.createElement('a');
	endItem.classList.add('pagination__arrow', 'pagination__arrow--end');
  endItem.innerHTML = `
    <svg width="25" height="11" viewBox="0 0 25 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.0055 6.08789L0.972265 10.7852V9.44727L8.48203 5.53125L0.972265 1.625V0.287109L10.0055 4.98438V6.08789ZM24.0766 6.08789L15.0434 10.7852V9.44727L22.5531 5.53125L15.0434 1.625V0.287109L24.0766 4.98438V6.08789Z" fill="currentColor"/>
    </svg>
  `;
  endItem.href = isEnd ? '' : `pets.html?page=${pages}`;
	wrapper.append(firstItem, prevItem, paginationList, nextItem, endItem);

  // const petsIndexes = get48();
	// let currentIndex = 0;
	// let currentPage;
	// let currentCardNum;

	// const MAX_CARDS = 48;
	// const btnFirst = document.querySelector('.pagination__arrow--start');
	// const btnPrev = document.querySelector('.pagination__arrow--prev');
	// const pgNumber = document.querySelector('pagination__link--active');
	// const btnNext = document.querySelector('.pagination__arrow--next');
	// const btnLast = document.querySelector('.pagination__arrow--end');

	// function shuffle(array) {
	// 	for (let i = array.length - 1; i > 0; i--) {
	// 		let j = Math.floor(Math.random() * (i + 1));
	// 		[array[i], array[j]] = [array[j], array[i]];
	// 	}
	// }

	// function getRandomArray(size) {
	// 	const arr = Array(size)
	// 		.fill()
	// 		.map((el, i) => (el = i));
	// 	shuffle(arr);
	// 	return arr;
	// }

	// function get48() {
	// 	let a6 = [],
	// 		a8 = [],
	// 		a48 = [];

	// 	while (a48.length !== 48) {
	// 		let index = 0;

	// 		if (a6.length === 6) a48.push(...a6.splice(0));
	// 		if (a8.length === 0) a8 = getRandomArray(8);
	// 		while (a6.includes(a8[index])) index++;

	// 		a6.push(...a8.splice(index, 1));
	// 	}

	// 	return a48;
	// }

	// function showPage() {
	// 	const cards = document.querySelectorAll('.our-friends__item');

	// 	currentPage = Math.floor(currentIndex / currentCardNum);
	// 	currentIndex = currentPage * currentCardNum;

	// 	for (let i = 0; i < currentCardNum; i++) {
	// 		let petData = getData[petsIndexes[currentIndex + i]];
  //     console.log(cards);

	// 		cards[i]
	// 			.querySelector('.our-friends__img')
	// 			.setAttribute('src', getData.img);
	// 		cards[i]
	// 			.querySelector('.our-friends__img')
	// 			.setAttribute('alt', getData.alt);
	// 		cards[i].querySelector('.our-friends__subtitle').textContent =
	// 			getData.name;
	// 		cards[i].dataset.petindex = petsIndexes[currentIndex + i];
	// 	}

	// 	// Enable/Disable buttons, Refresh page number
	// 	btnFirst.removeAttribute('disabled');
	// 	btnPrev.removeAttribute('disabled');
	// 	btnNext.removeAttribute('disabled');
	// 	btnLast.removeAttribute('disabled');

	// 	if (currentIndex === 0) btnFirst.disabled = btnPrev.disabled = 'true';

	// 	if (currentIndex + currentCardNum === MAX_CARDS) {
	// 		btnLast.disabled = btnNext.disabled = 'true';
	// 	}

	// 	pgNumber.textContent = currentPage + 1 + '';
	// }

	// function redrawPage() {
	// 	let cardNum = getCardNumber();

	// 	if (cardNum !== currentCardNum) {
	// 		currentCardNum = cardNum;
	// 		showPage();
	// 	}
	// }

	// function getCardNumber() {
	// 	let cardNumber = 8;
	// 	const cards = document.querySelectorAll('.our-friends__item');

	// 	// if (window.getComputedStyle(cards[6]).display === 'none') cardNumber = 6;
	// 	// if (window.getComputedStyle(cards[3]).display === 'none') cardNumber = 3;

	// 	return cardNumber;
	// }

	// window.addEventListener('resize', redrawPage);

	// btnFirst.addEventListener('click', () => {
	// 	currentIndex = 0;
	// 	showPage();
	// });

	// btnPrev.addEventListener('click', () => {
	// 	currentIndex -= currentCardNum;
	// 	showPage();
	// });

	// btnNext.addEventListener('click', () => {
	// 	currentIndex += currentCardNum;
	// 	showPage();
	// });

	// btnLast.addEventListener('click', () => {
	// 	currentIndex = MAX_CARDS - currentCardNum;
	// 	showPage();
	// });

	// redrawPage();
};


const paginate = (getData) => {

  const petsIndexes = get48();
	let currentIndex = 0;
	let currentPage;
	let currentCardNum;

	const MAX_CARDS = 48;
	const btnFirst = document.querySelector('.pagination__arrow--start');
	const btnPrev = document.querySelector('.pagination__arrow--prev');
	const pgNumber = document.querySelector('pagination__link--active');
	const btnNext = document.querySelector('.pagination__arrow--next');
	const btnLast = document.querySelector('.pagination__arrow--end');


  function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

  function getRandomArray(size) {
		const arr = Array(size)
			.fill()
			.map((el, i) => (el = i));
		shuffle(arr);
		return arr;
	}

  function get48() {
		let a6 = [],
			a8 = [],
			a48 = [];

		while (a48.length !== 48) {
			let index = 0;

			if (a6.length === 6) a48.push(...a6.splice(0));
			if (a8.length === 0) a8 = getRandomArray(8);
			while (a6.includes(a8[index])) index++;

			a6.push(...a8.splice(index, 1));
		}

		return a48;
	}

  function showPage() {
		const cards = document.querySelectorAll('.our-friends__item');

		currentPage = Math.floor(currentIndex / currentCardNum);
		currentIndex = currentPage * currentCardNum;

		for (let i = 0; i < currentCardNum; i++) {
			let petData = getData[petsIndexes[currentIndex + i]];

			cards[i].querySelector('img').setAttribute('src', getData.img);
			cards[i].querySelector('img').setAttribute('alt', getData.alt);
			cards[i].querySelector('h4').textContent = getData.name;
			cards[i].dataset.petindex = petsIndexes[currentIndex + i];
		}

		// Enable/Disable buttons, Refresh page number
		btnFirst.removeAttribute('disabled');
		btnPrev.removeAttribute('disabled');
		btnNext.removeAttribute('disabled');
		btnLast.removeAttribute('disabled');

		if (currentIndex === 0) btnFirst.disabled = btnPrev.disabled = 'true';

		if (currentIndex + currentCardNum === MAX_CARDS) {
			btnLast.disabled = btnNext.disabled = 'true';
		}

		pgNumber.textContent = currentPage + 1 + '';
	}




  function redrawPage() {
		let cardNum = getCardNumber();

		if (cardNum !== currentCardNum) {
			currentCardNum = cardNum;
			showPage();
		}
	}

  function getCardNumber() {
		let cardNumber = 8;
		const cards = document.querySelectorAll('.our-friends__item');

		if (window.getComputedStyle(cards[6]).display === 'none') cardNumber = 6;
		if (window.getComputedStyle(cards[3]).display === 'none') cardNumber = 3;

		return cardNumber;
	}

  window.addEventListener('resize', redrawPage);

	btnFirst.addEventListener('click', () => {
		currentIndex = 0;
		showPage();
	});

	btnPrev.addEventListener('click', () => {
		currentIndex -= currentCardNum;
		showPage();
	});

	btnNext.addEventListener('click', () => {
		currentIndex += currentCardNum;
		showPage();
	});

	btnLast.addEventListener('click', () => {
		currentIndex = MAX_CARDS - currentCardNum;
		showPage();
	});



	redrawPage();

}
