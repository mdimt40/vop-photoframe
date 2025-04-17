const imageUpload = document.getElementById('imageUpload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');

const poster = new Image();
poster.src = 'poster-template.png';

let uploadedImage = null;
let imageX = 55;
let imageY = 640; // bottom-left default (canvas.height - photoHeight - 50)
const photoWidth = 500;
const photoHeight = 500;

let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

poster.onload = () => {
  canvas.width = 1000;
  canvas.height = 1000;
  if (uploadedImage) drawPoster();
};

imageUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    uploadedImage = new Image();
    uploadedImage.onload = () => {
      if (poster.complete) {
        imageX = 50;
        imageY = canvas.height - photoHeight - 50;
        drawPoster();
      }
    };
    uploadedImage.src = event.target.result;
  };

  if (file) reader.readAsDataURL(file);
});

function drawPoster() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(poster, 0, 0, canvas.width, canvas.height);

  if (uploadedImage) {
    ctx.drawImage(uploadedImage, imageX, imageY, photoWidth, photoHeight);
  }
}

canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (
    x >= imageX && x <= imageX + photoWidth &&
    y >= imageY && y <= imageY + photoHeight
  ) {
    isDragging = true;
    dragOffsetX = x - imageX;
    dragOffsetY = y - imageY;
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const rect = canvas.getBoundingClientRect();
    imageX = e.clientX - rect.left - dragOffsetX;
    imageY = e.clientY - rect.top - dragOffsetY;

    drawPoster();
  }
});

canvas.addEventListener('mouseup', () => {
  isDragging = false;
});

canvas.addEventListener('mouseleave', () => {
  isDragging = false;
});

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'my-poster.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});
