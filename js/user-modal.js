import {isEscapeKey} from './util.js';
import {hashtagsElement} from './user-form.js';
import {userImagePreviewElement} from './scale-control.js';
import {effectLevelBackElement} from './slider.js';

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

const commentElement = form.querySelector('.text__description');

const uploadPreviewElement = document.querySelector('.img-upload__preview img');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const onUserModalEscKeydown = (evt) => {
  // отменяем обработчик Esc при фокусе
  const selectedElement = document.activeElement;
  if (isEscapeKey(evt) && selectedElement !== hashtagsElement && selectedElement !== commentElement) {
    evt.preventDefault();
  }
};

//Сбрасываем значение поля выбора файла #upload-file
const clearUserModalForm = () => {
  form.reset();
  userImagePreviewElement.style = '';
  effectLevelBackElement.classList.add('hidden');
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
  const file = userControlElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    uploadPreviewElement.src = URL.createObjectURL(file);
  }
  openUserModal();
});

userModalCloseElement.addEventListener('click', () => {
  closeUserModal();
  clearUserModalForm();
});

export {openUserModal, closeUserModal, onUserModalEscKeydown, clearUserModalForm};
