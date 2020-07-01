const nodemailer = require("nodemailer");

export default async (req, res) => {
  const { email, token } = req.body;
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
      text: `Hello and Welcome To Tech To Rehab,We hope you enjoy writing, sharing and collaborating on our platform. Your Confirmation Token is ${token}`,
      html: `
      <p> Hello and Welcome To Tech To Rehab, We hope you enjoy Writing, Sharing and Collaborating on our platform <p>
      <p> Your Confirmation Code is: <b>${token}</b></p>
      `,
    })
    .then((result) => {
      res.end(JSON.stringify({ result: "ok" }));
    })
    .then((err) => {
      res.end(JSON.stringify({ email: "fail" }));
    });
};
