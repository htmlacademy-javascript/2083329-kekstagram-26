const MAX_COUNT_HASHTAGS = 5;
const ErrorMessagesHashtags = {
  INCORRECT: 'Некорректно введен хэш-тег',
  NON_UNIQUE: 'Хэш-теги не должны повторяться',
  OVER_COUNT: `Число хэш-тегов не должно превышать ${MAX_COUNT_HASHTAGS}`,
};
const uploadPhotoFormNode = document.querySelector('#upload-select-image');
const inputHashtagNode = uploadPhotoFormNode.querySelector('.text__hashtags');

const pristine = new Pristine(uploadPhotoFormNode, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
});

const getArrayHashtags = (value) => (value.trim().toLowerCase().split(' '));

const validateHashtags = (value) => {
  const arrayHashtags = getArrayHashtags(value);
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  return value === '' || arrayHashtags.every((hashtag) => re.test(hashtag));
};

const validateUniqueHashtags = (value) => {
  const arrayHashtags = getArrayHashtags(value);
  return new Set(arrayHashtags).size === arrayHashtags.length;
};

const validateCountHashtags = (value) => {
  const arrayHashtags = getArrayHashtags(value);
  return arrayHashtags.length <= MAX_COUNT_HASHTAGS;
};

pristine.addValidator(inputHashtagNode, validateHashtags, ErrorMessagesHashtags.INCORRECT);
pristine.addValidator(inputHashtagNode, validateUniqueHashtags, ErrorMessagesHashtags.NON_UNIQUE);
pristine.addValidator(inputHashtagNode, validateCountHashtags, ErrorMessagesHashtags.OVER_COUNT);

const isValidForm = () => pristine.validate();

export { isValidForm };
