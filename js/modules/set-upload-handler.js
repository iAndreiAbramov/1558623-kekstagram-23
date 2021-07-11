import { isEscEvent } from '../services/utils.js';
import { setInitialEffects, setEffectsChangeHandlers, removeEffectsChangeHandlers } from './image-effects.js';
import { removeSlider } from './no-ui-slider.js';
import { setInputsValidation, cancelInputsValidation } from './inputs-validation.js';
import { removeSubmitHandler, replaceSubmitHandler } from './forms.js';
import { IMAGE_TYPES } from '../settings/settings.js';

const form = document.querySelector('#upload-select-image');
const input = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const closeButton = overlay.querySelector('#upload-cancel');
const preview = overlay.querySelector('.img-upload__preview');
const miniPreview = overlay.querySelectorAll('.effects__preview');

export const closeForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // eslint-disable-next-line no-use-before-define
  closeButton.removeEventListener('click', closeFormByClick);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', closeFormByEscape);
  form.reset();
  removeEffectsChangeHandlers();
  removeSlider();
  cancelInputsValidation();
  removeSubmitHandler();
};

const closeFormByClick = () => {
  closeForm();
};

const showImagePreview = () => {
  const img = preview.querySelector('img');
  const file = input.files[0];
  const fileName = input.files[0].name;
  const matches = IMAGE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    const url = URL.createObjectURL(file);
    img.setAttribute('src', url);
    miniPreview.forEach((element) => {
      element.style.backgroundImage = `url(${url})`;
    });
  }
};

export const closeFormByEscape = (evt) => {
  if (isEscEvent(evt)) {
    closeForm();
  }
};

export const setUploadHandler = () => {
  input.addEventListener('input', () => {
    setInitialEffects();
    showImagePreview();
    setEffectsChangeHandlers();
    setInputsValidation();
    replaceSubmitHandler();
    overlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    closeButton.addEventListener('click', closeFormByClick);
    document.addEventListener('keydown', closeFormByEscape);
  });
};
