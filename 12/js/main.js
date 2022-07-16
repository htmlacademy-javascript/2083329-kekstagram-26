import { getData } from './api.js';
import { renderThumbanails } from './thumbnails.js';
import { setUploadFormSubmit } from './submit-form.js';
import { initFilters} from './filters.js';

getData((photos) => {
  renderThumbanails(photos);
  initFilters(photos);
});

setUploadFormSubmit();
