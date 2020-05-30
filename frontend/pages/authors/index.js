import { Row, Col, Layout, Card, Typography, List, Avatar } from "antd";
import Nav from "components/global/nav";
import Wrapper from "components/global/wrapper";
import Sidebar from "components/global/sidebar";

const { Text, Title, Paragraph } = Typography;
const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];
const Authors = () => {
  const { Content } = Layout;
  return (
    <Layout>
      <Nav />
      <Layout>
        <Sidebar global />
        <Layout className="mainLayout">
          <Content className="site-layout">
            <Row>
              <Col span={24}>
                {/* <Card> */}
                <Card
                  title="Authors Directory"
                  cover={
                    <img
                      height="240"
                      alt="example"
                      src="https://cdn.dribbble.com/users/1932215/screenshots/6008124/planet1.png"
                      style={{ objectFit: "cover" }}
                    />
                  }
                >
                  <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          <a>View</a>,
                          <a>Message</a>,
                          <a>Contributions</a>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={
                            <Avatar src="https://freesvg.org/img/1376606916.png" />
                          }
                          title={
                            <>
                              <a href="https://ant.design">Afzaal Afridi</a>
                              <span>
                                <i
                                  class="ri-checkbox-circle-fill"
                                  style={{
                                    verticalAlign: -2,
                                    marginLeft: 5,
                                    color: "#1890ff",
                                  }}
                                ></i>
                              </span>
                            </>
                          }
                          description="Professional Developer at Microsoft"
                        />
                      </List.Item>
                    )}
                  />
                </Card>
                {/* </Card> */}
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Authors;
