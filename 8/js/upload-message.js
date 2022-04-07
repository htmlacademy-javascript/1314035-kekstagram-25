// import {onUserModalEscKeydown, clearUserModalForm} from './user-modal.js';
import {isEscapeKey} from './util.js';
const body = document.querySelector('body');

const showUploadMessage = (status) => {
  const messageTemplate = document.querySelector(`#${status}`).content.querySelector(`.${status}`);
  const messageFragment = document.createDocumentFragment();
  const messageElement = messageTemplate.cloneNode(true);
  const closeMessageButton = messageElement.querySelector(`.${status}__button`);
  messageFragment.appendChild(messageElement);
  body.appendChild(messageFragment);

  const onUploadMessageEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      messageElement.classList.add('hidden');
      document.removeEventListener('keydown', onUploadMessageEscKeydown);
    }
  };

  const messageContainer = document.querySelector(`.${status}`);
  messageContainer.style.zIndex = 100;
  messageElement.classList.remove('hidden');
  body.classList.remove('modal-open');
  document.addEventListener('keydown', onUploadMessageEscKeydown);

  const closeUploadMessage = () => {
    messageElement.classList.add('hidden');
    body.classList.remove('modal-open');
  };

  window.addEventListener('click', (evt) => {
    if (evt.target.matches(`.${status}`)) {
      closeUploadMessage();
      document.removeEventListener('keydown', onUploadMessageEscKeydown);
    }
  });

  closeMessageButton.addEventListener('click', () => {
    closeUploadMessage();
    document.body.lastChild.remove();
    document.removeEventListener('keydown', onUploadMessageEscKeydown);
  });
};

export {showUploadMessage};
