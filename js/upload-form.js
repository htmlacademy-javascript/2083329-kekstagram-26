import { isEscapeKey } from './util.js';
import { resetScaleValue } from './photo-scale.js';
import { resetEffects } from './photo-effects.js';
import { showPhotoPreview, fileChooserNode } from './photo-preview.js';
const body = document.querySelector('body');
const photoEditContainerNode = document.querySelector('.img-upload__overlay');
const cancelPhotoButtonNode = photoEditContainerNode.querySelector('#upload-cancel');
const uploadPhotoFormNode = document.querySelector('#upload-select-image');
const inputCommentNode = uploadPhotoFormNode.querySelector('.text__description');
const inputHashtagNode = uploadPhotoFormNode.querySelector('.text__hashtags');

const onPhotoEditContainerEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !body.contains(document.querySelector('.error'))) {
    evt.preventDefault();
    cancelPhotoEditContainer();
  }
};

function cancelPhotoEditContainer() {
  photoEditContainerNode.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPhotoEditContainerEscKeydown);
  uploadPhotoFormNode.reset();
}
cancelPhotoButtonNode.addEventListener('click', () => cancelPhotoEditContainer());

const onFileChooserChange = () => {
  photoEditContainerNode.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPhotoEditContainerEscKeydown);
  resetScaleValue();
  resetEffects();
  showPhotoPreview();
};

fileChooserNode.addEventListener('change', onFileChooserChange);

const onFocusInputEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

inputHashtagNode.addEventListener('keydown', onFocusInputEscKeydown);
inputCommentNode.addEventListener('keydown', onFocusInputEscKeydown);

export { cancelPhotoEditContainer, uploadPhotoFormNode, body};
