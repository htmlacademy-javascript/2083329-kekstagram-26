import { getData } from './api.js';
import { renderThumbanails } from './thumbnails.js';
import { setUploadFormSubmit } from './submit-form.js';
import { initializeFilters} from './filters.js';

getData((photos) => {
  renderThumbanails(photos);
  initializeFilters(photos);
});

setUploadFormSubmit();
