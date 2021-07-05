import { isEscEvent } from '../services/utils.js';

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

  const closeFormByEscape = () => {
    if (isEscEvent) {
      form.classList.add('hidden');
      document.body.classList.remove('modal-open');
      closeButton.removeEventListener('click', closeFormByClick);
      document.removeEventListener('keydown', closeFormByEscape);
    }
  };

  input.addEventListener('change', () => {
    form.classList.remove('hidden');
    document.body.classList.add('modal-open');
    closeButton.addEventListener('click', closeFormByClick);
    document.addEventListener('keydown', closeFormByEscape);
  });
};
