import {
  Tooltip,
  Row,
  Col,
  Card,
  Typography,
  Layout,
  Menu,
  Button,
  Badge,
  Dropdown,
  PageHeader,
} from "antd";
import { UserOutlined, ArrowRightOutlined } from "@ant-design/icons";

const menu = (
  <Menu onClick={() => {}}>
    <Menu.Item key="1">
      <UserOutlined />
      1st menu item
    </Menu.Item>
    <Menu.Item key="2">
      <UserOutlined />
      2nd menu item
    </Menu.Item>
    <Menu.Item key="3">
      <UserOutlined />
      3rd item
    </Menu.Item>
  </Menu>
);
const Featured = () => {
  return (
    <>
      <PageHeader
        extra={[
          <>
            <span>See More</span> <ArrowRightOutlined />
          </>,
        ]}
      />

      <Row style={{ height: "100%" }}>
        <Col xs={23} sm={12} md={12} lg={12} xl={6}>
          <Card
            style={{ margin: "20px" }}
            cover={
              <img src="https://image.freepik.com/free-vector/abstract-colorful-flow-shapes-background_23-2148244293.jpg" />
            }
            loading={false}
            hoverable={true}
            actions={[
              <Tooltip title="Bookmark This">
                <a>
                  <i class="ri-bookmark-line ri-lg"></i>
                </a>
              </Tooltip>,
              <Dropdown overlay={menu} trigger={["click"]} placement="topRight">
                <a onClick={(e) => e.preventDefault()}>
                  <i class="ri-more-2-line ri-lg"></i>
                </a>
              </Dropdown>,
            ]}
          >
            <Card.Meta
              title="Data Visualization Libraries for React Developers in 2019"
              description="This is a random excerpt of a post you should know"
            />
          </Card>
        </Col>
        <Col xs={23} sm={12} md={12} lg={12} xl={6}>
          <Card
            style={{ margin: "20px" }}
            cover={
              <img src="https://image.freepik.com/free-vector/abstract-colorful-flow-shapes-background_23-2148244293.jpg" />
            }
            loading={false}
            hoverable={true}
            actions={[
              <Tooltip title="Bookmark This">
                <a>
                  <i class="ri-bookmark-line ri-lg"></i>
                </a>
              </Tooltip>,
              <Dropdown overlay={menu} trigger={["click"]} placement="topRight">
                <a onClick={(e) => e.preventDefault()}>
                  <i class="ri-more-2-line ri-lg"></i>
                </a>
              </Dropdown>,
            ]}
          >
            <Card.Meta
              title="The Most Comprehensive Lesson On React Javascript"
              description="This is a random excerpt of a post you should know"
            />
          </Card>
        </Col>
        <Col xs={23} sm={12} md={12} lg={12} xl={6}>
          <Card
            style={{ margin: "20px" }}
            cover={
              <img src="https://image.freepik.com/free-vector/abstract-colorful-flow-shapes-background_23-2148244293.jpg" />
            }
            loading={false}
            hoverable={true}
            actions={[
              <Tooltip title="Bookmark This">
                <a>
                  <i class="ri-bookmark-line ri-lg"></i>
                </a>
              </Tooltip>,
              <Dropdown overlay={menu} trigger={["click"]} placement="topRight">
                <a onClick={(e) => e.preventDefault()}>
                  <i class="ri-more-2-line ri-lg"></i>
                </a>
              </Dropdown>,
            ]}
          >
            <Card.Meta
              title="The Most Comprehensive Lesson On React Javascript"
              description="This is a random excerpt of a post you should know"
            />
          </Card>
        </Col>
        <Col xs={23} sm={12} md={12} lg={12} xl={6}>
          <Card
            style={{ margin: "20px" }}
            cover={
              <img src="https://image.freepik.com/free-vector/abstract-colorful-flow-shapes-background_23-2148244293.jpg" />
            }
            loading={false}
            hoverable={true}
            actions={[
              <Tooltip title="Bookmark This">
                <a>
                  <i class="ri-bookmark-line ri-lg"></i>
                </a>
              </Tooltip>,
              <Dropdown overlay={menu} trigger={["click"]} placement="topRight">
                <a onClick={(e) => e.preventDefault()}>
                  <i class="ri-more-2-line ri-lg"></i>
                </a>
              </Dropdown>,
            ]}
          >
            <Card.Meta
              title="The Most Comprehensive Lesson On React Javascript"
              description="This is a random excerpt of a post you should know"
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Featured;
