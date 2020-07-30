var ImageKit = require("imagekit");

export default (req, res) => {
  const { image } = req.body;
  try {
    var imagekit = new ImageKit({
      publicKey: "public_5uRb587LeFaf1uxkL17UrnLkqs0=",
      privateKey: "private_2QEPRMG1XTl+2Xkvr6cksZJMbaw=",
      urlEndpoint: "https://ik.imagekit.io/ttr",
    });

    var defaultUrl = imagekit.url({
      src: "https://ik.imagekit.io/ttr/" + image,
      signed: true,
    });
    console.log(defaultUrl);
    res.send(JSON.stringify({ signed: defaultUrl }));
  } catch (err) {
    console.log(err);
  }
};
