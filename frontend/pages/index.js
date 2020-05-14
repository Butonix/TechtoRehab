import { useState, useEffect } from "react";
import { Typography, Layout, Menu, PageHeader } from "antd";
import { UserOutlined, ArrowRightOutlined } from "@ant-design/icons";
import Nav from "../components/global/nav.js";
import Sidebar from "../components/global/sidebar";
import CatArticles from "../components/homepage/CategoryArticles";
import Featured from "../components/homepage/Featured";
import Feed from "../components/homepage/Feed";
import dynamic from "next/dynamic";
import Amper from "../components/homepage/amper";

const { Content } = Layout;

const DynamicStories = dynamic(
  () => import("../components/homepage/Stories.js"),
  {
    ssr: false,
    loading: () => <p>hello</p>,
  }
);

const DynamoStories = dynamic(() => import("./ampere.js"), {
  ssr: true,
  loading: () => <p>hello</p>,
});

export default function Home() {
  return (
    <Layout>
      <Nav />
      <Layout>
        <Sidebar home={true} />
        <Layout className="mainLayout">
          <Content className="site-layout">
            {/* <Featured /> */}
            <PageHeader
              title="Highlights"
              extra={[
                <>
                  <span>See More</span> <ArrowRightOutlined />
                </>,
              ]}
            />
            {/* <DynamicStories /> */}
            {/* <DynamoStories /> */}
            <CatArticles />
            <Feed />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
