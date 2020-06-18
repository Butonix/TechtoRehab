import { Result, Button } from "antd";
import AdminComponent from "components/admin/adminWrapper";
import UsersManager from "components/admin/usersManager";
import { useRouter } from "next/router";

const AdminRoutePage = () => {
  const router = useRouter();
  const { adminRoute } = router.query;
  return (
    <AdminComponent route={adminRoute}>
      {adminRoute === "users" ? (
        <UsersManager />
      ) : (
        <Result
          status="404"
          title="404 Not Found"
          subTitle="The Page You Are Looking For Doesn't Exist"
          extra={[
            <Button type="primary" key="console" onClick={() => router.back()}>
              Go Back
            </Button>,
          ]}
        ></Result>
      )}
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
