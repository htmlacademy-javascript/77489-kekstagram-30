import { onDocumentKeydown, onBodyClick } from './utils.js';

const succesMessageElement = document
  .querySelector('#success')
  .content
  .querySelector('.success');

const errorMessageElement = document
  .querySelector('#error')
  .content
  .querySelector('.error');

const hideMessage = () => {
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  existElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.removeEventListener('click', onBodyClick);
};

const onCloseButtonClick = () => hideMessage();

const showMessage = (element, buttonClass) => {
  document.body.append(element);
  document.body.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onDocumentKeydown);
  element
    .querySelector(buttonClass)
    .addEventListener('click', onCloseButtonClick);
};

const showSuccesMessage = () => showMessage(succesMessageElement, '.success__button');

const showErrorMessage = () => showMessage(errorMessageElement, '.error__button');

export { hideMessage, showSuccesMessage, showErrorMessage };
