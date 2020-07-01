import { Row, Col, Typography, Card, Tabs } from "antd";
import Wrapper from "components/global/wrapper";
import withSession from "lib/session";
import Login from "components/get-started/login";
import Register from "components/get-started/register";
import Forgot from "components/get-started/forgot";

const { Text } = Typography;

const SignIn = () => {
  return (
    <Wrapper>
      <Row
        justify="center"
        align="middle"
        className="mt-30"
        style={{ height: "70vh" }}
      >
        <Col xs={24} sm={24} md={24} lg={18} xl={12} xxl={12}>
          <Card bodyStyle={{ padding: 0 }}>
            <Row align="middle" justify="center">
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={12}
                xl={12}
                xxl={10}
                className=""
              >
                <img
                  width="100%"
                  height={600}
                  className="o-fit-cover"
                  src="/login.svg"
                />
              </Col>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={12}
                xl={12}
                xxl={12}
                className="pd-30"
              >
                <Tabs>
                  <Tabs.TabPane key="login" tab={<Text>Sign in</Text>}>
                    <Login />
                  </Tabs.TabPane>
                  <Tabs.TabPane key="register" tab={<Text>Register</Text>}>
                    <Register />
                  </Tabs.TabPane>
                  <Tabs.TabPane key="forgot" tab={<Text>Forgot Password</Text>}>
                    <Forgot />
                  </Tabs.TabPane>
                </Tabs>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default SignIn;

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("session");
  if (user) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
  }
  return { props: {} };
});
