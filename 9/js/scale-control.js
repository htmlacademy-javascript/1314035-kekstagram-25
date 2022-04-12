const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

// Находим кнопку "минус"
const smallerScaleButton = document.querySelector('.scale__control--smaller');
// Находим кнопку "плюс"
const biggerScaleButton = document.querySelector('.scale__control--bigger');
// Находим поле значения масштаба
const scaleControlInput = document.querySelector('.scale__control--value');
// Находим загруженное изображение
const userImagePreview = document.querySelector('.img-upload__preview');

// Обработчик нажатия на кнопку
smallerScaleButton.addEventListener ('click', ()  => {
  const scaleValue = scaleControlInput.value;
  if (parseInt(scaleValue, 10) > SCALE_MIN) {
    scaleControlInput.value = `${parseInt(scaleValue, 10) - SCALE_STEP  }%`;
    userImagePreview.style.transform =`scale(${(parseInt(scaleValue, 10)/100 - SCALE_STEP/100)})`;
  }
});

biggerScaleButton.addEventListener ('click', () => {
  const scaleValue = scaleControlInput.value;
  if (parseInt(scaleValue, 10) < SCALE_MAX) {
    scaleControlInput.value = `${parseInt(scaleValue, 10) + SCALE_STEP }%`;
    userImagePreview.style.transform = `scale(${(parseInt(scaleValue, 10)/100 + SCALE_STEP/100)})`;
  }
});

export {userImagePreview, scaleControlInput};
