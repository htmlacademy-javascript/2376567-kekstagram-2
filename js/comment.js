const bodyElement = document.querySelector('body');
const bigPictureElement = bodyElement.querySelector('.big-picture');
const commentElement = document.querySelector('.social__comment');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');


const renderCommentsElement = (comments) => {
  socialCommentsElement.textContent = null;
  const socialsFragment = new DocumentFragment();
  if (comments.length === 0) {
    socialCommentsElement.textContent = null;
  }
  comments.forEach(({ avatar, name, message }) => {
    const clonnedCommentElement = commentElement.cloneNode(true);
    const socialPictureElement = clonnedCommentElement.querySelector('.social__picture');
    const socialTextElement = clonnedCommentElement.querySelector('.social__text');

    socialPictureElement.src = avatar;
    socialPictureElement.alt = name;
    socialTextElement.textContent = message;

    socialsFragment.appendChild(clonnedCommentElement);
  });
  socialCommentsElement.appendChild(socialsFragment);
};

export { renderCommentsElement };
