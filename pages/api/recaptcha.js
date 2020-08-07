const { verify } = require("hcaptcha");

export default (req, res) => {
  const { token } = req.body;
  console.log(token);
  verify("0x91043d30b19014D57D620FbED548bd5BE92d63E6", token)
    .then((data) => {
      console.log(data);
      if (data.success === true) {
        res.send(
          JSON.stringify({
            response: "ok",
          })
        );
      } else {
        res.send(
          JSON.stringify({
            response: "fail",
          })
        );
      }
    })
    .catch(console.error);
};
