import { isEscEvent } from '../services/utils.js';
import { setInitialEffects, setEffectsChangeHandlers } from './image-effects.js';

export const setUploadHandler = () => {
  const input = document.querySelector('#upload-file');
  const form = document.querySelector('.img-upload__overlay');
  const closeButton = form.querySelector('#upload-cancel');

  const closeFormByClick = () => {
    form.classList.add('hidden');
    document.body.classList.remove('modal-open');
    closeButton.removeEventListener('click', closeFormByClick);
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('keydown', closeFormByEscape);
  };

  const closeFormByEscape = (evt) => {
    if (isEscEvent(evt)) {
      form.classList.add('hidden');
      document.body.classList.remove('modal-open');
      closeButton.removeEventListener('click', closeFormByClick);
      document.removeEventListener('keydown', closeFormByEscape);
    }
  };

  input.addEventListener('change', () => {
    setInitialEffects();
    setEffectsChangeHandlers();
    form.classList.remove('hidden');
    document.body.classList.add('modal-open');
    closeButton.addEventListener('click', closeFormByClick);
    document.addEventListener('keydown', closeFormByEscape);
  });
};
