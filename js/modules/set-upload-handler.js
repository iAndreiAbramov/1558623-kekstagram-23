import { isEscEvent } from '../services/utils.js';
import { setInitialEffects, setEffectsChangeHandlers, removeEffectsChangeHandlers } from './image-effects.js';
import { removeSlider } from './no-ui-slider.js';
import { setInputsValidation, cancelInputsValidation } from './inputs-validation.js';

const input = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('#upload-cancel');

const closeForm = () => {
  form.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // eslint-disable-next-line no-use-before-define
  closeButton.removeEventListener('click', closeFormByClick);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', closeFormByEscape);
  removeEffectsChangeHandlers();
  removeSlider();
  cancelInputsValidation();
};

const closeFormByClick = () => {
  closeForm();
};

export const closeFormByEscape = (evt) => {
  if (isEscEvent(evt)) {
    closeForm();
  }
};

export const setUploadHandler = () => {
  input.addEventListener('input', () => {
    setInitialEffects();
    setEffectsChangeHandlers();
    setInputsValidation();
    form.classList.remove('hidden');
    document.body.classList.add('modal-open');
    closeButton.addEventListener('click', closeFormByClick);
    document.addEventListener('keydown', closeFormByEscape);
  });
};
