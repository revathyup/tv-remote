console.log("server.js startar");

const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// 1) Servera statiska filer (HTML, CSS, JS, bilder)
app.use(express.static(path.join(__dirname)));

// 2) API: lista bilder i assets/images
app.get("/api/images", (req, res) => {
  const imagesDir = path.join(__dirname, "assets", "images");

  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Kan inte läsa images-mappen" });
    }

    const images = files.filter(file =>
      /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
    );

    res.json(images);
  });
});

// Starta servern
app.listen(PORT, () => {
  console.log(`Servern kör på http://localhost:${PORT}`);
});
