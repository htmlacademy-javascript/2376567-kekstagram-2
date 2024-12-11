const renderPhotos = (data) => {

  const picturesElement = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;
  const photosFragment = new DocumentFragment();

  data.forEach(({id, url, description, likes, comments}) => {
    const clonedPicture = pictureTemplate.cloneNode(true);
    const imgElement = clonedPicture.querySelector('.picture__img');
    const likesElement = clonedPicture.querySelector('.picture__likes');
    const commentsElement = clonedPicture.querySelector('.picture__comments');
    imgElement.dataset.id = id;
    imgElement.src = url;
    imgElement.alt = description;
    likesElement.textContent = likes;
    commentsElement.textContent = comments.length;
    photosFragment.appendChild(clonedPicture);
  });

  picturesElement.appendChild(photosFragment);

};

export { renderPhotos };
