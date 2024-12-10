const commentElement = document.querySelector('.social__comment');
const renderCommentsElement = (comments) => {
  const socialsFragment = new DocumentFragment();
  comments.forEach(({avatar, name, message}) => {
    const clonnedCommentElement = commentElement.cloneNode(true);
    const socialPictureElement = clonnedCommentElement.querySelector('.social__picture');
    const socialTextElement = clonnedCommentElement.querySelector('.social__text');
    socialPictureElement.src = avatar;
    socialPictureElement.alt = name;
    socialTextElement.textContent = message;
    socialsFragment.appendChild(clonnedCommentElement);
  });
  return socialsFragment;
};

export { renderCommentsElement };

