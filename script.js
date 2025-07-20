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
let total = 0;

imageSources.forEach((src, index) => {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    total++;
    if (total === imageSources.length) {
      startZoomLoop();
    }
  };
  images[index] = img;
});

let curr = 0;
let scale = 1;

function startZoomLoop() {
  zoomImage(images[curr]);
}

function zoomImage(image) {
  scale = 1;

  const nextIndex = (curr + 1) % images.length;
  const nextImage = images[nextIndex];

  const canvasAspect = canvas.width / canvas.height;

  function getDrawSize(img) {
    const imgAspect = img.width / img.height;
    let width, height;
    if (imgAspect > canvasAspect) {
      height = canvas.height;
      width = img.width * (canvas.height / img.height);
    } else {
      width = canvas.width;
      height = img.height * (canvas.width / img.width);
    }
    return {
      width: width,
      height: height,
      x: (canvas.width - width) / 2,
      y: (canvas.height - height) / 2
    };
  }

  const currSize = getDrawSize(image);
  const nextSize = getDrawSize(nextImage);

  gsap.to({ s: 1 }, {
    s: 1.8,
    duration: 3,
    ease: "linear",
    onUpdate: function () {
      const s = this.targets()[0].s;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(s * 0.9, s * 0.9);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
      ctx.drawImage(nextImage, nextSize.x, nextSize.y, nextSize.width, nextSize.height);
      ctx.restore();

      ctx.save();
      ctx.globalAlpha = 1;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(s, s);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
      ctx.drawImage(image, currSize.x, currSize.y, currSize.width, currSize.height);
      ctx.restore();
    },
    onComplete: () => {
      curr = nextIndex;
      zoomImage(images[curr]);
    }
  });
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);
