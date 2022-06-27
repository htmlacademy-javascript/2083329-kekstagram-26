import { createPhotos } from './data.js';
import { renderThumbanails } from './thumbnails.js';
import './upload-form.js';

renderThumbanails(createPhotos());
