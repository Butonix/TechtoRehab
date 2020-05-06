import {
  Layout,
  Row,
  Col,
  Space,
  PageHeader,
  Tag,
  Avatar,
  Typography,
  Divider,
  Anchor,
} from "antd";
import { StarFilled, SafetyCertificateFilled } from "@ant-design/icons";
import Nav from "../components/global/nav.js";
import Sidebar from "../components/global/sidebar";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const routes = [
  {
    path: "index",
    breadcrumbName: "First-level Menu",
  },
  {
    path: "first",
    breadcrumbName: "Second-level Menu",
  },
  {
    path: "second",
    breadcrumbName: "Third-level Menu",
  },
];

const paragraph = `When developing an app with multiple screens, we tend to reuse the same piece of code over many classes: showing error messages, using the same page layout and wiring up some dependencies like for example a Bloc. All this could be solved if were using an abstract base class, however, what if we have a set of features/classes that we want to use on a particular screen but not on others? Since a class can't be a child of more than one class, should we create different base classes, as much as the number of combinations that we have? That's why we have mixins.
Mixins and Base Classes: An introduction
Mixins let us add a set of “features” to a class without using parent-child hierarchy, allowing us to have in the same class one parent and multiple mixin components. As such, since it’s not a parent of our class, mixins don't allow any declaration of constructors. You can read more about them in this article by Romain Rastel with the caveat that Dart 2 now has the mixin keyword, as seen in the documentation.
But how do mixins work? Let's take as an example an abstract class Person.We proceed by changing the constructor of our BasePage to include the bloc object. This will force us to also change all the classes that extend it to add the bloc to their constructors too. The bloc parameter is used as a Generic type so that each class that extends it can declare the correct type of bloc it is using. This makes sure that when we are calling it in the BaseState , we are going to get the correct type of bloc allowing us to access its methods.As a new feature, some of our screens will make API calls and if an error occurs, we need to display an error message in the form of a Snackbar. Additionally, we decide to use the BLoC architecture in which we need to inject a new bloc when each page is created. These two problems will need the following steps:
Change our BasePageby changing its constructor with the new bloc parameter.
ChangeBaseState by adding a new GlobalKey<ScaffoldState>
Create a new mixin that let us display errors messages sent by the bloc in the page using a Snackbar
In our BaseBloc we are just exposing a Sink and a Stream in order to relay error messages.`;
export default function Article() {
  return (
    <Layout>
      <Nav />
      <Layout>
        <Sidebar />
        <Layout className="mainLayout">
          <Content className="site-layout">
            <PageHeader breadcrumb={{ routes }} className="articleHeader" />
            <Space direction="vertical">
              <Row justify="center" align="middle">
                <Col
                  xs={24}
                  sm={24}
                  md={10}
                  lg={10}
                  xl={10}
                  xxl={8}
                  className="titleCol"
                >
                  <Title
                    level={2}
                    className="articleTitle"
                    style={{ fontWeight: "700" }}
                  >
                    Flutter and Zeplin: Speed up the Development Process from
                    your Design
                  </Title>
                  <span>
                    <Space style={{ margin: "5px 5px" }}>
                      <Avatar src="https://s2.best-wallpaper.net/wallpaper/1920x1080/1802/Watchtower-moon-mountains-forest-art-picture_1920x1080.jpg" />
                      <Text> Afzaal Afridi</Text>
                    </Space>
                    <Space style={{ margin: "5px 5px" }}>
                      <i class="ri-time-line ri-xl"></i>
                      <Text>2 Min Read</Text>
                    </Space>
                    <Space style={{ margin: "5px 5px" }}>
                      <Tag
                        icon={<SafetyCertificateFilled />}
                        color="rgb(23,144,255)"
                        style={{ fontWeight: "600" }}
                      >
                        SPONSORED
                      </Tag>
                    </Space>

                    <Space style={{ margin: "5px 5px" }}>
                      <Tag
                        color="#30F579"
                        style={{ color: "#141414", fontWeight: "600" }}
                        icon={<StarFilled />}
                      >
                        FEATURED
                      </Tag>
                    </Space>
                  </span>
                </Col>
                <Col xs={24} sm={24} md={13} lg={12} xl={10} xxl={10}>
                  <img
                    // width="450px"
                    height="400px"
                    style={{
                      margin: "auto",
                      borderRadius: "15px",
                      padding: "10px",
                      objectFit: "cover",
                      maxWidth: "100%",
                      maxHeight: "400px",
                    }}
                    src="https://c4.wallpaperflare.com/wallpaper/470/932/861/vector-planet-space-meteors-wallpaper-preview.jpg"
                  />
                </Col>
              </Row>
              <Row justify="center">
                <Col
                  xs={24}
                  sm={20}
                  md={20}
                  lg={20}
                  xl={20}
                  xxl={18}
                  style={{ margin: "auto" }}
                >
                  <Title level={1}>Introduction</Title>
                  <Paragraph style={{ textAlign: "justify", fontSize: 16 }}>
                    {paragraph}
                  </Paragraph>
                  <Title level={2}>Introduction</Title>
                  <Paragraph style={{ textAlign: "justify", fontSize: 16 }}>
                    <img
                      width="100%"
                      style={{
                        borderRadius: "4px",
                        padding: "25px 0px",
                      }}
                      src="https://s2.best-wallpaper.net/wallpaper/1920x1080/1802/Watchtower-moon-mountains-forest-art-picture_1920x1080.jpg"
                    />
                    {paragraph}
                  </Paragraph>
                  <a href="#">
                    <Title level={3}>Introduction</Title>
                  </a>
                  <Anchor>
                    <Anchor.Link
                      href="#components-anchor-demo-basic"
                      title="Basic demo"
                    />
                    <Anchor.Link
                      href="#components-anchor-demo-static"
                      title="Static demo"
                    />
                    <Anchor.Link
                      href="#components-anchor-demo-basic"
                      title="Basic demo with Target"
                      target="_blank"
                    />
                    <Anchor.Link href="#API" title="API">
                      <Anchor.Link href="#Anchor-Props" title="Anchor Props" />
                      <Anchor.Link href="#Link-Props" title="Link Props" />
                    </Anchor.Link>
                  </Anchor>
                  <Paragraph style={{ textAlign: "justify", fontSize: 16 }}>
                    <Title level={4}>Level 1</Title>
                    {paragraph.slice(20, 300)}
                  </Paragraph>
                  <Paragraph style={{ textAlign: "justify", fontSize: 16 }}>
                    <Title level={3}>
                      Level 2 <a href="#">#</a>
                    </Title>
                    {paragraph.slice(20, 300)}
                  </Paragraph>
                  <Divider orientation="left">References</Divider>
                  <Paragraph>
                    <ol>
                      <li>
                        <span>
                          <a>Website.com</a>
                          For
                          <a href="#Hello">Hello</a>
                        </span>
                      </li>
                    </ol>
                  </Paragraph>
                </Col>
              </Row>
            </Space>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
