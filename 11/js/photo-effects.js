const settingsEffects = {
  chrome: {
    filter: 'grayscale',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
  },
  heat: {
    filter: 'brightness',
    unit: '',
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
  }
};
const photoPreviewImageNode = document.querySelector('.img-upload__preview img');
const effectListNode = document.querySelector('.effects__list');
const effectLevelValueNode = document.querySelector('.effect-level__value');
const rangeSliderNode = document.querySelector('.effect-level__slider');
const rangeSliderContainerNode = document.querySelector('.img-upload__effect-level');

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
const resetEffects = () => {
  rangeSliderNode.setAttribute('disabled', true);
  rangeSliderContainerNode.classList.add('hidden');
  photoPreviewImageNode.className = 'img-upload__preview';
  photoPreviewImageNode.style.filter = '';
  effectLevelValueNode.value = '';
};

// смена эффектов
const onEffectListChange = (evt) => {

  const selectedEffect = evt.target.value;
  if (selectedEffect === 'none') {
    resetEffects();
  } else {
    // изменение настроек слайдера
    rangeSliderNode.removeAttribute('disabled');
    rangeSliderContainerNode.classList.remove('hidden');
    photoPreviewImageNode.className = 'img-upload__preview';
    photoPreviewImageNode.classList.add(`effects__preview--${selectedEffect}`);
    rangeSliderNode.noUiSlider.updateOptions(settingsEffects[selectedEffect].options);
  }

};

effectListNode.addEventListener('change', onEffectListChange);

// изменение интенсивности эффекта
rangeSliderNode.noUiSlider.on('update', () => {

  const valueRangeSlider = rangeSliderNode.noUiSlider.get();
  effectLevelValueNode.value = valueRangeSlider;

  const effectCheckedValueNode = document.querySelector('input[name="effect"]:checked');
  if (effectCheckedValueNode && effectCheckedValueNode.value !== 'none') {
    const { filter, unit } = settingsEffects[effectCheckedValueNode.value];
    photoPreviewImageNode.style.filter = `${filter}(${valueRangeSlider}${unit})`;
  }
});

export { resetEffects };
