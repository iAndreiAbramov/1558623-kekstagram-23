import { postData } from '../services/post-data.js';
import { isEscEvent } from '../services/utils.js';
import { POST_PHOTO_URL } from '../settings/settings.js';
import { form, submitBtn } from './inputs-validation.js';
import { closeForm, closeFormByEscape } from './set-upload-handler.js';

const showMessage = (isSuccess) => {
  const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode('true');
  const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode('true');
  const statusMessage = (isSuccess) ? successMessage : errorMessage;
  statusMessage.style.zIndex = '999';
  document.body.appendChild(statusMessage);
  document.removeEventListener('keydown', closeFormByEscape);
  submitBtn.disabled = true;
  const removeMessageByEscape = (evt) => {
    if (isEscEvent(evt)) {
      statusMessage.remove();
      submitBtn.disabled = false;
      document.removeEventListener('keydown', removeMessageByEscape);
      document.addEventListener('keydown', closeFormByEscape);
    }
  };
  const removeMessageByClick = (evt) => {
    if (evt.target.tagName === 'SECTION' || evt.target.tagName === 'BUTTON') {
      statusMessage.remove();
      submitBtn.disabled = false;
      document.removeEventListener('keydown', removeMessageByEscape);
      document.addEventListener('keydown', closeFormByEscape);
    }
  };

  statusMessage.addEventListener('click', removeMessageByClick);
  document.addEventListener('keydown', removeMessageByEscape);
};

const closeFormOnSuccess = (isSuccess) => {
  if (isSuccess) {
    closeForm();
  }
};

const sendData = (evt) => {
  evt.preventDefault();
  const formData = new FormData(form);
  postData(POST_PHOTO_URL, formData)
    .then((response) => {
      showMessage(response.ok);
      closeFormOnSuccess(response.ok);
    });
};

export const replaceSubmitHandler = () => {
  form.addEventListener('submit', sendData);
};

export const removeSubmitHandler = () => {
  form.removeEventListener('submit', sendData);
};
