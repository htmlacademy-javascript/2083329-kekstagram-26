import { shuffleArray, debounce } from './util.js';
import { renderThumbanails } from './thumbnails.js';
const COUNT_RANDOM_PHOTOS = 10;
const RERENDER_DELAY = 500;
const filtersContainerNode = document.querySelector('.img-filters');
const filtersButtonsNode = filtersContainerNode.querySelectorAll('button');
const filtersListeners = {
  'filter-default': (photos) => photos.slice(),
  'filter-random': (photos) => (shuffleArray(photos.slice()).slice(0, COUNT_RANDOM_PHOTOS)),
  'filter-discussed': (photos) => (photos.slice().sort((photo1, photo2) => (photo2.comments.length - photo1.comments.length))),
};

const debouncedFilter = debounce((idButton, photos) => renderThumbanails(filtersListeners[idButton](photos)), RERENDER_DELAY);

const initFilters = (photos) => {
  filtersContainerNode.classList.remove('img-filters--inactive');
  filtersButtonsNode.forEach((buttonNode) => {
    buttonNode.addEventListener('click', (evt) => {
      filtersContainerNode.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      debouncedFilter(evt.target.id, photos);
    });
  });
};

export { initFilters };
