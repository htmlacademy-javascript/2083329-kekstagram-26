const renderFullSizePicture = (photos) => {

  const body = document.querySelector('body');
  const pictureList = document.querySelectorAll('.picture');
  const pictureContainer = document.querySelector('.big-picture');
  const pictureCloseButton = pictureContainer.querySelector('#picture-cancel');
  const pictureImg = pictureContainer.querySelector('.big-picture__img').querySelector('img');
  const pictureLikesCount = pictureContainer.querySelector('.likes-count');
  const pictureDescription = pictureContainer.querySelector('.social__caption');
  const commentCount = pictureContainer.querySelector('.social__comment-count');
  const commentLoader = pictureContainer.querySelector('.comments-loader');
  const commentContainer = pictureContainer.querySelector('.social__comments');

  const addPictureClickHandler = (picture, { url, likes, description, comments }) => {
    picture.addEventListener('click', () => {

      pictureContainer.classList.remove('hidden');
      commentCount.classList.add('hidden');
      commentLoader.classList.add('hidden');
      body.classList.add('modal-open');

      pictureImg.src = url;
      pictureLikesCount.textContent = likes;
      pictureDescription.textContent = description;

      commentContainer.innerHTML = '';
      comments.forEach(({ message, avatar, name }) => {
        commentContainer.insertAdjacentHTML('afterbegin',
          `<li class="social__comment">
            <img class="social__picture" src=${avatar} alt=${name} width="35" height="35">
            <p class="social__text">${message}</p>
          </li>`);
      });
    });
  };

  for (let i = 0; i < pictureList.length; i++) {
    addPictureClickHandler(pictureList[i], photos[i]);
  }

  const closePicture = (evt) => {
    if (evt.key === 'Escape' || evt.target === pictureCloseButton) {
      pictureContainer.classList.add('hidden');
      body.classList.remove('modal-open');
    }
  };
  pictureCloseButton.addEventListener('click', closePicture);
  document.addEventListener('keydown', closePicture);

};

export { renderFullSizePicture };
