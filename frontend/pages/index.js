import { useState, useEffect } from "react";
import { Typography, Layout, Menu, Button, PageHeader } from "antd";
import { UserOutlined, ArrowRightOutlined } from "@ant-design/icons";
import Nav from "components/global/nav.js";
import Sidebar from "components/global/sidebar";
import CatArticles from "components/homepage/CategoryArticles";
import Featured from "components/homepage/Featured";
import Feed from "components/homepage/Feed";
import { useStoreActions, useStoreState } from "easy-peasy";
import Wrapper from "components/global/wrapper";

const { Content } = Layout;

export default function Home() {
  var setDark = useStoreActions((actions) => actions.site.setDark);
  var dark = useStoreState((state) => state.site.dark);
  const [stater, setStater] = useState(false);

  // var setter = () => {
  //   // var boda = document.getElementsByTagName("body")[0];
  //   // if (boda.classList.contains("light")) {
  //   //   boda.classList.remove("light");
  //   //   boda.classList.add("dark");
  //   // } else if (boda.classList.contains("dark")) {
  //   //   boda.classList.remove("dark");
  //   //   boda.classList.add("light");
  //   // }
  //   setStater(!stater);
  // };
  // useEffect(() => {
  //   window
  //     .matchMedia("(prefers-color-scheme: dark)")
  //     .addEventListener("change", (e) => {
  //       if (
  //         window.matchMedia &&
  //         window.matchMedia("(prefers-color-scheme: dark)").matches
  //       ) {
  //         setDark(true);
  //       } else {
  //         setDark(false);
  //       }
  //     });
  //   if (
  //     window.matchMedia &&
  //     window.matchMedia("(prefers-color-scheme: dark)").matches
  //   ) {
  //     setDark(true);
  //   } else {
  //     setDark(false);
  //   }
  // });

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
