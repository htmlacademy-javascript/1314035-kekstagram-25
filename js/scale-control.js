// Находим кнопку "минус"
const smallerScaleButton = document.querySelector('.scale__control--smaller');
// Находим кнопку "плюс"
const biggerScaleButton = document.querySelector('.scale__control--bigger');
// Находим поле значения масштаба
const ScaleControlInput = document.querySelector('.scale__control--value');
// Находим загруженное изображение
const UserImagePreview = document.querySelector('.img-upload__preview');

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
ScaleControlInput.value = 100;

// Обработчик нажатия на кнопку
smallerScaleButton.addEventListener ('click', ()  => {
  const ScaleValue = ScaleControlInput.value;
  if (parseInt(ScaleValue, 10) > SCALE_MIN) {
    ScaleControlInput.value = `${parseInt(ScaleValue, 10) - SCALE_STEP  }%`;
    UserImagePreview.style.transform =`scale(${(parseInt(ScaleValue, 10)/100 - SCALE_STEP/100)})`;
  }
});

biggerScaleButton.addEventListener ('click', () => {
  const ScaleValue = ScaleControlInput.value;
  if (parseInt(ScaleValue, 10) < SCALE_MAX) {
    ScaleControlInput.value = `${parseInt(ScaleValue, 10) + SCALE_STEP }%`;
    UserImagePreview.style.transform = `scale(${(parseInt(ScaleValue, 10)/100 + SCALE_STEP/100)})`;
  }
});

export {UserImagePreview};
