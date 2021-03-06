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

const onPhotoContainerEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    cancelPhotoContainer();
  }
};

cancelPhotoButtonNode.addEventListener('click', () => cancelPhotoContainer());

function cancelPhotoContainer() {
  photoContainerNode.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPhotoContainerEscKeydown);
  commentsLoaderButtonNode.onclick = null;
}

const renderComment = ({ avatar, name, message }) => {
  const cloneCommentItemNode = commentItemNode.cloneNode(true);
  const cloneCommentAvatarNode = cloneCommentItemNode.querySelector('img');
  cloneCommentAvatarNode.src = avatar;
  cloneCommentAvatarNode.alt = name;
  cloneCommentItemNode.querySelector('.social__text').textContent = message;
  commentsFragmentNode.append(cloneCommentItemNode);
};

const renderFullSizePhoto = ({ url, likes, description, comments }) => {

  let countComments = 0;

  photoContainerNode.classList.remove('hidden');
  body.classList.add('modal-open');
  photoImgNode.src = url;
  photoLikesNode.textContent = likes;
  photoDescriptionNode.textContent = description;

  const renderComments = () => {
    countComments += COUNT_ADDED_COMMENTS;
    comments.slice(0, countComments).forEach((comment) => renderComment(comment));
    commentsContainerNode.innerHTML = '';
    commentsContainerNode.append(commentsFragmentNode);

    if (countComments < comments.length) {
      commentsLoaderButtonNode.classList.remove('hidden');
      commentsCountNode.textContent = `${countComments} ???? ${comments.length} ????????????????????????`;
    } else {
      commentsLoaderButtonNode.classList.add('hidden');
      commentsCountNode.textContent = `${comments.length} ???? ${comments.length} ????????????????????????`;
    }
  };

  renderComments(comments, countComments);
  // ?????? ???????????????????? ?????????????????????? ?????????????????????? onclick, ?????? ?????????????????????? ???????????????? ?????????? ??????????????????????
  commentsLoaderButtonNode.onclick = () => {
    renderComments(comments, countComments);
  };
  document.addEventListener('keydown', onPhotoContainerEscKeydown);
};

export { renderFullSizePhoto };
