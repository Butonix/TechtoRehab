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
    background: white;
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
          height: 40px;
          width: 60px;
          border-radius: 10%;
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
      margin-right: 40px;
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

const NavBar = () => {
  const link = process.env.NEXT_PUBLIC_WEB_ADDRESS;

  return (
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
        <div className="navItem compose">
          <Dropdown overlay={menu}>
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
        <Button type="link" className="getStarted">
          Sign in
        </Button>
      </nav>
    </HeaderDefault>
  );
};

export default NavBar;
