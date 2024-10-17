import { pagination } from './modules/pagination.js';
import { getData } from './modules/serviceData.js';
import { renderCards } from './modules/renderCards.js';
import { slider } from './modules/slider.js';
import { itemModal } from './modules/modal.js';
import { burgerMenu } from './modules/burgerMenu.js';


// try {

// 	const carousel = new SliderCarousel({
// 		main: '.slider__wrapper',
// 		wrap: '.slider__carousel',
// 		prev: '#btn-left',
// 		next: '#btn-right',
// 		slidesToShow: 3,
// 		infinite: true,
// 		responsive: [
// 			{
// 				breakpoint: 1024,
// 				slidesToShow: 3,
// 			},
// 			{
// 				breakpoint: 768,
// 				slidesToShow: 2,
// 			},
// 			{
// 				breakpoint: 576,
// 				slidesToShow: 1,
// 			},
// 		],
// 	});
// 	carousel.init();
// } catch (error) {
// 	console.log(error);
// }


try {
	slider({
		getData,
		selectorWrapper: '.slider__wrapper',
		selectorCardList: '.slider__carousel',
		selectorBtns: '.our-friends__arrow',
		selectorItem: '.card',
	});
} catch (error) {
	console.log(error);
	console.log('not main.html');
}



try {
	pagination({
		getData,
		selectorCardList: '.our-friends__list--pets',
		selectorPagination: '.pagination',
		selectorBtnPrev: '.pagination__arrow--prev',
		selectorBtnNext: '.pagination__arrow--next',
		selectorBtnStart: '.pagination__arrow--start',
		selectorBtnEnd: '.pagination__arrow--end',
		selectorNumber: '.pagination__item',
	});


} catch (error) {
	console.log(error);
	console.log('not pets.html')
}




try {
	burgerMenu({
		selectorBtn: '.burger__box',
		selectorMenu: '.nav',
		classActive: 'nav--open',
		selectorHide: '.burger__hide',
		selectorLink: '.nav__link',
		selectorOverlay: '.overlay',
		bodyClassActive: 'body--locked',
		overlayClassActive: 'overlay--active',
	});
} catch (error) {
	console.log(error);
	console.log('burgerError');
}

try {
	itemModal({
		getData,
		selectorCardList: '.our-friends__list',
		selectorProductBtn: '.our-friends__btn',
		selectorOverlay: '.overlay',
		classOverlayActive: 'overlay--active',
		closeSelector: '.modal__close-btn',
		selectorProductTitle: '.our-friends__subtitle',
	});
} catch (error) {
	console.log(error);
	console.log('modalError');
}
