import { isEscKey } from './utils';
import { renderComments } from './comments';

const picturesElement = document.querySelector('.pictures');
const bigPictureElement = document.querySelector('.big-picture');
const imgElement = bigPictureElement.querySelector('.big-picture__img img');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentTotalElement = bigPictureElement.querySelector('.social__comment-total-count');

let curentPhotos;

const closeModal = () => {
  document.body.classList.remove('modal-open');
  bigPictureElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

bigPictureElement.addEventListener('click', (evt) => {
  if ((evt.target.closest('.big-picture') && !evt.target.closest('.big-picture__preview')) || evt.target.classList.contains('big-picture__cancel')) {
    closeModal();
  }
});

picturesElement.addEventListener('click', (evt) => {
  const parentLink = evt.target.closest('a.picture');
  const pictures = Array.from(picturesElement.querySelectorAll('.picture'));
  if (parentLink) {
    evt.preventDefault();
    const index = pictures.indexOf(parentLink);
    bigPictureElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);

    const { url, description, likes, comments } = curentPhotos[index];
    imgElement.src = url;
    socialCaptionElement.textContent = description;
    likesCountElement.textContent = likes;
    commentTotalElement.textContent = comments.length;
    renderComments(comments);
  }
});

function onDocumentKeydown(evt) {
  if (isEscKey(evt) && !document.querySelector('.error')) {
    closeModal();
  }
}

const renderModal = (photos) => {
  curentPhotos = photos;
};

export { renderModal };

