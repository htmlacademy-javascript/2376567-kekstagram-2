import { isEscKey } from './utils';
import { loadValidation, clearValidation } from './validation';
import { addImgRedactor, resetImgRedactor } from './edit-picture';
import { postData } from './api';
import { showMessage } from './messages';

const imgUploadFormElement = document.querySelector('.img-upload__form');

const imgUploadOverlayElement = imgUploadFormElement.querySelector('.img-upload__overlay');
const textHashtagsElement = imgUploadFormElement.querySelector('.text__hashtags');
const textDescriptionElement = imgUploadFormElement.querySelector('.text__description');
const imgUploadSubmitElement = imgUploadFormElement.querySelector('.img-upload__submit');

const loadForm = () => {
  loadValidation();
  addImgRedactor();
};

const closeForm = () => {
  document.body.classList.remove('modal-open');
  imgUploadOverlayElement.classList.add('hidden');

  imgUploadFormElement.reset();
  clearValidation();
  resetImgRedactor();
};

imgUploadFormElement.addEventListener('change', () => {
  document.body.classList.add('modal-open');
  imgUploadOverlayElement.classList.remove('hidden');
});

imgUploadOverlayElement.addEventListener('click', (evt) => {
  const isOverlayElement = evt.target.classList.contains('img-upload__overlay');
  const isCancelButtonElement = evt.target.classList.contains('img-upload__cancel');
  if (isOverlayElement || isCancelButtonElement) {
    closeForm();
  }
});

document.addEventListener('keydown', (evt) => {
  if (isEscKey(evt)) {
    closeForm();
  }
});

textHashtagsElement.addEventListener('keydown', (evt) => {
  if (isEscKey(evt)) {
    evt.stopPropagation();
  }
});

textDescriptionElement.addEventListener('keydown', (evt) => {
  if (isEscKey(evt)) {
    evt.stopPropagation();
  }
});

imgUploadFormElement.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const formDataObject = new FormData(evt.target);
  try {
    imgUploadSubmitElement.setAttribute('disabled', '');
    await postData(formDataObject);
    closeForm();
    showMessage(true);
  } catch (error) {
    showMessage(false);
  } finally {
    imgUploadSubmitElement.removeAttribute('disabled','');
  }
});

export { loadForm };
