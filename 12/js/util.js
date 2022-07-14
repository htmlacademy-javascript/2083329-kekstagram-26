const ERROR_SHOW_TIME = 3000;

const getRandomInteger = (min, max) => {
  const minNumber = Math.min(Math.abs(min), Math.abs(max));
  const maxNumber = Math.max(Math.abs(min), Math.abs(max));
  return Math.floor(minNumber + Math.random() * (maxNumber - minNumber + 1));
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const checkMaxLengthString = (string, maxLength) => string.length <= maxLength;

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = () => {
  const errorSectionNode = document.createElement('section');
  errorSectionNode.className = 'error';
  errorSectionNode.insertAdjacentHTML('afterbegin',
    '<div class="error__inner"><h2 class="error__title">Не удалось загрузить фотографии</h2><p>Попробуйте обновить страницу</p></div>');
  document.body.append(errorSectionNode);
  setTimeout(() => {
    errorSectionNode.remove();
  }, ERROR_SHOW_TIME);
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomInteger(0, i);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getRandomInteger, getRandomArrayElement, isEscapeKey, checkMaxLengthString, showAlert, shuffleArray, debounce };
