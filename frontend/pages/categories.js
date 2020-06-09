import {
  Row,
  Col,
  Column,
  Card,
  List,
  Button,
  Menu,
  Typography,
  Dropdown,
  Layout,
  Avatar,
  Space,
} from "antd";
import Sidebar from "components/global/sidebar";
import Wrapper from "components/global/wrapper";
import Nav from "components/global/nav";
import Link from "next/link";

const { Content } = Layout;
const { Text, Paragraph, Title } = Typography;

const data = [
  {
    title: "Javascript",
    background:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTy2_Yhv-SFhF1bvGHgBqXJ2inwZwP-cN4r0Nh7F384v9CewkRF&usqp=CAU",
    subscribed: true,
    description: "Client side script for interacting with DOM",
  },
  {
    title: "React JS",
    background:
      "https://uploads-ssl.webflow.com/5e305a6cb7083222527a89cc/5e39a4408eb3bb60884f47c7_react.png",
    subscribed: false,
    description: "Javascript based library for client side development",
  },
  {
    title: "Vue JS",
    background: "https://miro.medium.com/max/2560/1*kEub1n9dPNkMKifKc6eLIQ.png",
    subscribed: false,
    description: "Javascript based library for client side development",
  },
  {
    title: "Angular JS",
    background: "",
    subscribed: true,
  },
];

const meno = (
  <Menu>
    <Menu.Item key="1" icon={<i class="ri-close-circle-line ri-lg mr-5"></i>}>
      <Text>Unsubscribe</Text>
    </Menu.Item>
    <Menu.Item key="1">
      <i class="ri-notification-off-line ri-lg mr-5"></i>
      <Text>Silent</Text>
    </Menu.Item>
  </Menu>
);
const Categories = () => {
  return (
    <Wrapper>
      <Layout>
        <Nav />
        <Layout>
          <Sidebar />
          <Layout className="mainLayout">
            <Content className="site-layout pd-zero">
              <Card
                title="Categories"
                bodyStyle={{ padding: 0, marginTop: 20, marginLeft: 10 }}
                cover={
                  <img
                    src="https://www.slickwraps.com/media/wysiwyg/images/jmm-animalactic-homepage_1_.jpg"
                    className="o-fit-cover o-position-center"
                    height="250px"
                  />
                }
              >
                <Row justify="center">
                  <Col xs={24} sm={24} md={24} lg={24} xl={20} xxl={22}>
                    <List
                      itemLayout="horizontal"
                      dataSource={data}
                      renderItem={(item) => (
                        <List.Item
                          actions={[
                            <Link href="/category/react-js" prefix={false}>
                              <a>
                                <Space>
                                  <Text> View </Text>
                                  <i class="ri-arrow-right-line ri-lg va-minus-4"></i>
                                </Space>
                              </a>
                            </Link>,
                          ]}
                        >
                          <List.Item.Meta
                            avatar={
                              <Avatar src={`${item.background}`} size={40} />
                            }
                            title={
                              <a href="https://ant.design">{item.title}</a>
                            }
                            description={item.description}
                          />
                        </List.Item>
                      )}
                    />
                  </Col>
                </Row>
              </Card>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Wrapper>
  );
};

export default Categories;
