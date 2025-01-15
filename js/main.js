// import { createPhotos } from './data.js';
import { getData } from './api.js';
import { renderPhotos } from './preview.js';
import { renderModal } from './modal.js';
import { loadForm } from './form.js';

const ERROR_SHOWN_TIME = 5000;

const onErrorGet = () => {
  const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorBlockElement = dataErrorTemplate.cloneNode(true);
  document.body.insertAdjacentElement('beforeBegin', errorBlockElement);
  setTimeout(() => errorBlockElement.remove(), ERROR_SHOWN_TIME);
};

loadForm();

try {
  const data = await getData();
  renderPhotos(data);
  renderModal(data);
} catch (error) {
  onErrorGet();
}
