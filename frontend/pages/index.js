import { List, Row, Col, Layout, Menu, Avatar, Space, Typography } from "antd";
import Wrapper from "components/global/wrapper";
import dynamic from "next/dynamic";
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
const { Text } = Typography;

export default function Home() {
  const { loading, error, data } = useQuery(query);
  const sidebar = useStoreState((state) => state.site.sidebar);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error Occured</div>;

  var settings = data.site_settings;
  var articles = data.articles;

  console.log(articles);

  return (
    <>
      <Head>
        <title>{obj.theme}</title>
      </Head>
      <Wrapper>
        <Row justify="center">
          <Col className="pd-20" xs={0} sm={0} md={0} lg={4} xl={4} xxl={5}>
            <Sider>
              <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={["sidebar-1-1"]}
              >
                <Menu.Item key="sidebar-1-1">Item 1</Menu.Item>
              </Menu>
            </Sider>
          </Col>
          <Col xs={24} sm={24} md={22} lg={16} xl={16} xxl={14}>
            <List
              itemLayout="vertical"
              dataSource={articles}
              renderItem={(item) => (
                <List.Item
                  extra={
                    <img
                      width={272}
                      className="o-fit-cover"
                      alt="logo"
                      src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                  }
                  actions={[
                    <Space>
                      <Avatar />
                      <Text>
                        {item.users_to_articles.length > 1
                          ? item.users_to_articles.map((mapped, index) => {
                              if (index + 1 < item.users_to_articles.length) {
                                return mapped.authors.username + " and ";
                              } else {
                                return mapped.authors.username;
                              }
                            })
                          : item.users_to_articles.authors.username}
                      </Text>
                    </Space>,
                  ]}
                >
                  <List.Item.Meta
                    title={item.title}
                    description={item.excerpt}
                  />
                </List.Item>
              )}
            />
          </Col>
          <Col className="pd-20" xs={0} sm={0} md={0} lg={4} xl={4} xxl={5}>
            <Sider>
              <Menu
                theme="light"
                defaultSelectedKeys={["sidebar-2-1"]}
                mode="inline"
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
