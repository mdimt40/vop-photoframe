const imageUpload = document.getElementById('imageUpload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');
const nameInput = document.getElementById('nameInput');

const poster = new Image();
poster.src = 'poster-template.png';

let uploadedImage = new Image();

// ✅ Control image position and size here:
let imageX = 120;
let imageY = 430;
let photoWidth = 480;
let photoHeight = 480;

let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

poster.onload = () => {
  canvas.width = 1000;
  canvas.height = 1000;
  drawPoster();
};

const cropModal = document.getElementById('cropModal');
const cropImage = document.getElementById('cropImage');
const cropBtn = document.getElementById('cropBtn');

let cropper;

imageUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    cropImage.src = event.target.result;
    cropModal.style.display = 'flex';

    cropImage.onload = () => {
      if (cropper) cropper.destroy();
      cropper = new Cropper(cropImage, {
        aspectRatio: 1,
        viewMode: 1,
      });
    };
  };
  reader.readAsDataURL(file);
});

cropBtn.addEventListener('click', () => {
  if (!cropper) return;

  const croppedCanvas = cropper.getCroppedCanvas({
    width: photoWidth,
    height: photoHeight,
  });

  uploadedImage = new Image();
  uploadedImage.onload = () => {
    // ✂️ No more resetting imageX/Y here!
    drawPoster();
  };
  uploadedImage.src = croppedCanvas.toDataURL('image/png');

  cropModal.style.display = 'none';
  cropper.destroy();
});

function drawPoster() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(poster, 0, 0, canvas.width, canvas.height);

  if (
    uploadedImage &&
    uploadedImage.complete &&
    uploadedImage.naturalWidth > 0 &&
    uploadedImage.naturalHeight > 0
  ) {
    const borderPadding = 2;
    ctx.lineWidth = borderPadding * 2;
    ctx.strokeStyle = "white";
    ctx.strokeRect(
      imageX - borderPadding,
      imageY - borderPadding,
      photoWidth + borderPadding * 2,
      photoHeight + borderPadding * 2
    );

    ctx.drawImage(uploadedImage, imageX, imageY, photoWidth, photoHeight);
  }

  const name = nameInput.value.trim();
  if (name) {
    ctx.font = 'bold 42px "Hind Siliguri", sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(name, canvas.width / 2, 995);
  }
}

// 🖱️ Dragging
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

canvas.addEventListener('mouseup', () => { isDragging = false; });
canvas.addEventListener('mouseleave', () => { isDragging = false; });

// 📱 Touch dragging
canvas.addEventListener('touchstart', (e) => {
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;

  if (
    x >= imageX && x <= imageX + photoWidth &&
    y >= imageY && y <= imageY + photoHeight
  ) {
    isDragging = true;
    dragOffsetX = x - imageX;
    dragOffsetY = y - imageY;
  }
});

canvas.addEventListener('touchmove', (e) => {
  if (isDragging) {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    imageX = touch.clientX - rect.left - dragOffsetX;
    imageY = touch.clientY - rect.top - dragOffsetY;
    drawPoster();
  }
}, { passive: false });

canvas.addEventListener('touchend', () => { isDragging = false; });
canvas.addEventListener('touchcancel', () => { isDragging = false; });

downloadBtn.addEventListener('click', () => {
  drawPoster();
  const link = document.createElement('a');
  link.download = 'my-poster.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});
