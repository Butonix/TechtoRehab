import { useState, useEffect } from "react";
import { Typography, Layout, Menu, PageHeader } from "antd";
import { UserOutlined, ArrowRightOutlined } from "@ant-design/icons";
import Nav from "../components/global/nav.js";
import Sidebar from "../components/global/sidebar";
import CatArticles from "../components/homepage/CategoryArticles";
import Featured from "../components/homepage/Featured";
import Feed from "../components/homepage/Feed";
import dynamic from "next/dynamic";
import Shimmer from "../components/global/shimmer";
import { useStoreActions, useStoreState } from "easy-peasy";

const { Content } = Layout;

export default function Home() {
  var setDark = useStoreActions((actions) => actions.site.setDark);
  var dark = useStoreState((state) => state.site.dark);
  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
          setDark(true);
        } else {
          setDark(false);
        }
      });
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDark(true);
    } else {
      setDark(false);
    }
  });
  return (
    <Layout>
      <Nav />
      <Layout>
        <Sidebar home={true} />
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
