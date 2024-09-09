import { pagination } from './modules/pagination.js';
import { getData } from './modules/serviceData.js';
import { renderCards } from './modules/renderCards.js';
import { slider } from './modules/slider.js';
import { itemModal } from './modules/modal.js';
import { burgerMenu } from './modules/burgerMenu.js';
// import { SliderCarousel } from './modules/slider1.js';
// import { pagination } from './modules/pagination.js';

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
	const cardsList = document.querySelector('.our-friends__list--pets');
	const paginationWrapper = document.querySelector('.pagination');
	const pageURL = new URL(location);
	const page = +pageURL.searchParams.get('page') || 1;
	pagination(paginationWrapper, 6, page, 1);
	cardsList.innerHTML = `
		<div class='our-friends__preloader'>
		  <svg class='our-friends__preloader-svg' width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M109.323 17.5573C113.468 16.9412 117.69 17.9763 121.08 20.44C124.471 22.9037 126.759 26.5993 127.453 30.7323C128.148 34.8654 127.193 39.1059 124.794 42.5424C122.395 45.9788 118.743 48.3367 114.624 49.1093C95.989 52.2695 79.0748 61.9258 66.8796 76.3663C54.6844 90.8068 47.996 109.099 48 128C48 149.217 56.4285 169.566 71.4315 184.568C86.4344 199.571 106.783 208 128 208V240C66.144 240 16 189.867 16 128C16 73.12 55.744 26.56 109.323 17.5573Z" fill="url(#paint0_linear_187135_379)"/>
				<path d="M180.181 45.8453C181.584 44.2799 183.282 43.0064 185.178 42.0975C187.073 41.1887 189.129 40.6622 191.228 40.5483C193.328 40.4344 195.429 40.7352 197.411 41.4336C199.394 42.132 201.22 43.2143 202.784 44.6186C214.506 55.1149 223.88 67.9677 230.294 82.3362C236.707 96.7047 240.014 112.265 240 128C240 189.867 189.856 240 128 240V208C144.194 208 160.006 203.086 173.347 193.907C186.688 184.728 196.929 171.716 202.717 156.592C208.505 141.468 209.566 124.944 205.762 109.203C201.957 93.4631 193.465 79.248 181.408 68.4373C178.25 65.6038 176.346 61.632 176.116 57.3953C175.886 53.1586 177.348 49.004 180.181 45.8453Z" fill="url(#paint1_linear_187135_379)"/>
				<defs>
				<linearGradient id="paint0_linear_187135_379" x1="5616" y1="1190.8" x2="5616" y2="20452" gradientUnits="userSpaceOnUse">
				<stop/>
				<stop offset="1" stop-opacity="0.55"/>
				</linearGradient>
				<linearGradient id="paint1_linear_187135_379" x1="5728" y1="3080.53" x2="5728" y2="17424.8" gradientUnits="userSpaceOnUse">
				<stop stop-opacity="0"/>
				<stop offset="1" stop-opacity="0.55"/>
				</linearGradient>
				</defs>
			</svg>
		</div>
	`;
	renderCards(cardsList, getData);
	// paginate(getData);
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
