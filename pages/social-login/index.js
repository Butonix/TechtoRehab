import Wrapper from "components/global/wrapper";
import {
  Row,
  Col,
  Form,
  Button,
  Input,
  Card,
  message,
  Checkbox,
  Typography,
} from "antd";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

const addSocialUserQuery = gql`
  mutation addSocialUser(
    $googleId: String
    $facebookId: String
    $username: String!
    $email: String!
    $profilePicture: String!
    $provider: String!
    $firstName: String!
    $lastName: String!
    $status: String!
    $password: String!
  ) {
    insert_users_private_info(
      objects: {
        provider: $provider
        status: $status
        password: $password
        user: {
          data: {
            username: $username
            first_name: $firstName
            last_name: $lastName
            email: $email
            google_social_id: $googleId
            facebook_social_id: $facebookId
            profile_picture: $profilePicture
          }
        }
      }
    ) {
      affected_rows
      returning {
        user {
          id
          username
          private_info {
            role
            status
          }
        }
      }
    }
  }
`;

const updateExistingUserQuery = gql`
  mutation updateExistingUser(
    $email: String!
    $googleId: String
    $facebookId: String
    $firstName: String!
    $lastName: String!
    $profilePicture: String!
    $provider: String!
    $status: String!
  ) {
    update_users_private_info(
      _set: { provider: $provider, status: $status }
      where: { user: { email: { _eq: $email } } }
    ) {
      affected_rows
      returning {
        user {
          id
          username
        }
      }
    }
    update_users(
      where: { email: { _eq: $email } }
      _set: {
        first_name: $firstName
        last_name: $lastName
        profile_picture: $profilePicture
        google_social_id: $googleId
        facebook_social_id: $facebookId
      }
    ) {
      affected_rows
      returning {
        id
        username
        private_info {
          role
          status
        }
      }
    }
  }
`;

const { Text, Title, Link } = Typography;
const SocialLogin = (props) => {
  const router = useRouter();
  const [email, setEmail] = useState(props.email);
  const [updateExistingUser, { data: updateExistingUserData }] = useMutation(
    updateExistingUserQuery,
    {
      onCompleted: (data) => {
        console.log(data);
        fetch("/api/login", {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id: data.update_users.returning[0].id,
            email: props.email,
            username: data.update_users.returning[0].username,
            role: data.update_users.returning[0].settings.role,
            status: data.update_users.returning[0].settings.status,
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            message.success("Successful");
            router.push("/");
          });
      },
    }
  );
  const [addSocialUser, { data: addSocialUserData }] = useMutation(
    addSocialUserQuery,
    {
      onCompleted: (data) => {
        fetch("/api/login", {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id: data.insert_users_private_info.returning[0].user.id,
            email: props.email,
            username: data.insert_users_private_info.returning[0].user.username,
            role:
              data.insert_users_private_info.returning[0].user.settings.role,
            status:
              data.insert_users_private_info.returning[0].user.settings.status,
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            message.success("Successful");
            router.push("/");
          });
      },
      onError: (err) => {
        console.log(err);
        if (err.graphQLErrors[0].message.includes("Uniqueness violation")) {
          if (props.provider === "google") {
            updateExistingUser({
              variables: {
                googleId: props.id,
                email: email,
                firstName: props.first_name,
                lastName: props.last_name,
                profilePicture: props.profilePicUrl,
                provider: props.provider,
                status: "confirmed",
              },
            });
          } else {
            updateExistingUser({
              variables: {
                facebookId: props.id,
                email: email,
                firstName: props.first_name,
                lastName: props.last_name,
                profilePicture: props.profilePicUrl,
                provider: props.provider,
                status: "confirmed",
              },
            });
          }
        }
      },
    }
  );
  return (
    <Wrapper>
      <Row className="pd-30" justify="center">
        <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={8}>
          <Card>
            <Title level={4} className="mg-y-30 fs-18">
              Just One More Step...😅 (Required only once)
            </Title>
            <Form
              layout="vertical"
              onFinish={(data) => {
                if (props.provider == "google") {
                  addSocialUser({
                    variables: {
                      username: props.email.substr(0, props.email.indexOf("@")),
                      email: data.email,
                      googleId: props.id,
                      profilePicture: props.profilePicUrl,
                      provider: props.provider,
                      firstName: props.first_name,
                      lastName: props.last_name,
                      password: data.rPassword,
                      status: "confirmed",
                    },
                  });
                } else {
                  addSocialUser({
                    variables: {
                      username: props.email.substr(0, props.email.indexOf("@")),
                      facebookId: props.id,
                      email: data.email,
                      profilePicture: props.profilePicUrl,
                      provider: props.provider,
                      firstName: props.first_name,
                      password: data.rPassword,
                      lastName: props.last_name,
                      status: "confirmed",
                    },
                  });
                }
              }}
            >
              <Form.Item
                label="First Name"
                initialValue={props.first_name}
                name="fName"
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="Last Name"
                initialValue={props.last_name}
                name="lName"
              >
                <Input disabled />
              </Form.Item>

              <Form.Item label="Email" initialValue={email} name="email">
                <Input
                  onChange={(data) => {
                    setEmail(data.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Username"
                name="uName"
                initialValue={props.email.substr(0, props.email.indexOf("@"))}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="Password"
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
              >
                <Input.Password autoComplete="new-password" />
              </Form.Item>

              <Form.Item
                label="Repeat Password"
                name="rPassword"
                rules={[
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator: (_, val) => {
                      if (val !== getFieldValue("password")) {
                        return Promise.reject("Passwords don't match");
                      } else {
                        return Promise.resolve();
                      }
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Profile Photo"
                initialValue={props.last_name}
                name="profile_picture"
              >
                <img src={props.profilePicUrl} width={200} height={200} />
              </Form.Item>

              <Form.Item
                name="terms"
                label="Terms & Conditions"
                rules={[
                  {
                    validator: (_, value) => {
                      console.log(value);
                      if (value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "You must agree to our terms before you continue"
                      );
                    },
                  },
                ]}
                valuePropName="checked"
              >
                <Checkbox>
                  I Hereby Agree To{" "}
                  <Link strong href="/terms#social-login">
                    Social Login Terms & Agreement
                  </Link>
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Button type="primary" className="mg-y-5" htmlType="submit">
                  Confirm Details
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default SocialLogin;

export const getServerSideProps = async ({ req, query }) => {
  const { id, first_name, last_name, profilePicUrl, email, provider } = query;
  return {
    props: {
      id: id,
      first_name: first_name,
      last_name: last_name,
      profilePicUrl: profilePicUrl,
      email: email,
      provider: provider,
    },
  };
};
