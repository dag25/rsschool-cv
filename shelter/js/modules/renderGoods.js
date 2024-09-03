
export const renderGoods = (wrapper, getGoods) => {
  wrapper.textContent = '';

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
  wrapper.append(...cards);
}
