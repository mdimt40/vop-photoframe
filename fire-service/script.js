const imageUpload = document.getElementById('imageUpload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');

const poster = new Image();
poster.src = 'poster-template.png'; // Replace with your custom poster layout

imageUpload.addEventListener('change', function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function (event) {
    const uploadedImage = new Image();
    uploadedImage.onload = () => {
      // Set canvas size to match poster
      canvas.width = poster.width;
      canvas.height = poster.height;

      // Draw poster background
      const drawPoster = () => {
        ctx.drawImage(poster, 0, 0, canvas.width, canvas.height);

        // Target photo placement (bottom-right corner)
        const photoWidth = 400;
        const photoHeight = 400;
        const offsetX = canvas.width - photoWidth - 60;
        const offsetY = canvas.height - photoHeight - 60;

        ctx.drawImage(uploadedImage, offsetX, offsetY, photoWidth, photoHeight);
      };

      if (poster.complete) {
        drawPoster();
      } else {
        poster.onload = drawPoster;
      }
    };
    uploadedImage.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'my-poster.png';
  link.href = canvas.toDataURL();
  link.click();
});
