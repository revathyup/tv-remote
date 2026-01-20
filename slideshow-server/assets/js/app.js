const app = document.getElementById("app");

const img = document.createElement("img");
img.alt = "Slideshow image";
app.appendChild(img);

let images = [];
let queue = [];

function shuffle(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function rebuildQueue() {
  queue = shuffle(images);
}

async function fetchImages() {
  const response = await fetch("/api/images", { cache: "no-store" });
  const newImages = await response.json();

  const oldKey = [...images].sort().join("|");
  const newKey = [...newImages].sort().join("|");
  const changed = oldKey !== newKey;

  images = newImages;

  if (changed) {
    rebuildQueue();
  }

  if (!img.src && images.length > 0) {
    showNextImage();
  }
}

function showNextImage() {
  if (images.length === 0) return;

  if (queue.length === 0) {
    rebuildQueue();
  }

  const next = queue.shift();
  img.src = "/images/" + next;
}

(async function start() {
  await fetchImages();
  showNextImage();

  setInterval(showNextImage, 10_000);
  setInterval(fetchImages, 60_000);
})();
