import express from "express";
import multer from "multer";
import sharp from "sharp";
const app = express();
const port = process.env.PORT || 5000;
const images = [];
const upload = multer({
  limits: {
    fileSize: "200000",
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png)$/)) {
      return cb(new Error("Please Upload jpg or png file"));
    }
    cb(undefined, true);
  },
});
app.post(
  "/upload",
  upload.single("upload"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    images.push(buffer);
    res.send();
  },
  (error, req, res, next) => res.status(400).send({ error: error.message })
);

app.get("/uploads/:id", (req, res) => {
  res.set("Content-Type", "image/png");
  res.send(images[req.params.id]);
});
app.listen(port, () => console.log("server listening, port:", port));
