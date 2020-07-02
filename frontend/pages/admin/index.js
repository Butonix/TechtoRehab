import AdminComponent from "components/admin/adminWrapper";
import withSession from "lib/session";

const Admin = (props) => {
  return (
    <AdminComponent user={props.user}>
      <p>Children</p>
    </AdminComponent>
  );
};

export default Admin;

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get(["session"]);
  return {
    props: {
      user: user ? user : null,
    },
  };
});
