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

  const messageContainer = document.querySelector(`.${status}`);
  messageContainer.style.zIndex = 100;
  messageTemplate.classList.remove('hidden');
  body.classList.remove('modal-open');

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      messageContainer.classList.add('hidden');
    }
  });

  closeMessageButton.addEventListener('click', () => {
    messageContainer.classList.add('hidden');
    body.classList.remove('modal-open');
    // clearUserModalForm();

    // document.removeEventListener('keydown', onUserModalEscKeydown);
  });
};

export {showUploadMessage};

/*const onUploadMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadMessage();
  }
};

function closeUploadMessage () {
  messageContainer.classList.add('hidden');
  document.removeEventListener('keydown', onUploadMessageEscKeydown);
}

closeMessageButton.addEventListener('click', () => {
  closeUploadMessage();
});*/
