
export default (req, res) => {
  if (req.method == "POST") {
    var jsont = JSON.parse(req.body);
    var name = jsont.info;
    var type = null;
    if (jsont.type == "image/png") {
      type = "png";
    } else {
      type = "jpg";
    }

    if (type !== null) {
      require("fs").writeFile(
        `public/${name}.${type}`,
        jsont.base64,
        "base64",
        function (err) {
          console.log(err);
        }
      );
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      console.log("POST RECEIVED");
      res.end(
        JSON.stringify({
          location: `http://localhost:3000/${name}.${type}`,
        })
      );
    }
  }
};
