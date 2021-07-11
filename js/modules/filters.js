import { getRandomArrayItems, sortArrayByComments } from '../services/utils.js';
import { NUMBER_OF_RANDOM_IMAGES } from '../settings/settings.js';

const filtersSection = document.querySelector('.img-filters');

export const showFilters = () => {
  filtersSection.classList.remove('img-filters--inactive');
};

export const setFiltersHandlers = (dataObj) => {
  const filtersForm = filtersSection.querySelector('.img-filters__form');
  const buttons = filtersForm.querySelectorAll('button.img-filters__button');

  const applyFilter = (evt) => {
    console.log(dataObj);
    const filteredImages = {};
    let filter = 'filter-default';

    buttons.forEach((button) => {
      button.classList.remove('img-filters__button--active');
    });
    if (evt.target.tagName === 'BUTTON') {
      evt.target.classList.add('img-filters__button--active');
      filter = evt.target.getAttribute('id');
    }

    if (filter === 'filter-default') {
      return dataObj;
    }

    if (filter === 'filter-random') {
      const randomImages = getRandomArrayItems(Object.values(dataObj), NUMBER_OF_RANDOM_IMAGES);
      randomImages.forEach((image) => {
        filteredImages[image.id] = image;
      });
      return filteredImages;
    }

    if (filter === 'filter-discussed') {
      const discussedImages = sortArrayByComments(Object.values(dataObj), 'comments');
      console.log(discussedImages);
      return discussedImages;
    }
  };

  filtersForm.addEventListener('click', applyFilter);
};

