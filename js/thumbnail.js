import {onThumbnailsClick} from './big-picture.js';
// Находим контейнер для изображений от других пользователей
const pictureContainer = document.querySelector('.pictures');

// Находим шаблон
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const makeThumbnails = (similarItems) => {
  const thumbnailFragment = document.createDocumentFragment();

  similarItems.forEach(({url, comments, likes, description}) => {
    const thumbnailUser = pictureTemplate.cloneNode(true);
    thumbnailUser.querySelector('.picture__img').src = url;
    thumbnailUser.querySelector('.picture__comments').textContent = comments.length;
    thumbnailUser.querySelector('.picture__likes').textContent = likes;
    thumbnailUser.addEventListener('click', () => {
      onThumbnailsClick(url, likes, comments, description);
    });
    thumbnailFragment.appendChild(thumbnailUser);
  });
  const userPictures = pictureContainer.querySelectorAll('.picture');
  for (const pictures of userPictures) {
    pictures.remove();
  }
  pictureContainer.appendChild(thumbnailFragment);
};

export {makeThumbnails};
