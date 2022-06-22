const renderPicture = (pictures) => {

  const pictureContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const pictureFragment = document.createDocumentFragment();

  pictures.forEach(({ url, likes, comments }) => {
    const clonePicture = pictureTemplate.cloneNode(true);
    clonePicture.querySelector('img').src = url;
    clonePicture.querySelector('.picture__likes').textContent = likes;
    clonePicture.querySelector('.picture__comments').textContent = comments.length;
    pictureFragment.append(clonePicture);
  });

  pictureContainer.append(pictureFragment);
};

export { renderPicture };
