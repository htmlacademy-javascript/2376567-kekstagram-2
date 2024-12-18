import { renderCommentItem } from './comment';

const bodyElement = document.querySelector('body');
const bigPictureElement = bodyElement.querySelector('.big-picture');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const commentShownCount = bigPictureElement.querySelector('.social__comment-shown-count');
const commentTotalElement = bigPictureElement.querySelector('.social__comment-total-count');

const STEP_SHOWN_COMMENTS = 5;

let counter = 0;
let currentComments;

const updateShownElement = (comments) => {
  commentShownCount.textContent = comments.length;
  if (commentShownCount.textContent === commentTotalElement.textContent) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
};

const renderCommentsList = (comments) => {
  const socialsFragment = new DocumentFragment();
  const shownComments = comments.slice(0, ++counter * STEP_SHOWN_COMMENTS);
  updateShownElement(shownComments);
  shownComments.forEach((comment) => {
    const commentElement = renderCommentItem(comment);
    socialsFragment.appendChild(commentElement);
  });
  socialCommentsElement.appendChild(socialsFragment);
};

const renderComments = (comments) => {
  currentComments = comments;
  socialCommentsElement.innerHTML = '';
  counter = 0;
  renderCommentsList(currentComments);

};

commentsLoaderElement.addEventListener('click', () => {
  socialCommentsElement.innerHTML = '';
  renderCommentsList(currentComments);
});

export { renderComments };
