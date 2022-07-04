import { isEscapeKey } from './util.js';

const MAX_COUNT_HASHTAGS = 5;
const PhotoSizePercent = {
  MIN: 25,
  MAX: 100,
  STEP_CHANGE: 25,
};
const SettingsEffects = {
  chrome: {
    filter: 'grayscale',
    minValueSlider: 0,
    maxValueSlider: 1,
    stepSlider: 0.1,
    unitOfMeasure: '',
  },
  sepia: {
    filter: 'sepia',
    minValueSlider: 0,
    maxValueSlider: 1,
    stepSlider: 0.1,
    unitOfMeasure: '',
  },
  marvin: {
    filter: 'invert',
    minValueSlider: 0,
    maxValueSlider: 100,
    stepSlider: 1,
    unitOfMeasure: '%',
  },
  phobos: {
    filter: 'blur',
    minValueSlider: 0,
    maxValueSlider: 3,
    stepSlider: 0.1,
    unitOfMeasure: 'px',
  },
  heat: {
    filter: 'brightness',
    minValueSlider: 1,
    maxValueSlider: 3,
    stepSlider: 0.1,
    unitOfMeasure: '',
  }
};
const body = document.querySelector('body');
const uploadPhotoFormNode = document.querySelector('#upload-select-image');
const uploadPhotoFileNode = document.querySelector('#upload-file');
const photoEditContainerNode = document.querySelector('.img-upload__overlay');
const cancelPhotoButton = photoEditContainerNode.querySelector('#upload-cancel');
const inputHashtagNode = uploadPhotoFormNode.querySelector('.text__hashtags');
const inputCommentNode = uploadPhotoFormNode.querySelector('.text__description');
const photoPreviewImageNode = photoEditContainerNode.querySelector('.img-upload__preview');
const photoSizeControlNode = photoEditContainerNode.querySelector('.scale__control--value');
const increaseSizePhotoButton = photoEditContainerNode.querySelector('.scale__control--bigger');
const decreaseSizePhotoButton = photoEditContainerNode.querySelector('.scale__control--smaller');
const effectListNode = photoEditContainerNode.querySelector('.effects__list');
const effectLevelValueNode = photoEditContainerNode.querySelector('.effect-level__value');
const rangeSliderNode = photoEditContainerNode.querySelector('.effect-level__slider');
const rangeSliderContainerNode = photoEditContainerNode.querySelector('.img-upload__effect-level');


// изменение размера изображения
const photoSizeChange = (increase) => {
  let photoSizeValue = +photoSizeControlNode.value.slice(0, -1);
  if (increase) {
    if (photoSizeValue < PhotoSizePercent.MAX) {
      photoSizeValue += PhotoSizePercent.STEP_CHANGE;
    }
  } else {
    if (photoSizeValue > PhotoSizePercent.MIN) {
      photoSizeValue -= PhotoSizePercent.STEP_CHANGE;
    }
  }
  photoSizeControlNode.value = `${photoSizeValue}%`;
  photoPreviewImageNode.style.transform = `scale(${photoSizeValue / 100})`;
};

const onIncreasePhotoButtonClick = () => photoSizeChange(true);
const onDecreasePhotoButtonClick = () => photoSizeChange(false);
increaseSizePhotoButton.addEventListener('click', onIncreasePhotoButtonClick);
decreaseSizePhotoButton.addEventListener('click', onDecreasePhotoButtonClick);

// создание слайдера
noUiSlider.create(rangeSliderNode, {
  range: {
    min: 0,
    max: 1
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
});

// скрытие эффектов
const setNoneEffect = () => {
  rangeSliderContainerNode.classList.add('hidden');
  photoPreviewImageNode.className = 'img-upload__preview';
  photoPreviewImageNode.style.filter = '';
};

// смена эффектов
const onEffectListChange = (evt) => {

  const selectedEffect = evt.target.value;

  if (selectedEffect === 'none') {
    setNoneEffect();
  } else {
    // изменение настроек слайдера
    rangeSliderContainerNode.classList.remove('hidden');
    photoPreviewImageNode.className = 'img-upload__preview';
    photoPreviewImageNode.classList.add(`effects__preview--${selectedEffect}`);
    const objectSelectedEffect = SettingsEffects[selectedEffect];
    const { minValueSlider, maxValueSlider, stepSlider } = objectSelectedEffect;
    rangeSliderNode.noUiSlider.updateOptions({
      range: {
        min: minValueSlider,
        max: maxValueSlider,
      },
      start: maxValueSlider,
      step: stepSlider,
    });
    rangeSliderNode.noUiSlider.set(maxValueSlider);
  }
};

effectListNode.addEventListener('change', onEffectListChange);

// изменение интенсивности эффекта
rangeSliderNode.noUiSlider.on('update', () => {
  const valueRangeSlider = rangeSliderNode.noUiSlider.get();
  effectLevelValueNode.value = valueRangeSlider;
  const objectSelectedEffect = SettingsEffects[photoEditContainerNode.querySelector('input[name="effect"]:checked').value];
  if (objectSelectedEffect !== undefined) {
    const { filter, unitOfMeasure } = objectSelectedEffect;
    photoPreviewImageNode.style.filter = `${filter}(${valueRangeSlider}${unitOfMeasure})`;
  }
});

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
cancelPhotoButton.addEventListener('click', () => cancelPhotoEditContainer());

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
  photoSizeControlNode.value = '100%';
  setNoneEffect();
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

pristine.addValidator(inputHashtagNode, validateHashtags, 'Некорректно введен хэш-тег');
pristine.addValidator(inputHashtagNode, validateUniqueHashtags, 'Хэш-теги не должны повторяться');
pristine.addValidator(inputHashtagNode, validateCountHashtags, `Число хэш-тегов не должно превышать ${MAX_COUNT_HASHTAGS}`);

uploadPhotoFormNode.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    uploadPhotoFormNode.submit();
  }
});

