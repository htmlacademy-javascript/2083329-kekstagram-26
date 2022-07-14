const URL = 'https://26.javascript.pages.academy/kekstagram';
const MessagesError = {
  GET_DATA: 'Не удалось загрузить фотографии',
  SEND_DATA: 'Не удалось опубликовать фотографию',
};

const getData = (onSuccess, onFail) => {
  fetch(`${URL}/data`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(MessagesError.GET_DATA);
      }
      return response.json();
    })
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      onFail();
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
        throw new Error(MessagesError.SEND_DATA);
      }
      onSuccess();
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
