import { useState } from "react";

import {
  Tag,
  Slider,
  Switch,
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
const { Title, Paragraph, Text } = Typography;

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
          line-height: 1;
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
                  <Tooltip title="Notifications">
                    <a onClick={(e) => e.preventDefault()}>
                      <i class="ri-notification-3-line"></i>
                    </a>
                  </Tooltip>
                </Dropdown>
              </Badge>
            </div>
            <div className="navItem">
              <Tooltip title="My Bookmarks">
                <a>
                  <i class="ri-bookmark-line"></i>
                </a>
              </Tooltip>
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
            <Title style={{ margin: "20px", fontSize: "16px" }}>
              Categories
            </Title>

            <SubMenu key="sub2" title={<Space>Physical Therapy</Space>}>
              <Menu.Item key="5">MSK/Orthopedic</Menu.Item>
              <Menu.Item key="6">Neuro</Menu.Item>
              <Menu.Item key="7">Sports</Menu.Item>
              <Menu.Item key="8">Cardiopulmonary</Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" title={<Space>Programming</Space>}>
              <Menu.Item key="5">JavaScript</Menu.Item>
              <Menu.Item key="6">Flutter</Menu.Item>
              <Menu.Item key="7">PHP</Menu.Item>
              <Menu.Item key="8">HTML</Menu.Item>
              <Menu.Item key="9">CSS</Menu.Item>
              <Menu.Item key="10">SEO</Menu.Item>
            </SubMenu>

            <SubMenu key="sub5" title={<Space>Short Courses</Space>}>
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <Title style={{ margin: "20px", fontSize: "16px" }}>
              Customize Feed
            </Title>
            <Title style={{ margin: "10px 20px", fontSize: "14px" }}>
              Show/Hide
            </Title>
            <Space style={{ margin: "10px 20px" }}>
              <Switch defaultChecked />
              <Text>Physiotherapy</Text>
            </Space>
            <Space style={{ margin: "10px 20px" }}>
              <Switch />
              <Text>Medicine</Text>
            </Space>
            <Space style={{ margin: "10px 20px" }}>
              <Switch defaultChecked />
              <Text>Technology</Text>
            </Space>
            <Space style={{ margin: "10px 20px" }}>
              <Switch />
              <Text>Courses</Text>
            </Space>
            <Space style={{ margin: "10px 20px" }}>
              <Switch />
              <Text>TTR-Ai</Text>
              <Tooltip title="It Suggests Articles Based On Your Reading">
                <a>
                  <i class="ri-information-line ri-lg"></i>
                </a>
              </Tooltip>
            </Space>
            <Title style={{ margin: "10px 20px", fontSize: "14px" }}>
              Number Of Articles
            </Title>
            <Slider
              marks={{
                1: "1",
                2: "2",
                3: "3",
                4: "4",
                5: "5",
                6: "6",
                7: "7",
                8: "8",
                9: "9",
                10: "10",
              }}
              defaultValue={5}
              min={1}
              max={10}
              style={{ margin: "20px 20px" }}
            />
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
                  loading={false}
                  hoverable={true}
                  actions={[
                    <Tooltip title="Bookmark This">
                      <a>
                        <i class="ri-bookmark-line ri-lg"></i>
                      </a>
                    </Tooltip>,
                    <Dropdown
                      overlay={menu}
                      trigger={["click"]}
                      placement="topRight"
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <i class="ri-more-2-line ri-lg"></i>
                      </a>
                    </Dropdown>,
                  ]}
                >
                  <Card.Meta
                    title="The Most Comprehensive Lesson On React
                        Javascript"
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
                          <Avatar />
                          <span style={{ margin: "0px 8px" }}>
                            Afzaal Afridi
                          </span>
                        </>
                      ) : (
                        <div></div>
                      ),
                      <Dropdown overlay={menu}>
                        <a onClick={(e) => e.preventDefault()}>
                          <i
                            class="ri-more-2-fill ri-lg"
                            style={{ margin: "2px 0px" }}
                          ></i>
                        </a>
                      </Dropdown>,
                      <Tooltip title="Bookmark This">
                        <a>
                          <i
                            class="ri-bookmark-line ri-lg"
                            onFocus={(e) => e.preventDefault()}
                          ></i>
                        </a>
                      </Tooltip>,
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
                        description={["From Technology"]}
                      />
                      <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                        {item.content}
                      </Paragraph>
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
