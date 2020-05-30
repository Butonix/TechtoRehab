import { Row, Col, Layout, Card, Typography, Tabs, Button, Space } from "antd";
import { useRouter } from "next/router";
import Nav from "components/global/nav";
import Wrapper from "components/global/wrapper";
import Sidebar from "components/global/sidebar";
const { Text, Title, Paragraph } = Typography;
const { TabPane } = Tabs;
const Author = () => {
  const router = useRouter();
  var { author } = router.query;
  const { Content } = Layout;
  return (
    <Wrapper>
      <Layout>
        <Nav />
        <Layout>
          <Sidebar global />
          <Layout className="mainLayout">
            <Content className="site-layout">
              <Row>
                <Col span={24}>
                  <Card bodyStyle={{ padding: 0 }} bordered={false}>
                    <img
                      height="300"
                      width="100%"
                      src="https://www.100hdwallpapers.com/wallpapers/1920x1080/comet_minimal-hd_wallpapers.jpg"
                      style={{ objectFit: "cover" }}
                    />
                    <Row
                      style={{
                        width: "100%",
                      }}
                      justify="center"
                    >
                      <Col style={{ height: 0 }}>
                        <Card
                          style={{
                            background: "none",
                            bottom: 100,
                            zIndex: 1,
                          }}
                          bodyStyle={{ padding: 0 }}
                        >
                          <img
                            height="120px"
                            width="120px"
                            style={{ objectFit: "cover" }}
                            src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/116416014/original/31f1e3c4e22930d3c8035390ed56446ec1c4cf91/design-unique-vector-avatar-of-your-face.jpg"
                          />
                        </Card>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "30px" }} justify="center">
                      <Col style={{ textAlign: "center" }}>
                        <div
                          style={{
                            marginLeft: 10,
                            marginTop: 15,
                            fontSize: 25,
                          }}
                        >
                          <Text>Muhammad Afzaal Afridi</Text>
                          <span style={{ marginLeft: 5 }}>
                            <i
                              class="ri-checkbox-circle-fill"
                              style={{ verticalAlign: -3, color: "#1890ff" }}
                            ></i>
                          </span>
                        </div>
                        <div
                          style={{ marginTop: 0, marginLeft: 10, fontSize: 18 }}
                        >
                          <Text>Administrator</Text>
                        </div>
                        <div
                          style={{ marginTop: 5, marginLeft: 10, fontSize: 16 }}
                        >
                          <Text>
                            <a>@{author}</a>
                          </Text>
                        </div>
                      </Col>
                    </Row>
                    <Row justify="center">
                      <Col>
                        <div>
                          <Button
                            type="primary"
                            className="unset-button"
                            style={{
                              margin: "10px 5px",
                            }}
                          >
                            Edit Profile
                          </Button>
                          <Button
                            className="unset-button"
                            type="primary"
                            style={{
                              margin: "10px 5px",
                            }}
                          >
                            Message
                          </Button>
                        </div>
                      </Col>
                    </Row>
                    <Row justify="center">
                      <Col xs={24} sm={24} md={24} lg={18} xl={18} xxl={24}>
                        <Tabs defaultActiveKey="1" size="large">
                          <TabPane tab="Contribution Feed" key="1">
                            <Card>Hello 2</Card>
                          </TabPane>
                          <TabPane tab="Author Profile" key="2">
                            <Card
                              className="mg-zero"
                              bodyStyle={{ padding: 10 }}
                            >
                              <Col>
                                <div className="mg-10">
                                  <Text className="fs-16 mg-5" strong>
                                    First Name:
                                  </Text>
                                  <Text className="fs-16">Hello</Text>
                                </div>

                                <div className="mg-10">
                                  <Text className="fs-16 mg-5" strong>
                                    Last Name:
                                  </Text>
                                  <Text className="fs-16">Hello</Text>
                                </div>

                                <div className="mg-10">
                                  <Text className="fs-16 mg-5" strong>
                                    Total Contributions:
                                  </Text>
                                  <Text className="fs-16">23</Text>
                                </div>
                                <div className="mg-10">
                                  <Text className="fs-16 mg-5" strong>
                                    Status:
                                  </Text>
                                  <Text className="fs-16">Author</Text>
                                </div>
                                <div className="mg-10">
                                  <Text className="fs-16 mg-5" strong>
                                    Co-Author:
                                  </Text>
                                  <Text className="fs-16">Author</Text>
                                </div>
                                <div className="mg-10">
                                  <Text className="fs-16 mg-5" strong>
                                    Primary Sponsor:
                                  </Text>
                                  <Text className="fs-16">
                                    Microsoft Corporation
                                  </Text>
                                </div>
                                <div className="mg-10">
                                  <Text className="fs-16 mg-5" strong>
                                    Facebook:
                                  </Text>
                                  <Text className="fs-16">
                                    <i
                                      class="ri-facebook-circle-fill ri-xl"
                                      style={{ color: "rgb(6, 113, 225)" }}
                                    ></i>
                                  </Text>
                                </div>
                                <div className="mg-10">
                                  <Text className="fs-16 mg-5" strong>
                                    Instagram:
                                  </Text>
                                  <Text className="fs-16">
                                    <span className="instagram">
                                      <i
                                        class="ri-instagram-fill ri-lg"
                                        style={{ color: "white" }}
                                      ></i>
                                    </span>
                                  </Text>
                                </div>
                                <div className="mg-10">
                                  <Text className="fs-16 mg-5" strong>
                                    Twitter:
                                  </Text>
                                  <Text className="fs-16">
                                    <i
                                      class="ri-twitter-fill ri-xl"
                                      style={{ color: "rgb(30, 157, 234)" }}
                                    ></i>
                                  </Text>
                                </div>
                              </Col>
                            </Card>
                          </TabPane>
                        </Tabs>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Wrapper>
  );
};

export default Author;
