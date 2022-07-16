
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const fileChooserNode = document.querySelector('#upload-file');
const previewPhotoNode = document.querySelector('.img-upload__preview img');
const effectsPreviewsNode = document.querySelectorAll('.effects__preview');

const showPhotoPreview = () => {
  const file = fileChooserNode.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => (fileName.endsWith(it)));
  if (matches) {
    previewPhotoNode.src = URL.createObjectURL(file);
    effectsPreviewsNode.forEach((effectPreviewNode) => {
      effectPreviewNode.style.backgroundImage = `url("${previewPhotoNode.src}")`;
    });
  }
};

export { showPhotoPreview, fileChooserNode };
