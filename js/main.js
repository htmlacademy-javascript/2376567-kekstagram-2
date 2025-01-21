import { getData } from './api.js';
import { loadForm } from './form.js';
import { loadFilter } from './filter.js';

const ERROR_SHOWN_TIME = 5000;

const onErrorGet = () => {
  const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorBlockElement = dataErrorTemplate.cloneNode(true);
  document.body.insertAdjacentElement('beforeBegin', errorBlockElement);
  setTimeout(() => errorBlockElement.remove(), ERROR_SHOWN_TIME);
};

loadForm();

(async () => {
  try {
    const data = await getData();
    loadFilter(data);
  } catch (error) {
    onErrorGet();
  }
})();
