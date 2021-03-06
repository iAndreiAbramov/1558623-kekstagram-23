// Common settings
export const PERCENT_MULTIPLIER = 100;

// Filter settings
export const NUMBER_OF_RANDOM_IMAGES = 10;

// URL settings
export const GET_PHOTO_URL = 'https://23.javascript.pages.academy/kekstagram/data';
export const POST_PHOTO_URL = 'https://23.javascript.pages.academy/kekstagram';

// Comments settings
export const COMMENTS_TO_SHOW = 5;
export const COMMENTS_ADDING_STEP = 5;

// Scale settings
export const MAX_SCALE = 1;
export const MIN_SCALE = 0.25;
export const DEFAULT_SCALE = 1;
export const SCALE_CHANGE_STEP = 0.25;

// Image type settings
export const IMAGE_TYPES = ['.jpg', '.jpeg', '.gif', '.png'];

// Slider settings
export const SLIDER_EFFECTS = {
  chrome: {
    className: 'effects__preview--chrome',
    filter: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
  },
  sepia: {
    className: 'effects__preview--sepia',
    filter: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
  },
  marvin: {
    className: 'effects__preview--marvin',
    filter: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
  },
  phobos: {
    className: 'effects__preview--phobos',
    filter: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1,
  },
  heat: {
    className: 'effects__preview--heat',
    filter: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1,
  },
};
