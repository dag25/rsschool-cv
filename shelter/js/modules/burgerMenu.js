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

export const burgerMenu = ({
	classActive,
	selectorBtn,
	selectorMenu,
	selectorHide,
	selectorLink,
	selectorOverlay,
	overlayClassActive,
}) => {
	const burgerBtnElement = document.querySelector(selectorBtn);
	const navElement = document.querySelector(selectorMenu);
	const burgerHideElement = document.querySelector(selectorHide);
	const navLinkElements = document.querySelectorAll(selectorLink);
	const overlayElement = document.querySelector(selectorOverlay);

	if (burgerBtnElement) {
		burgerBtnElement.addEventListener('click', () => {
			burgerBtnElement.classList.toggle(classActive);
			navElement.classList.toggle(classActive);
			overlayElement.classList.toggle(overlayClassActive);
			burgerHideElement.classList.toggle(classActive);
      if (overlayElement.classList.contains(overlayClassActive)) {
        disabledScroll();
      } else {
        enabledScroll();
      }

		});
	}

	const closeNav = () => {
		burgerBtnElement.classList.remove('nav--open');
		navElement.classList.remove('nav--open');
		burgerHideElement.classList.remove('nav--open');
		overlayElement.classList.remove('overlay--active');
		enabledScroll();
	};

	if (navLinkElements.length > 0) {
		navLinkElements.forEach(navLinkElement => {
			navLinkElement.addEventListener('click', () => {
				closeNav();
			});
		});
	}
	overlayElement.addEventListener('click', event => {
		const target = event.target;
		if (target === overlayElement) {
			closeNav();
		}
	});
};


