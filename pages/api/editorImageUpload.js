var formidable = require("formidable");
const Axios = require("axios");
const download = require("image-downloader");

const { Storage } = require("@google-cloud/storage");
const fs = require("fs");
const { nanoid } = require("nanoid");
//
//
const storage = new Storage();
//
//
export default async (req, res) => {
  const form = formidable({ multiples: true });
  await form.parse(req, async (err, fields, files) => {
    var path;
    var name;
    if (Object.entries(files).length === 0) {
      var url = fields.url;
      name = fields.url.split("/")[5].replace(/ /g, "");
      const nama = await nanoid();
      download
        .image({
          url: url,
          dest: `./${nama}.jpg`,
          extractFilename: false,
        })
        .then(async ({ filename }) => {
          await storage.bucket("tech-to-rehab").upload(filename, {
            destination: nama + ".jpg",
            resumable: true,
            validation: "crc32c",
            metadata: {
              cacheControl: "public, max-age=31536000",
            },
          });
          await fs.unlink(filename, function (err) {
            if (err) return console.log(err);
            //...
          });
          filename = filename.split(".")[1].split("/")[1] + ".jpg";
          res.end(
            JSON.stringify({
              success: 1,
              file: {
                url: `https://ik.imagekit.io/ttr/${filename}`,
              },
            })
          );
        })
        .catch((err) => console.error(err));
    } else {
      let name = files.image.name.replace(/ /g, "");
      let path = files.image.path;
      await storage.bucket("tech-to-rehab").upload(path, {
        destination: name,
        resumable: true,
        validation: "crc32c",
        metadata: {
          cacheControl: "public, max-age=31536000",
        },
      });
      res.end(
        JSON.stringify({
          success: 1,
          file: {
            url: `https://ik.imagekit.io/ttr/${name}`,
          },
        })
      );
    }
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};
