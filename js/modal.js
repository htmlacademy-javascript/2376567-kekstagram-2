import { isEscKey } from './utils';
import { renderBigPicture } from './big-picture';

const bodyElement = document.body;
const picturesElement = bodyElement.querySelector('.pictures');
const bigPictureElement = bodyElement.querySelector('.big-picture');

const closeModal = () => {
  bodyElement.classList.remove('modal-open');
  bigPictureElement.classList.add('hidden');
};

const onDocumentKeydown = (evt) => {
  if (isEscKey(evt)) {
    closeModal();
  }
};

const onBigPictureElementClick = (evt) => {
  if ((evt.target.closest('.big-picture') && !evt.target.closest('.big-picture__preview')) || evt.target.classList.contains('big-picture__cancel')) {
    closeModal();
  }
};

bigPictureElement.addEventListener('click', onBigPictureElementClick);
document.addEventListener('keydown', onDocumentKeydown);


const renderModal = (data) => {

  const onPictureElementClick = (event) => {
    const parentLink = event.target.closest('a.picture');
    const pictures = Array.from(picturesElement.querySelectorAll('.picture'));
    if (parentLink) {
      event.preventDefault();
      const id = pictures.indexOf(parentLink);
      bigPictureElement.classList.remove('hidden');
      bodyElement.classList.add('modal-open');

      renderBigPicture(data, id);
    }
  };

  picturesElement.addEventListener('click', onPictureElementClick);
};

export { renderModal };

