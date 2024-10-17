const URL ='https://api.unsplash.com/';
const API_KEY = '0SsvT8iPDpdN7XAu_iA4iIjKPfjEvnzcMFOHFZH9it0';


const container = document.querySelector('.container');
const pagination = document.querySelector('.pagination');
const searchForm = document.querySelector('.search__form');
const searchInput = document.querySelector('.search__input');


const headerObjectGet = {
  method: 'GET',
  headers: {
    'Authorization': `Client-ID ${API_KEY}`
  }
};
let searchText = 'Summer';
let page = 1;
let totalPages= 0;

function setFocus() {
	document.querySelector('.search__input').focus();
}

async function searchPhotos(photo, page) {
  try {
    const searchUrl = `${URL}/search/photos?query=${photo}&page=${page}`;
    const response = await fetch(searchUrl, headerObjectGet);
    const data = await response.json();
    // console.log(data);
    totalPages = data.total_pages;
    container.innerHTML = '';
    data.results.forEach((photo) => {
      let fragment = document.createDocumentFragment();
      let div = document.createElement('div');
      div.classList.add('card');
      let col = colorDark(photo.color);

      div.innerHTML = `
		    <div
          class='username'
          style="color:#${col};
          background:${col === '000000' ? '#ffffff' : '#333333'}">
          Name: ${photo.user.name}
        </div>
		    <div
          class='location'
          style=" color:#${col};
          background:${col === '000000' ? '#ffffff' : '#333333'}">
          Location: ${photo.user.location !== null ? photo.user.location : 'Nowhere'}
        </div>
		    <div
          class='portfolio'
          style="color:#${col};
          background:${col === '000000' ? '#ffffff' : '#333333'}">
          <a href="${photo.user.portfolio_url}" target='blank'>
            Portfolio Link
          </a>
        </div>
		    <div
          class='link'
          style=" color:#${col};
          background:${col === '000000' ? '#ffffff' : '#333333'}">
          <a href="${photo.urls.full}" target='blank'>
            Photo Link
          </a>
        </div>
		    <div
          class='total'
          style="color:#${col};
          background:${col === '000000' ? '#ffffff' : '#333333'}">
          Total Photos: ${photo.user.total_photos}
        </div>
		    <div
          class='likes'
          style=" color:#${col};
          background:${col === '000000' ? '#ffffff' : '#333333'}">
          Likes: ${photo.user.total_likes}
        </div>
		    <div
          class='photo_img'
          style="">
          <img src='${photo.urls.regular}'>
        </div>
      `;

			// APPEND
			fragment.append(div);
			container.append(fragment);
    });
    paginationFn();

  } catch (error) {
    console.log(err);
  }
}

searchPhotos(searchText, page);

function colorDark(hexcol) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexcol);
  let r = parseInt(result[1], 16);
	let g = parseInt(result[2], 16);
	let b = parseInt(result[3], 16);
	let rgb = `rgb(${r},${g},${b})`;
	let rgbObj = { r, g, b };
	let myVal = checkDarkness(rgbObj, rgb);
	return myVal;
}

function checkDarkness (col, rgb){
	let val = (col.r * 0.2126 + col.g * 0.7152 + col.b * 0.0722) < 40;
	if(val){
		return 'ffffff';
	}else{
		return '000000';
	}
};

// SEARCH FORM
searchForm.addEventListener('submit', e => {
	e.preventDefault();
	searchText = cleanInput(searchInput.value);
	// console.log(cleanInput(searchText));

	// PAGE RESET
	page = 1;

	// SEARCH
	searchPhotos(searchText, page);

	// CLEAN UP
	// searchForm.reset();
});

// cleanInput INPUT
function cleanInput (input){
	const div = document.createElement('div');
	div.textContent = input;
	return div.innerHTML;
};

// PAGINATION
function paginationFn (){
	// Create buttons
	let prevBtn = document.createElement('button');
	let nextBtn = document.createElement('button');
	// ADD INNER HTML
	prevBtn.innerHTML = `${page === 1 ? 'END' : `<img src="./imgs/back.svg" alt="back"> ${page - 1}`}`;
	if(page === 1){prevBtn.disabled = true}else{prevBtn.disabled = false};
	nextBtn.innerHTML = `${page === totalPages ?  'END' : `<img src="./imgs/forward.svg" alt="next"> ${page + 1}` }`;
	if(page === totalPages || totalPages === 0 ){nextBtn.disabled = true}else{nextBtn.disabled = false};

	// Add event Listener
	prevBtn.addEventListener('click', ()=>{
		// console.log('Prev');
		page = page > 1 ? page - 1: page;
		// Prev page
		searchPhotos(searchText, page);
		// console.log(page);
		// RESET BTNS VALUE
		prevBtn.innerHTML = `${page === 1 ? 'END' : `<img src="./imgs/back.svg" alt="back"> ${page - 1}`}`;
		if(page === 1){prevBtn.disabled = true}else{prevBtn.disabled = false};
		nextBtn.innerHTML = `${page === totalPages ?  'END' : `<img src="./imgs/forward.svg" alt="next"> ${page + 1}` }`;
		if(page === totalPages || totalPages === 0 ){nextBtn.disabled = true}else{nextBtn.disabled = false};
		// SCROLL ON TOP
		window.scrollTo({top: 0, behavior: 'smooth'});
		});

	nextBtn.addEventListener('click', ()=>{
		// console.log('Next');
		page = page < totalPages ? page = page + 1 : page;
		// Next Page
		searchPhotos(searchText, page);
		// console.log(page);
		// RESET BTNS VALUE
		prevBtn.innerHTML = `${page === 1 ? 'END' : `<img src="./imgs/back.svg" alt="back"> ${page - 1}`}`;
		if(page === 1){prevBtn.disabled = true}else{prevBtn.disabled = false};
		nextBtn.innerHTML = `${page === totalPages ?  'END' : `<img src="./imgs/forward.svg" alt="next"> ${page + 1}` }`;
		if(page === totalPages || totalPages === 0 ){nextBtn.disabled = true}else{nextBtn.disabled = false};
		// SCROLL ON TOP
		window.scrollTo({top: 0, behavior: 'smooth'});
	});

	// Append
	pagination.innerHTML = '';
	pagination.append(prevBtn, `Page: ${page} `, ` Total: ${totalPages}`, nextBtn);
}
paginationFn();
