const argon2 = require("argon2");

export default async (req, res) => {
  const { password } = req.body;
  if (
    await argon2.verify(
      "$argon2i$v=19$m=4096,t=3,p=1$Bc9uy0THJzyXYibfAZZFFg$TC1LvwvqNSqr2PI2uFCbKJuTWD972v+Bnq8PFULR2Y0",
      password
    )
  ) {
    res.end(JSON.stringify({ verify: "pass" }));
  } else {
    res.end(JSON.stringify({ verify: "fail" }));
  }
};
