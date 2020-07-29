const { Storage } = require("@google-cloud/storage");

export default async (req, res) => {
  var name = req.body.name;
  name = name.replace("https://ik.imagekit.io/ttr/", "");
  // name = name.substr(0, name.indexOf("."));
  try {
    const storage = new Storage();
    await storage.bucket("tech-to-rehab").file(name).delete();
    res.status(200).send({
      result: "ok",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      result: "fail",
    });
  }
};
