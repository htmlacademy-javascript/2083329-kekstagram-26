function getRandomInteger(min, max) {
  if (min >= max) {
    return null;
  }
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function checkMaxLengthString(string, maxLength) {
  return string.length <= maxLength;
}

getRandomInteger(2, 3);
checkMaxLengthString('testString',10);
