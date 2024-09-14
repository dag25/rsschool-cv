

export const slider = ({
	getData,
  selectorWrapper,
	selectorCardList,
  selectorBtns,
  selectorItem,
}) => {

  const wrapper = document.querySelector(selectorWrapper);
	const carousel = document.querySelector(selectorCardList);
	let randomElement = getData[Math.floor(Math.random() * getData.length)];
	const sliderArr = [...getData, randomElement];

	const renderSlider = () => {
		const cards = sliderArr.map((item, index) => {
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
		carousel.innerHTML = '';

		let cardCount = 3;
		let contentCardCount = 3;


		for (let i = 0; i < cardCount; i++) {
			const card = document.createElement('ul');
			card.classList.add('card');

			for (let k = 0; k < contentCardCount; k++) {
				card.insertAdjacentElement('afterbegin',cards[i * contentCardCount + k]);
			}
			carousel.insertAdjacentElement('afterbegin',card);
			// carousel.append(card);
		}
	}
	renderSlider();
	window.addEventListener('resize', () => {
		let width = document.body.offsetWidth;
		
		if (width > 1260) {
			cardCount = 3;
			contentCardCount = 3;
		} else if (width > 768 && width < 1260) {
			cardCount = 4;
      contentCardCount = 2;
		} else {
			cardCount = 8;
      contentCardCount = 1;
		}
		renderSlider();
	});
	window.addEventListener('orientationchange', renderSlider);
	const firstCardWidth = carousel.querySelector(selectorItem).offsetWidth;
	const arrowBtns = document.querySelectorAll(selectorBtns);
  const carouselChildrens = [...carousel.children];



	let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

	carouselChildrens
		.slice(-cardPerView)
		.reverse()
		.forEach(card => {
			carousel.insertAdjacentHTML('afterbegin', card.outerHTML);
		});

	carouselChildrens.slice(0, cardPerView).forEach(card => {
		carousel.insertAdjacentHTML('beforeend', card.outerHTML);
	});

	carousel.classList.add('no-transition');
	carousel.scrollLeft = carousel.offsetWidth;
	carousel.classList.remove('no-transition');

	arrowBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			console.log(btn.id);
			carousel.scrollLeft +=
				btn.id == 'btn-right' ? -firstCardWidth : firstCardWidth;
				console.log(carousel.scrollLeft);
		});
	});

	const infiniteScroll = () => {

		if (carousel.scrollLeft === 0) {
			carousel.classList.add('no-transition');
			carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
			carousel.classList.remove('no-transition');
		}

		else if (
			Math.ceil(carousel.scrollLeft) ===
			carousel.scrollWidth - carousel.offsetWidth
		) {
			carousel.classList.add('no-transition');
			carousel.scrollLeft = carousel.offsetWidth;
			carousel.classList.remove('no-transition');
		}
	};
	carousel.addEventListener('scroll', infiniteScroll);
}
