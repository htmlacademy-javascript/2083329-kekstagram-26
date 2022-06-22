import { createPhotos } from './data.js';
import { renderPicture } from './pictures.js';
import { renderFullSizePicture } from './fullsize-pictures.js';

const photos = createPhotos();
renderPicture(photos);
renderFullSizePicture(photos);


