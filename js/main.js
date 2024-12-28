import { createPhotos } from './data.js';
import { renderPhotos } from './preview.js';
import { renderModal } from './modal.js';
import { loadForm } from './form.js';
import './edit-picture.js';

const data = createPhotos(25);
renderPhotos(data);
renderModal(data);
loadForm();
