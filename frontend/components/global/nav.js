import { useState, useEffect } from "react";
import {
  Tooltip,
  Avatar,
  Typography,
  Switch,
  Row,
  Divider,
  Menu,
  Button,
  Badge,
  Dropdown,
} from "antd";
import {
  EditOutlined,
  DownOutlined,
  UpOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { breakPoints } from "./responsive";
import { useStoreState, useStoreActions } from "easy-peasy";
import Link from "next/link";

const { Text, Paragraph } = Typography;
const HeaderDefault = styled.header`
  box-shadow: 0px 0px 3px 0px #f5f5f5;
  position: relative;
  background: white;
  display: flex;
  nav {
    display: flex;
    font-size: 16px;
    width: 100%;
    justify-content: space-between;
    box-shadow: 0px 2px 3px 1px #f5f5f5;
    z-index: 1;
    align-items: center;
    height: 64px;
    .navItem {
      margin: 0px 15px;
      line-height: 3;
    }
    .center {
      margin: 0px auto;
      align-items: center;
      display: flex;
      .navItem {
        margin: 0px 15px;
        height: 38px;

        span {
          span {
            font-size: 20px;
            @media ${breakPoints.mobile} {
              font-size: 20px;
            }
          }
        }

        i {
          font-size: 22px;
          line-height: 1;
          @media ${breakPoints.mobile} {
            font-size: 22px;
            margin: 0px 5px;
          }
        }
        @media ${breakPoints.mobile} {
          margin: 0px 5px;
          height: 38px;
        }
      }
    }
    img {
      width: 150px;

      @media ${breakPoints.mobile} {
        width: 130px;
      }
    }

    .nav-avatar-holder {
      img {
        width: 100%;
      }
    }

    .compose {
      margin-right: 10px;
      @media ${breakPoints.mobile} {
        display: none;
      }
    }

    .userOptions {
      margin-right: 20px;
      @media ${breakPoints.mobile} {
        /* display: none; */
      }
    }

    .getStarted {
      /* margin-right: 40px; */
      @media ${breakPoints.mobile} {
        margin-right: 10px;
      }
    }

    .loginIcon {
      display: none;
      margin: 0px 5px;
      @media ${breakPoints.mobile} {
        display: block;
        font-size: 20px;
      }
    }
    .userDrop {
      margin-right: 40px;
      @media ${breakPoints.mobile} {
        display: none;
        margin-right: 10px;
      }
    }
  }
`;

const menu = (
  <Menu onClick={() => {}} className="mt-10" style={{ width: 200 }}>
    <Menu.Item
      className="compose-menu-item pd-15"
      key="1"
      icon={<i class="ri-edit-circle-fill  green-gradient fs-22 va-minus-6" />}
    >
      <Typography.Text className="fs-16" strong>
        <Divider type="vertical" />
        <Link href="/compose/article">
          <a>
            <Text>Article</Text>
          </a>
        </Link>
      </Typography.Text>
    </Menu.Item>
    <Menu.Item
      key="2"
      className="pd-15 mt-10"
      icon={<i class="ri-focus-2-fill  blue-gradient fs-22 va-minus-6" />}
    >
      <Typography.Text className="mt-20 fs-16" strong>
        <Divider type="vertical" />
        <Link href="/compose/story">
          <a>
            <Text>Highlights</Text>
          </a>
        </Link>
      </Typography.Text>
    </Menu.Item>
  </Menu>
);

const userMenu = (
  <Menu className="pd-15" style={{ width: 180 }}>
    <Menu.Item
      key="profile"
      className="pd-10"
      icon={<i class="ri-account-circle-fill ri-lg va-minus-4"></i>}
    >
      <Divider type="vertical" />
      My Profile
    </Menu.Item>
    <Menu.Item
      key="settings"
      className="pd-10"
      icon={<i class="ri-settings-fill ri-lg va-minus-4"></i>}
    >
      <Divider type="vertical" />
      Settings
    </Menu.Item>
  </Menu>
);

const notifications = (
  <Menu className="pd-15" style={{ width: 250 }}>
    <Menu.Item
      icon={<i class="ri-shield-flash-fill ri-lg va-minus-4"></i>}
      className="pd-10"
    >
      <Divider type="vertical" />
      Your articles are trending, click to see details
    </Menu.Item>
    <Divider className="mt-5 mb-5" />
    <Menu.Item
      icon={<i class="ri-account-circle-fill ri-lg va-minus-4"></i>}
      className="pd-10"
    >
      <Divider type="vertical" />
      Muhammad Hassan Mehmood Mentioned You In A comment
    </Menu.Item>
    <Divider className="mt-5 mb-5" />
    <Menu.Item
      icon={<i class="ri-shield-star-fill ri-lg va-minus-4"></i>}
      className="pd-10"
    >
      <Divider type="vertical" />
      You Have Been Warned For Spamming An Article. Click For More Details
    </Menu.Item>
  </Menu>
);

const NavBar = () => {
  const link = process.env.NEXT_PUBLIC_WEB_ADDRESS;
  var darkState = useStoreState((state) => state.site.dark);
  var setDark = useStoreActions((actions) => actions.site.setDark);

  useEffect(() => {
    // var darkElement = document.getElementsByClassName("darkMode")[0];
    // console.log(darkElement);
    // darkElement.addEventListener("click", () => {
    //   if (darkState) {
    //     setDark(false);
    //   } else {
    //     setDark(true);
    //   }
    // });
  });
  return (
    <>
      <HeaderDefault>
        <nav>
          <img className="logoLight" src={`/TTR-LIGHT.svg`} />
          <img className={`logoDark`} src={`/TTR-DARK.svg`} />
          <div className="center">
            <div className="navItem">
              <Badge count={0} showZero>
                <Dropdown overlay={notifications} trigger={["click"]}>
                  <a onClick={(e) => e.preventDefault()}>
                    <i class="ri-notification-3-line va-minus-2"></i>
                  </a>
                </Dropdown>
              </Badge>
            </div>
            <div className="navItem">
              <Tooltip title="My Bookmarks">
                <a>
                  <i class="ri-bookmark-line va-minus-2"></i>
                </a>
              </Tooltip>
            </div>
          </div>
          <div
            className="navItem cursor-pointer desktop-dark-toggle"
            onClick={() => setDark(!darkState)}
            style={{ color: "white" }}
          >
            <Switch
              unCheckedChildren={[
                <i
                  class="ri-moon-fill ml-10 fs-16"
                  style={{ color: "white" }}
                ></i>,
              ]}
              checkedChildren={
                <i
                  class="ri-sun-fill mr-10 fs-16"
                  style={{ color: "white" }}
                ></i>
              }
              checked={darkState ? true : false}
            />
          </div>
          <div className="navItem compose">
            <Dropdown overlay={menu} placement="bottomLeft">
              <Button
                type="primary"
                className="unset-button"
                shape="round"
                icon={<EditOutlined />}
              >
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>
          <Button type="text" className="getStarted">
            Sign in
          </Button>
          <Button type="text" className="signOut">
            Sign out
          </Button>
          <div className="navItem userDrop">
            <Avatar
              src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/134137295/original/854c8fcd234a32ba2e360fc32c0c4c0a992aebeb/change-your-photo-into-a-portrait-cartoon.jpg"
              /**  size={30} */
              className="mr-5 nav-avatar-holder"
            />
            <Dropdown overlay={userMenu} trigger={["click"]}>
              <a>
                <Button type="text" style={{ padding: "4px 8px" }}>
                  <Text className="fs-14">Afzaal Afridi</Text>
                  <i class="ri-arrow-drop-down-line ri-lg va-minus-6"></i>
                </Button>
              </a>
            </Dropdown>
          </div>
        </nav>
      </HeaderDefault>
    </>
  );
};

export default NavBar;
