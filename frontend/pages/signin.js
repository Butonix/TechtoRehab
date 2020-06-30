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
import { useState, useEffect } from "react";

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

const checkUsernameQuery = gql`
  query checkUsername($username: String) {
    users_aggregate(where: { username: { _eq: $username } }) {
      aggregate {
        count
      }
    }
  }
`;

const checkEmailQuery = gql`
  query checkEmail($email: String) {
    users_aggregate(where: { email: { _eq: $email } }) {
      aggregate {
        count
      }
    }
  }
`;
const SignIn = () => {
  const [loginFailed, setLoginFailed] = useState(false);
  const [fetchingLogin, setFetchingLogin] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState(null);
  const [emailStatus, setEmailStatus] = useState(null);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const router = useRouter();

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

  const [
    checkUsername,
    { loading: checkUsernameLoading, data: checkUsernameData },
  ] = useLazyQuery(checkUsernameQuery, {
    onError: (err) => console.log(err),
  });

  const [
    checkEmail,
    { loading: checkEmailLoading, data: checkEmailData },
  ] = useLazyQuery(checkEmailQuery, {
    onError: (err) => console.log(err),
  });

  useEffect(() => {
    if (checkUsernameData && checkUsernameData.users_aggregate) {
      if (checkUsernameData.users_aggregate.aggregate.count == 1) {
        setUsernameStatus("unavailable");
      } else if (checkUsernameData.users_aggregate.aggregate.count < 1) {
        setUsernameStatus("available");
      } else {
        setUsernameStatus(null);
      }
    }

    if (checkEmailData && checkEmailData.users_aggregate) {
      if (checkEmailData.users_aggregate.aggregate.count == 1) {
        setEmailStatus("unavailable");
      } else if (checkEmailData.users_aggregate.aggregate.count < 1) {
        setEmailStatus("available");
      } else {
        setEmailStatus(null);
      }
    }
  });

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
                  <Tabs.TabPane key="login" tab={<Text>Sign in</Text>}>
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
                        <Input.Password autoComplete="new-password" />
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
                  <Tabs.TabPane key="register" tab={<Text>Register</Text>}>
                    <Title level={4} className="mg-y-20">
                      Register for an account
                    </Title>
                    <Form form={form2} layout="vertical">
                      <Form.Item
                        label="Username"
                        name="username"
                        validateStatus={
                          usernameStatus == "available"
                            ? "success"
                            : usernameStatus == "unavailable"
                            ? "error"
                            : usernameStatus == "validating"
                            ? "validating"
                            : null
                        }
                        help={
                          <Text
                            type={
                              usernameStatus == "unavailable" ? "danger" : null
                            }
                            mark={usernameStatus == "validating" ? true : false}
                            strong
                            className="lh-1"
                            style={{
                              position: "absolute",
                              marginTop: -23,
                              right: 35,
                            }}
                          >
                            {usernameStatus == "validating"
                              ? "Checking"
                              : usernameStatus == "available"
                              ? "Available!"
                              : usernameStatus == "unavailable"
                              ? "Already Taken"
                              : usernameStatus == null
                              ? null
                              : null}
                          </Text>
                        }
                        hasFeedback
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          placeholder="Your chosen username"
                          onChange={(val) => {
                            if (val.target.value.length > 0) {
                              checkUsername({
                                variables: {
                                  username: val.target.value,
                                },
                              });
                              setUsernameStatus("validating");
                            } else {
                              checkUsername({
                                variables: {
                                  username: undefined,
                                },
                              });
                            }
                          }}
                          h
                        />
                      </Form.Item>
                      <Form.Item
                        label="Email"
                        name="email"
                        validateStatus={
                          emailStatus == "available"
                            ? "success"
                            : emailStatus == "unavailable"
                            ? "error"
                            : emailStatus == "validating"
                            ? "validating"
                            : null
                        }
                        help={
                          <Text
                            type={
                              emailStatus == "unavailable" ? "danger" : null
                            }
                            mark={emailStatus == "validating" ? true : false}
                            strong
                            className="lh-1"
                            style={{
                              position: "absolute",
                              marginTop: -23,
                              right: 35,
                            }}
                          >
                            {emailStatus == "validating"
                              ? null
                              : emailStatus == "available"
                              ? "Available!"
                              : emailStatus == "unavailable"
                              ? "Already Registered"
                              : emailStatus == null
                              ? null
                              : null}
                          </Text>
                        }
                        hasFeedback
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          placeholder="Your email"
                          type="email"
                          onChange={(vala) => {
                            if (vala.target.value.length > 0) {
                              checkEmail({
                                variables: {
                                  email: vala.target.value,
                                },
                              });
                              setEmailStatus("validating");
                            } else {
                              checkEmail({
                                variables: {
                                  email: undefined,
                                },
                              });
                            }
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        label={
                          <>
                            <Text>Password</Text>
                            <Button
                              type="link"
                              onClick={() => {
                                fetch(
                                  "https://api.happi.dev/v1/generate-password?apikey=3f1522rCh7wwqSyBDStzSXGysI0RNRULxI6Adkat5E4ormKt0UWSz8gD&limit=1&length=15&num=1&upper=1&symbols=1"
                                )
                                  .then((res) => res.json())
                                  .then((result) => console.log(result));
                                // form2.setFieldsValue({
                                //   password: "Afzaal12#$12",
                                // });
                              }}
                            >
                              Generate
                            </Button>
                          </>
                        }
                        name="password"
                        rules={[
                          {
                            required: true,
                          },
                          {
                            pattern: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$£¥%^&*])[\w!@#$£¥%^&*]{12,}$/,
                            message:
                              "Password - Atleast - 12 - Characters - 1 Capital Letter - 1 Special Character - One Number",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input.Password
                          autoComplete="new-password"
                          placeholder="Your desired password"
                        />
                      </Form.Item>
                      <Form.Item
                        label="Repeat Password"
                        name="rPassword"
                        rules={[
                          {
                            required: true,
                          },
                          ({ getFieldValue }) => ({
                            validator: (rule, val) => {
                              if (val !== getFieldValue("password")) {
                                return Promise.reject("Passwords don't match");
                              }
                              return Promise.resolve();
                            },
                          }),
                        ]}
                        hasFeedback
                      >
                        <Input.Password placeholder="Repeat the above password" />
                      </Form.Item>
                      <Form.Item className="mt-20">
                        {usernameStatus == "available" &&
                        emailStatus == "available" ? (
                          <Button type="primary" className="mr-20">
                            Submit
                          </Button>
                        ) : usernameStatus == null ||
                          emailStatus == null ? null : (
                          <Text type="danger" strong className="mr-20">
                            Username & Email must be valid
                          </Text>
                        )}
                        <Button
                          type="Reset"
                          onClick={() => {
                            checkUsername({
                              variables: { username: undefined },
                            });
                            form2.resetFields();
                          }}
                        >
                          Reset Form
                        </Button>
                      </Form.Item>
                    </Form>
                  </Tabs.TabPane>
                  <Tabs.TabPane key="forgot" tab={<Text>Forgot Password</Text>}>
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
