import { createPhotos } from './data.js';
import { renderPhotos } from './preview.js';
import { loadModal } from './modal.js';

const data = createPhotos(25);

renderPhotos(data);
loadModal(data);
