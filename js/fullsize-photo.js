import { isEscapeKey } from './util.js';

const COUNT_ADDED_COMMENTS = 5;
const body = document.querySelector('body');
const photoContainerNode = document.querySelector('.big-picture');
const photoImgNode = photoContainerNode.querySelector('.big-picture__img img');
const photoLikesNode = photoContainerNode.querySelector('.likes-count');
const photoDescriptionNode = photoContainerNode.querySelector('.social__caption');
const cancelPhotoButtonNode = photoContainerNode.querySelector('#picture-cancel');
const commentsCountNode = photoContainerNode.querySelector('.social__comment-count');
const commentsLoaderButtonNode = photoContainerNode.querySelector('.social__comments-loader');
const commentsContainerNode = photoContainerNode.querySelector('.social__comments');
const commentsFragmentNode = document.createDocumentFragment();
const commentItemNode = photoContainerNode.querySelector('.social__comment');

// закрытие формы полноэкранного изображения
const onPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCancelPhotoButtonClick();
  }
};
cancelPhotoButtonNode.addEventListener('click', onCancelPhotoButtonClick);
function onCancelPhotoButtonClick() {
  photoContainerNode.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPhotoEscKeydown);
}

// отрисовка отдельного комментария
const renderComment = ({ avatar, name, message }) => {
  const cloneCommentItemNode = commentItemNode.cloneNode(true);
  const cloneCommentAvatarNode = cloneCommentItemNode.querySelector('img');
  cloneCommentAvatarNode.src = avatar;
  cloneCommentAvatarNode.alt = name;
  cloneCommentItemNode.querySelector('.social__text').textContent = message;
  commentsFragmentNode.append(cloneCommentItemNode);
};

// отрисовка комментариев
const renderComments = (comments, countClickLoadComments) => {
  let countComment = 0;
  const countLoadComments = countClickLoadComments * COUNT_ADDED_COMMENTS;
  const countCommentsTotal = comments.length;
  if (countCommentsTotal <= countLoadComments) {
    commentsLoaderButtonNode.classList.add('hidden');
  } else {
    commentsLoaderButtonNode.classList.remove('hidden');
  }
  for (let i = 0; i < (countCommentsTotal <= countLoadComments ? countCommentsTotal : countLoadComments); i++) {
    renderComment(comments[i]);
    countComment++;
  }
  commentsCountNode.textContent = `${countComment} из ${countCommentsTotal} комментариев`;
  commentsContainerNode.innerHTML = '';
  commentsContainerNode.append(commentsFragmentNode);
};

// отрисовка полноэкранного изображения
const renderFullSizePhoto = ({ url, likes, description, comments }) => {
  let countClickLoadComments = 1;
  photoContainerNode.classList.remove('hidden');
  body.classList.add('modal-open');

  photoImgNode.src = url;
  photoLikesNode.textContent = likes;
  photoDescriptionNode.textContent = description;

  renderComments(comments, countClickLoadComments);
  commentsLoaderButtonNode.addEventListener('click', () => {
    countClickLoadComments++;
    renderComments(comments, countClickLoadComments);
  });
  document.addEventListener('keydown', onPhotoEscKeydown);
};

export { renderFullSizePhoto };
