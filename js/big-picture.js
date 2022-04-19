import {isEscapeKey} from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const body = document.querySelector('body');
const closeFullViewPictureElement = bigPictureElement.querySelector('.big-picture__cancel');
const blockCommentsElement = document.querySelector('.social__comments');
const loaderCommentsElement = document.querySelector('.comments-loader');
const SHOW_LIMIT = 5;

const closeFullViewPicture = () => {
  bigPictureElement.classList.add('hidden');
  body.classList.remove('modal-open');
};

closeFullViewPictureElement.addEventListener('click', () => {
  closeFullViewPicture();
});

const onbigPictureElementEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureElement.classList.add('hidden');
    document.removeEventListener('keydown', onbigPictureElementEscKeydown);
  }
};

const createComment = (avatar,name,message) => {
  const userCommentElement = document.createElement('li');
  userCommentElement.classList.add('social__comment');

  const userCommentImgElement = document.createElement('img');
  userCommentImgElement.classList.add('social__picture');

  const userCommentTextElement = document.createElement('p');
  userCommentImgElement.classList.add('social__text');

  userCommentImgElement.src = avatar;
  userCommentImgElement.alt = name;
  userCommentTextElement.textContent = message;
  userCommentElement.appendChild(userCommentImgElement);
  userCommentElement.appendChild(userCommentTextElement);
  blockCommentsElement.appendChild(userCommentElement);
};

const showloaderCommentsElement = (currentComments, comments) => {
  if (currentComments >= comments.length) {
    loaderCommentsElement.classList.add('hidden');
  }
  else {
    loaderCommentsElement.classList.remove('hidden');
  }
};

const onThumbnailsClick = (url, likes, comments, description) => {
  const commentsNumberElement =  bigPictureElement.querySelector('.social__comment-count');
  let currentComments = 5;
  bigPictureElement.classList.remove('hidden');
  body.classList.add('modal-open');
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.comments-count').textContent = comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  showloaderCommentsElement(currentComments, comments);
  blockCommentsElement.innerHTML = '';
  for (const comment of comments.slice(0, Math.min(currentComments, comments.length))) {
    createComment(comment.avatar,comment.name,comment.message);
  }
  commentsNumberElement.innerHTML = `<div class="social__comment-count">${Math.min(currentComments, comments.length)} из <span class="comments-count">${comments.length}</span> комментариев</div>`;

  loaderCommentsElement.addEventListener('click', () => {
    const commentsArray = comments.slice(Math.min(currentComments, comments.length), Math.min(currentComments, comments.length) + SHOW_LIMIT);
    currentComments += 5;
    commentsNumberElement.innerHTML = `<div class="social__comment-count">${Math.min(currentComments, comments.length)} из <span class="comments-count">${comments.length}</span> комментариев</div>`;
    for (const comment of commentsArray) {
      createComment(comment.avatar,comment.name,comment.message);
    }
    showloaderCommentsElement(currentComments, comments);
  });
  document.addEventListener('keydown', onbigPictureElementEscKeydown);
};

export {onThumbnailsClick};
