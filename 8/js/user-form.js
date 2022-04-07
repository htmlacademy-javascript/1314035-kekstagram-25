import {showAlert} from './util.js';
import {sendData} from './load.js';
import {showUploadMessage} from './upload-message.js';

const MAX_HASHTAG_NUMBERS = 5;

const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

// Находим форму для загрузки изображения на сайт
const form = document.querySelector('.img-upload__form');

// Находим кнопку "опубликовать"
const submitButton = form.querySelector('.img-upload__submit');

//Находим поле хэштегов
const hashtagsInput = form.querySelector('.text__hashtags');

//Функция проверки
const pristine = new Pristine(form, {
  classTo: 'img-upload__text', // Элемент, на который будут добавляться классы
  errorClass: 'img-upload__text--invalid', // Класс, обозначающий невалидное поле
  successClass: 'img-upload__text--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'img-upload__text', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'img-upload__error' // Класс для элемента с текстом ошибки
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

// хэш-теги нечувствительны к регистру;
hashtagsInput.value.toLowerCase();

// Функция проверки регулярного выражения
const validateReg = (value) => {
  const hashtagsArray = value.split(' ');
  for (let i = 0; i < hashtagsArray.length; i++) {
    if (!re.test(hashtagsArray[i]) && hashtagsArray[i] !== '') {
      return false;
    }
  }
  return true;
};

pristine.addValidator(form.querySelector('.text__hashtags'), validateReg,
  `хэш-тег должен начинаться с #;
хеш-тег должен состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.;
хеш-тег не может состоять только из #; максимальная длина одного хэш-тега 20 символов, включая #;
хэш-теги разделяются пробелами;`
);

// Функция проверки длины массива (нельзя указать больше пяти хэш-тегов);
const validateCount = (value) => {
  const hashtagsArray = value.split(' ');
  return hashtagsArray.length <= MAX_HASHTAG_NUMBERS;
};

pristine.addValidator(form.querySelector('.text__hashtags'), validateCount,'нельзя указывать больше пяти хэш-тегов'
);

// Функция проверки уникальности хештегов (один и тот же хэш-тег не может быть использован дважды);
const validateUnique = (value) => {
  const hashtagsArray = value.split(' ');
  const uniqueHashtags = Array.from(new Set(hashtagsArray));
  return uniqueHashtags.length === hashtagsArray.length;
};

// Для описания валидации в JS вызываем метод .addValidator()
pristine.addValidator(form.querySelector('.text__hashtags'), validateUnique,'один и тот же хэш-тег не может быть использован дважды'
);

// Добавляем обработчик на форму и вызываем метод .validate()
const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          showUploadMessage('success');
        },
        () => {
          showAlert('Не удалось опубликовать фотографию. Попробуйте ещё раз');
          unblockSubmitButton();
          showUploadMessage('error');
        },
        new FormData(evt.target),
      );
    }
  });
};

export {hashtagsInput, setUserFormSubmit};

