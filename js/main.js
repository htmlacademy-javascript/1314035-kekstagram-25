// Источник: hhttps://www.schoolsw3.com/js/js_random.php

function getRandomNumber(min, max) {
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  if (max === min || max < 0 || min < 0 )  {
    return ('Значения не могут быть меньше нуля или равны');
  }
  return random;
}
getRandomNumber();

function checkLengthString(string, max) {
  if (string.length <= max) {
    return true;
  }
  return false;
}
checkLengthString();
