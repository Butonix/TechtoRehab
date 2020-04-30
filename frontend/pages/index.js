import { useState } from "react";

import {
  Empty,
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
  LaptopOutlined,
  NotificationOutlined,
  EditOutlined,
  DownOutlined,
  ArrowRightOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { breakPoints } from "../components/global/responsive";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Title, Paragraph } = Typography;

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

        i {
          font-size: 22px;
          line-height:1;
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
        right: 0px;
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
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([
    {
      href: "http://ant.design",
      title: `My Experience Of Working In A Government Hospital In Pakistan`,
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      description:
        "Ant Design, a design language for background applications, is refined by Ant UED Team.",
      content:
        "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
      cover:
        "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
    },
  ]);
  const onLoad = () => {
    setLoading(true);
    setData(
      data.concat([...new Array(1)].map(() => ({ loading: true, name: {} })))
    );
    var ampData = {
      href: "http://ant.design",
      title: `From Hero To React In Under 30 Days !`,
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      description:
        "Ant Design, a design language for background applications, is refined by Ant UED Team.",
      content:
        "(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
      cover:
        "https://static.vecteezy.com/system/resources/previews/000/158/077/non_2x/kerala-sunset-vector-background.jpg",
    };
    setTimeout(() => {
      setData(data.concat(ampData));
      setLoading(false);
      window.dispatchEvent(new Event("resize"));
    }, 5000);
  };

  const loadMore = !loading ? (
    <div
      style={{
        textAlign: "center",
        marginTop: 12,
        height: 32,
        lineHeight: "32px",
      }}
    >
      <Button type="primary" icon={<ReloadOutlined />} onClick={onLoad}>
        Load More
      </Button>
    </div>
  ) : null;

  return (
    <Layout>
      <HeaderDefault>
        <nav>
          <img className="logoLight" src="TTR-LIGHT.svg" />
          <img className="logoDark" src="TTR-DARK.svg" />
          <div className="center">
            <div className="navItem">
              <Badge count={0} showZero>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <a onClick={(e) => e.preventDefault()}>
                  <i class="ri-notification-3-line"></i>
                  </a>
                </Dropdown>
              </Badge>
            </div>
            <div className="navItem">
            <i class="ri-bookmark-line"></i>
            </div>
          </div>
          <div className="navItem compose">
            <Button type="primary" icon={<EditOutlined />}>
              <span className="composeText">Write</span>
            </Button>
          </div>
          {/* <Dropdown className="userOptions" overlay={menu}>
            <Button>
              Hello, Afzaal <DownOutlined />
            </Button>
          </Dropdown> */}
          <Button type="primary" className="getStarted">
            Get Started
          </Button>
        </nav>
      </HeaderDefault>
      <Layout>
        <Sider
          // style={{
          //   overflow: "auto",
          //   height: "100vh",
          //   position: "sticky",
          //   left: 0,
          //   top: 0,
          // }}
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
        <Layout className="mainLayout">
          <Content
            className="site-layout"
            // style={{
            //   padding: "24px",
            //   marginTop: 10,
            // }}
          >
            <PageHeader
              title="Featured"
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
                  <span>See More</span> <ArrowRightOutlined />
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
            <PageHeader
              title="News Feed"
              extra={[
                <>
                  <span>See More</span> <ArrowRightOutlined />
                </>,
              ]}
            />
            <Row>
              <List
                itemLayout="vertical"
                dataSource={data}
                style={{ margin: "0px 20px" }}
                loadMore={loadMore}
                renderItem={(item) => (
                  <List.Item
                    key={item.title}
                    actions={[
                      !item.loading ? (
                        <>
                          <UserOutlined />
                          <span style={{ margin: "0px 8px" }}>Hello</span>
                        </>
                      ) : (
                        <div></div>
                      ),
                    ]}
                    extra={
                      !item.cover ? (
                        <div class="ph-item">
                          <div class="ph-picture"></div>
                        </div>
                      ) : (
                        <img width={272} alt="logo" src={item.cover} />
                      )
                    }
                  >
                    <Skeleton
                      className="skeleton"
                      loading={item.loading}
                      active
                    >
                      <List.Item.Meta
                        title={<a href={item.href}>{item.title}</a>}
                        description={
                          <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                            {item.content}
                          </Paragraph>
                        }
                      />
                    </Skeleton>
                  </List.Item>
                )}
              />
            </Row>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
