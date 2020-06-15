const fs = require("fs");
import conf from "config.json";
export default (req, res) => {
  var data = {
    theme: "Kalaar",
  };
  data = JSON.stringify(data);
  fs.writeFileSync("config.json", data);
  res.writeHead(200);
  res.end();
};
