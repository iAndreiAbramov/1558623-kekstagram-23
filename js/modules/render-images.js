import { getData } from '../services/get-data.js';
import { GET_PHOTO_URL } from '../settings/settings.js';

export const renderImages = () => {
  const imagesContainer = document.querySelector('.pictures');

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

  const getHTMLfromData = (dataElement) => {
    const miniTemplate = document.querySelector('#picture').content.querySelector('.picture');
    const miniHTML = miniTemplate.cloneNode(true);
    const miniImage = miniHTML.querySelector('img.picture__img');
    const miniComments = miniHTML.querySelector('.picture__comments');
    const miniLikes = miniHTML.querySelector('.picture__likes');

    miniImage.setAttribute('src', dataElement.url);
    miniComments.textContent = `${dataElement.comments.length}`;
    miniLikes.textContent = `${dataElement.likes}`;

    return miniHTML;
  };

  const photosData = getData(GET_PHOTO_URL, showErrorMessage);
  photosData
    // .then((data) => console.log(data))
    .then((dataArray) => {
      dataArray.forEach((element) => {
        // console.log(element);
        const miniElement = getHTMLfromData(element);
        imagesContainer.appendChild(miniElement);
      });
    });
};
