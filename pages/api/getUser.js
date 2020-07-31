import withSession from "lib/session";

export default withSession(async (req, res) => {
  const user = req.session.get("session");
  if (user) {
    console.log("yes");
    console.log(user);

    res.json({
      user: user,
      loggedIn: true,
    });
  } else {
    res.send(
      JSON.stringify({
        loggedIn: false,
      })
    );
  }
});
