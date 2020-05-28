import { Row, Col, Layout, Card, Typography } from "antd";
import { useRouter } from "next/router";
import Nav from "components/global/nav";
import Wrapper from "components/global/wrapper";
import Sidebar from "components/global/sidebar";
const { Text, Title, Paragraph } = Typography;

const Author = () => {
  const router = useRouter();
  var { author } = router.query;
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
                <Card style={{ background: "none" }} bodyStyle={{ padding: 0 }}>
                  <img
                    height="300"
                    width="100%"
                    src="https://www.100hdwallpapers.com/wallpapers/1920x1080/comet_minimal-hd_wallpapers.jpg"
                    style={{ objectFit: "cover" }}
                  />
                  <Row
                    style={{
                      position: "absolute",
                      zIndex: 1,
                      bottom: 30,
                      left: 20,
                    }}
                  >
                    <Col>
                      <Card
                        style={{
                          background: "none",
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
                    <Col>
                      <div
                        style={{
                          marginLeft: 10,
                          marginTop: 15,
                          fontSize: 20,
                        }}
                      >
                        <Text
                        //   style={{
                        //     position: "relative",
                        //     top: 25,
                        //     fontSize: 18,
                        //     margin: 10,
                        //   }}
                        >
                          Afzaal Afridi
                        </Text>
                        <span style={{ marginLeft: 5 }}>
                          <i
                            class="ri-checkbox-circle-fill"
                            style={{ verticalAlign: -3, color: "#1890ff" }}
                          ></i>
                        </span>
                      </div>
                      <div
                        style={{ marginTop: 0, marginLeft: 10, fontSize: 16 }}
                      >
                        <Text
                        // style={{
                        //   position: "relative",
                        //   top: 25,
                        //   fontSize: 18,
                        //   margin: 10,
                        // }}
                        >
                          Administrator
                        </Text>
                      </div>
                      <div
                        style={{ marginTop: 5, marginLeft: 10, fontSize: 16 }}
                      >
                        <Text
                        // style={{
                        //   position: "relative",
                        //   top: 25,
                        //   fontSize: 18,
                        //   margin: 10,
                        // }}
                        >
                          <a>@{author}</a>
                        </Text>
                      </div>
                    </Col>
                  </Row>
                </Card>
                <Card>Hello 2</Card>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Author;
