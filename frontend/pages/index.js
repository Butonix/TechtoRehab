import { useState } from "react";

import { Typography, Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

import Nav from "../components/global/nav.js";
import Sidebar from "../components/global/sidebar";
import CatArticles from "../components/homepage/CategoryArticles";
import Featured from "../components/homepage/Featured";
import Feed from "../components/homepage/Feed";

const { Content } = Layout;

export default function Home() {
  return (
    <Layout>
      <Nav />
      <Layout>
        <Sidebar />
        <Layout className="mainLayout">
          <Content className="site-layout">
            <Featured />
            <CatArticles />
            <Feed />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
