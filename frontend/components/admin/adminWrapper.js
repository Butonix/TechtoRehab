import Wrapper from "components/global/wrapper";
import { Typography, Row, Col, Layout, Menu } from "antd";
import Link from "next/link";

const { Text } = Typography;
const { Sider } = Layout;

const AdminWrapper = (props) => {
  return (
    <Wrapper admin>
      <Row justify="center">
        <Col xs={0} sm={0} md={6} lg={6} xl={4} xxl={3}>
          <Sider>
            <Menu
              theme="light"
              defaultSelectedKeys={`${props.route}`}
              mode="inline"
              style={{ position: "sticky", height: "100vh", top: 10 }}
            >
              <Menu.Item key="home">
                <Link href="/admin/home">
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
          </Sider>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          className="mg-x-auto"
        >
          {props.children}
        </Col>
      </Row>
    </Wrapper>
  );
};

export default AdminWrapper;
