import Wrapper from "components/global/wrapper";
import { Typography, Row, Col, Menu, Layout } from "antd";
import { useRouter } from "next/router";
import UsersManager from "components/admin/usersManager";

const { Text } = Typography;
const { Sider } = Layout;

const AdminRoutePage = () => {
  const router = useRouter();
  const { adminRoute } = router.query;
  return (
    <Wrapper admin>
      <Row justify="center">
        <Col xs={0} sm={0} md={6} lg={6} xl={4} xxl={3}>
          <Menu
            theme="light"
            defaultSelectedKeys={[`${adminRoute}`]}
            mode="inline"
            style={{ position: "sticky", height: "100vh", top: 10 }}
          >
            <Menu.Item key="home">
              {console.log(adminRoute)}
              Dashboard
            </Menu.Item>
            <Menu.Item key="articles">Articles</Menu.Item>
            <Menu.Item key="users">Users</Menu.Item>
          </Menu>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          className="mg-auto"
        >
          {adminRoute == "users" ? <UsersManager /> : <p>404</p>}
        </Col>
      </Row>
    </Wrapper>
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
