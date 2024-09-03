import { renderGoods } from './renderGoods.js';

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
	window.scroll({ top: document.body.scrollPosition });
};

const createModal = (title, goods) => {
	for (const key in goods) {
		if (goods[key].name === title) {
			const modal = document.createElement('div');
			modal.classList.add('modal');
			modal.insertAdjacentHTML(
				'beforeend',
				`
				<img class="modal__img" src=${goods[key].img} alt=${goods[key].name}>
					<div class="modal__content">
						<h2 class="modal__title">${goods[key].name}</h2>
						<p class="modal__breed">${goods[key].type} - ${goods[key].breed}</p>
						<p class="modal__description">
							${goods[key].description}
						</p>
						<ul class="modal__list">
							<li class="modal__item">
								<b>Age:</b> ${goods[key].age}
							</li>
							<li class="modal__item">
								<b>Inoculations:</b> ${goods[key].inoculations}
							</li>
							<li class="modal__item">
								<b>Diseases:</b> ${goods[key].diseases}
							</li>
							<li class="modal__item">
								<b>Parasites:</b> ${goods[key].parasites}
							</li>
						</ul>
					</div>
					<button class="modal__close-btn"></button>
				`,
			);
			return modal;
		}
	}
	console.log(modal)
}



export const itemModal = ({
	getGoods,
	selectorProductBtn,
	selectorOverlay,
	classOverlayActive,
	closeSelector,
	selectorProductTitle,
}) => {


			const overlay = document.querySelector(selectorOverlay);
			const productTitles = document.querySelectorAll(selectorProductTitle);
			const productBtns = document.querySelectorAll(selectorProductBtn);

			for (let i = 0; i < productBtns.length; i++) {
				productBtns[i].addEventListener('click', () => {
					const title = productTitles[i].textContent.trim();
					console.log(title);
					overlay.classList.add(classOverlayActive);
					overlay.textContent = '';
					disabledScroll();

					const modal = createModal(title, getGoods);
					overlay.append(modal);
					modal.addEventListener('click', event => {
						const target = event.target;
						if (target.matches(closeSelector) || target.closest(selectorModal)) {
							modal.remove();
							overlay.classList.remove(classOverlayActive);
							enabledScroll();
						}
					});
				});
			}

	}





			// parent.addEventListener('click', event => {
		// 	const target = event.target;
		// 	if (target.matches(selectorProductBtn)) {
		// 		modal.classList.add(classModalActive);
		// 		overlay.classList.add(classOverlayActive);
		// 		overlay.textContent = '';

		// 		createModal(selectorTitle, getGoods);

// 				modal.addEventListener('click', event => {
// 					const target = event.target;
					// if (target.matches(closeSelector) || target.closest(selectorModal))
// 						modal.classList.remove(classModalActive);
// 						overlay.classList.remove(classOverlayActive);
						// enabledScroll();}}}});}});})}}}')
