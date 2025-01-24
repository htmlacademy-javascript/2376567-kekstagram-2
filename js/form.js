import { isEscKey } from './utils';
import { loadValidation, clearValidation, pristine } from './validation';
import { addImgRedactor, resetImgRedactor } from './edit-picture';
import { postData } from './api';
import { showMessage } from './messages';
import { loadImage } from './load-picture';

const imgUploadFormElement = document.querySelector('.img-upload__form');

const imgUploadOverlayElement = imgUploadFormElement.querySelector('.img-upload__overlay');
const textHashtagsElement = imgUploadFormElement.querySelector('.text__hashtags');
const textDescriptionElement = imgUploadFormElement.querySelector('.text__description');
const imgUploadSubmitElement = imgUploadFormElement.querySelector('.img-upload__submit');
const uploadSubmitButtonElement = imgUploadFormElement.querySelector('#upload-submit');

const loadForm = () => {
  loadValidation();
  addImgRedactor();
  loadImage();
};

const closeForm = () => {
  document.body.classList.remove('modal-open');
  imgUploadOverlayElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadFormElement.removeEventListener('input', onImgUploadFormElementInput);

  imgUploadFormElement.reset();
  clearValidation();
  resetImgRedactor();
};

imgUploadFormElement.addEventListener('change', () => {
  document.body.classList.add('modal-open');
  imgUploadOverlayElement.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  imgUploadFormElement.addEventListener('input', onImgUploadFormElementInput);
});

imgUploadOverlayElement.addEventListener('click', (evt) => {
  const isOverlayElement = evt.target.classList.contains('img-upload__overlay');
  const isCancelButtonElement = evt.target.classList.contains('img-upload__cancel');
  if (isOverlayElement || isCancelButtonElement) {
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

function onDocumentKeydown(evt) {
  if (isEscKey(evt) && !document.querySelector('.error')) {
    closeForm();
  }
}

function onImgUploadFormElementInput() {
  if (!pristine.validate()) {
    uploadSubmitButtonElement.setAttribute('disabled', '');
  } else {
    uploadSubmitButtonElement.removeAttribute('disabled','');
  }
}

imgUploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formDataObject = new FormData(evt.target);
  imgUploadSubmitElement.setAttribute('disabled', '');
  postData(formDataObject)
    .then(() =>{
      showMessage(true);
      closeForm();
    })
    .catch(()=> {
      showMessage(false);
    })
    .finally(()=> {
      imgUploadSubmitElement.removeAttribute('disabled','');
    });
});

export { loadForm };
