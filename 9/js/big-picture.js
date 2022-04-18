import {isEscapeKey} from './util.js';

const bigPictureContainer = document.querySelector('.big-picture');
const body = document.querySelector('body');
const closeFullViewPictureElement = bigPictureContainer.querySelector('.big-picture__cancel');
const blockComments = document.querySelector('.social__comments');
const loaderCommentsButton = document.querySelector('.comments-loader');
const SHOW_LIMIT = 5;

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
  const commentsNumber =  bigPictureContainer.querySelector('.social__comment-count');
  let currentComments = 5;
  bigPictureContainer.classList.remove('hidden');
  body.classList.add('modal-open');
  bigPictureContainer.querySelector('.big-picture__img img').src = url;
  bigPictureContainer.querySelector('.likes-count').textContent = likes;
  bigPictureContainer.querySelector('.comments-count').textContent = comments.length;
  bigPictureContainer.querySelector('.social__caption').textContent = description;

  if (currentComments >= comments.length) {
    commentsNumber.classList.add('hidden');
    loaderCommentsButton.classList.add('hidden');
  }
  else {
    commentsNumber.classList.remove('hidden');
    loaderCommentsButton.classList.remove('hidden');
  }

  blockComments.innerHTML = '';
  for (const comment of comments.slice(0, Math.min(currentComments, comments.length))) {
    createComment(comment.avatar,comment.name,comment.message);
  }
  commentsNumber.innerHTML = `<div class="social__comment-count">${Math.min(currentComments, comments.length)} из <span class="comments-count">${comments.length}</span> комментариев</div>`;

  loaderCommentsButton.addEventListener('click', () => {
    const commentsArray = comments.slice(Math.min(currentComments, comments.length), Math.min(currentComments, comments.length) + SHOW_LIMIT);
    currentComments += 5;
    commentsNumber.innerHTML = `<div class="social__comment-count">${Math.min(currentComments, comments.length)} из <span class="comments-count">${comments.length}</span> комментариев</div>`;
    for (const comment of commentsArray) {
      createComment(comment.avatar,comment.name,comment.message);
    }
  });
  document.addEventListener('keydown', onbigPictureContainerEscKeydown);
};

export {onThumbnailsClick};
