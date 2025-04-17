const imageUpload = document.getElementById('imageUpload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');

const poster = new Image();
poster.src = 'poster-template.png';

let uploadedImage = null;
let imageX = 50;
let imageY = 650; // bottom-left default (canvas.height - photoHeight - 50)
const photoWidth = 300;
const photoHeight = 300;

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
      if (poster
