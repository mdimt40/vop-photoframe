const imageUpload = document.getElementById('imageUpload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');

let uploadedImage = new Image();
const frameImage = new Image();
frameImage.src = 'frame.png'; // Make sure your frame.png has transparency and is the same size as the canvas

imageUpload.addEventListener('change', function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function (event) {
    uploadedImage.onload = () => {
      // Draw uploaded image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
      // Draw the frame on top
      frameImage.onload = () => {
        ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
      };
      // If frame already loaded
      if (frameImage.complete) {
        ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
      }
    };
    uploadedImage.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'framed-image.png';
  link.href = canvas.toDataURL();
  link.click();
});
