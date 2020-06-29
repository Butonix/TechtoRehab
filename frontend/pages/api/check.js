import withSession from "lib/session";

export default withSession(async (req, res) => {
  const user = await req.session.get("session");
  if (user) {
    res.json({
      user,
    });
  } else {
    res.json({
      result: "unauthorized",
    });
  }
});
