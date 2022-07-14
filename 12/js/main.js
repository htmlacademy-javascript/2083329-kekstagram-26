import { getData } from './api.js';
import { renderThumbanails } from './thumbnails.js';
import { setUploadFormSubmit } from './upload-form.js';
import { showAlert, shuffleArray, debounce } from './util.js';
import { setDefaultFilterButtonClick, setRandomtFilterButtonClick, setDiscussedFilterButtonClick, comparePhotos } from './photo-filters.js';
const RERENDER_DELAY = 500;
const COUNT_RANDOM_PHOTOS = 10;

getData((photos) => {
  renderThumbanails(photos);
  setDefaultFilterButtonClick(debounce(
    () => renderThumbanails(photos),
    RERENDER_DELAY,
  ));
  setRandomtFilterButtonClick(debounce(
    () => renderThumbanails(shuffleArray(photos.slice()).slice(0, COUNT_RANDOM_PHOTOS)),
    RERENDER_DELAY,
  ));
  setDiscussedFilterButtonClick(debounce(
    () => renderThumbanails((photos.slice().sort(comparePhotos))),
    RERENDER_DELAY,
  ));
},
showAlert);

setUploadFormSubmit();
