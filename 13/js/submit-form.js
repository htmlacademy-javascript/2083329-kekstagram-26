import { isEscapeKey } from './util.js';
import { isValidForm } from './validation-form.js';
import { sendData } from './api.js';
import { cancelPhotoEditContainer, uploadPhotoFormNode, body } from './upload-form.js';
const successContainerNode = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const successButtonNode = successContainerNode.querySelector('.success__button');
const errorContainerNode = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButtonNode = errorContainerNode.querySelector('.error__button');
const submitButtonNode = document.querySelector('#upload-submit');

const blockSubmitButton = () => {
  submitButtonNode.disabled = true;
  submitButtonNode.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButtonNode.disabled = false;
  submitButtonNode.textContent = 'Опубликовать';
};

const onSuccessContainerEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    cancelSuccessMessage();
  }
};

const onOutSuccessContainerClick = (evt) => {
  if (evt.target === successContainerNode) {
    cancelSuccessMessage();
  }
};

successButtonNode.addEventListener('click', () => cancelSuccessMessage());

function cancelSuccessMessage() {
  successContainerNode.remove();
  document.removeEventListener('keydown', onSuccessContainerEscKeydown);
  document.removeEventListener('click', onOutSuccessContainerClick);
}

const showSuccessMessage = () => {
  body.append(successContainerNode);
  document.addEventListener('keydown', onSuccessContainerEscKeydown);
  document.addEventListener('click', onOutSuccessContainerClick);
};

const onErrorContainerEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    cancelErrorMessage();
  }
};

const onOutErrorContainerClick = (evt) => {
  if (evt.target === errorContainerNode) {
    cancelErrorMessage();
  }
};

errorButtonNode.addEventListener('click', () => cancelErrorMessage());

function cancelErrorMessage() {
  errorContainerNode.remove();
  document.removeEventListener('keydown', onErrorContainerEscKeydown);
  document.removeEventListener('click', onOutErrorContainerClick);
}

const showErrorMessage = () => {
  body.append(errorContainerNode);
  document.addEventListener('keydown', onErrorContainerEscKeydown);
  document.addEventListener('click', onOutErrorContainerClick);
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
