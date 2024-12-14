import { renderCommentsElement } from './comment';

const bodyElement = document.body;
const bigPictureElement = bodyElement.querySelector('.big-picture');
const imgElement = bigPictureElement.querySelector('.big-picture__img img');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentTotalElement = bigPictureElement.querySelector('.social__comment-total-count');


const renderBigPicture = (photos, index) => {
  const { url, description, likes, comments } = photos[index];
  imgElement.src = url;
  socialCaptionElement.textContent = description;
  likesCountElement.textContent = likes;
  commentTotalElement.textContent = comments.length;
  renderCommentsElement(comments);
};

export { renderBigPicture };
