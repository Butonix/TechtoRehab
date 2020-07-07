const sharp = require("sharp");
var formidable = require("formidable");

export default async (req, res) => {
  const form = formidable({ multiples: true });
  await form.parse(req, (err, fields, files) => {
    var name;
    if (files.image.name.includes(".jpg")) {
      name = files.image.name.replace(".jpg", "");
    }

    if (files.image.name.includes(".png")) {
      name = files.image.name.replace(".png", "");
    }

    if (files.image.name.includes(".jpeg")) {
      name = files.image.name.replace(".jpeg", "");
    }

    if (files.image.name.includes(".webp")) {
      name = files.image.name.replace(".webp", "");
    }

    if (files.image.name.includes(".svg")) {
      name = files.image.name.replace(".svg", "");
    }
    sharp(files.image.path)
      .resize(1088, 640, {
        position: "top",
        fit: "inside",
        withoutEnlargement: true,
      })
      .toFormat("jpeg")
      .webp({ quality: 90 })
      .toFile(`public/images/${name}.webp`)
      .then((info) => {
        sharp(files.image.path)
          .resize(1088, 1088, {
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
            res.end(
              JSON.stringify({
                success: 1,
                file: {
                  url: `/images/${name}.webp`,
                },
              })
            );
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
