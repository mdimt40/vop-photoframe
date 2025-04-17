const imageUpload = document.getElementById('imageUpload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');

// 🔁 Updated template filename
const poster = new Image();
poster.src = 'poster-template.png'; // Updated here

imageUpload.addEventListener('change', function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function (event) {
    const uploadedImage = new Image();
    uploadedImage.onload = () => {
      // Set canvas size to match poster
      canvas.width = poster.width;
      canvas.height = poster.height;
