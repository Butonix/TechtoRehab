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
          className="sticky-sidebar-menu"
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
          className="sticky-sidebar-menu"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          theme={darko ? "dark" : "light"}
        >
          <div className="mg-10" />

          <Text className="sidebar-heading" strong>
            Navigation
          </Text>
          <Menu.Item
            key="1"
            icon={<i class="ri-home-3-fill ri-xl mr-5 va-minus-4"></i>}
          >
            <Link href="/" prefetch={false}>
              Home
            </Link>
          </Menu.Item>
          <Menu.Item
            key="8"
            icon={<i class="ri-team-fill ri-xl mr-10 va-minus-4"></i>}
          >
            <Link href="/users" prefetch={false}>
              <a>Members</a>
            </Link>
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<i class="ri-apps-line ri-xl mr-10 va-minus-4"></i>}
          >
            <Link href="/categories" prefetch={false}>
              Categories
            </Link>
          </Menu.Item>
          {/* <Menu.Item
            key="3"
            icon={<i class="ri-book-3-fill ri-xl mr-10 va-minus-4"></i>}
          >
            <Link href="/courses" prefetch={false}>
              Courses
            </Link>
          </Menu.Item>

          <Menu.Item
            key="6"
            icon={
              <i class="ri-lightbulb-flash-fill ri-xl mr-10 va-minus-4"></i>
            }
          >
            <Link href="/tuts" prefetch={false}>
              Tutorials
            </Link>
          </Menu.Item> */}

          <Text className="sidebar-heading" strong>
            Legal
          </Text>
          <Menu.Item
            key="4"
            icon={<i class="ri-shield-user-fill ri-xl mr-10 va-minus-4"></i>}
          >
            <Link href="/legal/privacy">Privacy</Link>
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={<i class="ri-file-shield-2-fill ri-xl mr-10 va-minus-4"></i>}
          >
            <Link href="/legal/terms">Terms</Link>
          </Menu.Item>

          {/* <Text className="sidebar-heading" strong>
            Support
          </Text> */}
          {/* <Menu.Item
            key="7"
            icon={<i class="ri-question-fill ri-xl mr-10"></i>}
          >
            <Link href="/support/kb">Website Help</Link>
          </Menu.Item> */}
          {props.home ? (
            <>
              <Title className="mg-20 fs-16">Customize Feed</Title>
              <Title className="fs-14 sidebar-space">Show/Hide</Title>
              <Space className="sidebar-space">
                <Switch defaultChecked />
                <Text>Physiotherapy</Text>
              </Space>
              <Space className="sidebar-space">
                <Switch />
                <Text>Medicine</Text>
              </Space>
              <Space className="sidebar-space">
                <Switch defaultChecked />
                <Text>Technology</Text>
              </Space>
              <Space className="sidebar-space">
                <Switch />
                <Text>Courses</Text>
              </Space>
              <Space className="sidebar-space">
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
              <Title className="mg-20 fs-16">Navigate Article</Title>
              <Anchor className="sidebar-space">
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
