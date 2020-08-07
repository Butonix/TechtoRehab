const { verify } = require("hcaptcha");

export default (req, res) => {
  const { token } = req.body;

  verify("0x91043d30b19014D57D620FbED548bd5BE92d63E6", token)
    .then((data) => {
      console.log("success!", data);
    })
    .catch(console.error);
};
