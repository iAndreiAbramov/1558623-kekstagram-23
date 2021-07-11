export const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export const isUniqueTag = (item, array) => {
  array = array.map((element) => element.toLowerCase());
  return array.indexOf(item) === array.lastIndexOf(item);
};

export const getRandomPositiveInteger = (min, max) => {
  min = Math.abs(min);
  max = Math.abs(max);
  let startValue = Math.ceil(Math.min(min, max));
  let endValue = Math.floor(Math.max(min, max));
  startValue -= 0.5;
  endValue += 0.5;
  const randomInteger = startValue + Math.random() * (endValue - startValue);
  return Math.round(randomInteger);
};

export const getRandomArrayItems = (array, number) => {
  const randomItems = [];
  for (let i = 0; i < number; i++) {
    const maxIndex = array.length - 1;
    randomItems.push(array.splice(getRandomPositiveInteger(0, maxIndex), 1)[0]);
  }
  return randomItems;
};

export const sortArrayByComments = (array) => array.sort((a, b) => b.comments.length - a.comments.length);
