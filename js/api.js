const URL = 'https://26.javascript.pages.academy/kekstagram';
const getData = (onSuccess, onFail) => {
  fetch(`${URL}/data`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Не удалось загрузить фотографии');
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
        throw new Error('Не удалось опубликовать фотографию');
      }
      onSuccess();
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
