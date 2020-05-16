import {
  Tooltip,
  Avatar,
  Space,
  Skeleton,
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
  List,
} from "antd";
import {
  ReloadOutlined,
  UserOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import Shimmer from "../global/shimmer";

const { Content } = Layout;
const { Paragraph } = Typography;

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
const CatArticles = () => {
  return (
    <>
      <PageHeader
        title="From Technology"
        extra={[
          <>
            <span>See More</span> <ArrowRightOutlined />
          </>,
        ]}
      />
      <Row>
        <Col xs={23} sm={12} md={12} lg={12} xl={6}>
          {/* <Card
            style={{ margin: "20px" }}
            cover={
              <img src="https://image.freepik.com/free-vector/abstract-colorful-flow-shapes-background_23-2148244293.jpg" />
            }
            loading={false}
            hoverable={true}
          >
            <Card.Meta
              title="The most simple Contentful + React tutorial using a
                        NextJS application"
              description={
                <Space>
                  This is a random excerpt of a post you should know
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <a onClick={(e) => e.preventDefault()}>
                      <i class="ri-more-2-line ri-lg"></i>
                    </a>
                  </Dropdown>
                  <Tooltip title="Bookmark This">
                    <a>
                      <i class="ri-bookmark-line ri-lg"></i>
                    </a>
                  </Tooltip>
                </Space>
              }
            />
            <Space style={{ marginTop: "15px" }}></Space>
          </Card> */}
          <Shimmer card />
        </Col>
        <Col xs={23} sm={12} md={12} lg={12} xl={6}>
          {/* <Card
            style={{ margin: "20px" }}
            cover={
              <img src="https://image.freepik.com/free-vector/abstract-colorful-flow-shapes-background_23-2148244293.jpg" />
            }
            loading={false}
            hoverable={true}
          >
            <Card.Meta
              title="Mixins and Base Classes : A recipe for success in Flutter"
              description={
                <Space>
                  This is a random excerpt of a post you should know
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <a onClick={(e) => e.preventDefault()}>
                      <i class="ri-more-2-line ri-lg"></i>
                    </a>
                  </Dropdown>
                  <Tooltip title="Bookmark This">
                    <a>
                      <i class="ri-bookmark-line ri-lg"></i>
                    </a>
                  </Tooltip>
                </Space>
              }
            />
            <Space style={{ marginTop: "15px" }}></Space>
          </Card> */}
          <Shimmer card />
        </Col>
        <Col xs={23} sm={12} md={12} lg={12} xl={6}>
          {/* <Card
            style={{ margin: "20px" }}
            cover={
              <img src="https://image.freepik.com/free-vector/abstract-colorful-flow-shapes-background_23-2148244293.jpg" />
            }
            loading={false}
            hoverable={true}
          >
            <Card.Meta
              title="How To Host Your Next.js Application For Free On Heroku"
              description={
                <Space>
                  This is a random excerpt of a post you should know
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <a onClick={(e) => e.preventDefault()}>
                      <i class="ri-more-2-line ri-lg"></i>
                    </a>
                  </Dropdown>
                  <Tooltip title="Bookmark This">
                    <a>
                      <i class="ri-bookmark-line ri-lg"></i>
                    </a>
                  </Tooltip>
                </Space>
              }
            />
            <Space style={{ marginTop: "15px" }}></Space>
          </Card> */}
          <Shimmer card />
        </Col>
        <Col xs={23} sm={12} md={12} lg={12} xl={6}>
          {/* <Card
            style={{ margin: "20px" }}
            cover={
              <img src="https://image.freepik.com/free-vector/abstract-colorful-flow-shapes-background_23-2148244293.jpg" />
            }
            loading={false}
            hoverable={true}
          >
            <Card.Meta
              title="The most simple Contentful + React tutorial using a
                        NextJS application"
              description={
                <Space>
                  This is a random excerpt of a post you should know
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <a onClick={(e) => e.preventDefault()}>
                      <i class="ri-more-2-line ri-lg"></i>
                    </a>
                  </Dropdown>
                  <Tooltip title="Bookmark This">
                    <a>
                      <i class="ri-bookmark-line ri-lg"></i>
                    </a>
                  </Tooltip>
                </Space>
              }
            />
            <Space style={{ marginTop: "15px" }}></Space>
          </Card> */}
          <Shimmer card />
        </Col>
      </Row>
    </>
  );
};

export default CatArticles;
