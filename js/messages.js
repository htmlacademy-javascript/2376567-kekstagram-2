import { isEscKey } from './utils';

const imgUploadFormElement = document.querySelector('.img-upload__form');
const imgUploadOverlayElement = imgUploadFormElement.querySelector('.img-upload__overlay');

const showMessage = (response) => {
  const result = response ? 'success' : 'error';
  const templateElement = document.querySelector(`#${result}`).content.querySelector(`.${result}`);
  const notificationElement = templateElement.cloneNode(true);

  const onDocumentKeydownEscMessage = (event) => {
    if (isEscKey(event) && notificationElement.isConnected) {
      closeMessages();
    }
  };

  const onNotificationElementClick = (event) => {
    const button = event.target.closest(`button.${result}__button`);
    const inner = event.target.closest(`.${result}__inner`);
    if (!inner || button) {
      closeMessages();
    }
  };

  function closeMessages() {
    if (imgUploadOverlayElement.classList.contains('hidden')) {
      document.body.classList.remove('modal-open');
    }
    notificationElement.removeEventListener('click', onNotificationElementClick);
    document.removeEventListener('keydown', onDocumentKeydownEscMessage);
    notificationElement.remove();
  }

  notificationElement.addEventListener('click', onNotificationElementClick);
  document.addEventListener('keydown', onDocumentKeydownEscMessage);
  document.body.insertAdjacentElement('beforeBegin', notificationElement);
  document.body.classList.add('modal-open');

};

export { showMessage };
