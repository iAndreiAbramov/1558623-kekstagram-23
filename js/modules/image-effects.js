import { DEFAULT_SCALE, MAX_SCALE, MIN_SCALE, SCALE_CHANGE_STEP, PERCENT_MULTIPLIER } from '../settings/settings.js';

const imgOverlay = document.querySelector('.img-upload__overlay');
const img = imgOverlay.querySelector('.img-upload__preview img');
const minusBtn = imgOverlay.querySelector('.scale__control--smaller');
const plusBtn = imgOverlay.querySelector('.scale__control--bigger');
const scaleValueField = imgOverlay.querySelector('.scale__control--value');
const effectsListElement = imgOverlay.querySelector('.effects__list');
let currentScale = DEFAULT_SCALE;

const renderScale = (evt) => {
  let step = SCALE_CHANGE_STEP;
  if (evt.target === minusBtn) {
    step = -SCALE_CHANGE_STEP;
  }
  currentScale += step;
  if (currentScale < MIN_SCALE) {
    currentScale = MIN_SCALE;
  }
  if (currentScale > MAX_SCALE) {
    currentScale = MAX_SCALE;
  }

  img.style.transform = `scale(${currentScale})`;
  scaleValueField.value = `${currentScale * PERCENT_MULTIPLIER}%`;
};

const renderEffect = (evt) => {
  let effectName;
  if (evt.target.value) {
    effectName = evt.target.value;
  }
  console.log(effectName);
};

export const setEffectsChangeHandlers = () => {
  minusBtn.addEventListener('click', renderScale);
  plusBtn.addEventListener('click', renderScale);
  effectsListElement.addEventListener('click', renderEffect);
};

export const removeEffectsChangeHandlers = () => {
  minusBtn.removeEventListener('click', renderScale);
  plusBtn.removeEventListener('click', renderScale);
  effectsListElement.removeEventListener('click', renderEffect);
};

export const setInitialEffects = () => {
  img.style.transform = `scale(${DEFAULT_SCALE})`;
  scaleValueField.value = `${DEFAULT_SCALE * PERCENT_MULTIPLIER}%`;
};
