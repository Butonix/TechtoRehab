import { useState, useEffect } from "react";
import {
  Typography,
  Layout,
  Menu,
  Button,
  PageHeader,
  Dropdown,
  Divider,
} from "antd";
import { UserOutlined, ArrowRightOutlined } from "@ant-design/icons";
import Nav from "components/global/nav.js";
import Sidebar from "components/global/sidebar";
import CatArticles from "components/homepage/CategoryArticles";
import Featured from "components/homepage/Featured";
import Feed from "components/homepage/Feed";
import { useStoreActions, useStoreState } from "easy-peasy";
import Wrapper from "components/global/wrapper";

const { Content } = Layout;

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

export default function Home() {
  useEffect(() => {});
  return (
    <Wrapper>
      <Layout>
        <Nav />
        <Layout>
          <Sidebar home />
          <Layout className="mainLayout">
            <Content className="site-layout">
              <PageHeader
                title="HIGHLIGHTS"
                className="pd-15"
                extra={[
                  <>
                    <span>See More</span> <ArrowRightOutlined />
                  </>,
                ]}
              />
              <Featured />
              <PageHeader
                title="FROM TECHNOLOGY"
                className="pd-15"
                extra={[
                  <>
                    <span>See More</span> <ArrowRightOutlined />
                  </>,
                ]}
              />
              <CatArticles />
              <PageHeader
                title="NEWS FEED"
                className="pd-15"
                extra={[
                  <>
                    <span>See More</span> <ArrowRightOutlined />
                  </>,
                ]}
              />
              <Feed style={{ margin: "0px 15px" }} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Wrapper>
  );
}
