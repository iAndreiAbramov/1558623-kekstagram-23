import { renderImages } from './modules/render-images.js';
import { setUploadHandler } from './modules/set-upload-handler.js';

window.addEventListener('DOMContentLoaded', () => {
  renderImages();
  setUploadHandler();
});
