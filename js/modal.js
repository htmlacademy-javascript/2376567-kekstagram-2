import { isEscKey } from './utils';
import { renderComments } from './comments';

const bodyElement = document.body;
const picturesElement = bodyElement.querySelector('.pictures');
const bigPictureElement = bodyElement.querySelector('.big-picture');
const imgElement = bigPictureElement.querySelector('.big-picture__img img');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentTotalElement = bigPictureElement.querySelector('.social__comment-total-count');

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

const renderPhotos = (photos, index) => {
  const { url, description, likes, comments } = photos[index];
  imgElement.src = url;
  socialCaptionElement.textContent = description;
  likesCountElement.textContent = likes;
  commentTotalElement.textContent = comments.length;
  renderComments(comments);
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

      renderPhotos(data, id);
    }
  };

  picturesElement.addEventListener('click', onPictureElementClick);
};

export { renderModal };

