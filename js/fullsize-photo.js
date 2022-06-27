import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
const photoContainer = document.querySelector('.big-picture');
const photoImg = photoContainer.querySelector('.big-picture__img img');
const photoLikesCount = photoContainer.querySelector('.likes-count');
const photoDescription = photoContainer.querySelector('.social__caption');
const cancelPhotoButton = photoContainer.querySelector('#picture-cancel');
const commentCount = photoContainer.querySelector('.social__comment-count');
const commentLoader = photoContainer.querySelector('.comments-loader');
const commentContainer = photoContainer.querySelector('.social__comments');
const commentElement = photoContainer.querySelector('.social__comment');
const commentFragment = document.createDocumentFragment();

// закрытие формы полноэкранного изображения
const onPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    cancelPhotoContainer();
  }
};

function cancelPhotoContainer () {
  photoContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPhotoEscKeydown);
}

cancelPhotoButton.addEventListener('click', cancelPhotoContainer);

// отрисовка полноэкранного изображения
const renderFullSizePhoto = ({ url, likes, description, comments }) => {

  photoContainer.classList.remove('hidden');
  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  body.classList.add('modal-open');

  photoImg.src = url;
  photoLikesCount.textContent = likes;
  photoDescription.textContent = description;

  comments.forEach(({ message, avatar, name }) => {
    const commentCloneElement = commentElement.cloneNode(true);
    const commentCloneAvatar = commentCloneElement.querySelector('img');
    commentCloneAvatar.src = avatar;
    commentCloneAvatar.alt = name;
    commentCloneElement.querySelector('.social__text').textContent = message;
    commentFragment.append(commentCloneElement);
  });
  commentContainer.innerHTML = '';
  commentContainer.append(commentFragment);

  document.addEventListener('keydown', onPhotoEscKeydown);

};

export { renderFullSizePhoto };
