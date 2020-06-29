import {
  Row,
  Col,
  Typography,
  Card,
  Divider,
  Form,
  Input,
  Button,
  message,
  Alert,
  Tabs,
} from "antd";
import Wrapper from "components/global/wrapper";
import ButtonGroup from "antd/lib/button/button-group";
import withSession from "lib/session";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";
import { useState } from "react";

const { Text, Title, Paragraph } = Typography;

const loginQuery = gql`
  query loginQuery($username: String!, $password: String!) {
    users_aggregate(
      where: { username: { _eq: $username }, password: { _eq: $password } }
    ) {
      aggregate {
        count
      }
      nodes {
        username
        id
        email
        profile_picture
      }
    }
  }
`;
const SignIn = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loginFailed, setLoginFailed] = useState(false);
  const [fetchingLogin, setFetchingLogin] = useState(false);

  const [login, { loading: loginLoading, error: loginError }] = useLazyQuery(
    loginQuery,
    {
      onCompleted: (data) => {
        if (data.users_aggregate.aggregate.count > 0) {
          fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: data.users_aggregate.nodes[0].id,
              username: data.users_aggregate.nodes[0].username,
              email: data.users_aggregate.nodes[0].email,
              profilePicture: data.users_aggregate.nodes[0].profile_picture,
              type: "user",
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              setFetchingLogin(false);
              router.back();
            });
        } else {
          setFetchingLogin(false);
          setLoginFailed(true);
        }
      },
      onError: (err) => console.log(err),
    }
  );

  return (
    <Wrapper>
      <Row
        justify="center"
        align="middle"
        className="mt-30"
        style={{ height: "70vh" }}
      >
        <Col xs={24} sm={24} md={24} lg={18} xl={12} xxl={12}>
          <Card
            bodyStyle={{ padding: 0 }}
            bordered={false}
            style={{
              boxShadow: "0px 0px 3px 4px #f5f5f5",
            }}
          >
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
                  <Tabs.TabPane key="login" tab={<Text>SIGN IN</Text>}>
                    <Title level={4} className="mt-20 mb-30">
                      Sign in to Tech To Rehab
                    </Title>
                    {loginFailed ? (
                      <Alert
                        className="mg-y-20"
                        message="Login Failed"
                        description="Username or Password Incorrect"
                        type="error"
                        showIcon
                        closable
                        onClose={() => setLoginFailed(false)}
                      />
                    ) : null}
                    <Form
                      layout="vertical"
                      form={form}
                      onFinish={(obj) => {
                        setFetchingLogin(true);
                        login({
                          variables: {
                            username: obj.username,
                            password: obj.password,
                          },
                        });
                      }}
                    >
                      <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input.Password autocomplete="new-password" />
                      </Form.Item>
                      <Form.Item className="mt-30">
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={fetchingLogin ? true : false}
                        >
                          Submit
                        </Button>
                        <Button
                          type="secondary"
                          className="mg-x-10"
                          htmlType="button"
                          onClick={() => {
                            setLoginFailed(false);
                            form.resetFields();
                          }}
                        >
                          Reset Form
                        </Button>
                      </Form.Item>
                    </Form>
                  </Tabs.TabPane>
                  <Tabs.TabPane key="register" tab={<Text>REGISTER</Text>}>
                    Hello2
                  </Tabs.TabPane>
                  <Tabs.TabPane key="forgot" tab={<Text>FORGOT PASSWORD</Text>}>
                    Hello2
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
