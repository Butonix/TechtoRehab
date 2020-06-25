const sharp = require("sharp");
var formidable = require("formidable");

export default async (req, res) => {
  const form = formidable({ multiples: true });
  await form.parse(req, (err, fields, files) => {
    // console.log(JSON.stringify(files.avatar));
    var name = files.avatar.name.replace(".jpg", "");
    sharp(files.avatar.path)
      .resize(816, 480, { position: "top" })
      .toFormat("jpeg")
      .webp({ quality: 100 })
      .toFile(`public/images/${name}.webp`)
      .then((info) => {
        console.log(info);
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
