import { Layout, Menu, Breadcrumb, Button, Badge } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  EditOutlined,
  BellOutlined,
  MailOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { breakPoints } from "../components/global/responsive";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const HeaderDefault = styled.header`
  width: 100vw;
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
        height: 44px;
        span {
          span {
            font-size: 20px;
            @media ${breakPoints.mobile} {
              font-size: 20px;
            }
          }
        }
      }
    }
    img {
      width: 150px;
      margin: 0px 15px;

      @media ${breakPoints.mobile} {
        width: 140px;
      }
    }

    .compose {
      margin-left: auto;
      margin-right: 20px;
    }
  }
`;

export default function Home() {
  return (
    <Layout style={{ height: "100vh" }}>
      <HeaderDefault>
        <nav>
          <img src="TECHTOREHAB.svg" />
          <div className="center">
            <div className="navItem">
              <Badge count={0} showZero>
                <BellOutlined />
              </Badge>
            </div>
            <div className="navItem">
              <Badge count={0} showZero>
                <MailOutlined />
              </Badge>
            </div>
          </div>
          <div className="navItem compose">
            <Button icon={<EditOutlined />}>Compose</Button>
          </div>
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
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              marginTop: 10,
              minHeight: 280,
              background: "white",
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
