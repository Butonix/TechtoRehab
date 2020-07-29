const { Storage } = require("@google-cloud/storage");

export default async (req, res) => {
  var name = req.body.name;
  try {
    const storage = new Storage();
    await storage.bucket("tech-to-rehab").file(name).delete();
    res.end(
      JSON.stringify({
        res: "ok",
      })
    );
  } catch (err) {
    res.end(
      JSON.stringify({
        res: "fail",
      })
    );
  }
};
