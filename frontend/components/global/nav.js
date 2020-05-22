import { useState } from "react";

import { Tooltip, Typography, Menu, Button, Badge, Dropdown } from "antd";
import {
  ReloadOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  EditOutlined,
  DownOutlined,
  ArrowRightOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { breakPoints } from "./responsive";

const HeaderDefault = styled.header`
  box-shadow: 0px 0px 3px 0px #f5f5f5;
  height: 50px;
  position: relative;
  background: white;
  display: flex;
  nav {
    display: flex;
    font-size: 16px;
    width: 100%;
    justify-content: space-between;
    box-shadow: 0px 1px 3px 0px #dcdcdc;
    z-index: 1;
    background: white;
    align-items: center;
    height: 50px;
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
      margin: 0px 15px;

      @media ${breakPoints.mobile} {
        width: 130px;
        margin: 0px 10px;
      }
    }

    .compose {
      margin-right: 10px;
      @media ${breakPoints.mobile} {
        /* margin-right: 10px; */
        position: fixed;
        bottom: 20px;
        right: 0px;
        button {
          height: 50px;
          width: 50px;
          border-radius: 50%;
          background: #1890ff;
          color: white;
          .composeText {
            display: none;
            ::after {
              /* content: ' Article' */
            }
          }
        }
      }
    }

    .userOptions {
      margin-right: 20px;
      @media ${breakPoints.mobile} {
        /* display: none; */
      }
    }

    .getStarted {
      margin-right: 10px;
    }

    .loginIcon {
      display: none;
      margin: 0px 5px;
      @media ${breakPoints.mobile} {
        display: block;
        font-size: 20px;
      }
    }
  }
`;

const menu = (
  <Menu onClick={() => {}} style={{ padding: 15, width: 250 }}>
    <Menu.Item
      key="1"
      style={{ padding: 15, border: "1px solid #333" }}
      icon={
        <i
          class="ri-article-fill ri-lg"
          style={{
            fontSize: 25,
            marginRight: 20,
          }}
        />
      }
    >
      <Typography.Text strong style={{ fontSize: 16 }}>
        Article
      </Typography.Text>
    </Menu.Item>
    <Menu.Item
      key="2"
      style={{
        padding: 15,
        margin: "10px 0px",
        border: "1px solid #333",
      }}
      icon={
        <i
          class="ri-chat-history-fill ri-lg"
          style={{
            fontSize: 25,
            marginRight: 20,
            color: "#FFD75A",
          }}
        />
      }
    >
      <Typography.Text strong style={{ fontSize: 16, marginTop: 20 }}>
        Highlight
      </Typography.Text>
    </Menu.Item>
  </Menu>
);

const NavBar = () => {
  const link = process.env.NEXT_PUBLIC_WEB_ADDRESS;

  return (
    <HeaderDefault>
      <nav>
        <img className="logoLight" src={`${link}/TTR-LIGHT.svg`} />
        <img className={`logoDark`} src={`${link}/TTR-DARK.svg`} />
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
        <div className="navItem compose">
          <Dropdown overlay={menu}>
            <Button type="link" icon={<EditOutlined />}>
              Create <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        {/* <Dropdown className="userOptions" overlay={menu}>
            <Button>
              Hello, Afzaal <DownOutlined />
            </Button>
          </Dropdown> */}
        <Button type="primary" className="getStarted">
          Get Started
        </Button>
      </nav>
    </HeaderDefault>
  );
};

export default NavBar;
