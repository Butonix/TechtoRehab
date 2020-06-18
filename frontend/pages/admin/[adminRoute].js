import AdminComponent from "components/admin/adminWrapper";
import UsersManager from "components/admin/usersManager";
import { useRouter } from "next/router";

const AdminRoutePage = () => {
  const router = useRouter();
  const { adminRoute } = router.query;
  return (
    <AdminComponent route={adminRoute}>
      {adminRoute === "users" ? <UsersManager /> : null}
    </AdminComponent>
  );
};

export default AdminRoutePage;

export async function getServerSideProps() {
  // return {
  //   props: {
  //     initialApolloState: apolloClient.cache.extract(),
  //   },
  //   unstable_revalidate: 1,
  // };
  return { props: {} };
}
