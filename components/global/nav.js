import {
  Row,
  Col,
  Typography,
  Button,
  Dropdown,
  Form,
  Input,
  Modal,
  Avatar,
  Menu,
  Divider,
  message,
} from "antd";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import { breakPoints } from "./responsive";
import { useRouter } from "next/router";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useState } from "react";

const Nav = styled.div`
  display: flex;
  padding: 10px 15px;
  background: white;
  box-shadow: 0px 2px 5px 1px #eeeeee;
  z-index: 2;

  @media ${breakPoints.mobile} {
    padding: 13px 0px 5px 15px;
  }
  @media ${breakPoints.smallMobile} {
    font-size: 11px !important;
    line-height: 2.5 !important;
    padding: 10px 7px;
    div {
      font-size: 11px !important;
    }

    span {
      font-size: 11px !important;
    }

    .ant-avatar-circle {
      height: 20px;
      width: 20px;
    }

    .ant-button {
      padding: 4px 5px;
    }
  }

  .logo-holder {
    line-height: 2.7 !important;

    .logo {
      max-width: 130px;
      margin-left: 10px;
      @media ${breakPoints.smallMobile} {
        max-width: 90px;
        margin-left: 0px;
      }
    }
  }

  .sidebar {
    display: none;
    margin-top: 2px;
    @media ${breakPoints.mobile} {
      display: block;
    }

    @media ${breakPoints.iPad} {
      display: block;
    }
  }

  .navigation {
    line-height: 2.8;
    @media ${breakPoints.smallMobile} {
      line-height: 2.9;
    }

    a {
      line-height: 2.3;
    }
  }
  .desktop-link {
    display: block;
    margin: 0px 10px;
    a {
      line-height: 2.3;
    }

    @media ${breakPoints.mobile} {
      display: none;
    }

    @media ${breakPoints.iPad} {
      /* display: none; */
    }
  }

  .dropDown {
    /* border: 1px solid #e6fffb;
    background: #e6fffb; */
  }
`;

const { Text, Title, Paragraph } = Typography;

const getUserProfilePictureQuery = gql`
  query getUserProfilePicture($id: uuid) {
    users(where: { id: { _eq: $id } }) {
      profile_picture
    }
  }
`;

const loginQuery = gql`
  query login($username: String!) {
    users(where: { username: { _eq: $username } }) {
      id
      username
      email
      private_info {
        password
        status
        role
      }
    }
  }
`;

const Navigation = (props) => {
  const loginModal = useStoreState((state) => state.site.loginModal);
  const setLoginModal = useStoreActions(
    (actions) => actions.site.setLoginModal
  );
  const setSidebar = useStoreActions((actions) => actions.site.setSidebar);
  const sidebar = useStoreState((state) => state.site.sidebar);
  const [userDp, setUserDp] = useState();
  const [password, setPassword] = useState(null);
  const router = useRouter();

  const { data: getUserProfilePictureData } = useQuery(
    getUserProfilePictureQuery,

    {
      variables: {
        id: props.user ? props.user.id : null,
      },
    }
  );

  const [login, { data: loginData }] = useLazyQuery(loginQuery, {
    onCompleted: (data) => {
      console.log(data);
      fetch("/api/checkPassword", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          password: password,
          salt: data.users[0].private_info.password,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.verify == "pass") {
            fetch("/api/login", {
              method: "POST",
              headers: {
                "content-type": "application/json",
                accept: "application/json",
              },
              body: JSON.stringify({
                id: data.users[0].id,
                username: data.users[0].username,
                email: data.users[0].email,
                status: data.users[0].private_info.status,
                role: data.users[0].private_info.role,
              }),
            })
              .then((res) => res.json())
              .then((result) => {
                message.success("Login Success");
                router.reload();
              });
          } else {
            message.error("Wrong Credentials");
          }
        });
    },
    fetchPolicy: "network-only",
  });

  const UserDrop = (
    <Menu style={{ width: 200 }}>
      <Menu.Item
        className="pd-20"
        key="2"
        icon={
          <i className="ri-edit-circle-fill ri-lg va-minus-6 fs-24 compose-gradient"></i>
        }
        onClick={() => {
          props.user && props.user.id
            ? (location.href = "/create")
            : setLoginModal(true);
        }}
      >
        <Divider type="vertical" style={{ height: 30 }} />

        <a href={props.user && props.user.id ? "/create" : null}>
          <Text>Start Writing</Text>
        </a>
      </Menu.Item>

      {props.user && props.user.id ? (
        <Menu.Item
          className="pd-20"
          key="1"
          icon={
            <i className="ri-user-smile-fill fs-24 va-minus-6 profile-gradient"></i>
          }
          onClick={() => (location.href = `/user/${props.user.username}`)}
        >
          <Divider type="vertical" />
          <a
            href={
              props.user && props.user.id
                ? `/user/${props.user.username}`
                : null
            }
          >
            <Text>View Profile</Text>
          </a>
        </Menu.Item>
      ) : null}

      {props.user && props.user.id ? (
        <Menu.Item
          className="pd-20"
          key="4"
          icon={
            <i className="ri-settings-fill fs-24 va-minus-6 user-settings-gradient"></i>
          }
          onClick={() =>
            props.user && props.user.id
              ? (location.href = `/user/${props.user.username}/settings`)
              : null
          }
        >
          <Divider type="vertical" />
          <a
            href={
              props.user && props.user.id
                ? `/user/${props.user.username}/settings`
                : null
            }
          >
            <Text>Settings</Text>
          </a>
        </Menu.Item>
      ) : null}

      <Menu.Item
        className="pd-20"
        key="3"
        icon={
          <i
            className={
              (props.user && props.user.id
                ? "ri-user-received-fill"
                : "ri-user-shared-2-fill") +
              " ri-lg va-minus-6 fs-24 sign-in-out-gradient"
            }
          ></i>
        }
        onClick={() => {
          if (props.user && props.user.id) {
            fetch("/api/logout")
              .then((res) => res.json())
              .then((data) => {
                if (data && data.status) {
                  router.reload();
                }
              });
          } else {
          }
        }}
      >
        <Divider type="vertical" style={{ height: 30 }} />
        <a
          href={props.user && props.user.id ? null : "/signin"}
          onClick={() => {
            if (props.user && props.user.id) {
              fetch("/api/logout")
                .then((res) => res.json())
                .then((data) => {
                  if (data && data.status) {
                    router.reload();
                  }
                });
            } else {
            }
          }}
        >
          {props.user && props.user.id ? (
            <Text>Sign out</Text>
          ) : (
            <Text>Sign in</Text>
          )}
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <Nav>
      <div className="navigation sidebar">
        <i
          className={
            sidebar
              ? "ri-menu-2-line " + "ri-lg  lh-2"
              : "ri-menu-3-line " + "ri-lg  lh-2"
          }
          onClick={() => setSidebar(!sidebar)}
          style={{
            color: "unset",
          }}
        ></i>
      </div>
      <Modal
        closable
        footer={false}
        maskClosable
        onCancel={() => setLoginModal(false)}
        visible={loginModal}
        bodyStyle={{
          padding: 0,
        }}
        width={400}
      >
        <Row justify="center">
          <Col>
            <img src="/login-rectangle.svg" width="100%" height={250} />
            <Title level={4} className="mg-y-20 fs-14 ta-center">
              Please Sign In to continue
            </Title>
            <Row justify="center">
              <Col span={16} className="mb-30">
                <Form
                  layout="vertical"
                  onFinish={(obj) => {
                    login({
                      variables: {
                        username: obj.username,
                      },
                    });
                  }}
                >
                  <Form.Item label="Username" name="username">
                    <Input placeholder="Your Username" />
                  </Form.Item>
                  <Form.Item label="Password" name="password">
                    <Input.Password
                      placeholder="Your Password"
                      name="password"
                      autoComplete="new-password"
                      onChange={(val) => {
                        setPassword(val.target.value);
                      }}
                    />
                  </Form.Item>
                  <Form.Item className="mt-30 mb-30">
                    <Button type="primary" htmlType="submit">
                      Sign In
                    </Button>
                    <Button type="link">Forgot Password ?</Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
      <div className="navigation logo-holder mr-auto">
        <a href="/">
          <img
            className="logo"
            src="https://de23g11v4qrwk.cloudfront.net/TTR-LIGHT.svg"
            alt="Tech To Rehab logo"
          />
        </a>
      </div>
      <div className="navigation">
        <a href="/search">
          <Text>
            <i
              class="ri-search-line fs-20 lh-1 mr-10"
              style={{
                verticalAlign: -5,
              }}
            ></i>
          </Text>
        </a>
      </div>

      <div className="navigation desktop-link">
        <a href="/categories">
          <Text>Categories</Text>
        </a>
      </div>

      {props.user && props.user.id ? (
        <div className="navigation dropDown">
          <Dropdown trigger="click" overlay={UserDrop}>
            <Button
              type="text"
              className="t-transform-cpt"
              icon={
                <Avatar
                  src={
                    getUserProfilePictureData &&
                    getUserProfilePictureData.users[0].profile_picture
                      ? getUserProfilePictureData.users[0].profile_picture.includes(
                          "https://platform-lookaside.fbsbx.com/"
                        ) ||
                        getUserProfilePictureData.users[0].profile_picture.includes(
                          "google"
                        )
                        ? getUserProfilePictureData.users[0].profile_picture
                        : "https://ik.imagekit.io/ttr/tr:n-avatar/" +
                          getUserProfilePictureData.users[0].profile_picture
                      : null
                  }
                  size={26}
                  className="mr-10"
                  style={{ marginTop: -3 }}
                  alt={
                    props.user
                      ? `${props.user.username} on TechtoRehab`
                      : "Profile photo on TechtoRehab"
                  }
                />
              }
            >
              {props.user && props.user.id ? (
                <Text>{props.user.username}</Text>
              ) : (
                <Text>Error Loading Data</Text>
              )}
              <i className="ri-arrow-down-s-line va-minus-4 fs-16 ml-5"></i>
            </Button>
          </Dropdown>
        </div>
      ) : (
        <div className="navigation">
          <Button type="primary" className="compose-button2">
            <a
              href="/get-started"
              style={{
                color: "inherit",
              }}
            >
              <Text
                className="fw-bold"
                style={{
                  marginTop: 2,
                }}
              >
                Get Started
              </Text>
            </a>
          </Button>
        </div>
      )}
    </Nav>
  );
};

export default Navigation;
