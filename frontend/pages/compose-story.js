import { Layout, Space, Typography, PageHeader, Skeleton } from "antd";
import Nav from "../components/global/nav.js";
import Sidebar from "../components/global/sidebar";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
import Shimmer from "../components/global/shimmer";

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
              extra={[<p>{condition}</p>]}
              title="COMPOSE HIGHLIGHT"
              onBack={() => Router.back()}
            />
            <CreateHighlight cond={condition} setCond={setCondition} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ComposeStory;
