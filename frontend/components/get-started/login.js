import { Typography, Form, Input, Button, Alert } from "antd";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";
import { useState, useEffect } from "react";

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

const Login = () => {
  const [loginFailed, setLoginFailed] = useState(false);
  const [fetchingLogin, setFetchingLogin] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [form] = Form.useForm();
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

  return (
    <>
      <Title level={4} className="mt-20 mb-30 fs-18">
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
              <Text className="mr-10">Success! Redirecting...</Text>
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
    </>
  );
};

export default Login;
