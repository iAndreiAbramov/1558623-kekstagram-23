import { getRandomArrayItems } from '../services/utils.js';

const filtersSection = document.querySelector('.img-filters');

export const showFilters = () => {
  filtersSection.classList.remove('img-filters--inactive');
};

export const setFiltersHandlers = (dataArray) => {
  const filtersForm = filtersSection.querySelector('.img-filters__form');
  const buttons = filtersForm.querySelectorAll('button.img-filters__button');

  const applyFilter = (evt) => {
    let filter = 'filter-default';
    buttons.forEach((button) => {
      button.classList.remove('img-filters__button--active');
    });
    if (evt.target.tagName === 'BUTTON') {
      evt.target.classList.add('img-filters__button--active');
      filter = evt.target.getAttribute('id');
      // console.log(filter);
      // console.log(Object.values(dataArray));
    }

    if (filter === 'filter-random') {
      return getRandomArrayItems(Object.values(dataArray), 10);
    }

  };

  filtersForm.addEventListener('click', applyFilter);
};

