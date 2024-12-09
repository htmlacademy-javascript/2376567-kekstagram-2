const makeCommentsElement = (comments) => {
  const socialsFragment = new DocumentFragment();
  comments.forEach(({avatar, name, message}) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML =
      `<img class="social__picture" src=${avatar} alt=${name} width="35" height="35"> <p class="social__text">${message}</p>`;
    socialsFragment.appendChild(commentElement);
  });
  return socialsFragment;
};

export { makeCommentsElement };

