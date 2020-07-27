const axios = require("axios");

export default (req, res) => {
  const { token } = req.body;
  axios
    .get(
      `https://www.google.com/recaptcha/api/siteverify?secret=6LcJ9bYZAAAAAFSCttCzd0Fx7dakjpc4o3bPIj80&response=${token}`
    )
    .then(function (response) {
      if (response.data.success == true) {
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
    .catch(function (error) {
      console.log(error);
      res.send(
        JSON.stringify({
          response: "fail",
        })
      );
    })
    .then(function () {
      // always executed
    });
};
