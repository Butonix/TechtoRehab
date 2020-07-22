import { Typography, Divider, Form, Input, Button, Alert, message } from "antd";
import { useRouter } from "next/router";
import { gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { RotateSpinner } from "react-spinners-kit";
import SocialButton from "components/global/social";

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
          role
        }
      }
    }
  }
`;

const checkUserGoogleQuery = gql`
  query checkUserSocial($id: String!) {
    users_aggregate(where: { google_social_id: { _eq: $id } }) {
      aggregate {
        count
      }
      nodes {
        username
        email
        id
        private_info {
          status
          role
        }
      }
    }
  }
`;

const checkUserFacebookQuery = gql`
  query checkUserSocial($id: String!) {
    users_aggregate(where: { facebook_social_id: { _eq: $id } }) {
      aggregate {
        count
      }
      nodes {
        username
        email
        id
        private_info {
          status
          role
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
  const [socialData, setSocialdata] = useState(null);
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
                    role: data.users_aggregate.nodes[0].private_info.role,
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

  const [checkUserGoogle, { data: checkUserGoogleData }] = useLazyQuery(
    checkUserGoogleQuery,
    {
      onCompleted: (data) => {
        if (data.users_aggregate.aggregate.count == 1) {
          fetch("/api/login", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              id: data.users_aggregate.nodes[0].id,
              username: data.users_aggregate.nodes[0].username,
              email: data.users_aggregate.nodes[0].email,
              status: data.users_aggregate.nodes[0].private_info.status,
              role: data.users_aggregate.nodes[0].private_info.role,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              message.success("Success!");
              router.push("/");
            });
        } else {
          router.push({
            pathname: "/social-login",
            query: {
              id: socialData.id,
              first_name: socialData.firstName,
              last_name: socialData.lastName,
              profilePicUrl: socialData.profilePicUrl,
              email: socialData.email,
              provider: "google",
            },
          });
        }
      },
      onError: (err) => console.log(err),
    }
  );

  const [checkUserFacebook, { data: checkUserFacebookData }] = useLazyQuery(
    checkUserFacebookQuery,
    {
      onCompleted: (data) => {
        if (data.users_aggregate.aggregate.count == 1) {
          fetch("/api/login", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              id: data.users_aggregate.nodes[0].id,
              username: data.users_aggregate.nodes[0].username,
              email: data.users_aggregate.nodes[0].email,
              status: data.users_aggregate.nodes[0].private_info.status,
              role: data.users_aggregate.nodes[0].private_info.role,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              message.success("Success!");
              router.push("/");
            });
        } else {
          router.push({
            pathname: "/social-login",
            query: {
              id: socialData.id,
              first_name: socialData.firstName,
              last_name: socialData.lastName,
              profilePicUrl: socialData.profilePicUrl,
              email: socialData.email,
              provider: "facebook",
            },
          });
        }
      },
      onError: (err) => console.log(err),
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
              <RotateSpinner size={20} color="#1890ff" />
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
      <Divider orientation="center">OR</Divider>
      <div className="d-flex flex-column ai-center fs-14 fw-600">
        <SocialButton
          provider="facebook"
          appId="858231384644584"
          onLoginSuccess={(data) => {
            setSocialdata({
              id: data.profile.id,
              email: data.profile.email,
              profilePicUrl: data.profile.profilePicURL,
              firstName: data.profile.firstName,
              lastName: data.profile.lastName,
            });
            checkUserFacebook({
              variables: {
                id: data.profile.id,
              },
            });
          }}
          onLoginFailure={() => {
            message.error("Unable to log in using Facebook");
          }}
          icon={
            <img src="/facebook.svg" className="mr-20 va-minus-6" width={23} />
          }
        >
          Continue With Facebook
        </SocialButton>
        <SocialButton
          provider="google"
          appId="886403154840-jfrd7a9so36jvmjk4qfuctp5sb796obb.apps.googleusercontent.com"
          onLoginSuccess={(data) => {
            setSocialdata({
              id: data.profile.id,
              email: data.profile.email,
              profilePicUrl: data.profile.profilePicURL,
              firstName: data.profile.firstName,
              lastName: data.profile.lastName,
            });
            checkUserGoogle({
              variables: {
                id: data.profile.id,
              },
            });
          }}
          icon={<img src="/google.svg" className="mr-20" width={20} />}
          onLoginFailure={() => {
            message.error("Unable to log in using Google");
          }}
        >
          Continue With Google
        </SocialButton>
      </div>
    </>
  );
};

export default Login;
