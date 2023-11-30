import { renderThumbnails } from './thumbnail.js';
import { showPicture } from './picture.js';

const container = document.querySelector('.pictures');


const renderGallery = (pictures, withEventListener = true) => {
  if (withEventListener){
    container.addEventListener('click', (evt) => {
      const thumbnail = evt.target.closest('[data-thumbnail-id]');

      if (!thumbnail) {
        return;
      }

      evt.preventDefault();

      const pictureData = pictures.find(({ id }) => +id === +thumbnail.dataset.thumbnailId);
      showPicture(pictureData);
    });
  }

  renderThumbnails(pictures, container);
};

export { renderGallery };
