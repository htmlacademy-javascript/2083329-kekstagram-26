import { isEscapeKey } from './util.js';

const MAX_COUNT_HASHTAGS = 5;
const body = document.querySelector('body');
const uploadPhotoForm = document.querySelector('#upload-select-image');
const uploadPhotoFile = document.querySelector('#upload-file');
const photoEditContainer = document.querySelector('.img-upload__overlay');
const cancelPhotoButton = photoEditContainer.querySelector('#upload-cancel');
const hashtagsText = uploadPhotoForm.querySelector('.text__hashtags');
const commentText = uploadPhotoForm.querySelector('.text__description');

// закрытие формы редактирования изображения
const onPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)
    && document.activeElement !== hashtagsText
    && document.activeElement !== commentText) {
    evt.preventDefault();
    cancelPhotoContainer();
  }
};

function cancelPhotoContainer() {
  photoEditContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPhotoEscKeydown);
  uploadPhotoFile.value = '';
  hashtagsText.value = '';
  commentText.value = '';
}
cancelPhotoButton.addEventListener('click', cancelPhotoContainer);

// открытие формы редактирования изображения
const onUploadFileChange = () => {
  photoEditContainer.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPhotoEscKeydown);
};
uploadPhotoFile.addEventListener('change', onUploadFileChange);

// валидация и отправка формы
const pristine = new Pristine(uploadPhotoForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const validateHashtagsText = (text) => {
  if (text === '') {
    return true;
  }
  const arrayHashtags = text.trim().toLowerCase().split(' ');
  if (arrayHashtags.length > MAX_COUNT_HASHTAGS) {
    return false;
  }
  if (new Set(arrayHashtags).size !== arrayHashtags.length) {
    return false;
  }
  return arrayHashtags.every((hashtag) => /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/.test(hashtag));
};

pristine.addValidator(
  hashtagsText,
  validateHashtagsText,
  'Некорректно введены хэштеги'
);

uploadPhotoForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    uploadPhotoForm.submit();
  }
});

