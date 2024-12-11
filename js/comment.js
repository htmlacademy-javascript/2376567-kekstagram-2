const bodyElement = document.querySelector('body');
const bigPictureElement = bodyElement.querySelector('.big-picture');
const commentElement = document.querySelector('.social__comment');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const commentShownCount = bigPictureElement.querySelector('.social__comment-shown-count');

const STEP_SHOWN_COMMENTS = 5;

const commentsManeger = () => {
  const commentsLoader = (data) => {
    let visibleComments = STEP_SHOWN_COMMENTS;
    return () => {
      const shownComments = data.slice(0, visibleComments);
      commentShownCount.textContent = shownComments.length;
      visibleComments += STEP_SHOWN_COMMENTS;
      return shownComments;
    };
  };

  const renderCommentsElement = (comments) => {
    const socialsFragment = new DocumentFragment();
    if (comments.length === 0) {
      socialCommentsElement.textContent = null;
    }
    comments.forEach(({avatar, name, message}) => {
      socialCommentsElement.textContent = null;
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

  const loadMoreComments = (cb) => {
    socialCommentsElement.appendChild(renderCommentsElement(cb()));
  };

  return {
    commentsLoader,
    loadMoreComments,
  };
};

export { commentsManeger };

// export { commentsLoader, loadMoreComments };

