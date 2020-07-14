const sharp = require("sharp");
var formidable = require("formidable");

export default async (req, res) => {
  const form = formidable({ multiples: true });
  await form.parse(req, (err, fields, files) => {
    var name;
    if (files.imageUpload.name.includes(".jpg")) {
      name = files.imageUpload.name.replace(".jpg", "");
    }

    if (files.imageUpload.name.includes(".png")) {
      name = files.imageUpload.name.replace(".png", "");
    }

    if (files.imageUpload.name.includes(".jpeg")) {
      name = files.imageUpload.name.replace(".jpeg", "");
    }

    if (files.imageUpload.name.includes(".webp")) {
      name = files.imageUpload.name.replace(".webp", "");
    }

    if (files.imageUpload.name.includes(".svg")) {
      name = files.imageUpload.name.replace(".svg", "");
    }

    name = files.imageUpload.name.replace(/ /g, "");

    sharp(files.imageUpload.path)
      .resize(800, 800, {
        position: "top",
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 90 })
      .toFile(`public/images/${name}.webp`)
      .then((info) => {
        sharp(files.imageUpload.path)
          .resize(120, 120, {
            position: "top",
            fit: "inside",
            withoutEnlargement: true,
          })
          .webp({ quality: 100 })
          .blur(10)
          .toFile(`public/images/${name}-placeholder.webp`)
          .then((info) => {
            res.status(200);
            res.end(JSON.stringify({ path: `/images/${name}` }));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};
