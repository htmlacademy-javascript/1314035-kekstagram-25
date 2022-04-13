const bigPictureContainer = document.querySelector('.big-picture');
const body = document.querySelector('body');
// const userPictures = document.querySelectorAll('.picture__img');

const onThumbnailsClick = (url, likes, comments) => {
  bigPictureContainer.classList.remove('hidden');
  body.classList.add('modal-open');
  bigPictureContainer.querySelector('.big-picture__img img').src = url;
  bigPictureContainer.querySelector('.likes-count').textContent = likes;
  bigPictureContainer.querySelector('.comments-count').textContent = comments.length;
};

export {onThumbnailsClick};
