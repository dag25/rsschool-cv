import { getData } from './serviceData.js';
const createItemPagination = (hrefLink, textContent, active) => {
  const li = document.createElement('li');
  li.classList.add('pagination__item');
  const a = document.createElement('a');
  a.classList.add('pagination__link');
  a.textContent = textContent;
  a.href = hrefLink;
  if (active) {
    a.classList.add('pagination__link--active');
  }
  li.append(a);
  return li;
};
export const pagination = (wrapper, pages, page, count) => {
	const paginationList = document.createElement('ul');
	paginationList.classList.add('pagination__list');
  const isNotStart = page - Math.floor(count / 2) > 1;
  const isEnd = page + Math.floor(count / 2) > pages;

  if (count > pages) {
    count = pages;
  }

	for (let i = 0; i < count; i++) {
		let n = i + 1;
    if (isNotStart) {
      if (isEnd) {
        n = pages - count + i + 1;
      }else {
        n = page - Math.floor(count / 2) + i;
      }
    }
		const li = createItemPagination(`index.html?page=${n}`, n, page === n);
    paginationList.append(li);
	}
  const firstItem = document.createElement('a');
  firstItem.classList.add('pagination__arrow', 'pagination__arrow--start');
  firstItem.innerHTML = `
    <svg width="25" height="11" viewBox="0 0 25 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.94687 10.7852L0.913671 6.08789V4.98438L9.94687 0.287109V1.625L2.43711 5.53125L9.94687 9.44727V10.7852ZM24.018 10.7852L14.9848 6.08789V4.98438L24.018 0.287109V1.625L16.5082 5.53125L24.018 9.44727V10.7852Z" fill="currentColor"/>
    </svg>
  `;
  firstItem.href = isNotStart ? 'pets.html' : '';
  const prevItem = document.createElement('a');
  prevItem.classList.add('pagination__arrow', 'pagination__arrow--prev');
  prevItem.innerHTML = `
    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.98242 10.7852L0.949219 6.08789V4.98438L9.98242 0.287109V1.625L2.47266 5.53125L9.98242 9.44727V10.7852Z" fill="currentColor"/>
    </svg>
  `;
  const nextItem = document.createElement('a');
  nextItem.classList.add('pagination__arrow', 'pagination__arrow--next');
  nextItem.innerHTML = `
    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.04102 6.08789L0.0078125 10.7852V9.44727L7.51758 5.53125L0.0078125 1.625V0.287109L9.04102 4.98438V6.08789Z" fill="currentColor"/>
    </svg>
  `;
  const endItem = document.createElement('a');
	endItem.classList.add('pagination__arrow', 'pagination__arrow--end');
  endItem.innerHTML = `
    <svg width="25" height="11" viewBox="0 0 25 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.0055 6.08789L0.972265 10.7852V9.44727L8.48203 5.53125L0.972265 1.625V0.287109L10.0055 4.98438V6.08789ZM24.0766 6.08789L15.0434 10.7852V9.44727L22.5531 5.53125L15.0434 1.625V0.287109L24.0766 4.98438V6.08789Z" fill="currentColor"/>
    </svg>
  `;
  endItem.href = isEnd ? '' : `pets.html?page=${pages}`;
	wrapper.append(firstItem, prevItem, paginationList, nextItem, endItem);
};


export const paginate = (getData) => {
  const itemsPerPage = 8;
  const currentPage = Number(new URL(location).searchParams.get('page')) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  console.log(startIndex);
  const endIndex = startIndex + itemsPerPage;
  console.log(endIndex);
  const productContainer = document.querySelector('.our-friends__list--pets');
  const renderProducts = (getData, productContainer, productCount, currentPage) => {
    productContainer.innerHTML = '';

    const productsOnPage = getData.slice(startIndex, endIndex);
    console.log(productsOnPage);
  }
}
