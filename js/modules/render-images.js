import { getData } from '../services/get-data.js';
import { GET_PHOTO_URL } from '../settings/settings.js';

export const renderImages = () => {
  const showErrorMessage = (err) => {
    const container = document.querySelector('main');
    const errorMessage = document.createElement('div');
    errorMessage.textContent = `${err.message}, не удалось загрузить фото...`;
    errorMessage.style.cssText = `
      position: absolute;
      margin: auto;
      padding: 5px;
      top: 20px;
      left: 0;
      right: 0;
      width: 80%;
      border: 1px solid #ffffff;
      border-radius: 5px;
      background-color: #fb4c4a;
      font-size: 20px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      text-align: center;
      color: #ffffff;
    `;
    container.style.position = 'relative';
    container.appendChild(errorMessage);
  };

  const photosData = getData(GET_PHOTO_URL, showErrorMessage);
  photosData.then((data) => console.log(data));
};
