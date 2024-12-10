import { createPhotos } from './data.js';
import { renderPhotos } from './preview.js';
import { renderBigPicture } from './modal.js';

const data = createPhotos(25);

renderPhotos(data);
renderBigPicture(data);
