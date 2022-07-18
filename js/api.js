import { showAlert } from './util.js';
const URL = 'https://26.javascript.pages.academy/kekstagram';
const ErrorMessages = {
  GET_DATA: 'Не удалось загрузить фотографии',
  SEND_DATA: 'Не удалось опубликовать фотографию',
};

const getData = (onSuccess) => {
  fetch(`${URL}/data`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(ErrorMessages.GET_DATA);
      }
      return response.json();
    })
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      showAlert(ErrorMessages.GET_DATA);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(ErrorMessages.SEND_DATA);
      }
      onSuccess();
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
