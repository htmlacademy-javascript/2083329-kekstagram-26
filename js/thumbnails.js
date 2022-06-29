import { renderFullSizePhoto } from './fullsize-photo.js';

const renderThumbanails = (photos) => {

  const thumbnailContainerNode = document.querySelector('.pictures');
  const thumbnailTemplateNode = document.querySelector('#picture').content.querySelector('.picture');
  const thumbnailFragmentNode = document.createDocumentFragment();

  photos.forEach((photo) => {
    const { url, likes, comments } = photo;
    const cloneThumbnailNode = thumbnailTemplateNode.cloneNode(true);
    cloneThumbnailNode.querySelector('img').src = url;
    cloneThumbnailNode.querySelector('.picture__likes').textContent = likes;
    cloneThumbnailNode.querySelector('.picture__comments').textContent = comments.length;
    cloneThumbnailNode.addEventListener('click', () => renderFullSizePhoto(photo));
    thumbnailFragmentNode.append(cloneThumbnailNode);
  });
  thumbnailContainerNode.append(thumbnailFragmentNode);
};

export { renderThumbanails };
