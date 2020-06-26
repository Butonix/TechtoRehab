import { Result, Button } from "antd";
import AdminComponent from "components/admin/adminWrapper";
import UsersManager from "components/admin/usersManager";
import ArticlesManager from "components/admin/articlesManager";
import { useRouter } from "next/router";
import CommentsManager from "components/admin/commentsManager";

const AdminRoutePage = () => {
  const router = useRouter();
  const { adminRoute } = router.query;
  return (
    <AdminComponent route={adminRoute}>
      {adminRoute === "users" ? (
        <UsersManager />
      ) : adminRoute === "articles" ? (
        <ArticlesManager />
      ) : adminRoute === "comments" ? (
        <CommentsManager />
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
          style={{ margin: "auto" }}
        ></Result>
      )}
    </AdminComponent>
  );
};

export default AdminRoutePage;

export async function getServerSideProps() {
  return { props: {} };
}
