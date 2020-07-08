import {
  List,
  Row,
  Col,
  Button,
  Tooltip,
  message,
  Select,
  Tabs,
  Result,
  Menu,
  Avatar,
  Skeleton,
  Space,
  Typography,
  Modal,
} from "antd";
import Wrapper from "components/global/wrapper";
import { useState } from "react";
import obj from "../config.json";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { initializeApollo } from "lib/apolloClient";
import Head from "next/head";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroller";
import {
  insertBookmarkQuery,
  getArticlesQuery,
  deleteBookmarkQuery,
} from "components/home/queries";
import { Reactions } from "components/home/sub/reactions-holder";
import withSession from "lib/session";
import ProgressiveImage from "react-progressive-image";

//
//
//
//
//
//
//

const { Text, Paragraph, Title } = Typography;
//
//
//
//
//
//
//
export default function Home(props) {
  //
  //
  //
  const setLoginModal = useStoreActions(
    (actions) => actions.site.setLoginModal
  );
  const { loading, error, data, fetchMore, refetch } = useQuery(
    getArticlesQuery,
    {
      variables: {
        offset: 0,
        limit: 5,
        id: props.user ? props.user.id : null,
      },
      onError: () => {
        return (
          <Result
            status="error"
            title="Error Fetching Data"
            subTitle="Please try again in a few minutes"
            icon={<img src="/500.svg" />}
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
      },
    }
  );

  //
  //
  //
  const router = useRouter();
  //
  //
  //
  const [insertBookmark] = useMutation(insertBookmarkQuery, {
    onCompleted: () => message.success("Added To Bookmarks"),
    onError: () => message.error("An Error Occured. Try Again Later"),
    errorPolicy: "all",
  });

  //
  //
  //
  //
  //
  //

  const [deleteBookmark] = useMutation(deleteBookmarkQuery, {
    onCompleted: () => message.success("Deleted from Bookmarks"),
    onError: () => message.error("An Error Occured. Try Again Later"),
    errorPolicy: "all",
  });

  //
  //
  //
  //
  //
  //

  // const sidebar = useStoreState((state) => state.site.sidebar);
  const [drawer, setDrawer] = useState(false);
  const [type, setType] = useState("");
  const [sheetData, setSheetData] = useState([]);
  //
  //
  //
  //
  //
  //

  //
  //
  //
  //
  //

  // var settings = data.site_settings;
  var articles = data.articles;
  var reactions = data.reactions;

  //
  //
  //
  //
  //

  const getReactionCount = (name, array) => {
    var newarr = array.filter((filtered) => filtered.reaction.name == name);
    return newarr.length;
  };

  const getReactionTotal = (arra) => {
    return arra.length;
  };

  const addBookmark = (objecto, count) => {
    if (count == 0) {
      insertBookmark({
        variables: { articleId: objecto.id, id: props.user.id },
      });
    } else {
      deleteBookmark({
        variables: { articleId: objecto.id, id: props.user.id },
      });
    }
    refetch();
  };

  //
  //
  //
  //
  //
  if (error) {
    return (
      <Result
        status="error"
        title="Error Fetching Data"
        subTitle="Please try again in a few minutes"
        icon={<img src="/500.svg" />}
        style={{ margin: "10%" }}
        extra={[
          <Button type="primary" onClick={() => router.reload()}>
            Reload Page
          </Button>,
          <Button type="link" onClick={() => router.reload()}>
            Contact Support
            {console.log(error)}
          </Button>,
        ]}
      />
    );
  }
  return (
    <>
      <Head>
        <title>Title</title>
      </Head>
      <Wrapper user={props.user}>
        <Row>
          <Col xs={0} sm={0} md={0} lg={0} xl={5} xxl={4} className="pd-r-20">
            <Menu
              theme="light"
              defaultSelectedKeys={["sidebar-1-1"]}
              className="mg-auto pd-y-20"
              mode="vertical-left"
              style={{ height: "100vh", position: "sticky", top: 10 }}
            >
              <Menu.Item key="sidebar-1-1">Option 1</Menu.Item>
              <Menu.Item key="sidebar-1-2">Option 2</Menu.Item>
              <Menu.Item key="sidebar-1-3">Option 3</Menu.Item>
              <Menu.Item key="sidebar-1-4">Option 4</Menu.Item>
            </Menu>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={22}
            lg={20}
            xl={14}
            xxl={12}
            className="mg-x-auto pd-x-20"
          >
            <InfiniteScroll
              initialLoad={false}
              pageStart={0}
              hasMore={
                articles.length === data.articles_aggregate.aggregate.count
                  ? false
                  : true
              }
              loadMore={() =>
                fetchMore({
                  variables: {
                    offset: data.articles.length,
                  },
                  updateQuery: (previous, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return previous;
                    return Object.assign({}, previous, {
                      articles: [
                        ...previous.articles,
                        ...fetchMoreResult.articles,
                      ],
                    });
                  },
                })
              }
              loader={
                <>
                  <Skeleton
                    className="mt-20"
                    avatar
                    title
                    paragraph={{ rows: 1 }}
                    active
                    key="sk-1"
                  />
                  <Skeleton
                    className="mt-20"
                    avatar
                    title
                    paragraph={{ rows: 1 }}
                    active
                    key="sk-2"
                  />
                </>
              }
              useWindow={true}
            >
              <List
                itemLayout="vertical"
                header={
                  <div className="wd-100-pc d-flex">
                    <Title level={4} className="mt-10">
                      News Feed
                    </Title>
                    <Space className="ml-auto">
                      <Text>Filter by:</Text>
                      <Select
                        defaultValue={["1"]}
                        dropdownMatchSelectWidth={100}
                      >
                        <Select.Option key="1">Latest</Select.Option>
                        <Select.Option key="2">Trending</Select.Option>
                      </Select>
                    </Space>
                  </div>
                }
                dataSource={articles}
                renderItem={(item) => (
                  <List.Item
                    key={item.id}
                    className="article-list-item"
                    extra={
                      <ProgressiveImage
                        src={item.featured_image + ".webp"}
                        placeholder={item.featured_image + "-placeholder.webp"}
                      >
                        {(src) => (
                          <img
                            width={272}
                            height={160}
                            className="o-fit-cover"
                            src={src}
                            style={{
                              borderRadius: 5,
                            }}
                          />
                        )}
                      </ProgressiveImage>
                    }
                    actions={[
                      <a
                        onClick={() => {
                          setType("Authors");
                          setDrawer(true);
                          setSheetData(item.users_to_articles);
                        }}
                      >
                        <Text
                          className="t-transform-cpt fs-12 article-list-item-author"
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
                            : " By " +
                              item.users_to_articles[0].authors.username}
                        </Text>
                      </a>,
                      <Tooltip
                        title={
                          props.user &&
                          item.bookmarks_aggregate.aggregate.count == 1
                            ? "Remove From Bookmarks"
                            : "Bookmark This"
                        }
                      >
                        <a>
                          <i
                            className={
                              props.user &&
                              item.bookmarks_aggregate.aggregate.count == 1
                                ? "ri-bookmark-fill fs-20 " + "ri-lg va-minus-6"
                                : "ri-bookmark-line fs-20 " + "ri-lg va-minus-6"
                            }
                            onClick={() =>
                              props.user && props.user.id
                                ? addBookmark(
                                    item,
                                    item.bookmarks_aggregate.aggregate.count
                                  )
                                : setLoginModal(true)
                            }
                            style={{ color: "rgba(86, 85, 85, 0.65)" }}
                          ></i>
                        </a>
                      </Tooltip>,
                      item.reactions_to_articles.length > 0 ? (
                        <a
                          onClick={() => {
                            setType("Reactions");
                            setDrawer(true);
                            setSheetData(item.reactions_to_articles);
                          }}
                        >
                          <Reactions>
                            {reactions.map((reaction) => {
                              if (
                                item.reactions_to_articles.find(
                                  (elem) => elem.reaction.id == reaction.id
                                )
                              ) {
                                return (
                                  <div
                                    className="reaction-holder"
                                    key={reaction.name}
                                  >
                                    <div
                                      className="reaction fs-22"
                                      key={reaction.name}
                                    >
                                      <i
                                        className={`${reaction.code} va-middle`}
                                        style={reaction.gradient}
                                      ></i>
                                    </div>
                                  </div>
                                );
                              }
                            })}
                            <div className="reaction-total">
                              <Text className="lh-2-5 fs-16" strong>
                                {getReactionTotal(item.reactions_to_articles)}
                              </Text>
                            </div>
                          </Reactions>
                        </a>
                      ) : null,
                    ]}
                  >
                    <List.Item.Meta
                      key={item.id}
                      title={
                        <a
                          href={
                            "/article/" +
                            item.article_category.slug +
                            (item.article_topic
                              ? "/" + item.article_topic.slug
                              : "") +
                            "/" +
                            item.slug
                          }
                        >
                          <Paragraph
                            ellipsis={{ rows: 2 }}
                            className="mr-20 article-list-item-title"
                          >
                            {item.title}
                          </Paragraph>
                        </a>
                      }
                      description={
                        <Paragraph
                          className="mr-20"
                          ellipsis={{ rows: 2 }}
                          key={item.id}
                        >
                          {item.excerpt}
                        </Paragraph>
                      }
                    />
                  </List.Item>
                )}
              />
            </InfiniteScroll>
            {/**           */
            /**            */
            /**            */
            /**            */
            /**            */
            /** MODAL AREA */
            /**            */
            /**            */
            /**            */
            /**            */
            /**            */}
            <Modal
              title={type}
              visible={drawer}
              bodyStyle={{
                padding: "15px 15px",
                paddingBottom: "45px",
                paddingTop: 5,
                height: 300,
                overflowY: "auto",
              }}
              closable
              onCancel={() => {
                setDrawer(false);
              }}
              footer={null}
            >
              <div className="d-flex flex-column">
                {sheetData.length > 0 ? (
                  type == "Authors" ? (
                    sheetData.map((mapped, index) => (
                      <Space className="mt-20" key={index}>
                        <Avatar
                          src={mapped.authors.profile_picture + ".webp"}
                        />
                        <a href={`/user/${mapped.authors.username}`}>
                          <Text className="t-transform-cpt">
                            {mapped.authors.username}
                          </Text>
                        </a>
                      </Space>
                    ))
                  ) : (
                    <>
                      <Tabs>
                        {reactions.map((mapped) => {
                          sheetData.map((mapped2) => {
                            if (mapped2.reaction.name == mapped.name) {
                              return;
                            }
                          });
                          return (
                            <Tabs.TabPane
                              key={mapped.name}
                              tab={
                                <Reactions key={mapped.name}>
                                  <div className="reaction-holder">
                                    <div className="reaction">
                                      <i
                                        className={`${mapped.code} va-minus-4`}
                                        style={mapped.gradient}
                                      ></i>
                                    </div>
                                    <div className="reaction-count">
                                      <Text className="lh-2-5">
                                        {getReactionCount(
                                          mapped.name,
                                          sheetData
                                        )}
                                      </Text>
                                    </div>
                                  </div>
                                  <Text className="reaction-name">
                                    {mapped.name}
                                  </Text>
                                </Reactions>
                              }
                            >
                              <div className="d-flex flex-column">
                                {sheetData.map((mapped2, index) => {
                                  if (mapped2.reaction.name == mapped.name) {
                                    return (
                                      <Space
                                        className="mt-15"
                                        key={
                                          mapped2.reaction.name +
                                          mapped.name +
                                          index
                                        }
                                      >
                                        <Avatar
                                          size={35}
                                          src={
                                            mapped2.user.profile_picture +
                                            ".webp"
                                          }
                                        />
                                        <a
                                          href={`/user/${mapped2.authors.username}`}
                                        >
                                          <Text>{mapped2.user.username}</Text>
                                        </a>
                                      </Space>
                                    );
                                  }
                                })}
                              </div>
                            </Tabs.TabPane>
                          );
                        })}
                      </Tabs>
                    </>
                  )
                ) : (
                  <p>Nulled</p>
                )}
              </div>
            </Modal>
            {/**           */
            /**            */
            /**            */
            /**            */
            /**            */
            /** MODAL AREA */
            /**            */
            /**            */
            /**            */
            /**            */
            /**            */}
          </Col>
          <Col className="pd-l-20" xs={0} sm={0} md={0} lg={0} xl={5} xxl={4}>
            <Menu
              theme="light"
              defaultSelectedKeys={["sidebar-2-1"]}
              mode="vertical-right"
              className="pd-y-20"
              style={{
                height: "100vh",
                position: "sticky",
                top: 10,
              }}
            >
              <Menu.Item key="sidebar-2-1">Item 1</Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Wrapper>
    </>
  );
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get(["session"]);
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: getArticlesQuery,
    variables: {
      offset: 0,
      limit: 5,
      id: user ? user.id : null,
    },
  });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      user: user ? user : null,
    },
  };
});
