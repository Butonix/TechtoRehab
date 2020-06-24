const sharp = require("sharp");
var formidable = require("formidable");
var util = require("util");
export default async (req, res) => {
  const form = formidable({ multiples: true });
  await form.parse(req, (err, fields, files) => {
    // console.log(JSON.stringify(files.avatar));
    sharp(files.avatar.path)
      .resize(816, 480, { position: "top" })
      .toFormat("jpeg")
      .webp({ quality: 90 })
      .toFile(`public/images/${files.avatar.name}.webp`)
      .then((info) => {
        console.log(info);
        res.status(200);
        res.end(JSON.stringify({ path: `/images/${files.avatar.name}.webp` }));
      })
      .catch((err) => console.log(err));
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};
