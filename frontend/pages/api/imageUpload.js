const sharp = require("sharp");
var formidable = require("formidable");

export default async (req, res) => {
  const form = formidable({ multiples: true });
  await form.parse(req, (err, fields, files) => {
    var name = files.avatar.name.replace(".jpg", "");
    sharp(files.avatar.path)
      .resize(816, 480, {
        position: "top",
        withoutEnlargement: true,
      })
      .toFormat("jpeg")
      .webp({ quality: 100 })
      .toFile(`public/images/${name}.webp`)
      .then((info) => {
        res.status(200);
        res.end(JSON.stringify({ path: `/images/${name}.webp` }));
      })
      .catch((err) => console.log(err));
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};
