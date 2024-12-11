import { isEscKey } from './utils';
import { commentsLoader, loadMoreComments } from './comment';

const bodyElement = document.querySelector('body');
const picturesElement = bodyElement.querySelector('.pictures');
const bigPictureElement = bodyElement.querySelector('.big-picture');
const cancelElement = bodyElement.querySelector('.big-picture__cancel');
const imgElement = bigPictureElement.querySelector('.big-picture__img img');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentTotalElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

let onCommentsLoaderElementClick;

const renderPhotos = (photos, index) => {

  const { url, description, likes, comments } = photos[index];

  const loadedComments = commentsLoader(comments);

  imgElement.src = url;
  socialCaptionElement.textContent = description;
  likesCountElement.textContent = likes;
  commentTotalElement.textContent = comments.length;

  loadMoreComments(loadedComments);
  onCommentsLoaderElementClick = () => loadMoreComments(loadedComments);
  commentsLoaderElement.addEventListener('click', onCommentsLoaderElementClick);
};

const closeModal = () => {
  bodyElement.classList.remove('modal-open');
  bigPictureElement.classList.add('hidden');
  cancelElement.removeEventListener('click', onCancelElementClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureElement.removeEventListener('click', onBigPictureElementClick);
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderElementClick);
};

const onPictureElementClick = (event, data) => {

  if (event.target.closest('a.picture')) {

    const id = event.target.dataset.id - 1;

    bigPictureElement.classList.remove('hidden');
    event.preventDefault();
    renderPhotos(data, id);
    bodyElement.classList.add('modal-open');
    cancelElement.addEventListener('click', onCancelElementClick);
    document.addEventListener('keydown', onDocumentKeydown);
    bigPictureElement.addEventListener('click', onBigPictureElementClick);
  }

};

function onCancelElementClick() {
  closeModal();
}

function onDocumentKeydown(evt) {
  if (isEscKey(evt)) {
    closeModal();
  }
}

function onBigPictureElementClick(evt) {
  if (!evt.target.closest('.big-picture__preview')) {
    closeModal();
  }
}

const renderBigPicture = (data) => {
  picturesElement.addEventListener('click', (event) => onPictureElementClick(event, data));
};

export { renderBigPicture };

