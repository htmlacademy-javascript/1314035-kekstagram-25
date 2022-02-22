// Источник: hhttps://www.schoolsw3.com/js/js_random.php

function getRandomNumber(min, max) {
  if (max === min || max < 0 || min < 0 )  {
    return ('Значения не могут быть меньше нуля или равны');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomNumber();

function checkLengthString(string, max) {
  return (string.length <= max);
}
checkLengthString();
