import {UserImagePreview} from './scale-control.js';

// Находим поле каждого эффекта (радиокнопку)
const effectInputsRadio = document.querySelector('.effects__radio');
// Находим родительский контейнер для всех эффектов
const effectsContainer = document.querySelector('.img-upload__effects');
// Находим слайдер
const effectsSliderElement = document.querySelector('.effect-level__slider');
//  Находим поле, в которое записывается уровень эффекта
const effectInputLevel = document.querySelector('.effect-level__value');

// Функция-обработчик присвоения классов радио-кнопкам
function onEffectChange (evt) {
  if (evt.target.matches('.effects__radio')) {
    UserImagePreview.classList.add(`effects__preview--${evt.target.value}`);
    UserImagePreview.className = `effects__preview--${evt.target.value}`;
  }
}
effectsContainer.addEventListener('change', onEffectChange);

// Создаем слайдер
noUiSlider.create(effectsSliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const filterParams = {
  'chrome': { //Имя фильтра из value
    'filterName': 'grayscale', //Имя фильтра для стилизации CSS
    'filterParameter': {//Твой объект с параметрами noUiSliderа
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
      format: {
        to: function (value) {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: function (value) {
          return parseFloat(value);
        },
      },
    },
  },
  'sepia': { //Имя фильтра из value
    'filterName': 'sepia', //Имя фильтра для стилизации CSS
    'filterParameter': {//Твой объект с параметрами noUiSliderа
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
      format: {
        to: function (value) {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: function (value) {
          return parseFloat(value);
        },
      },
    },
  },
  'marvin': { //Имя фильтра из value
    'filterName': 'invert', //Имя фильтра для стилизации CSS
    'filterParameter': {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
      connect: 'lower',
      format: {
        to: function (value) {
          return (Number.isInteger(value));
        },
        from: function (value) {
          return parseFloat(value);
        },
      },
    }
  },
  'phobos': { //Имя фильтра из value
    'filterName': 'blur', //Имя фильтра для стилизации CSS
    'filterParameter': {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower',
      format: {
        to: function (value) {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: function (value) {
          return parseFloat(value);
        },
      },
    },
  },
  'heat': { //Имя фильтра из value
    'filterName': 'brightness', //Имя фильтра для стилизации CSS
    'filterParameter':  {
      range: {
        min: 1,
        max: 3,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
      format: {
        to: function (value) {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: function (value) {
          return parseFloat(value);
        },
      },
    },
  },
};

// Слушатель события update, которое будет вызвано при изменении положения слайдера
// С помощью метода .get() получаем актуальное значение слайдера и записываем его в свойство value поля, в которое записывается уровень эффекта
effectsSliderElement.noUiSlider.on('update', (evt) => {
  effectInputLevel.value = effectsSliderElement.noUiSlider.get();
  UserImagePreview.style.filter = `${(filterParams[evt.target.value].filterName)}(${effectInputLevel.value})`;
});

// Обработчик на выбор радио-кнопки с эффектами
effectInputsRadio.addEventListener('change', (evt) => {
  effectsSliderElement.noUiSlider.updateOptions(filterParams[evt.target.value]['filterParameter']);
  effectsSliderElement.noUiSlider.updateOptions(filterParams[evt.target.value]['filterName']);
});

// При выборе эффекта «Оригинал» слайдер скрывается
// effectsSliderElement.noUiSlider.destroy();

// Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
// Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
// Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
// Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
// Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
// Для эффекта «Оригинал» CSS-стили filter удаляются.

/*if (UserImagePreview.matches('.effects__preview--chrome')) {
    UserImagePreview.style.filter = `grayscale(${effectInputLevel.value})`;
  }
  if (UserImagePreview.matches('.effects__preview--sepia')) {
    UserImagePreview.style.filter = `sepia(${effectInputLevel.value})`;
  }
  if (UserImagePreview.matches('.effects__preview--marvin')) {
    UserImagePreview.style.filter = `invert(${effectInputLevel.value}%)`;
  }
  if (UserImagePreview.matches('.effects__preview--phobos')) {
    UserImagePreview.style.filter = `blur(${effectInputLevel.value}px)`;
  }
  if (UserImagePreview.matches('.effects__preview--heat')) {
    UserImagePreview.style.filter = `brightness(${effectInputLevel.value})`;
  }
});

effectInputsRadio.addEventListener('change', (evt) => {
  if (evt.target.matches('#effect-marvin')) {
    effectsSliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
    effectsSliderElement.noUiSlider.set(100);
  }
  if (evt.target.matches('#effect-phobos')) {
    effectsSliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    effectsSliderElement.noUiSlider.set(3);
  }
  if (evt.target.matches('#effect-heat')) {
    effectsSliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 1,
      step: 0.1,
    });
    effectsSliderElement.noUiSlider.set(1);
  }
  else {
    effectsSliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    effectsSliderElement.noUiSlider.set(1);
  }
});*/

