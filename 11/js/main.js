import { getData } from './api.js';
import { renderThumbanails } from './thumbnails.js';
import { setUploadFormSubmit } from './upload-form.js';
import { showError } from './util.js';

getData(renderThumbanails, showError);
setUploadFormSubmit();
