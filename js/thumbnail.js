import {onThumbnailsClick} from './big-picture.js';

// Находим контейнер для изображений от других пользователей
const pictureElement = document.querySelector('.pictures');

// Находим шаблон
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const makeThumbnails = (similarItems) => {
  const thumbnailFragment = document.createDocumentFragment();

  similarItems.forEach(({url, comments, likes, description}) => {
    const thumbnailUserElement = pictureTemplate.cloneNode(true);
    thumbnailUserElement.querySelector('.picture__img').src = url;
    thumbnailUserElement.querySelector('.picture__comments').textContent = comments.length;
    thumbnailUserElement.querySelector('.picture__likes').textContent = likes;
    thumbnailUserElement.addEventListener('click', () => {
      onThumbnailsClick(url, likes, comments, description);
    });
    thumbnailFragment.appendChild(thumbnailUserElement);
  });
  const userPicturesElement = pictureElement.querySelectorAll('.picture');
  for (const pictures of userPicturesElement) {
    pictures.remove();
  }
  pictureElement.appendChild(thumbnailFragment);
};

export {makeThumbnails};
