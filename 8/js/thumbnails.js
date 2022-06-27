import { renderFullSizePhoto } from './fullsize-photo.js';

const renderThumbanails = (photos) => {

  const thumbnailContainer = document.querySelector('.pictures');
  const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const thumbnailFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const { url, likes, comments } = photo;
    const thumbnailCloneElement = thumbnailTemplate.cloneNode(true);
    thumbnailCloneElement.querySelector('img').src = url;
    thumbnailCloneElement.querySelector('.picture__likes').textContent = likes;
    thumbnailCloneElement.querySelector('.picture__comments').textContent = comments.length;
    thumbnailCloneElement.addEventListener('click', () => renderFullSizePhoto(photo));
    thumbnailFragment.append(thumbnailCloneElement);
  });
  thumbnailContainer.append(thumbnailFragment);
};

export { renderThumbanails };
