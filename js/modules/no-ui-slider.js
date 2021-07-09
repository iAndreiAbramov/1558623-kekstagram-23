import '../../nouislider/nouislider.js';

const slider = document.querySelector('.effect-level__slider');
export const valueField = document.querySelector('.effect-level__value');

export const createSlider = (min, max, step) => {
  noUiSlider.create(slider, {
    range: {
      min,
      max,
    },
    step,
    start: max,
    connect: 'lower',
  });

  slider.noUiSlider.on('update', () => {
    const change = new Event('change');
    valueField.value = slider.noUiSlider.get();
    valueField.dispatchEvent(change);
  });
};

export const updateSlider = (min, max, step) => {
  slider.noUiSlider.updateOptions({
    range: {
      min,
      max,
    },
    step,
    start: max,
  });
};

export const removeSlider = () => {
  slider.noUiSlider.destroy();
};
