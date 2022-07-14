const filtersContainerNode = document.querySelector('.img-filters');
const defaultFilterButtonNode = filtersContainerNode.querySelector('#filter-default');
const randomFilterButtonNode = filtersContainerNode.querySelector('#filter-random');
const discussedFilterButtonNode = filtersContainerNode.querySelector('#filter-discussed');

filtersContainerNode.classList.remove('img-filters--inactive');

const changeActivityButtons = (clickedButtonNode) => {
  filtersContainerNode.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  clickedButtonNode.classList.add('img-filters__button--active');
};

const setDefaultFilterButtonClick = (cb) => {
  defaultFilterButtonNode.addEventListener('click', () => {
    changeActivityButtons(defaultFilterButtonNode);
    cb();
  });
};

const setRandomtFilterButtonClick = (cb) => {
  randomFilterButtonNode.addEventListener('click', () => {
    changeActivityButtons(randomFilterButtonNode);
    cb();
  });
};

const setDiscussedFilterButtonClick = (cb) => {
  discussedFilterButtonNode.addEventListener('click', () => {
    changeActivityButtons(discussedFilterButtonNode);
    cb();
  });
};

const comparePhotos = (firstPhoto, secondPhoto) => (secondPhoto.comments.length - firstPhoto.comments.length);
export { setDefaultFilterButtonClick, setRandomtFilterButtonClick, setDiscussedFilterButtonClick, comparePhotos };
