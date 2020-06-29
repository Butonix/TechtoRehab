import {
  Row,
  Col,
  Typography,
  Button,
  Dropdown,
  Avatar,
  Menu,
  Divider,
} from "antd";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import { breakPoints } from "./responsive";
import { useRouter } from "next/router";

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

const { Text } = Typography;

const Navigation = (props) => {
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
      >
        <Divider type="vertical" style={{ height: 30 }} /> Compose
      </Menu.Item>
      <Menu.Item
        className="pd-20"
        key="3"
        icon={
          <i
            class={
              (props.user && props.user.id
                ? "ri-user-received-line"
                : "ri-user-shared-2-line") +
              " ri-lg va-minus-6 fs-24 compose-gradient"
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
      <div className="navigation desktop-link mr-10 ml-10">
        <a href="/create">
          <Button
            type="primary"
            icon={
              <i
                className="ri-edit-line mr-5 va-minus-2"
                style={{ color: "inherit" }}
              ></i>
            }
          >
            Create
          </Button>
        </a>
      </div>
      <div className="navigation dropDown">
        <Dropdown trigger="click" overlay={UserDrop}>
          <Button
            type="text"
            className="t-transform-cpt"
            icon={
              <Avatar
                src={
                  props.user && props.user.id ? props.user.profilePicture : null
                }
                size={30}
                className="mr-10"
                style={{ marginTop: -3 }}
              />
            }
          >
            {props.user && props.user.id ? (
              <Text>{props.user.username}</Text>
            ) : (
              <Text>Guest</Text>
            )}
            <i class="ri-arrow-down-s-line va-minus-4 fs-16 ml-5"></i>
          </Button>
        </Dropdown>
      </div>
    </Nav>
  );
};

export default Navigation;
