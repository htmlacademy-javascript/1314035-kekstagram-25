import {isEscapeKey} from './util.js';

const bigPictureContainer = document.querySelector('.big-picture');
const body = document.querySelector('body');
// const userPictures = document.querySelectorAll('.picture__img');
const closeFullViewPictureElement = bigPictureContainer.querySelector('.big-picture__cancel');
const blockComments = document.querySelector('.social__comments');

// / Кнопка загрузить еще (комментарии)
const loaderCommentsButton = document.querySelector('.comments-loader');

// Всего комментариев к фото
const commentsCount = document.querySelector('.comments-count');

// const hideBlockComments = () => {
//   commentsNumber.classList.add('hidden');
//   loaderCommentsButton.classList.add('hidden');
// };

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
  // hideBlockComments();
  blockComments.innerHTML = '';
  for (const comment of comments.slice(0, currentComments)) {
    createComment(comment.avatar,comment.name,comment.message);
  }
  // commentsNumber.innerHTML = '<div class="social__comment-count">`${commentsNumber}` из <span class="comments-count">`${commentsCount}`</span> комментариев</div>';

  loaderCommentsButton.addEventListener('click', () => {
    const commentsArray = comments.slice(currentComments, currentComments + 5);
    currentComments += 5;
    for (const comment of commentsArray) {
      createComment(comment.avatar,comment.name,comment.message);
    }
  });
  document.addEventListener('keydown', onbigPictureContainerEscKeydown);
};

export {onThumbnailsClick};
