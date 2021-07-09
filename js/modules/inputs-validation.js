import { uniqueTag } from '../services/utils.js';
import { closeFormByEscape } from './set-upload-handler.js';

const form = document.querySelector('#upload-select-image');
const tagInput = form.querySelector('input[name="hashtags"]');
const commentField = form.querySelector('textarea[name="description"]');

const setCloseByEscape = () => {
  document.addEventListener('keydown', closeFormByEscape);
};

const cancelCloseByEscape = () => {
  document.removeEventListener('keydown', closeFormByEscape);
};

const checkTags = (evt) => {
  const value = evt.target.value.replace(/ +/g, ' ').trim();
  const tagsArray = value.split(' ');
  const invalidities = [];

  if (tagsArray.some((item) => !item.startsWith('#'))) {
    invalidities.push('Каждый тэг должен начинаться с символа #');
  } else if (tagsArray.some((item) => (/#{2,}/g).test(item))) {
    invalidities.push('Символ # не должен дублироваться');
  } else if (tagsArray.some((item) => (/[^a-zа-яё0-9]/gi).test(item.replace(/#/, '')))) {
    invalidities.push('После символа # допускаются только буквы или цифры');
  }
  if (tagsArray.some((item) => item === '#')) {
    invalidities.push('Хеш-тег не может состоять только из #');
  }
  if (tagsArray.some((item) => item.length > 20)) {
    invalidities.push('Максимальная длина одного хэш-тега 20 символов, включая #');
  }
  if (tagsArray.some((item, i, array) => !uniqueTag(item, array))) {
    invalidities.push('Один и тот же хэш-тег не может быть использован дважды');
  }
  if (tagsArray.length > 5) {
    invalidities.push('Нельзя указать больше 5 хэш-тегов');
  }

  if (invalidities.length === 0 || evt.target.value.length === 0) {
    evt.target.setCustomValidity('');
  } else {
    const report = invalidities.join('\n');
    evt.target.setCustomValidity(report);
  }
  evt.target.reportValidity();
};

export const setInputsValidation = () => {
  tagInput.addEventListener('focus', cancelCloseByEscape);
  tagInput.addEventListener('blur', setCloseByEscape);
  commentField.addEventListener('focus', cancelCloseByEscape);
  commentField.addEventListener('blur', setCloseByEscape);
  tagInput.addEventListener('input', checkTags);
};

export const cancelInputsValidation = () => {
  tagInput.removeEventListener('input', checkTags);
  tagInput.removeEventListener('focus', cancelCloseByEscape);
  tagInput.removeEventListener('blur', setCloseByEscape);
  commentField.removeEventListener('focus', cancelCloseByEscape);
  commentField.removeEventListener('blur', setCloseByEscape);
};
