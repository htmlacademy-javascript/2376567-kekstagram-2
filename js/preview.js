const appendPhotos = (data) => {

  const pictures = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;
  const photos = new DocumentFragment();

  data.forEach((element) => {
    const clonedPicture = pictureTemplate.cloneNode(true);
    const img = clonedPicture.querySelector('.picture__img');
    const likes = clonedPicture.querySelector('.picture__likes');
    const comments = clonedPicture.querySelector('.picture__comments');
    img.src = element.url;
    img.alt = element.description;
    likes.textContent = element.likes;
    comments.textContent = element.comments.length;
    photos.appendChild(clonedPicture);
  });

  pictures.appendChild(photos);

};

export { appendPhotos };

