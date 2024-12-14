const bodyElement = document.querySelector('body');
const bigPictureElement = bodyElement.querySelector('.big-picture');
const commentElement = bigPictureElement.querySelector('.social__comment');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const commentShownCount = bigPictureElement.querySelector('.social__comment-shown-count');
const commentTotalElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

const STEP_SHOWN_COMMENTS = 5;

const commentsLoader = (data) => {
  let visibleComments = STEP_SHOWN_COMMENTS;
  return () => {
    const shownComments = data.slice(0, visibleComments);
    visibleComments += STEP_SHOWN_COMMENTS;
    return shownComments;
  };
};

const createCommentsElement = (comments) => {
  const socialsFragment = new DocumentFragment();
  comments.forEach(({ avatar, name, message }) => {
    const clonedCommentElement = commentElement.cloneNode(true);
    const socialPictureElement = clonedCommentElement.querySelector('.social__picture');
    const socialTextElement = clonedCommentElement.querySelector('.social__text');

    socialPictureElement.src = avatar;
    socialPictureElement.alt = name;
    socialTextElement.textContent = message;

    socialsFragment.appendChild(clonedCommentElement);
  });
  socialCommentsElement.appendChild(socialsFragment);
};

const updateShownElement = (comments) => {
  commentShownCount.textContent = comments.length;
  if (commentShownCount.textContent === commentTotalElement.textContent) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
};

const addCommentsElement = (cb) => {
  socialCommentsElement.textContent = null;
  const renderedComments = cb();
  updateShownElement(renderedComments);
  createCommentsElement(renderedComments);
};

const onCommentsLoaderElement = (comment) => () => addCommentsElement(comment);

const renderCommentsElement = (data) => {
  const addComments = commentsLoader(data);
  addCommentsElement(addComments);
  commentsLoaderElement.addEventListener('click', onCommentsLoaderElement(addComments));
};

export { renderCommentsElement };
