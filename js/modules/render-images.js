import { getData } from '../services/get-data.js';
import { isEscEvent } from '../services/utils.js';
import { GET_PHOTO_URL, COMMENTS_TO_SHOW } from '../settings/settings.js';

const cachedData = {};
const commentTemplate = document.querySelector('li.social__comment');
const overlay = document.querySelector('.big-picture');
const overlayCloseBtn = overlay.querySelector('#picture-cancel');
const overlayTitle = overlay.querySelector('.social__caption');
const overlayImage = overlay.querySelector('.big-picture__img img');
const overlayLikesCount = overlay.querySelector('.likes-count');
const moreCommentsBtn = overlay.querySelector('button.social__comments-loader');

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

const renderComments = (id, commentsToRender) => {
  const comments = overlay.querySelector('ul.social__comments');
  const commentsNumber = overlay.querySelector('.social__comment-count');

  moreCommentsBtn.style.display = '';

  if (commentsToRender > cachedData[id].comments.length) {
    commentsToRender = cachedData[id].comments.length;
    moreCommentsBtn.style.display = 'none';
  }

  comments.innerHTML = '';

  for (let i = 0; i < commentsToRender; i++) {
    const comment = commentTemplate.cloneNode(true);
    const commentAvatar = comment.querySelector('.social__picture');
    const commentText = comment.querySelector('.social__text');

    commentsNumber.innerHTML = `
      ${commentsToRender} из <span class="comments-count">${cachedData[id].comments.length}</span> комментариев
    `;

    commentAvatar.setAttribute('src', `${cachedData[id].comments[i].avatar}`);
    commentAvatar.setAttribute('alt', `${cachedData[id].comments[i].name}`);
    commentText.textContent = `${cachedData[id].comments[i].message}`;
    comments.appendChild(comment);
  }
};

const showFullScreenPhoto = (evt, id) => {
  evt.preventDefault();
  let numberOfComments = COMMENTS_TO_SHOW;

  overlayTitle.textContent = `${cachedData[id].description}`;
  overlayImage.setAttribute('src', cachedData[id].url);
  overlayLikesCount.textContent = `${cachedData[id].likes}`;

  renderComments(id, numberOfComments);

  moreCommentsBtn.addEventListener('click', () => {
    numberOfComments += 5;
    renderComments(id, numberOfComments);
  });

  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  const hideOverlayOnClick = () => {
    overlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    overlayCloseBtn.removeEventListener('click', hideOverlayOnClick);
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('keydown', hideOverlayOnEscape);
  };

  const hideOverlayOnEscape = (keyDownEvt) => {
    if (isEscEvent(keyDownEvt)) {
      overlay.classList.add('hidden');
      document.body.classList.remove('modal-open');
      overlayCloseBtn.removeEventListener('click', hideOverlayOnClick);
      document.removeEventListener('keydown', hideOverlayOnEscape);
    }
  };

  overlayCloseBtn.addEventListener('click', hideOverlayOnClick);
  document.addEventListener('keydown', hideOverlayOnEscape);
};

const renderImages = () => {
  const imagesContainer = document.querySelector('.pictures');
  const photosData = getData(GET_PHOTO_URL, showErrorMessage);
  photosData
    .then((dataArray) => {
      dataArray.forEach((element) => {
        cachedData[element.id] = element;
        const miniElement = getHTMLfromData(element);
        imagesContainer.appendChild(miniElement);
        miniElement.addEventListener('click', (evt) => showFullScreenPhoto(evt, element.id));
      });
    })
    .catch((err) => err);
};

export { renderImages };
