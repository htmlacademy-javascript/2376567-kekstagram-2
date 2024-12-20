const bigPictureElement = document.querySelector('.big-picture');
const commentTemplateElement = bigPictureElement.querySelector('.social__comment');

const renderCommentItem = ({ avatar, name, message }) => {
  const clonedCommentElement = commentTemplateElement.cloneNode(true);
  const socialPictureElement = clonedCommentElement.querySelector('.social__picture');
  const socialTextElement = clonedCommentElement.querySelector('.social__text');

  socialPictureElement.src = avatar;
  socialPictureElement.alt = name;
  socialTextElement.textContent = message;

  return clonedCommentElement;
};

export { renderCommentItem };
