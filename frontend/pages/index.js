import {
  List,
  Row,
  Col,
  Layout,
  Menu,
  Avatar,
  Space,
  Typography,
  Modal,
} from "antd";
import Wrapper from "components/global/wrapper";
import { useState } from "react";
import obj from "../config.json";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { initializeApollo } from "lib/apolloClient";
import Head from "next/head";
import { useStoreState, useStoreActions } from "easy-peasy";

const query = gql`
  query MyQuery {
    articles {
      title
      excerpt
      content
      article_category {
        title
        slug
      }
      article_topic {
        title
        slug
      }
      users_to_articles {
        authors {
          username
        }
      }
    }
    site_settings {
      setting_name
      setting_value
    }
  }
`;

const { Sider } = Layout;
const { Text, Paragraph } = Typography;

export default function Home() {
  const { loading, error, data } = useQuery(query);
  const sidebar = useStoreState((state) => state.site.sidebar);
  const [drawer, setDrawer] = useState(false);
  const [type, setType] = useState("");
  const [sheetData, setSheetData] = useState([]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error Occured</div>;

  var settings = data.site_settings;
  var articles = data.articles;

  return (
    <>
      <Head>
        <title>{obj.theme}</title>
      </Head>
      <Wrapper>
        <Row justify="center">
          <Col className="pd-10" xs={0} sm={0} md={0} lg={0} xl={5} xxl={5}>
            <Sider theme="light">
              <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={["sidebar-1-1"]}
              >
                <Menu.Item key="sidebar-1-1">Option 1</Menu.Item>
                <Menu.Item key="sidebar-1-2">Option 2</Menu.Item>
                <Menu.Item key="sidebar-1-3">Option 3</Menu.Item>
                <Menu.Item key="sidebar-1-4">Option 4</Menu.Item>
              </Menu>
            </Sider>
          </Col>
          <Col xs={24} sm={24} md={22} lg={20} xl={14} xxl={12}>
            <List
              itemLayout="vertical"
              dataSource={articles}
              renderItem={(item) => (
                <List.Item
                  className="article-list-item"
                  extra={
                    <img
                      width={272}
                      className="o-fit-cover"
                      alt="logo"
                      src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                  }
                  actions={[
                    <a
                      onClick={() => {
                        return (
                          setType("Authors"),
                          setDrawer(true),
                          setSheetData(item.users_to_articles)
                        );
                      }}
                    >
                      <Text
                        className="t-transform-cpt fs-12"
                        style={{
                          border: "1px solid #cecece",
                          borderRadius: 25,
                          padding: "5px 10px",
                        }}
                      >
                        {item.users_to_articles.length > 1
                          ? " By " +
                            item.users_to_articles[0].authors.username +
                            " + " +
                            (item.users_to_articles.length - 1) +
                            " More "
                          : " By " + item.users_to_articles[0].authors.username}
                      </Text>
                    </a>,
                  ]}
                >
                  <Modal
                    title={type}
                    visible={drawer}
                    bodyStyle={{ padding: "15px 15px", paddingBottom: "45px" }}
                    closable
                    onCancel={() => setDrawer(false)}
                    footer={null}
                  >
                    <div className="d-flex flex-column">
                      {sheetData.length > 0 ? (
                        sheetData.map((mapped) => (
                          <Space className="mt-10">
                            <Avatar />
                            <Text className="t-transform-cpt">
                              {mapped.authors.username}
                            </Text>
                          </Space>
                        ))
                      ) : (
                        <p>Nulled</p>
                      )}
                    </div>
                  </Modal>
                  <List.Item.Meta
                    title={
                      <Paragraph
                        ellipsis={{ rows: 2 }}
                        className="mr-20 article-list-item-title"
                      >
                        {item.title}
                      </Paragraph>
                    }
                    description={
                      <Paragraph className="mr-20" ellipsis={{ rows: 2 }}>
                        {item.excerpt}
                      </Paragraph>
                    }
                  />
                </List.Item>
              )}
            />
          </Col>
          <Col className="pd-10" xs={0} sm={0} md={0} lg={0} xl={5} xxl={5}>
            <Sider className="ml-auto">
              <Menu
                theme="light"
                defaultSelectedKeys={["sidebar-2-1"]}
                mode="inline"
                style={{ height: "100vh", position: "sticky", top: 10 }}
              >
                <Menu.Item key="sidebar-2-1">Item 1</Menu.Item>
              </Menu>
            </Sider>
          </Col>
        </Row>
      </Wrapper>
    </>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: query,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    unstable_revalidate: 1,
  };
}
