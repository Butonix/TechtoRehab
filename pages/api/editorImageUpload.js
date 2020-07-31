const sharp = require("sharp");
var formidable = require("formidable");
const { Storage } = require("@google-cloud/storage");
const storage = new Storage();
export default async (req, res) => {
  const form = formidable({ multiples: true });
  await form.parse(req, async (err, fields, files) => {
    var path;
    var name;
    if (Object.entries(files).length === 0) {
      path = fields.url;
      name = fields.url.split("/")[5].replace(/ /g, "");
    } else {
      name = files.image.name.replace(/ /g, "");
      path = files.image.path;
    }
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
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};
