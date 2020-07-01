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
} from "antd";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import { breakPoints } from "./responsive";
import { useRouter } from "next/router";
import Link from "next/link";

const Nav = styled.div`
  display: flex;
  padding: 10px 15px;
  background: white;
  box-shadow: 0px 2px 5px 1px #eeeeee;
  z-index: 2;

  @media ${breakPoints.mobile} {
    padding: 13px 15px 5px 15px;
  }

  .logo-holder {
    line-height: 2.7 !important;

    .logo {
      max-width: 130px;
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

const Navigation = (props) => {
  const loginModal = useStoreState((state) => state.site.loginModal);
  const setLoginModal = useStoreActions(
    (actions) => actions.site.setLoginModal
  );
  const setSidebar = useStoreActions((actions) => actions.site.setSidebar);
  const sidebar = useStoreState((state) => state.site.sidebar);
  const router = useRouter();
  const UserDrop = (
    <Menu style={{ width: 200 }}>
      {props.user && props.user.id ? (
        <Menu.Item
          className="pd-20"
          key="1"
          icon={
            <i class="ri-user-smile-fill fs-24 va-minus-6 profile-gradient"></i>
          }
        >
          <Divider type="vertical" /> View Profile
        </Menu.Item>
      ) : null}
      <Menu.Item
        className="pd-20"
        key="2"
        icon={
          <i class="ri-edit-circle-fill ri-lg va-minus-6 fs-24 compose-gradient"></i>
        }
        onClick={() => {
          props.user && props.user.id ? null : setLoginModal(true);
        }}
      >
        <Divider type="vertical" style={{ height: 30 }} />

        <a href={props.user && props.user.id ? "/compose" : null}>
          <Text> Compose</Text>
        </a>
      </Menu.Item>

      <Menu.Item
        className="pd-20"
        key="3"
        icon={
          <i
            class={
              (props.user && props.user.id
                ? "ri-user-received-fill"
                : "ri-user-shared-2-fill") +
              " ri-lg va-minus-6 fs-24 sign-in-out-gradient"
            }
          ></i>
        }
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
        <a onClick={(e) => e.preventDefault()}>
          <i
            className={
              sidebar
                ? "ri-menu-2-line " + "ri-lg  lh-2"
                : "ri-menu-3-line " + "ri-lg  lh-2"
            }
            onClick={() => setSidebar(!sidebar)}
          ></i>
        </a>
      </div>
      <Modal
        closable
        footer={false}
        maskClosable
        onCancel={() => setLoginModal(false)}
        visible={loginModal}
      >
        <Row justify="center">
          <Col span={18}>
            <img src="/login-2.svg" width={350} height={250} />
            <Title level={4} className="mg-y-20 fs-18 ta-center">
              Please Sign In to continue
            </Title>
            <Form layout="vertical">
              <Form.Item label="Username" name="username">
                <Input placeholder="Your Username" />
              </Form.Item>
              <Form.Item label="Password" name="username">
                <Input.Password
                  placeholder="Your Password"
                  name="password"
                  autoComplete="new-password"
                />
              </Form.Item>
              <Form.Item className="mt-30 mb-20">
                <Button type="primary">Sign In</Button>
                <Button type="link">Forgot Password ?</Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
      <div className="navigation logo-holder mr-auto ml-10">
        <a href="/">
          <img className="logo" src="/TTR-LIGHT.svg" />
        </a>
      </div>
      <div className="navigation desktop-link">
        <a>
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
                    props.user && props.user.id
                      ? props.user.profilePicture
                      : null
                  }
                  size={26}
                  className="mr-10"
                  style={{ marginTop: -3 }}
                />
              }
            >
              {props.user && props.user.id ? (
                <Text>{props.user.username}</Text>
              ) : (
                <Text>Error Loading Data</Text>
              )}
              <i class="ri-arrow-down-s-line va-minus-4 fs-16 ml-5"></i>
            </Button>
          </Dropdown>
        </div>
      ) : (
        <div className="navigation">
          <Button type="text">
            <Link href="/signin">
              <a>
                <Text>Sign in</Text>
              </a>
            </Link>
          </Button>
        </div>
      )}
    </Nav>
  );
};

export default Navigation;
