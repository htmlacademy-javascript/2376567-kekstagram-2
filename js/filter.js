import { getRandomInt, debounce } from './utils.js';
import { renderPhotos } from './preview.js';
import { renderModal } from './modal.js';

const QUANITY_PICTURES = 10;

const RERENDER_DELAY = 500;

const imgFiltersElement = document.querySelector('.img-filters');

let currentData;

const getRandomPictures = (pictures) => {
  const uniqueValues = new Set();
  pictures.forEach(() => {
    if (uniqueValues.size < QUANITY_PICTURES) {
      const randomValue = pictures[getRandomInt(0, pictures.length - 1)];
      uniqueValues.add(randomValue);
    }
  });
  return Array.from(uniqueValues);
};

const getPopularPictures = (pictures) => pictures.slice().sort((elementA,elementB) => elementB.comments.length - elementA.comments.length);

const debouncedFunction = debounce((button) => {

  let filteredData;

  if (button.id === 'filter-default') {
    filteredData = currentData;
  }
  if (button.id === 'filter-random') {
    filteredData = getRandomPictures(currentData);
  }
  if (button.id === 'filter-discussed') {
    filteredData = getPopularPictures(currentData);
  }

  renderPhotos(filteredData);
  renderModal(filteredData);

}, RERENDER_DELAY);

imgFiltersElement.addEventListener('click', (evt) => {

  const filterButton = evt.target.closest('button.img-filters__button');

  if (filterButton) {
    const allFilterButtons = document.querySelectorAll('.img-filters__button');
    allFilterButtons.forEach((button) => {
      button.classList.remove('img-filters__button--active');
    });
    filterButton.classList.add('img-filters__button--active');
    debouncedFunction(filterButton);
  }
});

const loadFilter = (data) => {
  currentData = data;
  imgFiltersElement.classList.remove('img-filters--inactive');
  renderPhotos(currentData);
  renderModal(currentData);
};

export { loadFilter };
