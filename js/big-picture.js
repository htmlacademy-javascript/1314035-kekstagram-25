import {isEscapeKey} from './util.js';

const bigPictureContainer = document.querySelector('.big-picture');
const body = document.querySelector('body');
// const userPictures = document.querySelectorAll('.picture__img');
const closeFullViewPictureElement = bigPictureContainer.querySelector('.big-picture__cancel');
const blockComments = document.querySelector('.social__comments');

const hideBlockComments = () => {
  bigPictureContainer.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureContainer.querySelector('.comments-loader').classList.add('hidden');
};

const closeFullViewPicture = () => {
  bigPictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');
};

closeFullViewPictureElement.addEventListener('click', () => {
  closeFullViewPicture();
});

const onbigPictureContainerEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureContainer.classList.add('hidden');
    document.removeEventListener('keydown', onbigPictureContainerEscKeydown);
  }
};

const createComment = (avatar,name,message) => {
  const userCommentElement = document.createElement('li');
  userCommentElement.classList.add('social__comment');

  const userCommentImg = document.createElement('img');
  userCommentImg.classList.add('social__picture');

  const userCommentText = document.createElement('p');
  userCommentImg.classList.add('social__text');

  userCommentImg.src = avatar;
  userCommentImg.alt = name;
  userCommentText.textContent = message;
  userCommentElement.appendChild(userCommentImg);
  userCommentElement.appendChild(userCommentText);
  blockComments.appendChild(userCommentElement);
};

const onThumbnailsClick = (url, likes, comments, description) => {
  bigPictureContainer.classList.remove('hidden');
  body.classList.add('modal-open');
  bigPictureContainer.querySelector('.big-picture__img img').src = url;
  bigPictureContainer.querySelector('.likes-count').textContent = likes;
  bigPictureContainer.querySelector('.social__comment-count').textContent = comments.length;
  bigPictureContainer.querySelector('.social__caption').textContent = description;
  hideBlockComments();
  for (const comment of comments) {
    createComment(comment.avatar,comment.name,comment.message);
  }
  document.addEventListener('keydown', onbigPictureContainerEscKeydown);
};

export {onThumbnailsClick};
