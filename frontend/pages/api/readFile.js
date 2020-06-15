const fs = require("fs");

export default (req, res) => {
  var data = fs.readFileSync("config.json");
  data = JSON.parse(data);
  res.writeHead(200);
  res.end(JSON.stringify(data));
};
