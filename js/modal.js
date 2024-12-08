import { isEscKey } from './utils';

const bodyElement = document.querySelector('body');
const picturesElement = bodyElement.querySelector('.pictures');

const onPictureElementClick = (event, data) => {

  const bigPictureElement = bodyElement.querySelector('.big-picture');
  const cancelElement = bodyElement.querySelector('.big-picture__cancel');

  const renderElements = (photos, id) => {

    const socialsFragment = new DocumentFragment();
    const imgElement = bigPictureElement.querySelector('.big-picture__img img');
    const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
    const likesCountElement = bigPictureElement.querySelector('.likes-count');
    const commentTotalElement = bigPictureElement.querySelector('.social__comment-total-count');
    const socialCommentsElement = bigPictureElement.querySelector('.social__comments');

    imgElement.src = photos[id].url;
    socialCaptionElement.textContent = photos[id].description;
    likesCountElement.textContent = photos[id].likes;
    commentTotalElement.textContent = photos[id].comments.length;

    photos[id].comments.forEach((comment) => {
      const listItem = document.createElement('li');
      listItem.classList.add('social__comment');
      listItem.innerHTML =
        `<img class="social__picture" src=${comment.avatar} alt=${comment.name} width="35" height="35"> <p class="social__text">${comment.message}</p>`;
      socialsFragment.appendChild(listItem);
    });

    socialCommentsElement.textContent = null;
    socialCommentsElement.appendChild(socialsFragment);
  };

  const closeModal = () => {
    bodyElement.classList.remove('modal-open');
    bigPictureElement.classList.add('hidden');
    cancelElement.removeEventListener('click', onCancelElementClick);
    document.removeEventListener('keydown', onDocumentKeydown);
    bigPictureElement.removeEventListener('click', onBigPictureElementClick);
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

  if (event.target.closest('a.picture')) {

    const id = event.target.dataset.id - 1;

    bigPictureElement.classList.remove('hidden');
    event.preventDefault();
    renderElements(data, id);
    bodyElement.classList.add('modal-open');
    cancelElement.addEventListener('click', onCancelElementClick);
    document.addEventListener('keydown', onDocumentKeydown);
    bigPictureElement.addEventListener('click', onBigPictureElementClick);
  }

};

const loadModal = (data) => {
  picturesElement.addEventListener('click', (event) => onPictureElementClick(event, data));
};

export { loadModal };
