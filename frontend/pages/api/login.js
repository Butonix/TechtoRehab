import withSession from "lib/session";

export default withSession(async (req, res) => {
  const { id, type, username, email, profilePicture } = await req.body;
  console.log(id);
  const user = {
    id: id,
    email: email,
    username: username,
    profilePicture: profilePicture,
    type: type,
  };
  req.session.set("session", user);
  await req.session.save();
  res.json(user);
});
