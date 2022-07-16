import { shuffleArray, debounce } from './util.js';
import { renderThumbanails } from './thumbnails.js';
const COUNT_RANDOM_PHOTOS = 10;
const RERENDER_DELAY = 500;
const filterContainerNode = document.querySelector('.img-filters');
const filterButtonsNode = filterContainerNode.querySelectorAll('button');
const filterListeners = {
  'filter-default': (photos) => photos.slice(),
  'filter-random': (photos) => (shuffleArray(photos.slice()).slice(0, COUNT_RANDOM_PHOTOS)),
  'filter-discussed': (photos) => (photos.slice().sort((photo1, photo2) => (photo2.comments.length - photo1.comments.length))),
};

const initFilters = (photos) => {
  filterContainerNode.classList.remove('img-filters--inactive');
  filterButtonsNode.forEach((buttonNode) => {
    buttonNode.addEventListener('click', (evt) => {
      filterContainerNode.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      debounce(() => renderThumbanails(filterListeners[evt.target.id](photos)), RERENDER_DELAY)();
    });
  });
};

export { initFilters };
