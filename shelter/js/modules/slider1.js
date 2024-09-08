export class SliderCarousel {
	constructor({
		main,
		wrap,
		next,
		prev,
		infinite = false,
		position = 0,
		slidesToShow = 1,
		responsive = [],
	}) {
		this.main = document.querySelector(main);
		this.wrap = document.querySelector(wrap);
		this.slides = Array.from(this.wrap.children);
		this.next = document.querySelector(next);
		this.prev = document.querySelector(prev);
		this.slidesToShow = slidesToShow;
		this.options = {
			position,
			infinite,
			widthSlider: Math.floor(100 / this.slidesToShow),
			maxPosition: this.slides.length - this.slidesToShow,
		};
		this.responsive = responsive;
		this.firstSlider = this.slides[0];
		this.lastSlider = this.slides[this.slides.length - 1];
	}
	init() {
		this.addClass();
		this.addStyle();
		if (this.prev && this.next) {
			this.controlSlider();
		} else {
			this.addArrow();
			this.controlSlider();
		}
		if (this.responsive) {
			this.responsiveInit();
		}
		if (this.options.position < 0) {
			this.addSliderToStart();
			addSliderToStart();
		}
	}
	addClass(el, className) {
		this.main.classList.add('carousel');
		this.wrap.classList.add('carousel__wrap');
		for (const item of this.slides) {
			item.classList.add('carousel__item');
		}
	}

	addStyle() {
		let style = document.getElementById('sliderCarousel-style');
		if (!style) {
			style = document.createElement('style');
			style.id = 'sliderCarousel-style';
		}

		style.textContent = `
      .carousel {
        position: relative;
        overflow: hidden;
      }

      .carousel__wrap {
        display: flex;
        transition: transform 0.5s ease;
        will-change: transform;
      }

      .carousel__item {
        flex: 0 0 ${this.options.widthSlider}%;
      }
    `;

		document.head.appendChild(style);
	}

	removeStyle() {
    if (style) {
      document.getElementById('sliderCarousel-style').remove();
    }

	}
	controlSlider() {
		this.prev.addEventListener('click', this.prevSlider.bind(this));
		this.next.addEventListener('click', this.nextSlider.bind(this));
	}

	addSliderToEnd() {
		this.wrap.insertAdjacentElement(
			'afterbegin',
			this.lastSlider.cloneNode(true),
		);
	}

	addSliderToStart() {
		this.wrap.insertAdjacentElement(
			'beforeend',
			this.firstSlider.cloneNode(true),
		);
	}
	prevSlider() {
		if (this.options.infinite || this.options.position > 0) {
			--this.options.position;
			console.log(this.options.position);
			console.log(this.slides);
			if (this.options.position < 0) {
				this.options.position = this.options.maxPosition;
			}

			this.wrap.style.transform = `translateX(-${
				this.options.position * this.options.widthSlider
			}%`;
		}
	}

	nextSlider() {
		if (
			this.options.infinite ||
			this.options.position < this.options.maxPosition
		) {
			++this.options.position;
			console.log(this.options.position);

			if (this.options.position > this.options.maxPosition) {
        this.options.position = 0;
			}

			this.wrap.style.transform = `translateX(-${
				this.options.position * this.options.widthSlider
			}%`;
		}
	}
	responsiveInit() {
		const slidesToShowDefault = this.slidesToShow;
		const allResponse = this.responsive.map(item => item.breakpoint);
		const maxResponse = Math.max(...allResponse);
		const checkResponse = () => {
			const widthWindow = document.documentElement.clientWidth;
			if (widthWindow < maxResponse) {
				for (let i = 0; i < allResponse.length; i++) {
					if (widthWindow < allResponse[i]) {
						this.slidesToShow = this.responsive[i].slidesToShow;
						this.options.widthSlider = Math.floor(100 / this.slidesToShow);
					}
				}
			} else {
				this.slidesToShow = slidesToShowDefault;
				this.options.widthSlider = Math.floor(100 / this.slidesToShow);
				this.addStyle();
			}
		};
		checkResponse();
		window.addEventListener('resize', checkResponse);
	}
};
