const axios = require("axios");

export default (req, res) => {
  const { token } = req.body;
  axios
    .post(`https://hcaptcha.com/siteverify`, {
      secret: "0x91043d30b19014D57D620FbED548bd5BE92d63E6",
      response: token,
    })
    .then(function (response) {
      if (response.data.success == true) {
        res.end(
          JSON.stringify({
            response: "ok",
          })
        );
      } else {
        res.end(
          JSON.stringify({
            response: "fail",
          })
        );
      }
    })
    .catch(function (error) {
      console.log(error);
      res.end(
        JSON.stringify({
          response: "fail",
        })
      );
    })
    .then(function () {
      // always executed
    });
};
