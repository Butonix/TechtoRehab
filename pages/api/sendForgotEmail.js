const nodemailer = require("nodemailer");

export default async (req, res) => {
  const { email, id, token } = req.body;
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "uthreviews@gmail.com", // generated ethereal user
      pass: "jlfxnrhbdnpummxh",
    },
  });
  await transporter
    .sendMail({
      from: "TechToRehab <support@techtorehab.com>",
      to: email,
      subject: "Your Confirmation Token For Tech To Rehab",
      text: ``,
      html: `
        <p> Hi you requested a password reset. Here is a link to reset your password</p>
        <p> Link: https://techtorehab.com/forgot-password/${id}?token=${token} </p>
        `,
    })
    .then((result) => {
      res.end(JSON.stringify({ email: "ok" }));
    })
    .then((err) => {
      res.end(JSON.stringify({ email: "fail" }));
    });
};
