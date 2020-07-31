const sharp = require("sharp");
var formidable = require("formidable");
const { Storage } = require("@google-cloud/storage");
const fs = require("fs");
const request = require("request");
const storage = new Storage();
export default async (req, res) => {
  const form = formidable({ multiples: true });
  const download = (url, path, callback) => {
    request.head(url, (err, res, body) => {
      request(url).pipe(fs.createWriteStream(path)).on("close", callback);
    });
  };

  await form.parse(req, async (err, fields, files) => {
    var path;
    var name;
    if (Object.entries(files).length === 0) {
      var url = fields.url;
      let name = fields.url.split("/")[5].replace(/ /g, "");
      download(url, `./${name}`, async () => {
        await storage.bucket("tech-to-rehab").upload(path, {
          destination: name,
          resumable: true,
          validation: "crc32c",
          metadata: {
            cacheControl: "public, max-age=31536000",
          },
        });
        fs.unlink(path, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          res.end(
            JSON.stringify({
              success: 1,
              file: {
                url: `https://ik.imagekit.io/ttr/${name}`,
              },
            })
          );
        });
      });
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
