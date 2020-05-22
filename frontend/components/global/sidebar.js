import { Switch, Anchor, Tooltip, Space, Typography, Layout, Menu } from "antd";
import {
  MessageOutlined,
  CopyOutlined,
  SettingOutlined,
  UserOutlined,
  CopyrightCircleOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { useStoreState } from "easy-peasy";
import Link from "next/link";

const { SubMenu } = Menu;
const { Sider } = Layout;
const { Title, Text } = Typography;

const Sidebar = (props) => {
  var darko = useStoreState((state) => state.site.dark);

  return (
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
      {props.global ? (
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
          theme={darko ? "dark" : "light"}
        >
          <Title style={{ margin: "20px", fontSize: "16px" }}>Categories</Title>

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
        </Menu>
      ) : null}
      {props.home ? (
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
          theme={darko ? "dark" : "light"}
        >
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
        </Menu>
      ) : (
        <div />
      )}
      {props.article ? (
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
          theme={darko ? "dark" : "light"}
        >
          <Title style={{ margin: "20px", fontSize: "16px" }}>
            Navigate Article
          </Title>
          <Anchor style={{ margin: "0px 20px" }}>
            <Anchor.Link
              href="#components-anchor-demo-basic"
              title="Introduction"
            />
            <Anchor.Link
              href="#components-anchor-demo-static"
              title="Heading 1"
            />
            <Anchor.Link
              href="#components-anchor-demo-basic"
              title="Heading 2"
              target="_blank"
            />
            <Anchor.Link href="#API" title="Important Concepts">
              <Anchor.Link href="#Anchor-Props" title="Sub Heading 1" />
              <Anchor.Link href="#Link-Props" title="Sub Heading 2" />
            </Anchor.Link>
          </Anchor>
        </Menu>
      ) : (
        <div />
      )}
      {props.admin ? (
        <Menu
          mode="inline"
          defaultSelectedKeys={props.id}
          defaultOpenKeys={["user", "settings"]}
          style={{ height: "100%", borderRight: 0 }}
          theme={darko ? "dark" : "light"}
        >
          <Title level={4} style={{ margin: "20px", fontSize: "16px" }}>
            TTR Admin Panel
          </Title>
          <Menu.Item key="announcements" icon={<NotificationOutlined />}>
            <Link href="/admin/announcements">Announcements</Link>
          </Menu.Item>
          <Menu.Item key="articles" icon={<CopyOutlined />}>
            Articles
          </Menu.Item>
          <Menu.Item key="comments" icon={<MessageOutlined />}>
            Comments
          </Menu.Item>
          <Menu.Item key="reports" icon={<CopyrightCircleOutlined />}>
            Reports
          </Menu.Item>
          <SubMenu key="user" icon={<UserOutlined />} title="Users">
            <Menu.Item key="users">View</Menu.Item>
            <Menu.Item key="sub4-2">Create</Menu.Item>
          </SubMenu>
          <SubMenu key="settings" icon={<SettingOutlined />} title="Settings">
            <Menu.Item key="sub6-1">General</Menu.Item>
            <Menu.Item key="sub6-2">Articles</Menu.Item>
            <Menu.Item key="sub6-3">Comments</Menu.Item>
            <Menu.Item key="sub6-4">Users</Menu.Item>
            <Menu.Item key="sub6-5">Security</Menu.Item>
          </SubMenu>
        </Menu>
      ) : null}
    </Sider>
  );
};

export default Sidebar;
