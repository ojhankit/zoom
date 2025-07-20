const canvas = document.getElementById("zoomCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const imageSources = [
  "./img1.jpg", "./img2.jpg", "./img3.jpg", "./img4.jpg", "./img5.jpg",
  "./img6.jpg", "./img7.jpg", "./img8.jpg", "./img9.jpg", "./img10.jpg",
  "./img11.jpg", "./img12.jpg", "./img13.jpg", "./img14.jpg", "./img15.jpg",
  "./img16.jpg", "./img17.jpg", "./img18.jpg", "./img19.jpg", "./img20.jpg",
  "./img21.jpg", "./img22.jpg", "./img23.jpg", "./img24.jpg", "./img25.jpg",
  "./img26.jpg", "./img27.jpg", "./img28.jpg", "./img29.jpg", "./img30.jpg",
  "./img31.jpg", "./img32.jpg", "./img33.jpg", "./img34.jpg", "./img35.jpg",
  "./img36.jpg", "./img37.jpg", "./img38.jpg", "./img39.jpg", "./img40.jpg",
  "./img41.jpg", "./img42.jpg", "./img43.jpg", "./img44.jpg", "./img45.jpg",
  "./img46.jpg"
].reverse();

const images = [];
let loadedCount = 0;

imageSources.forEach((src, index) => {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    loadedCount++;
    if (loadedCount === imageSources.length) {
      startZoomLoop();
    }
  };
  images[index] = img;
});

let currentIndex = 0;
let scale = 1;

function startZoomLoop() {
  zoomImage(images[currentIndex]);
}

function zoomImage(image) {
  scale = 1;

  const canvasAspect = canvas.width / canvas.height;
  const imgAspect = image.width / image.height;

  let drawWidth, drawHeight;

  if (imgAspect > canvasAspect) {
    drawHeight = canvas.height;
    drawWidth = image.width * (canvas.height / image.height);
  } else {
    drawWidth = canvas.width;
    drawHeight = image.height * (canvas.width / image.width);
  }

  const x = (canvas.width - drawWidth) / 2;
  const y = (canvas.height - drawHeight) / 2;

  gsap.to({ s: 1 }, {
    s: 1.8, // zoom amount
    duration: 3, // zoom duration
    ease: "linear",
    onUpdate: function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(this.targets()[0].s, this.targets()[0].s);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
      ctx.drawImage(image, x, y, drawWidth, drawHeight);
      ctx.restore();
    },
    onComplete: () => {
      currentIndex = (currentIndex + 1) % images.length;
      zoomImage(images[currentIndex]);
    }
  });
}
