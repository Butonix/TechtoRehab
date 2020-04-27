import {
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
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  EditOutlined,
  DownOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { breakPoints } from "../components/global/responsive";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const HeaderDefault = styled.header`
  box-shadow: 0px 0px 3px 0px #f5f5f5;
  height: 50px;
  position: relative;
  background: white;
  display: flex;
  nav {
    display: flex;
    font-size: 16px;
    width: 100vw;
    justify-content: space-between;
    box-shadow: 0px 1px 3px 0px #dcdcdc;
    z-index: 1;
    background: white;
    align-items: center;
    .navItem {
      margin: 0px 15px;
      line-height: 3;
    }
    .center {
      margin-left: auto;
      margin-right: auto;
      align-items: center;
      display: flex;
      .navItem {
        margin: 0px 15px;
        height: 38px;
        span {
          span {
            font-size: 20px;
            @media ${breakPoints.mobile} {
              font-size: 20px;
            }
          }
        }

        ion-icon {
          font-size: 22px;
          @media ${breakPoints.mobile} {
            font-size: 22px;
            margin: 0px 5px;
          }
        }
        @media ${breakPoints.mobile} {
          margin: 0px 5px;
          height: 38px;
        }
      }
    }
    img {
      width: 150px;
      margin: 0px 15px;

      @media ${breakPoints.mobile} {
        width: 130px;
        margin: 0px 10px;
      }
    }

    .compose {
      margin-right: 10px;
      @media ${breakPoints.mobile} {
        /* margin-right: 10px; */
        position: fixed;
        bottom: 20px;
        right: 40px;

        button {
          border-radius: 50%;
          height: 60px;
          width: 60px;
          background: #1890ff;
          color: white;
          .composeText {
            display: none;
          }
        }
      }
    }

    .userOptions {
      margin-right: 20px;
      @media ${breakPoints.mobile} {
        /* display: none; */
      }
    }

    .getStarted {
      margin-right: 10px;
    }

    .loginIcon {
      display: none;
      margin: 0px 5px;
      @media ${breakPoints.mobile} {
        display: block;
        font-size: 20px;
      }
    }
  }
`;

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

export default function Home() {
  return (
    <Layout>
      <HeaderDefault>
        <nav>
          <img src="TECHTOREHAB.svg" />
          <div className="center">
            <div className="navItem">
              <Badge count={0} showZero>
                <ion-icon name="notifications-outline"></ion-icon>
              </Badge>
            </div>
            <div className="navItem">
              <ion-icon name="bookmark-outline"></ion-icon>
            </div>
          </div>
          <div className="navItem compose">
            <Button icon={<EditOutlined />}>
              <span className="composeText">Write</span>
            </Button>
          </div>
          <Dropdown className="userOptions" overlay={menu}>
            <Button>
              Hello, Afzaal <DownOutlined />
            </Button>
          </Dropdown>
          <Button className="getStarted">Get Started</Button>
        </nav>
      </HeaderDefault>
      <Layout>
        <Sider
          width={200}
          className="site-layout-background"
          breakpoint="lg"
          collapsedWidth="0"
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="1">option1</Menu.Item>
            <Menu.Item key="2">option2</Menu.Item>
            <Menu.Item key="3">option3</Menu.Item>
            <Menu.Item key="4">option4</Menu.Item>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <LaptopOutlined />
                  subnav 2
                </span>
              }
            >
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <NotificationOutlined />
                  subnav 3
                </span>
              }
            >
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px", height: "100%" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              marginTop: 10,
              background: "white",
            }}
          >
            <PageHeader
              title="Featured"
              extra={[
                <>
                  See More <ArrowRightOutlined />
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
                >
                  <Card.Meta
                    title="Welcome To React JS Lesson"
                    description="This is a random excerpt of a post you should know"
                  />
                  <p style={{ margin: "10px 0px" }}>By Afzaal Afridi</p>
                </Card>
              </Col>
              <Col xs={23} sm={12} md={12} lg={12} xl={6}>
                <Card
                  style={{ margin: "20px" }}
                  cover={
                    <img src="https://image.freepik.com/free-vector/abstract-colorful-flow-shapes-background_23-2148244293.jpg" />
                  }
                >
                  <Card.Meta
                    title="Welcome To React JS Lesson"
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
                >
                  <Card.Meta
                    title="Welcome To React JS Lesson"
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
                >
                  <Card.Meta
                    title="Welcome To React JS Lesson"
                    description="This is a random excerpt of a post you should know"
                  />
                </Card>
              </Col>
            </Row>
            <PageHeader
              title="From Technology"
              extra={[
                <>
                  See More <ArrowRightOutlined />
                </>,
              ]}
            />
            <Row>
              <Col xs={23} sm={12} md={12} lg={12} xl={6}>
                <Card
                  style={{ margin: "20px" }}
                  cover={
                    <img src="https://image.freepik.com/free-vector/abstract-colorful-flow-shapes-background_23-2148244293.jpg" />
                  }
                >
                  <Card.Meta
                    title="Welcome To React JS Lesson"
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
                >
                  <Card.Meta
                    title="Welcome To React JS Lesson"
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
                >
                  <Card.Meta
                    title="Welcome To React JS Lesson"
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
                >
                  <Card.Meta
                    title="Welcome To React JS Lesson"
                    description="This is a random excerpt of a post you should know"
                  />
                </Card>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
