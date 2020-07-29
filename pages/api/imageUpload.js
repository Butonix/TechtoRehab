const sharp = require("sharp");
var formidable = require("formidable");
const { Storage } = require("@google-cloud/storage");
const storage = new Storage();
export default async (req, res) => {
  const form = formidable({ multiples: true });
  await form.parse(req, async (err, fields, files) => {
    var name = files.imageUpload.name.replace(/ /g, "");

    await storage.bucket("tech-to-rehab").upload(files.imageUpload.path, {
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
        path: `https://ik.imagekit.io/ttr/${name}`,
      })
    );
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};
