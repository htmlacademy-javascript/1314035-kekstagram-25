const MAX_HASHTAG_NUMBERS = 5;

const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

// Находим форму для загрузки изображения на сайт
const form = document.querySelector('.img-upload__form');

//Функция проверки
const pristine = new Pristine(form, {
  classTo: 'img-upload__text', // Элемент, на который будут добавляться классы
  errorClass: 'img-upload__text--invalid', // Класс, обозначающий невалидное поле
  successClass: 'img-upload__text--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'img-upload__text', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'img-upload__error' // Класс для элемента с текстом ошибки
});

//Находим поле хэштегов
const hashtagsInput = form.querySelector('.text__hashtags');

// хэш-теги нечувствительны к регистру;
hashtagsInput.value.toLowerCase();

// строку из инпута превращем в массив (хэш-теги разделяются пробелами);
const hashtagsArray = hashtagsInput.value.split(' ');

// Функция проверки регулярного выражения
function validateReg (array) {
  for (let i = 0; i < hashtagsArray.length; i++) {
    if (!re.test(array[i])) {
      return false;
    }
  }
  return true;
}
validateReg(hashtagsArray);

pristine.addValidator(form.querySelector('.text__hashtags'), validateReg,'хэш-тег должен начинаться с #; хеш-тег должен состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.; хеш-тег не может состоять только из #; максимальная длина одного хэш-тега 20 символов, включая #;'
);

// Функция проверки длины массива (нельзя указать больше пяти хэш-тегов);
function validateCount (array) {
  if (array.length <= MAX_HASHTAG_NUMBERS) {
    return true;
  }
  return false;
}
validateReg(hashtagsArray);

pristine.addValidator(form.querySelector('.text__hashtags'), validateCount,'нельзя указать больше пяти хэш-тегов'
);

// Функция проверки уникальности хештегов (один и тот же хэш-тег не может быть использован дважды);
function validateUnique (value) {
  const uniqueHashtags = Array.from(new Set(value));
  if (uniqueHashtags.length === value.length) {
    return true;
  }
  return false;
}
validateReg(hashtagsArray);

// Для описания валидации в JS вызываем метод .addValidator()
pristine.addValidator(form.querySelector('.text__hashtags'), validateUnique,'один и тот же хэш-тег не может быть использован дважды'
);

// Общая функция валидности поля хештегов
function validateHashtag () {
  if (hashtagsInput.value === '') {
    return true;
  }
  return validateReg(hashtagsArray) && validateCount(hashtagsArray) && validateUnique(hashtagsArray);
}
validateHashtag();

// Добавляем обработчик на форму и вызываем метод .validate()
form.addEventListener('submit', (evt) => {
  pristine.validate();
  evt.preventDefault();
});

export {hashtagsInput};
