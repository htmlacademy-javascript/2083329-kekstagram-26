import { renderFullSizePhoto } from './fullsize-photo.js';
const renderThumbanails = (photos) => {

  const thumbnailContainer = document.querySelector('.pictures');
  const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const thumbnailFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const { url, likes, comments } = photo;
    const thumbnailClone = thumbnailTemplate.cloneNode(true);
    thumbnailClone.querySelector('img').src = url;
    thumbnailClone.querySelector('.picture__likes').textContent = likes;
    thumbnailClone.querySelector('.picture__comments').textContent = comments.length;
    thumbnailClone.addEventListener('click', () => renderFullSizePhoto(photo));
    thumbnailFragment.append(thumbnailClone);
  });
  thumbnailContainer.append(thumbnailFragment);
};

export { renderThumbanails };
