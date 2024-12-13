import { renderCommentsElement } from './comment';

const bodyElement = document.body;
const bigPictureElement = bodyElement.querySelector('.big-picture');
const imgElement = bigPictureElement.querySelector('.big-picture__img img');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentTotalElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const commentShownCount = bigPictureElement.querySelector('.social__comment-shown-count');

const STEP_SHOWN_COMMENTS = 5;

const commentsLoader = () => {
  let visibleComments = STEP_SHOWN_COMMENTS;
  return (data) => {
    const shownComments = data.slice(0, visibleComments);
    commentShownCount.textContent = shownComments.length;
    visibleComments += STEP_SHOWN_COMMENTS;

    if (commentShownCount.textContent === commentTotalElement.textContent) {
      commentsLoaderElement.classList.add('hidden');
    } else {
      commentsLoaderElement.classList.remove('hidden');
    }

    return shownComments;
  };
};

const renderBigPicture = (photos, index) => {
  const { url, description, likes, comments } = photos[index];

  imgElement.src = url;
  socialCaptionElement.textContent = description;
  likesCountElement.textContent = likes;
  commentTotalElement.textContent = comments.length;

  const loadComments = commentsLoader();

  const onCommentsLoaderElementClick = () => {
    const loadedComments = loadComments(comments);
    renderCommentsElement(loadedComments);
  };

  onCommentsLoaderElementClick();

  commentsLoaderElement.addEventListener('click', onCommentsLoaderElementClick);
};

export { renderBigPicture };
