import withSession from "lib/session";

const User = () => {
  return <p>user</p>;
};

export default User;

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("session");

  if (!user) {
    res.setHeader("location", "/401");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  } else if (user.status == "pending") {
    res.setHeader("location", "/user/pending");
    res.statusCode = 302;
    res.end();
  } else {
    return { props: {} };
  }
});
