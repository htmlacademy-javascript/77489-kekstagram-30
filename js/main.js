import { renderGallery } from './gallery.js';
import './form.js';
import { loadPictures } from './api.js';
import { showErrorMesage } from './utils.js';
import { initFilter } from './filters.js';

(async function () {
  try {
    const pictures = await loadPictures();
    renderGallery(pictures);
    initFilter();
  } catch {
    showErrorMesage();
  }
})();
