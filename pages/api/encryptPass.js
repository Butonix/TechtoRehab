const argon2 = require("argon2");

export default async (req, res) => {
  const { password } = req.body;
  const hashedPassword = await argon2.hash(password);
  res.end(JSON.stringify({ hash: hashedPassword }));
};
