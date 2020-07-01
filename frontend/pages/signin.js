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
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

const { Text, Title, Paragraph } = Typography;

const loginQuery = gql`
  query loginQuery($username: String!) {
    users_aggregate(where: { username: { _eq: $username } }) {
      aggregate {
        count
      }
      nodes {
        username
        id
        email
        profile_picture
        private_info {
          status
          password
        }
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

const registerQuery = gql`
  mutation registerUser(
    $username: String!
    $email: String!
    $password: String!
    $token: String!
  ) {
    insert_users_private_info_one(
      object: {
        password: $password
        confirm_token: $token
        user: { data: { email: $email, username: $username } }
      }
    ) {
      user_id
      status
      confirm_token
      user {
        email
        profile_picture
        username
      }
    }
  }
`;
const SignIn = () => {
  const [loginFailed, setLoginFailed] = useState(false);
  const [fetchingLogin, setFetchingLogin] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState(null);
  const [emailStatus, setEmailStatus] = useState(null);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [registeringUser, setRegisteringUser] = useState(false);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const router = useRouter();

  const [login, { loading: loginLoading, error: loginError }] = useLazyQuery(
    loginQuery,
    {
      onCompleted: (data) => {
        if (data.users_aggregate.aggregate.count > 0) {
          fetch("/api/checkPassword", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              salt: data.users_aggregate.nodes[0].private_info.password,
              password: enteredPassword,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.verify == "pass") {
                fetch("/api/login", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    id: data.users_aggregate.nodes[0].id,
                    username: data.users_aggregate.nodes[0].username,
                    email: data.users_aggregate.nodes[0].email,
                    profilePicture:
                      data.users_aggregate.nodes[0].profile_picture,
                    status: data.users_aggregate.nodes[0].private_info.status,
                  }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    setFetchingLogin(false);
                    setLoginFailed(false);
                    setLoginSuccess(true);
                    router.back();
                  });
              } else {
                setLoginFailed(true);
                setFetchingLogin(false);
              }
            });
        } else {
          setFetchingLogin(false);
          setLoginFailed(true);
        }
      },
      onError: (err) => console.log(err),
      fetchPolicy: "network-only",
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

  const [
    registerUser,
    { loading: registerUserLoading, data: registerUserData },
  ] = useMutation(registerQuery, {
    onError: (err) => console.log(err),
    onCompleted: (data) => {
      fetch("/api/sendRegEmail", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: data.insert_users_private_info_one.confirm_token,
          email: data.insert_users_private_info_one.user.email,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          fetch("/api/login", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: data.insert_users_private_info_one.status,
              username: data.insert_users_private_info_one.user.username,
              id: data.insert_users_private_info_one.user_id,
              email: data.insert_users_private_info_one.user.email,
              profilePicture:
                data.insert_users_private_info_one.user.profilePicture,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              setRegisteringUser(false);
              router.back();
            });
        });
    },
  });

  useEffect(() => {
    if (checkUsernameData && checkUsernameData.users_aggregate) {
      if (checkUsernameData.users_aggregate.aggregate.count == 1) {
        setUsernameStatus("unavailable");
      } else if (checkUsernameData.users_aggregate.aggregate.count == 0) {
        setUsernameStatus("available");
      } else {
        setUsernameStatus(null);
      }
    }

    if (checkEmailData && checkEmailData.users_aggregate) {
      console.log(checkEmailData);
      if (checkEmailData.users_aggregate.aggregate.count == 1) {
        setEmailStatus("unavailable");
      } else if (checkEmailData.users_aggregate.aggregate.count == 0) {
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
                    {loginSuccess ? (
                      <Alert
                        message="Success"
                        description={
                          <div className="d-flex">
                            <Text className="mr-10">
                              Success! Redirecting...
                            </Text>
                            <div className="spinner">
                              <div class="bounce1"></div>
                              <div class="bounce2"></div>
                              <div class="bounce3"></div>
                            </div>
                          </div>
                        }
                        type="success"
                        showIcon
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
                        hasFeedback
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
                        hasFeedback
                      >
                        <Input.Password
                          autoComplete="new-password"
                          onChange={(pass) => {
                            setEnteredPassword(pass.target.value);
                          }}
                        />
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
                    {registeringUser ? (
                      <Alert
                        message="Success"
                        className="mg-y-20"
                        description={
                          <div className="d-flex">
                            <Text className="mr-10">
                              Registering, Please wait...
                            </Text>
                            <div className="spinner">
                              <div class="bounce1"></div>
                              <div class="bounce2"></div>
                              <div class="bounce3"></div>
                            </div>
                          </div>
                        }
                        type="success"
                        showIcon
                      />
                    ) : null}
                    <Form
                      form={form2}
                      layout="vertical"
                      onFinish={(obj) => {
                        if (
                          usernameStatus == "unavailable" ||
                          emailStatus == "unavailable"
                        ) {
                          return message.error(
                            "Please make sure that both username and email are available",
                            5
                          );
                        }
                        fetch("/api/encryptPass", {
                          method: "POST",
                          headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            password: obj.password,
                          }),
                        })
                          .then((res) => res.json())
                          .then((result) => {
                            setRegisteringUser(true);
                            registerUser({
                              variables: {
                                username: obj.username,
                                password: result.hash,
                                email: obj.email,
                                token: nanoid(),
                              },
                            });
                          });
                      }}
                    >
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
                                  .then((result) => {
                                    form2.setFieldsValue({
                                      password: result.passwords[0],
                                      rPassword: result.passwords[0],
                                    });
                                  });
                              }}
                            >
                              Generate Password
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
                        <Button
                          htmlType="submit"
                          type="primary"
                          className="mr-20"
                        >
                          Submit
                        </Button>
                        <Button
                          type="Reset"
                          onClick={() => {
                            checkUsername({
                              variables: { username: undefined },
                            });
                            checkEmail({
                              variables: { email: undefined },
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
