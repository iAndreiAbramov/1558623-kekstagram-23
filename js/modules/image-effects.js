import { DEFAULT_SCALE, MAX_SCALE, MIN_SCALE, SCALE_CHANGE_STEP, PERCENT_MULTIPLIER, SLIDER_EFFECTS } from '../settings/settings.js';
import {createSlider, updateSlider, valueField } from './no-ui-slider.js';

const imgOverlay = document.querySelector('.img-upload__overlay');
const img = imgOverlay.querySelector('.img-upload__preview img');
const minusBtn = imgOverlay.querySelector('.scale__control--smaller');
const plusBtn = imgOverlay.querySelector('.scale__control--bigger');
const scaleValueField = imgOverlay.querySelector('.scale__control--value');
const effectsListElement = imgOverlay.querySelector('.effects__list');
const sliderWrapper = imgOverlay.querySelector('.img-upload__effect-level');

let currentScale = DEFAULT_SCALE;
let currentEffect = 'none';

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

const renderImage = () => {
  const effectName = SLIDER_EFFECTS[currentEffect];
  const value = valueField.value;
  img.style.filter = `${effectName.filter}(${value}${effectName.unit})`;
};

const changeEffect = (evt) => {
  img.classList = [];
  img.style.filter = '';
  sliderWrapper.style.display = 'none';
  if (evt.target.value) {
    currentEffect = evt.target.value;
  }
  if (currentEffect !== 'none') {
    sliderWrapper.style.display = '';
    const effect = SLIDER_EFFECTS[currentEffect];
    img.classList.add(effect.className);
    updateSlider(effect.min, effect.max, effect.step);
    // renderImage();
  }
};

export const setEffectsChangeHandlers = () => {
  minusBtn.addEventListener('click', renderScale);
  plusBtn.addEventListener('click', renderScale);
  effectsListElement.addEventListener('click', changeEffect);
  valueField.addEventListener('change', renderImage);
};

export const removeEffectsChangeHandlers = () => {
  minusBtn.removeEventListener('click', renderScale);
  plusBtn.removeEventListener('click', renderScale);
  effectsListElement.removeEventListener('click', changeEffect);
  valueField.removeEventListener('change', renderImage);
};

export const setInitialEffects = () => {
  img.style.transform = `scale(${DEFAULT_SCALE})`;
  scaleValueField.value = `${DEFAULT_SCALE * PERCENT_MULTIPLIER}%`;
  img.classList = [];
  img.style.filter = '';
  sliderWrapper.style.display = 'none';
  createSlider(0, 1, 0.1);
};
