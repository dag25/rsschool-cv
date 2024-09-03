export const slider = (getGoods) => {
	const cards = getGoods.map(item => {
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
		li.classList.add('our-friends__item');
    li.setAttribute('draggable', false);
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
  const wrapper = document.querySelector('.slider');
	const carousel = document.querySelector('.slider__line');
  carousel.append(...cards);
  const arrowBtns = document.querySelectorAll('.our-friends__arrow');
  const firstCardWidth =
		carousel.querySelector('.our-friends__item').offsetWidth;
  console.log(firstCardWidth)
  const carouselChildrens = [...carousel.children];

  console.log(cards.length)

  let timeoutId;
  let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
  console.log(carousel.offsetWidth);
  console.log(cardPerView);
  carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML('afterbegin', card.outerHTML);
  });
  carouselChildrens.slice(0, 5).forEach(card => {
    carousel.insertAdjacentHTML('beforeend', card.outerHTML);
  });

  const autoPlay = (e) => {
    if (window.innerWidth < 800) return;
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
  };
  autoPlay();

  const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
      console.log('endLeft');
      carousel.classList.add('no-transition');
      carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
      carousel.classList.remove('no-transition');
    }else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
      console.log('endRight');
      console.log(Math.ceil(carousel.scrollLeft));
			console.log(carousel.scrollWidth - carousel.offsetWidth);
      carousel.classList.add('no-transition');
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove('no-transition');
    }
    clearTimeout(timeoutId);
    if (!wrapper.matches(':hover')) autoPlay();
  }
  console.log(carousel.scrollLeft);

	carousel.addEventListener('scroll', infiniteScroll);
  wrapper.addEventListener('mouseenter', () => clearTimeout(timeoutId));
  wrapper.addEventListener('mouseleave', autoPlay);



  arrowBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      carousel.scrollLeft += btn.id === 'left' ? -firstCardWidth : firstCardWidth;
    });
  });
};
