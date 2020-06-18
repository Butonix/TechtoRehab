import AdminComponent from "components/admin/adminWrapper";

const Admin = () => {
  return (
    <AdminComponent>
      <p>Children</p>
    </AdminComponent>
  );
};

export default Admin;

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
