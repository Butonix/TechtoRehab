const fs = require("fs");

export default (req, res) => {
  console.log(req.body);
  var path = req.body.path;

  fs.unlink("public" + path, (err) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ result: "FAILED" }));
      return;
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ result: "OK" }));
    return;
  });
};
