import Wrapper from "components/global/wrapper";
import { Typography, Row, Col, Layout, Menu } from "antd";
import Link from "next/link";
import { useStoreActions } from "easy-peasy";

const { Text } = Typography;
const { Sider } = Layout;

const AdminWrapper = (props) => {
  return (
    <Wrapper admin route={props.route}>
      <Row justify="center">
        <Col xs={0} sm={0} md={6} lg={6} xl={4} xxl={3}>
          <Menu
            theme="light"
            className="pd-y-20"
            defaultSelectedKeys={props.route ? `${props.route}` : ["home"]}
            mode="inline"
            style={{ position: "sticky", height: "100vh", top: 10 }}
          >
            <Menu.Item key="home">
              <Link href="/admin">
                <a>Dashboard</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="articles">
              <Link href="/admin/articles">
                <a>Articles</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="users">
              <Link href="/admin/users">
                <a>Users</a>
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={17}
          lg={16}
          xl={19}
          xxl={20}
          className="ml-20 mr-auto adminContainer pd-20"
        >
          {props.children}
        </Col>
      </Row>
    </Wrapper>
  );
};

export default AdminWrapper;
