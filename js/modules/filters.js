import { debounce, getRandomArrayItems, sortArrayByComments } from '../services/utils.js';
import { NUMBER_OF_RANDOM_IMAGES } from '../settings/settings.js';
import { cachedData, renderImages } from './render-images.js';

const filtersSection = document.querySelector('.img-filters');
const filtersForm = filtersSection.querySelector('.img-filters__form');
const buttons = filtersForm.querySelectorAll('button.img-filters__button');

const showFilters = () => {
  filtersSection.classList.remove('img-filters--inactive');
};

const markActiveFilter = (evt) => {
  buttons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  if (evt.target.tagName === 'BUTTON') {
    evt.target.classList.add('img-filters__button--active');
  }
};

const getFilteredData = (evt) => {
  const dataArray = [...cachedData];
  let filter;
  let filteredImages = dataArray;

  if (evt.target.tagName === 'BUTTON') {
    filter = evt.target.getAttribute('id');
  }
  if (filter === 'filter-random') {
    filteredImages = getRandomArrayItems(dataArray, NUMBER_OF_RANDOM_IMAGES);
  }
  if (filter === 'filter-discussed') {
    filteredImages = sortArrayByComments(dataArray);
  }

  return filteredImages;
};

const clearPictures = (evt) => {
  const pictures = document.querySelectorAll('.picture');
  if (evt.target.tagName === 'BUTTON') {
    pictures.forEach((picture) => picture.remove());
  }
};

const setFiltersHandlers = () => {
  filtersForm.addEventListener('click', (evt) => {
    const filteredData = getFilteredData(evt);
    markActiveFilter(evt);
    getFilteredData(evt);
    clearPictures(evt);
    renderImages(filteredData);
    // debugger;
    debounce(() =>  renderImages(filteredData), 500);

    // setTimeout(() => renderImages(filteredData), 500);
  });
};

export { showFilters, setFiltersHandlers };
