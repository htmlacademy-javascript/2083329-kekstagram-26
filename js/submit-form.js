import { isEscapeKey } from './util.js';
import { isValidForm } from './validation-form.js';
import { sendData } from './api.js';
import { cancelPhotoEditContainer, uploadPhotoFormNode, body } from './upload-form.js';

const successContainerNode = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const successButtonNode = successContainerNode.querySelector('.success__button');
const errorContainerNode = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButtonNode = errorContainerNode.querySelector('.error__button');
const submitButtonNode = document.querySelector('#upload-submit');

// блокировка кнопки отправки
const blockSubmitButton = () => {
  submitButtonNode.disabled = true;
  submitButtonNode.textContent = 'Публикую...';
};

// разблокировка кнопки отправки
const unblockSubmitButton = () => {
  submitButtonNode.disabled = false;
  submitButtonNode.textContent = 'Опубликовать';
};

// обработчики закрытия окна об успешной отправке
const onSuccessContainerEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    cancelSuccessMessage();
  }
};

const onDocumentExceptSuccessContainerClick = (evt) => {
  if (evt.target === successContainerNode) {
    cancelSuccessMessage();
  }
};

successButtonNode.addEventListener('click', () => cancelSuccessMessage());

// функция закрытия окна об успешной отправке
function cancelSuccessMessage() {
  successContainerNode.remove();
  document.removeEventListener('keydown', onSuccessContainerEscKeydown);
  document.removeEventListener('click', onDocumentExceptSuccessContainerClick);
}

// открытие окна об успешной отправке
const showSuccessMessage = () => {
  body.append(successContainerNode);
  document.addEventListener('keydown', onSuccessContainerEscKeydown);
  document.addEventListener('click', onDocumentExceptSuccessContainerClick);
};


// обработчики закрытия окна об ошибке при отправке формы
const onErrorContainerEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    cancelErrorMessage();
  }
};

const onDocumentExceptErrorContainerClick = (evt) => {
  if (evt.target === errorContainerNode) {
    cancelErrorMessage();
  }
};

errorButtonNode.addEventListener('click', () => cancelErrorMessage());

// закрытие окна об ошибке
function cancelErrorMessage() {
  errorContainerNode.remove();
  document.removeEventListener('keydown', onErrorContainerEscKeydown);
  document.removeEventListener('click', onDocumentExceptErrorContainerClick);
}

// открытие окна при ошибке
const showErrorMessage = () => {
  body.append(errorContainerNode);
  document.addEventListener('keydown', onErrorContainerEscKeydown);
  document.addEventListener('click', onDocumentExceptErrorContainerClick);
};

const onSuccessSendForm = () => {
  cancelPhotoEditContainer();
  showSuccessMessage();
  unblockSubmitButton();
};

const onFailSendForm = () => {
  showErrorMessage();
  unblockSubmitButton();
};

const setUploadFormSubmit = () => {
  uploadPhotoFormNode.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (isValidForm()) {
      blockSubmitButton();
      sendData(onSuccessSendForm, onFailSendForm, new FormData(evt.target));
    }
  });
};

export { setUploadFormSubmit };
