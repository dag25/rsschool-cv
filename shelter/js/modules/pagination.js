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
  firstItem.href = isNotStart ? 'pets.html' : '';
  const prevItem = document.createElement('a');
  prevItem.classList.add('pagination__arrow', 'pagination__arrow--prev');
  const nextItem = document.createElement('a');
  nextItem.classList.add('pagination__arrow', 'pagination__arrow--next');
  const endItem = document.createElement('a');
	endItem.classList.add('pagination__arrow', 'pagination__arrow--end');
  endItem.href = isEnd ? '' : `pets.html?page=${pages}`;
	wrapper.append(firstItem, prevItem, paginationList, nextItem, endItem);
};
