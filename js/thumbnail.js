import {similarItems} from './data.js';

// Находим контейнер для изображений от других пользователей
const pictureContainer = document.querySelector('.pictures');

// Находим шаблон
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarPictures = similarItems;

const thumbnailFragment = document.createDocumentFragment();

similarPictures.forEach(({url, comments, likes}) => {
  const thumbnailUser = pictureTemplate.cloneNode(true);
  thumbnailUser.querySelector('.picture__img').src = url;
  thumbnailUser.querySelector('.picture__comments').textContent = comments.length;
  thumbnailUser.querySelector('.picture__likes').textContent = likes;
  thumbnailFragment.appendChild(thumbnailUser);
});

pictureContainer.appendChild(thumbnailFragment);
