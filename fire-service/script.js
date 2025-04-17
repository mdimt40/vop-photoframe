const imageUpload = document.getElementById('imageUpload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');

// Load the 1000x1000 poster template
const poster = new Image();
poster.src = 'poster-template.png';

let uploadedImage = null;

poster.onload = () => {
  // Set canvas to match the poster size
  canvas.width = 1000;
  canvas.height = 1000;

  // If photo already uploaded, draw both
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
  // Clear canvas first
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the poster background
  ctx.drawImage(poster, 0, 0, canvas.width,
