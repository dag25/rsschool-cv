// if (window.location.pathname === '/shelter/index.html') {
// 	const wrapper = document.querySelector('.wrapper');
// 	const carousel = document.querySelector('.carousel');
// 	const firstCardWidth =
// 		document.querySelector('.our-friends__item').offsetWidth;
// 	const arrowBtns = document.querySelectorAll('.our-friends__arrow');
// 	const carouselChildren = [...carousel.children];

// 	let isDragging = false,
// 		isAutoPlay = true,
// 		startX,
// 		startScrollLeft,
// 		timeoutId;

// 	let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// 	carouselChildren
// 		.slice(-cardPerView)
// 		.reverse()
// 		.forEach(card => {
// 			carousel.insertAdjacentHTML('afterbegin', card.outerHTML);
// 		});

// 	carouselChildren.slice(0, cardPerView).forEach(card => {
// 		carousel.insertAdjacentHTML('beforeend', card.outerHTML);
// 	});

// 	carousel.classList.add('no-transition');
// 	carousel.scrollLeft = carousel.offsetWidth;
// 	carousel.classList.remove('no-transition');

// 	arrowBtns.forEach(btn => {
// 		btn.addEventListener('click', e => {
// 			carousel.scrollLeft +=
// 				btn.id == 'left' ? -firstCardWidth : firstCardWidth;
// 		});
// 	});
// 	const dragStart = e => {
// 		isDragging = true;
// 		carousel.classList.add('dragging');
// 		startX = e.pageX;
// 		startScrollLeft = carousel.scrollLeft;
// 	};

// 	const dragging = e => {
// 		if (!isDragging) return;
// 		carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
// 	};

// 	const dragStop = e => {
// 		isDragging = false;
// 		carousel.classList.remove('dragging');
// 	};

// 	const infiniteScroll = e => {
// 		if (carousel.scrollLeft === 0) {
// 			carousel.classList.add('no-transition');
// 			carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.scrollWidth;
// 			carousel.classList.remove('no-transition');
// 		} else if (
// 			Math.ceil(carousel.scrollLeft) ===
// 			carousel.scrollWidth - carousel.offsetWidth
// 		) {
// 			carousel.classList.add('no-transition');
// 			carousel.scrollLeft = carousel.offsetWidth;
// 			carousel.classList.remove('no-transition');
// 		}
// 		clearTimeout(timeoutId);
// 		if (!wrapper.matches(':hover')) autoPlay();
// 	};

// 	const autoPlay = () => {
// 		if (window.innerWidth < 800 || !isAutoPlay) return;
// 		timeoutId = setTimeout(() => {
// 			carousel.scrollLeft += firstCardWidth;
// 		}, 2500);
// 	};
// 	autoPlay();

// 	carousel.addEventListener('mousedown', dragStart);
// 	carousel.addEventListener('mousemove', dragging);
// 	document.addEventListener('mouseup', dragStop);
// 	carousel.addEventListener('scroll', infiniteScroll);
// 	wrapper.addEventListener('mouseenter', () => clearTimeout(timeoutId));
// 	wrapper.addEventListener('mouseleave', autoPlay);
// }
