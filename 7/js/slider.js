import {UserImagePreview} from './scale-control.js';

// Находим родительский контейнер для всех эффектов
const effectsContainer = document.querySelector('.img-upload__effects');
// Находим слайдер
const effectsSliderElement = document.querySelector('.effect-level__slider');
//  Находим поле, в которое записывается уровень эффекта
const effectInputLevel = document.querySelector('.effect-level__value');

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
    'filterParameter': {//объект с параметрами noUiSliderа
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
  'sepia': {
    'filterName': 'sepia',
    'filterParameter': {
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
          if (Number.isInteger(value)) {
            return `${value.toFixed(0)}%`;
          }
          return `${value.toFixed(1)}%`;
        },
        from: function (value) {
          return parseFloat(value);
        },
      },
    },
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
            return `${value.toFixed(0)}px`;
          }
          return `${value.toFixed(1)}px`;
        },
        from: function (value) {
          return parseFloat(value);
        },
      },
    },
  },
  'heat': {
    'filterName': 'brightness',
    'filterParameter':  {
      range: {
        min: 1,
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
};

// Слушатель события update, которое будет вызвано при изменении положения слайдера
// С помощью метода .get() получаем актуальное значение слайдера и записываем его в свойство value поля, в которое записывается уровень эффекта
effectsSliderElement.noUiSlider.on('update', () => {
  const effectInputCurrent = document.querySelector('[name="effect"]:checked');
  if (effectInputCurrent.value !== 'none') {
    const actualSliderValue = effectsSliderElement.noUiSlider.get();
    effectInputLevel.value = parseInt(actualSliderValue, 10);
    UserImagePreview.style.filter = `${filterParams[effectInputCurrent.value].filterName}(${actualSliderValue})`;
  }
  else {
    effectsSliderElement.classList.add('hidden');
  }
});

// Обработчик на выбор радио-кнопки с эффектами
effectsContainer.addEventListener('change', (evt) => {
  const effectInputCurrent = document.querySelector('[name="effect"]:checked');
  if (effectInputCurrent.value !== 'none') {
    effectsSliderElement.noUiSlider.updateOptions(filterParams[evt.target.value]['filterParameter']);
    effectsSliderElement.classList.remove('hidden');
  } else {
    UserImagePreview.style.filter = '';
    effectsSliderElement.classList.add('hidden');
  }
});
