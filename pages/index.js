import {
  List,
  Row,
  Col,
  Button,
  Tooltip,
  Divider,
  message,
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
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useStoreActions } from "easy-peasy";
import InfiniteScroll from "react-infinite-scroller";
import {
  insertBookmarkQuery,
  getArticlesQuery,
  deleteBookmarkQuery,
} from "components/home/queries";
import withSession from "lib/session";
import Reactions from "components/global/reactions/reacts";
import ProgressiveImage from "react-progressive-graceful-image";
import { initializeApollo } from "lib/apolloClient";

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
  const [user, setUser] = useState(null);
  var settings;
  var articles;
  var reactions;
  //
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
        id: user ? user.id : null,
      },
      onError: (err) => {
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
  // const router = useRouter();
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

  const [drawer, setDrawer] = useState(false);
  const [type, setType] = useState("");
  const [sheetData, setSheetData] = useState([]);
  //
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
          </Button>,
        ]}
      />
    );
  }

  //
  //
  //
  //
  //

  useEffect(() => {
    fetch("/api/getUser").then((res) =>
      res.json().then((result) => {
        console.log(result);
        if (result.loggedIn) {
          setUser(result.user);
        } else {
          setUser(null);
        }
      })
    );
  }, []);

  useEffect(() => {
    if (data) {
      settings = data.site_settings;
      articles = data.articles;
      reactions = data.reactions;
    }
  }, [data]);

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
        variables: { articleId: objecto.id, id: user.id },
      });
    } else {
      deleteBookmark({
        variables: { articleId: objecto.id, id: user.id },
      });
    }
    refetch();
  };

  //
  //
  //
  //
  //

  return (
    <>
      <Wrapper
        user={user ? user : null}
        seo={{
          title: "Tech To Rehab",
          description: "The Open Source Collaboration Platform",
        }}
      >
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
            <div className="wd-100-pc mt-30">
              <Title level={4} className="">
                News Feed
              </Title>
              <Divider />
            </div>
            {loading || !data ? (
              <>
                <Skeleton
                  avatar
                  className="mt-10 mb-30"
                  avatar
                  title
                  paragraph={{ rows: 1 }}
                  active
                  round
                />
                <Skeleton
                  avatar
                  className="mg-y-30"
                  avatar
                  title
                  paragraph={{ rows: 1 }}
                  active
                  round
                />
              </>
            ) : (
              <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                hasMore={
                  data
                    ? data.articles.length ===
                      data.articles_aggregate.aggregate.count
                      ? false
                      : true
                    : null
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
                      round
                      key="sk-2"
                    />

                    <Skeleton
                      className="mt-20"
                      avatar
                      title
                      paragraph={{ rows: 1 }}
                      active
                      round
                      key="sk-2"
                    />

                    <Skeleton
                      className="mt-20"
                      avatar
                      title
                      paragraph={{ rows: 1 }}
                      active
                      round
                      key="sk-2"
                    />

                    <Skeleton
                      className="mt-20"
                      avatar
                      title
                      paragraph={{ rows: 1 }}
                      active
                      round
                      key="sk-2"
                    />
                  </>
                }
                useWindow={true}
              >
                <List
                  itemLayout="vertical"
                  dataSource={data ? data.articles : null}
                  renderItem={(item) => (
                    <List.Item
                      key={item.id}
                      className="article-list-item"
                      extra={
                        <ProgressiveImage
                          src={
                            "https://ik.imagekit.io/ttr/tr:n-med/" +
                            item.featured_image
                          }
                          placeholder={
                            "https://ik.imagekit.io/ttr/tr:n-med_placeholder/" +
                            item.featured_image +
                            "?tr=h-100,w-100,bl-10,f-webp"
                          }
                          delay={300}
                          threshold={1}
                        >
                          {(src) => (
                            <img
                              src={src}
                              className="list-image"
                              alt="an alternative text"
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
                                user &&
                                item.bookmarks_aggregate.aggregate.count == 1
                                  ? "ri-bookmark-fill fs-20 " +
                                    "ri-lg va-minus-6"
                                  : "ri-bookmark-line fs-20 " +
                                    "ri-lg va-minus-6"
                              }
                              onClick={() =>
                                user && user.id
                                  ? addBookmark(
                                      item,
                                      item.bookmarks_aggregate.aggregate.count
                                    )
                                  : setLoginModal(true)
                              }
                              style={{ color: "rgba(86, 85, 85, 0.65)" }}
                            >
                              {console.log(item)}
                            </i>
                          </a>
                        </Tooltip>,
                        item.reactions_to_articles.length > 0 ? (
                          <a>
                            <Reactions
                              data={item.reactions_to_articles}
                              reactions={data.reactions}
                            />
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
                            <Paragraph className="mr-20 article-list-item-title line-clamp">
                              {item.title}
                            </Paragraph>
                          </a>
                        }
                        description={
                          <Paragraph className="mr-20 line-clamp" key={item.id}>
                            {item.excerpt}
                          </Paragraph>
                        }
                      />
                    </List.Item>
                  )}
                />
              </InfiniteScroll>
            )}

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
                          src={
                            mapped.authors.profile_picture +
                            "?tr=w-50,h-50,f-webp"
                          }
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
                        {data.reactions.map((mapped) => {
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
                                            mapped2.user.profile_picture
                                              ? "https://ik.imagekit.io/ttr/n-avatar" +
                                                mapped2.user.profile_picture
                                              : null
                                          }
                                        />
                                        <a
                                          href={`/user/${mapped2.user.username}`}
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

// export const getServerSideProps = withSession(async function ({ req, res }) {
//   const user = req.session.get(["session"]);
//   return {
//     props: {
//       user: user ? user : null,
//     },
//   };
// });

export async function getStaticProps(ctx) {
  const apolloClient = initializeApollo();

  return fetch("https://techtorehab/api/getUser")
    .then((res) =>
      res.json().then(async (result) => {
        if (result.loggedIn) {
          await apolloClient.query({
            query: getArticlesQuery,
            variables: {
              offset: 0,
              limit: 5,
              id: result.user.id,
            },
          });
          return {
            props: {
              initialApolloState: apolloClient.cache.extract(),
            },
            revalidate: 1,
          };
        } else {
          await apolloClient.query({
            query: getArticlesQuery,
            variables: {
              offset: 0,
              limit: 5,
              id: null,
            },
          });

          return {
            props: {
              initialApolloState: apolloClient.cache.extract(),
            },
            revalidate: 1,
          };
        }
      })
    )
    .catch((err) => {
      await apolloClient.query({
        query: getArticlesQuery,
        variables: {
          offset: 0,
          limit: 5,
          id: null,
        },
      });
      return {
        props: {
          initialApolloState: apolloClient.cache.extract(),
        },
        revalidate: 1,
      };
    });
}
