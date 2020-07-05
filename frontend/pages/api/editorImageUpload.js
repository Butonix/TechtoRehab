const sharp = require("sharp");
var formidable = require("formidable");

export default async (req, res) => {
  const form = formidable({ multiples: true });
  await form.parse(req, (err, fields, files) => {
    var name;
    if (files.file.name.includes(".jpg")) {
      name = files.file.name.replace(".jpg", "");
    }

    if (files.file.name.includes(".png")) {
      name = files.file.name.replace(".png", "");
    }

    if (files.file.name.includes(".jpeg")) {
      name = files.file.name.replace(".jpeg", "");
    }

    if (files.file.name.includes(".webp")) {
      name = files.file.name.replace(".webp", "");
    }

    if (files.file.name.includes(".svg")) {
      name = files.file.name.replace(".svg", "");
    }
    sharp(files.file.path)
      .resize(1088, 640, {
        position: "top",
        fit: "inside",
        withoutEnlargement: true,
      })
      .toFormat("jpeg")
      .webp({ quality: 90 })
      .toFile(`public/images/${name}.webp`)
      .then((info) => {
        sharp(files.file.path)
          .resize(1088, 640, {
            position: "top",
            fit: "cover",
            withoutEnlargement: true,
          })
          .toFormat("jpeg")
          .webp({ quality: 90 })
          .blur(57)
          .toFile(`public/images/${name}-placeholder.webp`)
          .then((info) => {
            res.status(200);
            res.end(JSON.stringify({ location: `/images/${name}.webp` }));
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
