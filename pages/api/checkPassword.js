const argon2 = require("argon2");

export default async (req, res) => {
  const { password, salt } = req.body;
  if (await argon2.verify(salt, password)) {
    res.end(JSON.stringify({ verify: "pass" }));
  } else {
    res.end(JSON.stringify({ verify: "fail" }));
  }
};
