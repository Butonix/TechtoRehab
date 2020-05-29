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

const showSidebar = () => {};

const Sidebar = (props) => {
  var darko = useStoreState((state) => state.site.dark);

  return (
    <Sider
      width={200}
      className="site-layout-background"
      breakpoint="lg"
      collapsedWidth="0"
    >
      {props.admin ? (
        <Menu
          mode="inline"
          defaultSelectedKeys={
            (props.id == "users" && props.id2 == "view") ||
            (props.id == "users" && props.id2 == "create") ||
            (props.id == "settings" && props.id2 == "general") ||
            (props.id == "settings" && props.id2 == "article") ||
            (props.id == "settings" && props.id2 == "comments") ||
            (props.id == "settings" && props.id2 == "users") ||
            (props.id == "settings" && props.id2 == "security")
              ? props.id2 + props.id
              : props.id + "Alone"
          }
          defaultOpenKeys={["user", "settings"]}
          style={{ height: "100%", borderRight: 0 }}
          theme={darko ? "dark" : "light"}
        >
          <Title level={4} style={{ margin: "20px", fontSize: "16px" }}>
            TTR Admin Panel
          </Title>
          <Menu.Item key="announcementsAlone" icon={<NotificationOutlined />}>
            <Link href="/admin/announcements">Announcements</Link>
          </Menu.Item>
          <Menu.Item key="postsAlone" icon={<CopyOutlined />}>
            <Link href="/admin/articles">Articles</Link>
          </Menu.Item>
          <Menu.Item key="commentsAlone" icon={<MessageOutlined />}>
            <Link href="/admin/comments">Comments</Link>
          </Menu.Item>
          <Menu.Item key="reportsAlone" icon={<CopyrightCircleOutlined />}>
            <Link href="/admin/reports">Reports</Link>
          </Menu.Item>
          <SubMenu key="user" icon={<UserOutlined />} title="Users">
            <Menu.Item key="viewusers">
              <Link href="/admin/users/view">View</Link>
            </Menu.Item>
            <Menu.Item key="createusers">
              <Link href="/admin/users/create">Create</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="settings" icon={<SettingOutlined />} title="Settings">
            <Menu.Item key="generalsettings">
              <Link href="/admin/settings/general">General</Link>
            </Menu.Item>
            <Menu.Item key="articlesettings">
              <Link href="/admin/settings/article">Article</Link>
            </Menu.Item>
            <Menu.Item key="commentssettings">
              <Link href="/admin/settings/comments">Comments</Link>
            </Menu.Item>
            <Menu.Item key="userssettings">
              <Link href="/admin/settings/users">Users</Link>
            </Menu.Item>
            <Menu.Item key="securitysettings">
              <Link href="/admin/settings/security">Security</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      ) : (
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
          {props.home ? (
            <>
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
            </>
          ) : props.article ? (
            <>
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
            </>
          ) : null}
        </Menu>
      )}
    </Sider>
  );
};

export default Sidebar;
