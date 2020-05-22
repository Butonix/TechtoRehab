import { Layout, Space, Typography, PageHeader, Skeleton } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Nav from "components/global/nav.js";
import Sidebar from "components/global/sidebar";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
import Shimmer from "components/global/shimmer";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

var CreateHighlight = dynamic(
  () => import("../components/compose/createHighlight"),
  { ssr: false, loading: () => <Shimmer storyEditor /> }
);

const ComposeStory = () => {
  var [condition, setCondition] = useState("Status");

  return (
    <Layout>
      <Nav />
      <Layout>
        <Sidebar />
        <Layout className="mainLayout">
          <Content className="site-layout">
            <PageHeader
              className="composeHeader"
              extra={[
                <p
                  style={{
                    position: "fixed",
                    top: 40,
                    height: 50,
                    width: 150,
                    margin: "20px 0px",
                    right: 50,
                    background: "#167DDC",
                    color: "white",
                    padding: 10,
                    borderRadius: 3,
                    zIndex: 3,
                  }}
                >
                  <EditOutlined style={{ marginRight: "10px" }} />
                  {condition + "..."}
                </p>,
                <p
                  style={{
                    position: "fixed",
                    bottom: 60,
                    height: 40,
                    right: 50,
                    background: "#167DDC",
                    color: "white",
                    padding: "8px 13px",
                    borderRadius: 3,
                    zIndex: 3,
                  }}
                >
                  <a
                    onClick={() => window.scrollTo(0, 1200)}
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    <i class="ri-arrow-down-line ri-lg"></i>
                  </a>
                </p>,
                <p
                  style={{
                    position: "fixed",
                    bottom: 0,
                    height: 40,
                    right: 50,
                    background: "#167DDC",
                    color: "white",
                    padding: "8px 13px",
                    borderRadius: 3,
                    zIndex: 3,
                  }}
                >
                  <a
                    onClick={() => window.scrollTo(0, -1200)}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <i class="ri-arrow-up-line ri-lg"></i>
                  </a>
                </p>,
              ]}
              title="COMPOSE HIGHLIGHT"
              onBack={() => Router.back()}
              style={{ margin: "20px 0px" }}
            />
            <CreateHighlight cond={condition} setCond={setCondition} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ComposeStory;
