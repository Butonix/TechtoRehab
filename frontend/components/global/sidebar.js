import { Switch, Anchor, Tooltip, Space, Typography, Layout, Menu } from "antd";

const { SubMenu } = Menu;
const { Sider } = Layout;
const { Title, Text } = Typography;

const Sidebar = (props) => {
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
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
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
        ) : (
          <div />
        )}
        {props.article ? (
          <div>
            <Title style={{ margin: "20px", fontSize: "16px" }}>
              Navigate Article
            </Title>
            <Anchor style={{margin: '0px 20px'}}>
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
          </div>
        ) : (
          <div />
        )}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
