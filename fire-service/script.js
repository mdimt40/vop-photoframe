const imageUpload = document.getElementById('imageUpload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');

// Load the 1000x1000 poster template
const poster = new Image();
poster.src = 'poster-template.png';

let uploadedImage = null;

poster.onload = () => {
  canvas.width = 1000;
  canvas.height = 1000;

  if (uploadedImage) {
    drawPoster();
  }
};

imageUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    uploadedImage = new Image();
    uploadedImage.onload = () => {
      if (poster.complete) {
        drawPoster();
      }
    };
    uploadedImage.src = event.target.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

function drawPoster() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(poster, 0, 0, canvas.width, canvas.height);

  if (!uploadedImage) return;

  const photoWidth = 300;
  const photoHeight = 300;

  // Place image on the LEFT-CENTER of the poster
  const offsetX = 50;
  const offsetY = (canvas.height - photoHeight) / 2;

  ctx.drawImage(uploadedImage, offsetX, offsetY, photoWidth, photoHeight);
}

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'my-poster.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});
