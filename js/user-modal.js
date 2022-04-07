import {isEscapeKey} from './util.js';
import {hashtagsInput} from './user-form.js';
import {userImagePreview} from './scale-control.js';
import {effectLevelBack} from './slider.js';

// Находим форму для загрузки изображения на сайт
const form = document.querySelector('.img-upload__form');

// Находим body
const body = document.querySelector('body');

// Находим контрол загрузки файла
const userControlElement = document.querySelector('#upload-file');

// Находим форму редактирования изображения
const userModalFormElement = form.querySelector('.img-upload__overlay');

// Находим кнопку закрытия формы
const userModalCloseElement = form.querySelector('.img-upload__cancel');

const commentInput = form.querySelector('.text__description');

const onUserModalEscKeydown = (evt) => {
  // отменяем обработчик Esc при фокусе
  const selectedInput = document.activeElement;
  if (isEscapeKey(evt) && selectedInput !== hashtagsInput && selectedInput !== commentInput) {
    evt.preventDefault();
  }
};

//Сбрасываем значение поля выбора файла #upload-file
const clearUserModalForm = () => {
  form.reset();
  userImagePreview.style = '';
  effectLevelBack.classList.add('hidden');
};

//Функция для показа окна
const openUserModal = () => {
  userModalFormElement.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onUserModalEscKeydown);
};

//Функция для скрытия окна
const closeUserModal = () => {
  userModalFormElement.classList.add('hidden');
  body.classList.remove('modal-open');
  clearUserModalForm();

  document.removeEventListener('keydown', onUserModalEscKeydown);
};

userControlElement.addEventListener('change', () => {
  openUserModal();
});

userModalCloseElement.addEventListener('click', () => {
  closeUserModal();
  clearUserModalForm();
});

export {openUserModal, closeUserModal, onUserModalEscKeydown, clearUserModalForm};
