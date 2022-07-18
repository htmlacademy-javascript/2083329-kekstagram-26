const ScaleSettings = {
  MIN: 25,
  MAX: 100,
  STEP_CHANGE: 25,
};
const photoPreviewImageNode = document.querySelector('.img-upload__preview img');
const photoScaleControlNode = document.querySelector('.scale__control--value');
const increaseScaleButtonNode = document.querySelector('.scale__control--bigger');
const decreaseScaleButtonNode = document.querySelector('.scale__control--smaller');

const resetScaleValue = () => {
  photoScaleControlNode.value = `${ScaleSettings.MAX}%`;
  photoPreviewImageNode.style.transform = '';
};

const changeScaleValue = (increase) => {
  let photoScaleValue = parseInt(photoScaleControlNode.value, 10);
  if (increase) {
    if (photoScaleValue < ScaleSettings.MAX) {
      photoScaleValue += ScaleSettings.STEP_CHANGE;
    }
  } else {
    if (photoScaleValue > ScaleSettings.MIN) {
      photoScaleValue -= ScaleSettings.STEP_CHANGE;
    }
  }
  photoScaleControlNode.value = `${photoScaleValue}%`;
  photoPreviewImageNode.style.transform = `scale(${photoScaleValue / 100})`;
};

const onIncreaseScaleButtonClick = () => changeScaleValue(true);
const onDecreaseScaleButtonClick = () => changeScaleValue(false);
increaseScaleButtonNode.addEventListener('click', onIncreaseScaleButtonClick);
decreaseScaleButtonNode.addEventListener('click', onDecreaseScaleButtonClick);

export { resetScaleValue };
