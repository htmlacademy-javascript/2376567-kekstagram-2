import { isEscKey } from './utils';
import { renderBigPicture } from './photo';

const bodyElement = document.body;
const picturesElement = bodyElement.querySelector('.pictures');
const bigPictureElement = bodyElement.querySelector('.big-picture');

bigPictureElement.addEventListener('click', onBigPictureElementClick);
document.addEventListener('keydown', onDocumentKeydown);

const closeModal = () => {
  bodyElement.classList.remove('modal-open');
  bigPictureElement.classList.add('hidden');
};

const onPictureElementClick = (event, data) => {
  const parentLink = event.target.closest('a.picture');
  if (parentLink) {
    event.preventDefault();
    const id = parentLink.dataset.id - 1;

    bigPictureElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');

    renderBigPicture(data, id);
  }
};

function onDocumentKeydown(evt) {
  if (isEscKey(evt)) {
    closeModal();
  }
}

function onBigPictureElementClick(evt) {
  if ((evt.target.closest('.big-picture') && !evt.target.closest('.big-picture__preview')) || evt.target.classList.contains('big-picture__cancel')) {
    closeModal();
  }
}

const loadModal = (data) => {
  picturesElement.addEventListener('click', (event) => onPictureElementClick(event, data));
};

export { loadModal };

