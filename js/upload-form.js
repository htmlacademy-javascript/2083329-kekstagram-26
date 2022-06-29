import { isEscapeKey } from './util.js';

const MAX_COUNT_HASHTAGS = 5;
const body = document.querySelector('body');
const uploadPhotoFormNode = document.querySelector('#upload-select-image');
const uploadPhotoFileNode = document.querySelector('#upload-file');
const photoEditContainerNode = document.querySelector('.img-upload__overlay');
const cancelPhotoButtonNode = photoEditContainerNode.querySelector('#upload-cancel');
const inputHashtagNode = uploadPhotoFormNode.querySelector('.text__hashtags');
const inputCommentNode = uploadPhotoFormNode.querySelector('.text__description');

// закрытие формы редактирования изображения
const onPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    cancelPhotoEditContainer();
  }
};

function cancelPhotoEditContainer() {
  photoEditContainerNode.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPhotoEscKeydown);
  uploadPhotoFormNode.reset();
}
cancelPhotoButtonNode.addEventListener('click', () => cancelPhotoEditContainer());

// предотвращение закрытия формы при фокусе на полях ввода
const onFocusInputEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};
inputHashtagNode.addEventListener('keydown', onFocusInputEscKeydown);
inputCommentNode.addEventListener('keydown', onFocusInputEscKeydown);

// открытие формы редактирования изображения
const onUploadFileChange = () => {
  photoEditContainerNode.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPhotoEscKeydown);
};
uploadPhotoFileNode.addEventListener('change', onUploadFileChange);

// валидация и отправка формы
const pristine = new Pristine(uploadPhotoFormNode, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const getArrayHashtags = (value) => (value.trim().toLowerCase().split(' '));

const validateHashtags = (value) => {
  const arrayHashtags = getArrayHashtags(value);
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  return value === ''|| arrayHashtags.every((hashtag) => re.test(hashtag));
};

const validateUniqueHashtags = (value) => {
  const arrayHashtags = getArrayHashtags(value);
  return new Set(arrayHashtags).size === arrayHashtags.length;
};

const validateCountHashtags = (value) => {
  const arrayHashtags = getArrayHashtags(value);
  return arrayHashtags.length <= MAX_COUNT_HASHTAGS;
};

pristine.addValidator(inputHashtagNode, validateHashtags, 'Некорректно введен хэш-тег');
pristine.addValidator(inputHashtagNode, validateUniqueHashtags, 'Хэш-теги не должны повторяться');
pristine.addValidator(inputHashtagNode, validateCountHashtags, `Число хэш-тегов не должно превышать ${MAX_COUNT_HASHTAGS}`);

uploadPhotoFormNode.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    uploadPhotoFormNode.submit();
  }
});

