import Wrapper from "components/global/wrapper";
import { Typography, Row, Col, Menu } from "antd";
import Link from "next/link";

const AdminWrapper = (props) => {
  return (
    <Wrapper admin route={props.route} user={props.user}>
      <Row justify="center">
        <Col xs={0} sm={0} md={6} lg={6} xl={4} xxl={3}>
          <Menu
            theme="light"
            className="pd-y-20"
            defaultSelectedKeys={props.route ? `${props.route}` : ["home"]}
            mode="inline"
            style={{ position: "sticky", height: "100vh", top: 10 }}
          >
            <Menu.Item
              key="home"
              icon={
                <i
                  class="ri-dashboard-2-line ri-lg va-minus-4 mr-10"
                  style={{ color: "inherit" }}
                ></i>
              }
            >
              <Link href="/admin">
                <a>Dashboard</a>
              </Link>
            </Menu.Item>
            <Menu.Item
              key="articles"
              icon={
                <i
                  class="ri-book-open-line ri-lg va-minus-4 mr-10"
                  style={{ color: "inherit" }}
                ></i>
              }
            >
              <Link href="/admin/articles">
                <a>Articles</a>
              </Link>
            </Menu.Item>
            <Menu.Item
              key="categories"
              icon={
                <i
                  class="ri-node-tree ri-lg va-minus-4 mr-10"
                  style={{ color: "inherit" }}
                ></i>
              }
            >
              <Link href="/admin/categories">
                <a>Categories</a>
              </Link>
            </Menu.Item>
            <Menu.Item
              key="users"
              icon={
                <i
                  class="ri-user-smile-line ri-lg va-minus-4 mr-10"
                  style={{ color: "inherit" }}
                ></i>
              }
            >
              <Link href="/admin/users">
                <a>Users</a>
              </Link>
            </Menu.Item>
            <Menu.Item
              key="comments"
              icon={
                <i
                  class="ri-question-answer-line ri-lg va-minus-4 mr-10"
                  style={{ color: "inherit" }}
                ></i>
              }
            >
              <Link href="/admin/comments">
                <a>Comments</a>
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
