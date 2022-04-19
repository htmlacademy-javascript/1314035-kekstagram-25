const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

// Находим кнопку "минус"
const smallerScaleElement = document.querySelector('.scale__control--smaller');
// Находим кнопку "плюс"
const biggerScaleElement = document.querySelector('.scale__control--bigger');
// Находим поле значения масштаба
const scaleControlElement = document.querySelector('.scale__control--value');
// Находим загруженное изображение
const userImagePreviewElement = document.querySelector('.img-upload__preview');

// Обработчик нажатия на кнопку
smallerScaleElement.addEventListener ('click', ()  => {
  const scaleValue = scaleControlElement.value;
  if (parseInt(scaleValue, 10) > SCALE_MIN) {
    scaleControlElement.value = `${parseInt(scaleValue, 10) - SCALE_STEP  }%`;
    userImagePreviewElement.style.transform =`scale(${(parseInt(scaleValue, 10)/100 - SCALE_STEP/100)})`;
  }
});

biggerScaleElement.addEventListener ('click', () => {
  const scaleValue = scaleControlElement.value;
  if (parseInt(scaleValue, 10) < SCALE_MAX) {
    scaleControlElement.value = `${parseInt(scaleValue, 10) + SCALE_STEP }%`;
    userImagePreviewElement.style.transform = `scale(${(parseInt(scaleValue, 10)/100 + SCALE_STEP/100)})`;
  }
});

export {userImagePreviewElement, scaleControlElement};
