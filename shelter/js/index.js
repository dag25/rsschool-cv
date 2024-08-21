console.log(window.location.pathname);
if (window.location.pathname === '/shelter/index.html') {
	const wrapper = document.querySelector('.wrapper');
	const carousel = document.querySelector('.carousel');
	const firstCardWidth =
		document.querySelector('.our-friends__item').offsetWidth;
	const arrowBtns = document.querySelectorAll('.our-friends__arrow');
	const carouselChildrens = [...carousel.children];

	let isDragging = false,
		isAutoPlay = true,
		startX,
		startScrollLeft,
		timeoutId;

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
		btn.addEventListener('click', e => {
			carousel.scrollLeft +=
				btn.id == 'left' ? -firstCardWidth : firstCardWidth;
		});
	});
	const dragStart = e => {
		isDragging = true;
		carousel.classList.add('dragging');
		startX = e.pageX;
		startScrollLeft = carousel.scrollLeft;
	};

	const dragging = e => {
		if (!isDragging) return;
		carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
	};

	const dragStop = e => {
		isDragging = false;
		carousel.classList.remove('dragging');
	};

	const infiniteScroll = e => {
		if (carousel.scrollLeft === 0) {
			carousel.classList.add('no-transition');
			carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.scrollWidth;
			carousel.classList.remove('no-transition');
		} else if (
			Math.ceil(carousel.scrollLeft) ===
			carousel.scrollWidth - carousel.offsetWidth
		) {
			carousel.classList.add('no-transition');
			carousel.scrollLeft = carousel.offsetWidth;
			carousel.classList.remove('no-transition');
		}
		clearTimeout(timeoutId);
		if (!wrapper.matches(':hover')) autoPlay();
	};

	const autoPlay = () => {
		if (window.innerWidth < 800 || !isAutoPlay) return;
		timeoutId = setTimeout(() => {
			carousel.scrollLeft += firstCardWidth;
		}, 2500);
	};
	autoPlay();

	carousel.addEventListener('mousedown', dragStart);
	carousel.addEventListener('mousemove', dragging);
	document.addEventListener('mouseup', dragStop);
	carousel.addEventListener('scroll', infiniteScroll);
	wrapper.addEventListener('mouseenter', () => clearTimeout(timeoutId));
	wrapper.addEventListener('mouseleave', autoPlay);
}


// Scroll
const disabledScroll = () => {
  document.body.scrollPosition = window.scrollY;
  document.body.style.cssText = `
  overflow: hidden;
  position: fixed;
  top: -${document.body.scrollPosition}px;
  left: 0;
  height: 100wh;
  width: 100vw;
  padding-right: ${window.innerWidth - document.body.offsetWidth}px;
  `;
};

const enabledScroll = () => {
  document.body.style.cssText = '';
  window.scroll({top: document.body.scrollPosition});
};

// modal


const createElement = (tag, attr) => {
  const element = document.createElement(tag);
  return Object.assign(element, {...attr});
};

const createModal = (
	name,
	img,
	type,
	breed,
	description,
	age,
	inoculations,
	diseases,
	parasites,
) => {
	const overlayElement = createElement('div', { className: 'overlay' });
	const modalElement = createElement('div', { className: 'modal' });
	const modalContainerElement = createElement('div', {
		className: 'modal__container',
	});
	const modalImgElement = createElement('img', {
		className: 'modal__img',
		src: img,
		alt: name,
	});
	const modalContentElement = createElement('div', {
		className: 'modal__content',
	});
	modalContainerElement.append(modalImgElement, modalContentElement);

	const titleElement = createElement('h2', {
		className: 'modal__title',
		textContent: name,
	});
	const breedElement = createElement('p', {
		className: 'modal__breed',
		textContent: `${type} - ${breed}`,
	});
	const descriptionElement = createElement('p', {
		className: 'modal__description',
		textContent: description,
	});

	const modalListElement = createElement('ul', { className: 'modal__list' });

	const listItem1Element = createElement('li', {
		className: 'modal__item',
		innerHTML: `<b>Age:</b> ${age}`,
	});
	const listItem2Element = createElement('li', {
		className: 'modal__item',
		innerHTML: `<b>Inoculations:</b> ${inoculations}`,
	});
	const listItem3Element = createElement('li', {
		className: 'modal__item',
		innerHTML: `<b>Diseases:</b> ${diseases}`,
	});
	const listItem4Element = createElement('li', {
		className: 'modal__item',
		innerHTML: `<b>Parasites:</b> ${parasites}`,
	});

	modalListElement.append(
		listItem1Element,
		listItem2Element,
		listItem3Element,
		listItem4Element,
	);

	modalContentElement.append(
		titleElement,
		breedElement,
		descriptionElement,
		modalListElement,
	);

	const closeBtnElement = createElement('button', {
		className: 'modal__close',
		innerHTML: `<svg width="52" height="52" viewBox="0 0 52 52" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="50" height="50" rx="25" stroke="#F1CDB3" stroke-width="2"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M27.4262 26L31.7046 21.7216C32.0985 21.3277 32.0985 20.6892 31.7046 20.2954C31.3108 19.9016 30.6723 19.9016 30.2785 20.2954L26 24.5739L21.7215 20.2954C21.3276 19.9015 20.6892 19.9015 20.2953 20.2954C19.9016 20.6892 19.9016 21.3277 20.2953 21.7215L24.5738 26L20.2953 30.2785C19.9016 30.6723 19.9016 31.3108 20.2953 31.7046C20.6892 32.0985 21.3276 32.0985 21.7215 31.7046L26 27.4261L30.2785 31.7046C30.6723 32.0985 31.3108 32.0985 31.7046 31.7046C32.0985 31.3108 32.0985 30.6723 31.7046 30.2785L27.4262 26Z" fill="#292929"/>
    </svg>
    `,
	});

	overlayElement.addEventListener('click', event => {
		const target = event.target;
		if (
			target === overlayElement ||
			target.closest('.modal__close')
		) {
			overlayElement.remove();
			enabledScroll();
		}
	});
	modalElement.append(modalContainerElement, closeBtnElement);
	overlayElement.append(modalElement);

	disabledScroll();

	document.body.appendChild(overlayElement);
};

const productTitles = document.querySelectorAll('.our-friends__subtitle');
const productBtns = document.querySelectorAll('.our-friends__btn');

for (let i = 0; i < productBtns.length; i++) {
  productBtns[i].addEventListener('click', () => {
    const title = productTitles[i].textContent.trim();
    const jsonFile = 'data/pets.json';
		fetch(jsonFile)
			.then(response => {
				return response.json();
			})
			.then(data => {
				data.map(pet => {
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
					} = pet;
          if (pet.name === title) {
            createModal(
							name,
							img,
							type,
							breed,
							description,
							age,
							inoculations,
							diseases,
							parasites,
						);
          }
				});
			});
  });
}

// burger

const burgerHide = document.querySelector('.burger__hide');
const burgerBtnElement = document.querySelector('.burger__box');
const navElement = document.querySelector('.nav');
const navLinkElements = document.querySelectorAll('.nav__link');
const overlayElement = document.querySelector('.blackout');

if (burgerBtnElement) {
		burgerBtnElement.addEventListener('click', () => {
		document.body.classList.toggle('body--locked');
    burgerBtnElement.classList.toggle('nav--open');
    navElement.classList.toggle('nav--open');
		overlayElement.classList.toggle('overlay');
		burgerHide.classList.toggle('nav--open');
  });
}

if (navLinkElements.length > 0) {
	navLinkElements.forEach((navLinkElement) => {
		navLinkElement.addEventListener('click', () => {
      document.body.classList.remove('body--locked');
      burgerBtnElement.classList.remove('nav--open');
      navElement.classList.remove('nav--open');
			overlayElement.classList.remove('overlay');
			navLinkElements.forEach((navLinkElement) => {
				navLinkElement.classList.remove('nav__link--active');
			});
			navLinkElement.classList.add('nav__link--active');

		});
  });
}
