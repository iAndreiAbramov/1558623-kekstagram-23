import { closeFormByEscape } from './set-upload-handler.js';

const form = document.querySelector('#upload-select-image');
const tagInput = form.querySelector('input[name="hashtags"]');
const commentField = form.querySelector('textarea[name="description"]');

const setCloseByescape = () => {
  document.addEventListener('keydown', closeFormByEscape);
};

const cancelCloseByescape = () => {
  document.removeEventListener('keydown', closeFormByEscape);
};

export const setInputsValidation = () => {
  commentField.addEventListener('focus', cancelCloseByescape);
  commentField.addEventListener('blur', setCloseByescape);
};

export const cancelInputsValidation = () => {

};
