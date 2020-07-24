import withSession from "lib/session";

export default withSession(async (req, res) => {
  const { id, status, username, email, role } = await req.body;
  const user = {
    id: id,
    email: email,
    username: username,
    status: status,
    role: role,
  };
  req.session.set("session", user);
  await req.session.save();
  res.json(user);
});
