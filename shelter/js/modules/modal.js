

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

const createModal = (title, cards) => {
	for (const key in cards) {
		if (cards[key].name === title) {
			const modal = document.createElement('div');
			modal.classList.add('modal');
			modal.insertAdjacentHTML(
				'beforeend',
				`
				<img class="modal__img" src=${cards[key].img} alt=${cards[key].name}>
					<div class="modal__content">
						<h2 class="modal__title">${cards[key].name}</h2>
						<p class="modal__breed">${cards[key].type} - ${cards[key].breed}</p>
						<p class="modal__description">
							${cards[key].description}
						</p>
						<ul class="modal__list">
							<li class="modal__item">
								<b>Age:</b> ${cards[key].age}
							</li>
							<li class="modal__item">
								<b>Inoculations:</b> ${cards[key].inoculations}
							</li>
							<li class="modal__item">
								<b>Diseases:</b> ${cards[key].diseases}
							</li>
							<li class="modal__item">
								<b>Parasites:</b> ${cards[key].parasites}
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
	getData,
	selectorCardList,
	selectorProductBtn,
	selectorOverlay,
	classOverlayActive,
	closeSelector,
	selectorProductTitle,
}) => {

	const cardList = document.querySelector(selectorCardList);
	const overlay = document.querySelector(selectorOverlay);
	const productTitles = document.querySelectorAll(selectorProductTitle);
	const productBtns = document.querySelectorAll(selectorProductBtn);

	cardList.addEventListener('click', ({target}) => {
		console.log(target)
		console.log(productBtns);
		for (let j = 0; j < productBtns.length; j++) {
			if (target === productBtns[j]) {
        const title = productTitles[j].textContent.trim();
        console.log(title);

				overlay.classList.add(classOverlayActive);
				overlay.textContent = '';
				disabledScroll();

				const modal = createModal(title, getData);
				overlay.append(modal);
				modal.addEventListener('click', event => {
					const target = event.target;
					if (target.matches(closeSelector) || target.closest(selectorModal)) {
						modal.remove();
						overlay.classList.remove(classOverlayActive);
						enabledScroll();
					}
				});
			}
		}
	});
}
