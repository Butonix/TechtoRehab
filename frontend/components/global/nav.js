import { useState, useEffect } from "react";
import {
  Tooltip,
  Avatar,
  Typography,
  Switch,
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
import interact from "interactjs";

const { Text } = Typography;
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
      margin-left: auto;
      margin-right: auto;
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
        /* position: fixed;
        bottom: 20px;
        right: 0px;
        button {
          height: 40px;
          width: 60px;
          border-radius: 10%;
          background: #1890ff;
          color: white;
          .composeText {
            display: none;
            ::after {
            }
          }
        } */
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
  <Menu onClick={() => {}} className="pd-15" style={{ width: 250 }}>
    <Menu.Item
      key="1"
      style={{ padding: 15, border: "1px solid #333" }}
      icon={
        <i
          class="ri-article-fill ri-lg mr-20"
          style={{
            fontSize: 25,
          }}
        />
      }
    >
      <Typography.Text strong className="fs-16">
        Article
      </Typography.Text>
    </Menu.Item>
    <Menu.Item
      key="2"
      className="pd-15"
      style={{
        margin: "10px 0px",
        border: "1px solid #333",
      }}
      icon={
        <i
          class="ri-chat-history-fill ri-lg mr-20"
          style={{
            fontSize: 25,
            color: "#FFD75A",
          }}
        />
      }
    >
      <Typography.Text strong className="mt-20 fs-16">
        Highlight
      </Typography.Text>
    </Menu.Item>
  </Menu>
);

const menu2 = (
  <Menu onClick={() => {}} className="mr-20 pd-10" style={{ width: 140 }}>
    <Divider> Create</Divider>
    <Menu.Item
      key="1"
      className="pd-10"
      icon={<i class="ri-article-line mr-10 ri-lg"></i>}
    >
      Article
    </Menu.Item>
    <Menu.Item
      key="2"
      className="pd-10"
      icon={<i class="ri-chat-history-fill mr-10 ri-lg"></i>}
    >
      Highlight
    </Menu.Item>
    <Divider> More</Divider>

    <Menu.Item
      key="4"
      className="pd-10"
      icon={<i class="ri-user-line mr-10 ri-lg"></i>}
    >
      Profile
    </Menu.Item>
    <Menu.Item
      key="5"
      className="pd-10"
      icon={<i class="ri-settings-line mr-10 ri-lg"></i>}
    >
      Settings
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
                <Dropdown overlay={menu} trigger={["click"]}>
                  <a onClick={(e) => e.preventDefault()}>
                    <i class="ri-notification-3-line"></i>
                  </a>
                </Dropdown>
              </Badge>
            </div>
            <div className="navItem">
              <Tooltip title="My Bookmarks">
                <a>
                  <i class="ri-bookmark-line"></i>
                </a>
              </Tooltip>
            </div>
          </div>
          <div
            className="navItem cursor-pointer"
            onClick={() => setDark(!darkState)}
            style={{ color: "white" }}
          >
            {/* {darkState ? (
              <i
                class="ri-sun-line ml-10 ri-lg fs-24"
                style={{ verticalAlign: "-7px !important" }}
              ></i>
            ) : (
              <i
                class="ri-moon-line ml-10 ri-lg fs-24"
                style={{ verticalAlign: "-7px !important" }}
              ></i>
            )} */}

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
            <Dropdown overlay={menu} placement="topLeft">
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
          <div className="navItem userDrop">
            <Avatar
              src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/134137295/original/854c8fcd234a32ba2e360fc32c0c4c0a992aebeb/change-your-photo-into-a-portrait-cartoon.jpg"
              /**  size={30} */
              className="mr-5 nav-avatar-holder"
            />
            <Dropdown overlay={menu} trigger={["click"]}>
              <a>
                <Button type="text" style={{ padding: "4px 8px" }}>
                  <Text className="fs-14">Afzaal Afridi</Text>
                  <i
                    class="ri-arrow-drop-down-line ri-lg"
                    style={{ verticalAlign: "-6px !important" }}
                  ></i>
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
