import { renderGallery } from './gallery.js';
import './form.js';
import { loadPictures } from './api.js';
import { showErrorMesage } from './utils.js';

(async function () {
  try {
    const pictures = await loadPictures();
    renderGallery(pictures);
  } catch {
    showErrorMesage();
  }
})();
