import { createPhotos } from './data.js';
import { appendPhotos } from './preview.js';
import { loadModal } from './modal.js';

const result = createPhotos(25);

appendPhotos(result);
loadModal(result);
