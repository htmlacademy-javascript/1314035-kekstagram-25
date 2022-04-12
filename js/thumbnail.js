// Находим контейнер для изображений от других пользователей
const pictureContainer = document.querySelector('.pictures');

// Находим шаблон
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const makeThumbnails = (similarItems) => {
  const thumbnailFragment = document.createDocumentFragment();
  similarItems.forEach(({url, comments, likes}) => {
    const thumbnailUser = pictureTemplate.cloneNode(true);
    thumbnailUser.querySelector('.picture__img').src = url;
    thumbnailUser.querySelector('.picture__comments').textContent = comments.length;
    thumbnailUser.querySelector('.picture__likes').textContent = likes;
    thumbnailFragment.appendChild(thumbnailUser);
  });
  pictureContainer.innerHTML = '';
  pictureContainer.appendChild(thumbnailFragment);

};

export {makeThumbnails};
