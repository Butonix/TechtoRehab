import {
  List,
  Row,
  Col,
  Button,
  Tooltip,
  message,
  Layout,
  Result,
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
import { useQuery, useMutation } from "@apollo/react-hooks";
import { initializeApollo } from "lib/apolloClient";
import Head from "next/head";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useRouter } from "next/router";

const query = gql`
  query MyQuery {
    articles(order_by: { updated_at: desc }) {
      id
      title
      excerpt
      content
      bookmark
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

const updateBookmarkQuery = gql`
  mutation update($id: uuid!, $bookmark: Boolean!) {
    update_articles(
      where: { id: { _eq: $id } }
      _set: { bookmark: $bookmark }
    ) {
      affected_rows
    }
  }
`;

const { Sider } = Layout;
const { Text, Paragraph } = Typography;

export default function Home() {
  const { loading, error, data } = useQuery(query, {
    onError: () => message.error("An Error Occurred. Try Again Later"),
    errorPolicy: "all",
  });
  const router = useRouter();
  const [updateBookmark] = useMutation(updateBookmarkQuery, {
    onCompleted: () => message.success("Bookmarks Updated"),
    onError: () => message.error("An Error Occured. Try Again Later"),
    errorPolicy: "all",
  });
  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <Result
        status="error"
        title="Error Fetching Data"
        subTitle="Please try again in a few minutes"
        style={{ margin: "10%" }}
        extra={[
          <Button type="primary" onClick={() => router.reload()}>
            Reload Page
          </Button>,
          <Button type="link" onClick={() => router.reload()}>
            Contact Support
          </Button>,
        ]}
      />
    );

  var settings = data.site_settings;
  var articles = data.articles;
  const sidebar = useStoreState((state) => state.site.sidebar);
  const [drawer, setDrawer] = useState(false);
  const [type, setType] = useState("");
  const [sheetData, setSheetData] = useState([]);
  const [articlesData, setArticlesData] = useState(articles);

  const addBookmark = (objecto) => {
    setArticlesData(
      articlesData.map((mapped) => {
        if (mapped === objecto) {
          mapped = { ...mapped, bookmark: !mapped.bookmark };
        }
        return mapped;
      })
    );

    updateBookmark({
      variables: { id: objecto.id, bookmark: !objecto.bookmark },
    });
  };

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
                style={{ height: "100vh", position: "sticky", top: 10 }}
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
              dataSource={articlesData}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
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

                    <Tooltip
                      title={
                        item.bookmark
                          ? "Remove From Bookmarks"
                          : "Bookmark This"
                      }
                    >
                      <a>
                        <i
                          className={
                            item.bookmark
                              ? "ri-bookmark-fill " + "ri-lg va-minus-6"
                              : "ri-bookmark-line " + "ri-lg va-minus-6"
                          }
                          onClick={() => addBookmark(item)}
                          style={{ color: "rgba(86, 85, 85, 0.65)" }}
                        ></i>
                      </a>
                    </Tooltip>,
                  ]}
                >
                  <Modal
                    title={type}
                    visible={drawer}
                    bodyStyle={{
                      padding: "15px 15px",
                      paddingBottom: "45px",
                      paddingTop: 5,
                    }}
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
                      <a>
                        <Paragraph
                          ellipsis={{ rows: 2 }}
                          className="mr-20 article-list-item-title"
                        >
                          {item.title}
                        </Paragraph>
                      </a>
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
