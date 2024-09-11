

export const pagination = ({
	getData,
	selectorCardList,
	selectorPagination,
	selectorBtnPrev,
	selectorBtnNext,
	selectorBtnStart,
  selectorBtnEnd,
	selectorNumber
}) => {
	const duplicateArray = (arr, times) => {
		return [...Array(times)].map(() => [...arr]);
	};

	const data = duplicateArray(getData, 6);

	const mix = data.map(array => {
		return array.sort(() => Math.random() - 0.5);
	});

	let flattenedArray = mix.flat();
	console.log(flattenedArray);


	const cards = flattenedArray.map((item, index) => {
		const {
			name,
			img,
			type,
			breed,
			description,
			age,
			inoculations,
			diseases,
			parasites,
		} = item;
		const li = document.createElement('li');
		li.dataset.petIndex = index;
		li.classList.add('our-friends__item');
		li.innerHTML = `
    <img class="our-friends__img" src=${img} alt=${name} />
    <h3 class="our-friends__subtitle">
      ${name}
    </h3>
    <button class="our-friends__btn">
      Learn more
    </button>
    `;
		return li;
	});

	const cardsList = document.querySelector(selectorCardList);
	const paginationWrapper = document.querySelector(selectorPagination);
	const btnNext = document.querySelector(selectorBtnNext);
	const btnPrev = document.querySelector(selectorBtnPrev);
	const btnStart = document.querySelector(selectorBtnStart);
	const btnEnd = document.querySelector(selectorBtnEnd);
	const paginationNumber = document.querySelector(selectorNumber);

	let productCount = 8;
	let currentPage = 1;
	const totalPages = 6;
	paginationNumber.textContent = currentPage;


	const renderProducts = (products, productContainer, numberOfProducts, page ) => {
		productContainer.innerHTML = '';

		const firstProductIndex = numberOfProducts * page - numberOfProducts;


		const lastProductIndex = firstProductIndex + numberOfProducts;


		const productsOnPage = products.slice(firstProductIndex, lastProductIndex);


		productContainer.append(...productsOnPage);

	};


	const pagesCount = Math.ceil(cards.length / productCount);


	const showNumberOfPage = (page) => {
		paginationNumber.textContent = page;
	}
	console.log(productCount);
	renderProducts(cards, cardsList, productCount, currentPage);
	window.addEventListener('resize', () => {
		let widthWindow = document.body.offsetWidth;
		if (widthWindow > 1260) {
			productCount = 8;
		} else if (widthWindow > 680 && widthWindow < 1260) {
			productCount = 6;
		} else {
			productCount = 3;
		}
		renderProducts(cards, cardsList, productCount, currentPage);
	});


	// screen.orientation.addEventListener('change', renderProducts);
	window.addEventListener('orientationchange', () => {
		renderProducts(cards, cardsList, productCount, currentPage);
	});



	const handlePagination = (event) => {

		if (event.target.closest('.pagination__arrow--next')) {
			currentPage++;
		}else {
			currentPage--;
		}

		if (currentPage > totalPages) {
			currentPage = 1;
		} else if (currentPage < 1) {
			currentPage = totalPages;
		}
		updateBtn();
		showNumberOfPage(currentPage);
		renderProducts(cards, cardsList, productCount, currentPage);
	}

	btnEnd.addEventListener('click', () => {
		currentPage = totalPages;
    renderProducts(cards, cardsList, productCount, currentPage);showNumberOfPage(currentPage);
	});

	btnStart.addEventListener('click', () => {
		currentPage = 1;
    renderProducts(cards, cardsList, productCount, currentPage);
		showNumberOfPage(currentPage);
	});

	const updateBtn = () => {
		if (currentPage === totalPages) {
      btnEnd.disabled = true;
			btnEnd.classList.add('arrow-disabled');
			btnNext.disabled = true;
			btnNext.classList.add('arrow-disabled');
    } else if(currentPage === 1) {
			btnStart.disabled = true;
			btnStart.classList.add('arrow-disabled');
			btnPrev.disabled = true;
			btnPrev.classList.add('arrow-disabled');
		} else {
			btnEnd.disabled = false;
			btnEnd.classList.remove('arrow-disabled');
			btnNext.disabled = false;
			btnNext.classList.remove('arrow-disabled');
			btnStart.disabled = false;
			btnStart.classList.remove('arrow-disabled');
			btnPrev.disabled = false;
			btnPrev.classList.remove('arrow-disabled');
		}
	}

	btnNext.addEventListener('click', handlePagination);
	btnPrev.addEventListener('click', handlePagination);


};
