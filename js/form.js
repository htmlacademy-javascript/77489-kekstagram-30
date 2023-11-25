import { resetScale } from './scale.js';
import { init as initEffect, reset as resetEffect, destroy as destroySlider } from './effects.js';
import { sendPicture } from './api.js';
import { showSuccesMessage, showErrorMessage } from './message.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const errorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хештегов`,
  NOT_INIQUE: 'Хештеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хештег',
};

const submitButtonCaption = {
  SUBMITTING: 'Отправляю...',
  IDLE: 'Опубликовать'
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const fileField = form.querySelector('.img-upload__input');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

function toogleSubmitButton(isDisabled) {
  submitButton.disabled = isDisabled;

  if (isDisabled) {
    submitButton.textContent = submitButtonCaption.SUBMITTING;
  } else {
    submitButton.textContent = submitButtonCaption.IDLE;
  }
}

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const showModal = () => {
  initEffect();
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideModal = () => {
  form.reset();
  resetScale();
  resetEffect();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

const onCancalButtonClick = () => {
  hideModal();
};

const onFileInputChange = () => {
  showModal();
};

async function sendForm(formElement) {
  if (!pristine.validate()) {
    return;
  }

  try {
    toogleSubmitButton(true);
    await sendPicture(new FormData(formElement));
    toogleSubmitButton(false);
    hideModal();
    showSuccesMessage();
    destroySlider();
  } catch {
    showErrorMessage();
    toogleSubmitButton(false);
  }
}
const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendForm(evt.target);
};

pristine.addValidator(
  hashtagField,
  hasValidCount,
  errorText.INVALID_COUNT,
  3,
  true
);

pristine.addValidator(
  hashtagField,
  hasUniqueTags,
  errorText.NOT_INIQUE,
  2,
  true
);

pristine.addValidator(
  hashtagField,
  hasValidTags,
  errorText.INVALID_PATTERN,
  1,
  true
);

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancalButtonClick);
form.addEventListener('submit', onFormSubmit);
