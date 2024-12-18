const renderPhotos = (data) => {

  const picturesElement = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;
  const photosFragment = new DocumentFragment();

  data.forEach(({id, url, description, likes, comments}) => {
    const clonedPictureTemplate = pictureTemplate.cloneNode(true);
    const pictureElement = clonedPictureTemplate.querySelector('a.picture');
    const imgElement = clonedPictureTemplate.querySelector('.picture__img');
    const likesElement = clonedPictureTemplate.querySelector('.picture__likes');
    const commentsElement = clonedPictureTemplate.querySelector('.picture__comments');
    pictureElement.dataset.id = id;
    imgElement.src = url;
    imgElement.alt = description;
    likesElement.textContent = likes;
    commentsElement.textContent = comments.length;
    photosFragment.appendChild(clonedPictureTemplate);
  });

  picturesElement.appendChild(photosFragment);

};

export { renderPhotos };
