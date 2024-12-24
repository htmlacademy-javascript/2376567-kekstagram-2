import { isEscKey } from './utils';
import { loadValidation, clearValidation } from './validation';

const imgUploadFormElement = document.querySelector('.img-upload__form');

const imgUploadOverlayElement = imgUploadFormElement.querySelector('.img-upload__overlay');
const textHashtagsElement = imgUploadFormElement.querySelector('.text__hashtags');
const textDescriptionElement = imgUploadFormElement.querySelector('.text__description');

const loadForm = () => {
  loadValidation();
};

const closeForm = () => {
  document.body.classList.remove('modal-open');
  imgUploadOverlayElement.classList.add('hidden');

  imgUploadFormElement.reset();
  clearValidation();
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

export { loadForm };
