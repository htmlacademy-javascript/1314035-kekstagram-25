import {isEscapeKey} from './util.js';

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

// Записываем обработчик в переменную
const onUserModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

//Сбрасываем значение поля выбора файла #upload-file
const clearUserModalForm = () => {
  userControlElement.value = '';
};

//Функция для показа окна
function openUserModal () {
  userModalFormElement.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onUserModalEscKeydown);
}

//Функция для скрытия окна
function closeUserModal () {
  userModalFormElement.classList.add('hidden');
  body.classList.remove('modal-open');
  clearUserModalForm();

  document.removeEventListener('keydown', onUserModalEscKeydown);
}

userControlElement.addEventListener('change', () => {
  openUserModal();
});

userModalCloseElement.addEventListener('click', () => {
  closeUserModal();
});

// Валидация с Prisitine

const pristine = new Pristine(form, {
  classTo: 'img-upload__text', // Элемент, на который будут добавляться классы
  errorClass: 'img-upload__text--invalid', // Класс, обозначающий невалидное поле
  successClass: 'img-upload__text--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'img-upload__text', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'img-upload__error' // Класс для элемента с текстом ошибки
}, false);

// Добавляем обработчик на форму и вызываем метод .validate()
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
