import { createElement } from './createElem.js';

export const createCardPhoto = data => {
  const card = createElement('li', {
    className: 'card',
});

  const cardItem = createElement('a', {
		id: data.id,
		className: 'grid-item',
		href: `page.html?id=${data.id}`,
	});

  const photo = new Image();
  photo.width = '200';
  photo.src = data.urls.small;
  photo.alt = data.alt_description;

  const author = createElement('a', {
		className: 'card__author',
		href: data.user.links.html,
	});

  const avatarAuthor = new Image();
  avatarAuthor.className = 'author__photo';
  avatarAuthor.width = '32';
  avatarAuthor.height = '32';
  avatarAuthor.src = data.user.profile_image.medium;
  avatarAuthor.alt = data.user.bio;
  avatarAuthor.title = data.user.username;

  author.append(avatarAuthor);

  const likeBtn = createElement('button', {
		className: 'card__photo-like',
		textContent: data.likes,
	});

  const downloadLink = createElement('a', {
    className: 'card__download',
    href: data.links.download,
    download: true,
    target: '_blank',
  });

  cardItem.append(photo, author, likeBtn, downloadLink);
  card.append(cardItem);

  return card;
};
