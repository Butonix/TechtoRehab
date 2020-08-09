import {
  List,
  Row,
  Col,
  Button,
  Tooltip,
  Divider,
  message,
  Popover,
  Card,
  Tabs,
  Badge,
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
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { useStoreActions } from "easy-peasy";
import InfiniteScroll from "react-infinite-scroller";
import {
  insertBookmarkQuery,
  getArticlesQuery,
  deleteBookmarkQuery,
  getFeaturedArticlesQuery,
  getEditorspicksQuery,
} from "components/home/queries";
import withSession from "lib/session";
import Reactions from "components/global/reactions/reacts";
import ProgressiveImage from "react-progressive-graceful-image";
import Moment from "react-moment";
import Link from "next/link";
import styled from "styled-components";
import EditorsPick from "components/global/badges/editors_pick";
import Featured from "components/global/badges/featured";
import Feed from "components/global/badges/feed";
//
//
//
//
//
//
//

const Widget = styled.div`
  margin: 10px 10px;

  padding: 15px 20px;
  border: 1px solid rgba(0, 0, 0, 0.06);

  .header {
    font-size: 18px;
    align-items: center;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
    padding: 5px 0px;
    margin-left: 10px;
    display: flex;
    flex-flow: column;
    justify-content: center;
  }

  .content {
    padding: 10px;
    margin-top: 10px;
    font-size: 14px;
  }
`;

const WidgetContainer = styled.div`
  height: 100vh;
  position: sticky;
  top: 10px;
  padding: 10px;
`;

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
    onCompleted: (data) => {
      if (data.insert_articles_and_bookmarks_one.bookmarkedArticle.featured) {
        getFeaturedRefetch();
      } else {
        refetch();
      }
      message.success("Added To Bookmarks");
    },
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
    onCompleted: (data) => {
      if (
        data.delete_articles_and_bookmarks.returning[0].bookmarkedArticle
          .featured
      ) {
        getFeaturedRefetch();
      } else {
        refetch();
      }
      refetch();
      message.success("Deleted from Bookmarks");
    },
    onError: () => message.error("An Error Occured. Try Again Later"),
    errorPolicy: "all",
  });

  const {
    data: getFeaturedData,
    loading: getFeaturedLoading,
    refetch: getFeaturedRefetch,
  } = useQuery(getFeaturedArticlesQuery);

  const {
    loading: getEditorspicksLoading,
    data: getEditorspicksData,
  } = useQuery(getEditorspicksQuery);

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

  const addBookmark = (objecto, count, type) => {
    if (!count) {
      insertBookmark({
        variables: { articleId: objecto.id, id: props.user.id },
      });
    } else {
      deleteBookmark({
        variables: { articleId: objecto.id, id: props.user.id },
      });
    }
  };

  //
  //
  //
  //
  //

  return (
    <>
      <Wrapper
        user={props.user ? props.user : null}
        seo={{
          title: "Tech To Rehab",
          description: "The Open Source Collaboration Platform",
          type: "website",
        }}
        route="home"
      >
        <Row>
          <Col xs={0} sm={0} md={0} lg={0} xl={4} xxl={3} className="pd-r-20">
            <Text
              className="fs-16 mg-20"
              style={{
                display: "block",
                position: "relative",
              }}
              strong
            >
              Navigation
            </Text>
            <Menu
              theme="light"
              mode="vertical-left"
              style={{ height: "100vh", position: "sticky", top: 10 }}
            >
              <Menu.Item
                key="home"
                icon={
                  <i className="ri-arrow-go-back-line fs-22 va-minus-6 mr-10"></i>
                }
                onClick={() => (location.href = "/")}
              >
                <Text
                  style={{
                    color: "inherit",
                  }}
                >
                  Home
                </Text>
              </Menu.Item>
              <Menu.Item
                key="categories"
                onClick={() => (location.href = "/categories")}
                icon={<i className="ri-apps-2-fill fs-22 va-minus-6 mr-10"></i>}
              >
                <Text
                  style={{
                    color: "inherit",
                  }}
                >
                  Categories
                </Text>
              </Menu.Item>
            </Menu>
          </Col>

          <Col
            xs={24}
            sm={24}
            md={22}
            lg={16}
            xl={14}
            xxl={16}
            className="mg-x-auto pd-x-20"
          >
            {getFeaturedLoading || !getFeaturedData ? (
              <>
                <div className="wd-100-pc mt-30">
                  <Skeleton.Button
                    className="mt-10"
                    style={{
                      width: 120,
                    }}
                    active
                    round
                  />
                  <Divider />
                </div>
                <Row justify="space-between">
                  <Col xs={0} sm={0} md={11} lg={10} xl={11} xxl={8}>
                    <div className="wd-100pc featured-skeleton-button">
                      <Skeleton.Button className="mt-10" active round />
                      <Skeleton
                        className="mt-10"
                        title
                        paragraph={{ rows: 2 }}
                        active
                        round
                      />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={11} lg={13} xl={12} xxl={6}>
                    <Skeleton
                      className="mt-10 mb-30"
                      title={{
                        width: "100%",
                      }}
                      active
                      round
                      paragraph={{ rows: 2, width: "50%" }}
                    />
                    <Skeleton
                      className="mt-10 mb-30"
                      title={{
                        width: "100%",
                      }}
                      active
                      round
                      paragraph={{ rows: 2, width: "50%" }}
                    />

                    <Skeleton
                      className="mt-10 mb-30"
                      title={{
                        width: "100%",
                      }}
                      active
                      round
                      paragraph={{ rows: 2, width: "50%" }}
                    />
                  </Col>
                  <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={8}>
                    <div className="wd-100pc featured-skeleton-button">
                      <Skeleton.Button className="mt-10" active round />
                      <Skeleton
                        className="mt-10"
                        title
                        paragraph={{ rows: 3 }}
                        active
                        round
                      />
                    </div>
                  </Col>
                </Row>
              </>
            ) : getFeaturedData.articles.length < 5 ? null : (
              <>
                <div className="wd-100-pc mt-30">
                  <div className="d-flex">
                    <Title level={4} className="mt-5 mr-auto">
                      Featured
                    </Title>
                    <Featured />
                  </div>

                  <Divider />
                </div>
                <Row>
                  <Col xs={0} sm={0} md={11} lg={10} xl={10} xxl={8}>
                    <List size="large" itemLayout="vertical">
                      <List.Item
                        actions={[
                          <Popover
                            content={
                              <div>
                                {getFeaturedData.articles[0].users_to_articles.map(
                                  (author) => (
                                    <a
                                      href={`/user/${author.authors.username}`}
                                    >
                                      <p>
                                        <Text>{author.authors.username}</Text>
                                      </p>
                                    </a>
                                  )
                                )}
                              </div>
                            }
                            overlayStyle={{
                              textTransform: "capitalize",
                            }}
                            title={
                              getFeaturedData.articles[0].users_to_articles
                                .length > 1
                                ? "Authors"
                                : "Author"
                            }
                          >
                            <Text
                              className="t-transform-cpt"
                              style={{
                                color: "rgba(0,0,0,.45)",
                                cursor: "pointer",
                              }}
                            >
                              {getFeaturedData.articles[0].users_to_articles
                                .length > 1
                                ? getFeaturedData.articles[0]
                                    .users_to_articles[0].authors.username +
                                  " + " +
                                  (getFeaturedData.articles[0].users_to_articles
                                    .length -
                                    1) +
                                  " More"
                                : getFeaturedData.articles[0]
                                    .users_to_articles[0].authors.username}
                            </Text>
                          </Popover>,
                          <Tooltip
                            title={
                              props.user &&
                              getFeaturedData.articles[0].bookmarks.find(
                                (elem) => elem.bookmarkUser.id == props.user.id
                              )
                                ? "Remove From Bookmarks"
                                : "Bookmark This"
                            }
                          >
                            <a>
                              <i
                                className={
                                  props.user &&
                                  getFeaturedData.articles[0].bookmarks.find(
                                    (elem) =>
                                      elem.bookmarkUser.id == props.user.id
                                  )
                                    ? "ri-bookmark-fill fs-20 " +
                                      "ri-lg va-minus-6"
                                    : "ri-bookmark-line fs-20 " +
                                      "ri-lg va-minus-6"
                                }
                                onClick={() =>
                                  props.user && props.user.id
                                    ? addBookmark(
                                        getFeaturedData.articles[0],
                                        getFeaturedData.articles[0].bookmarks.find(
                                          (elem) =>
                                            elem.bookmarkUser.id ==
                                            props.user.id
                                        ),
                                        "featured"
                                      )
                                    : setLoginModal(true)
                                }
                                style={{
                                  color: "rgba(86, 85, 85, 0.65)",
                                }}
                              ></i>
                            </a>
                          </Tooltip>,
                          getFeaturedData.articles[0].reactions_to_articles
                            .length > 0 ? (
                            <a>
                              <Reactions
                                data={
                                  getFeaturedData.articles[0]
                                    .reactions_to_articles
                                }
                                reactions={getFeaturedData.reactions}
                              />
                            </a>
                          ) : null,
                        ]}
                      >
                        <img
                          className="mb-20"
                          width="100%"
                          style={{
                            height: 250,
                          }}
                          src={
                            "https://ik.imagekit.io/ttr/tr:n-med/" +
                            getFeaturedData.articles[0].featured_image
                          }
                          alt={`Featured image for ${getFeaturedData.articles[0].title} on TechtoRehab`}
                        />
                        <List.Item.Meta
                          title={
                            <Link
                              href={`/article/${getFeaturedData.articles[0].article_category.slug}/${getFeaturedData.articles[0].article_topic.slug}/${getFeaturedData.articles[0].slug}`}
                            >
                              <a>
                                <Text className="fs-14 line-clamp">
                                  {getFeaturedData.articles[0].title}
                                </Text>
                              </a>
                            </Link>
                          }
                          description={
                            <Text className="fs-14 line-clamp">
                              {getFeaturedData.articles[0].excerpt}
                            </Text>
                          }
                        />
                      </List.Item>
                    </List>
                  </Col>

                  <Col xs={24} sm={24} md={13} lg={13} xl={14} xxl={8}>
                    <List itemLayout="vertical">
                      {getFeaturedData.articles.map((item, index) => {
                        if (
                          index > 0 &&
                          index < getFeaturedData.articles.length - 1
                        )
                          return (
                            <List.Item
                              key={item.title}
                              className="article-list-item"
                              extra={
                                <img
                                  className="mb-20 featured-list-image"
                                  src={
                                    "https://ik.imagekit.io/ttr/tr:n-med/" +
                                    item.featured_image
                                  }
                                  alt={`Featured image for ${item.title} on TechtoRehab`}
                                />
                              }
                              actions={[
                                <Popover
                                  content={item.users_to_articles.map(
                                    (author) => (
                                      <a
                                        href={`/user/${author.authors.username}`}
                                      >
                                        <p>
                                          <Text>{author.authors.username}</Text>
                                        </p>
                                      </a>
                                    )
                                  )}
                                  overlayStyle={{
                                    textTransform: "capitalize",
                                  }}
                                  title={
                                    item.users_to_articles.length > 1
                                      ? "Authors"
                                      : "Author"
                                  }
                                >
                                  <Text
                                    className="t-transform-cpt"
                                    style={{
                                      color: "rgba(0,0,0,.45)",
                                      cursor: "pointer",
                                    }}
                                  >
                                    {item.users_to_articles.length > 1
                                      ? item.users_to_articles[0].authors
                                          .username +
                                        " + " +
                                        (item.users_to_articles.length - 1) +
                                        " More"
                                      : item.users_to_articles[0].authors
                                          .username}
                                  </Text>
                                </Popover>,
                                <Tooltip
                                  title={
                                    props.user &&
                                    item.bookmarks.find(
                                      (elem) =>
                                        elem.bookmarkUser.id == props.user.id
                                    )
                                      ? "Remove From Bookmarks"
                                      : "Bookmark This"
                                  }
                                >
                                  <a>
                                    <i
                                      className={
                                        props.user &&
                                        item.bookmarks.find(
                                          (elem) =>
                                            elem.bookmarkUser.id ==
                                            props.user.id
                                        )
                                          ? "ri-bookmark-fill fs-20 " +
                                            "ri-lg va-minus-6"
                                          : "ri-bookmark-line fs-20 " +
                                            "ri-lg va-minus-6"
                                      }
                                      onClick={() =>
                                        props.user && props.user.id
                                          ? addBookmark(
                                              item,
                                              item.bookmarks.find(
                                                (elem) =>
                                                  elem.bookmarkUser.id ==
                                                  props.user.id
                                              ),
                                              "featured"
                                            )
                                          : setLoginModal(true)
                                      }
                                      style={{
                                        color: "rgba(86, 85, 85, 0.65)",
                                      }}
                                    ></i>
                                  </a>
                                </Tooltip>,
                              ]}
                            >
                              <List.Item.Meta
                                title={
                                  <Link
                                    href={`/article/${item.article_category.slug}/${item.article_topic.slug}/${item.slug}`}
                                  >
                                    <a>
                                      <Text className="fs-14 line-clamp mr-20">
                                        {item.title}
                                      </Text>
                                    </a>
                                  </Link>
                                }
                                description={
                                  <Text className="fs-14 line-clamp mr-20">
                                    {item.excerpt}
                                  </Text>
                                }
                              />
                            </List.Item>
                          );
                      })}
                    </List>
                  </Col>

                  <Col
                    xs={0}
                    sm={0}
                    md={0}
                    lg={0}
                    xl={0}
                    xxl={8}
                    className="pd-l-5"
                  >
                    <List size="large" itemLayout="vertical">
                      <List.Item
                        actions={[
                          <Popover
                            content={getFeaturedData.articles[
                              getFeaturedData.articles.length - 1
                            ].users_to_articles.map((author) => (
                              <a href={`/user/${author.authors.username}`}>
                                <p>
                                  <Text>{author.authors.username}</Text>
                                </p>
                              </a>
                            ))}
                            overlayStyle={{
                              textTransform: "capitalize",
                            }}
                            title={
                              getFeaturedData.articles[
                                getFeaturedData.articles.length - 1
                              ].users_to_articles.length > 1
                                ? "Authors"
                                : "Author"
                            }
                          >
                            <Text
                              className="t-transform-cpt"
                              style={{
                                color: "rgba(0,0,0,.45)",
                                cursor: "pointer",
                              }}
                            >
                              {getFeaturedData.articles[
                                getFeaturedData.articles.length - 1
                              ].users_to_articles.length > 1
                                ? getFeaturedData.articles[
                                    getFeaturedData.articles.length - 1
                                  ].users_to_articles[0].authors.username +
                                  " + " +
                                  (getFeaturedData.articles[
                                    getFeaturedData.articles.length - 1
                                  ].users_to_articles.length -
                                    1) +
                                  " More"
                                : getFeaturedData.articles[
                                    getFeaturedData.articles.length - 1
                                  ].users_to_articles[0].authors.username}
                            </Text>
                          </Popover>,
                          <Tooltip
                            title={
                              props.user &&
                              getFeaturedData.articles[
                                getFeaturedData.articles.length - 1
                              ].bookmarks.find(
                                (elem) => elem.bookmarkUser.id == props.user.id
                              )
                                ? "Remove From Bookmarks"
                                : "Bookmark This"
                            }
                          >
                            <a>
                              <i
                                className={
                                  props.user &&
                                  getFeaturedData.articles[
                                    getFeaturedData.articles.length - 1
                                  ].bookmarks.find(
                                    (elem) =>
                                      elem.bookmarkUser.id == props.user.id
                                  )
                                    ? "ri-bookmark-fill fs-20 " +
                                      "ri-lg va-minus-6"
                                    : "ri-bookmark-line fs-20 " +
                                      "ri-lg va-minus-6"
                                }
                                onClick={() =>
                                  props.user && props.user.id
                                    ? addBookmark(
                                        getFeaturedData.articles[
                                          getFeaturedData.articles.length - 1
                                        ],
                                        getFeaturedData.articles[
                                          getFeaturedData.articles.length - 1
                                        ].bookmarks.find(
                                          (elem) =>
                                            elem.bookmarkUser.id ==
                                            props.user.id
                                        ),
                                        "featured"
                                      )
                                    : setLoginModal(true)
                                }
                                style={{
                                  color: "rgba(86, 85, 85, 0.65)",
                                }}
                              ></i>
                            </a>
                          </Tooltip>,
                          getFeaturedData.articles[
                            getFeaturedData.articles.length - 1
                          ].reactions_to_articles.length > 0 ? (
                            <a>
                              <Reactions
                                data={
                                  getFeaturedData.articles[
                                    getFeaturedData.articles.length - 1
                                  ].reactions_to_articles
                                }
                                reactions={getFeaturedData.reactions}
                              />
                            </a>
                          ) : null,
                        ]}
                      >
                        <img
                          className="mb-20"
                          width="100%"
                          src={
                            "https://ik.imagekit.io/ttr/tr:n-med/" +
                            getFeaturedData.articles[
                              getFeaturedData.articles.length - 1
                            ].featured_image
                          }
                          alt={`Featured image for ${
                            getFeaturedData.articles[
                              getFeaturedData.articles.length - 1
                            ].title
                          } on TechtoRehab`}
                          style={{
                            height: 250,
                          }}
                        />
                        <List.Item.Meta
                          title={
                            <Link
                              href={`/article/${
                                getFeaturedData.articles[
                                  getFeaturedData.articles.length - 1
                                ].article_category.slug
                              }/${
                                getFeaturedData.articles[
                                  getFeaturedData.articles.length - 1
                                ].article_topic.slug
                              }/${
                                getFeaturedData.articles[
                                  getFeaturedData.articles.length - 1
                                ].slug
                              }`}
                            >
                              <a>
                                <Text className="fs-14 line-clamp">
                                  {
                                    getFeaturedData.articles[
                                      getFeaturedData.articles.length - 1
                                    ].title
                                  }
                                </Text>
                              </a>
                            </Link>
                          }
                          description={
                            <Text className="fs-14 line-clamp">
                              {
                                getFeaturedData.articles[
                                  getFeaturedData.articles.length - 1
                                ].excerpt
                              }
                            </Text>
                          }
                        />
                      </List.Item>
                    </List>
                  </Col>
                </Row>
              </>
            )}
            <div className="wd-100-pc mt-30">
              <div className="d-flex">
                <Title level={4} className="mt-5 mr-auto">
                  News Feed
                </Title>
                <Feed
                  style={{
                    marginTop: 3,
                  }}
                />
              </div>

              <Divider />
            </div>
            {loading ? (
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
                  data.articles.length > 0
                    ? data.articles_aggregate.aggregate.count >
                      data.articles.length
                      ? true
                      : false
                    : false
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
                  dataSource={
                    data ? (data.articles.length > 0 ? data.articles : []) : []
                  }
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
                            item.featured_image
                          }
                          delay={300}
                          threshold={1}
                        >
                          {(src) => (
                            <img
                              src={src}
                              className="list-image"
                              alt={`Featured image for ${item.title} on TechtoRehab`}
                            />
                          )}
                        </ProgressiveImage>
                      }
                      actions={[
                        item.updated_at == item.created_at ? (
                          <div>
                            <Moment fromNow>{item.created_at}</Moment>
                          </div>
                        ) : (
                          <div>
                            <Moment fromNow>{item.updated_at}</Moment>
                          </div>
                        ),

                        <Popover
                          content={item.users_to_articles.map((author) => (
                            <a href={`/user/${author.authors.username}`}>
                              <p>
                                <Text>{author.authors.username}</Text>
                              </p>
                            </a>
                          ))}
                          overlayStyle={{
                            textTransform: "capitalize",
                          }}
                          title={
                            item.users_to_articles.length > 1
                              ? "Authors"
                              : "Author"
                          }
                        >
                          <Text
                            className="t-transform-cpt"
                            style={{
                              color: "rgba(0,0,0,0.45)",
                              cursor: "pointer",
                            }}
                          >
                            {item.users_to_articles.length > 1
                              ? item.users_to_articles[0].authors.username +
                                " + " +
                                (item.users_to_articles.length - 1) +
                                " More "
                              : item.users_to_articles[0].authors.username}
                          </Text>
                        </Popover>,
                        <Tooltip
                          title={
                            props.user &&
                            item.bookmarks.find(
                              (elem) => elem.bookmarkUser.id == props.user.id
                            )
                              ? "Remove From Bookmarks"
                              : "Bookmark This"
                          }
                        >
                          <a>
                            <i
                              className={
                                props.user &&
                                item.bookmarks.find(
                                  (elem) =>
                                    elem.bookmarkUser.id == props.user.id
                                )
                                  ? "ri-bookmark-fill fs-20 " +
                                    "ri-lg va-minus-6"
                                  : "ri-bookmark-line fs-20 " +
                                    "ri-lg va-minus-6"
                              }
                              onClick={() =>
                                props.user && props.user.id
                                  ? addBookmark(
                                      item,
                                      item.bookmarks.find(
                                        (elem) =>
                                          elem.bookmarkUser.id == props.user.id
                                      )
                                    )
                                  : setLoginModal(true)
                              }
                              style={{ color: "rgba(86, 85, 85, 0.65)" }}
                            ></i>
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
          </Col>
          <Col className="pd-l-20" xs={0} sm={0} md={0} lg={8} xl={6} xxl={5}>
            <WidgetContainer>
              <Widget>
                <div className="header">
                  <EditorsPick />
                  Editor's Choice
                </div>
                <Divider />
                <div className="content">
                  {getEditorspicksLoading ? (
                    <>
                      <Skeleton
                        className=""
                        active
                        round
                        paragraph={false}
                        title
                        avatar={{ shape: "circle" }}
                      />

                      <Skeleton
                        className="mt-30"
                        active
                        round
                        paragraph={false}
                        title
                        avatar={{ shape: "circle" }}
                      />

                      <Skeleton
                        className="mt-30"
                        active
                        round
                        paragraph={false}
                        title
                        avatar={{ shape: "circle" }}
                      />

                      <Skeleton
                        className="mt-30"
                        active
                        round
                        paragraph={false}
                        title
                        avatar={{ shape: "circle" }}
                      />

                      <Skeleton
                        className="mt-30"
                        active
                        round
                        paragraph={false}
                        title
                        avatar={{ shape: "circle" }}
                      />
                    </>
                  ) : (
                    <List
                      itemLayout="vertical"
                      dataSource={
                        getEditorspicksData ? getEditorspicksData.articles : []
                      }
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <Avatar
                                size={45}
                                src={
                                  "https://ik.imagekit.io/ttr/tr:n-avatar/" +
                                  item.featured_image
                                }
                              />
                            }
                            title={
                              <a
                                href={`/article/${item.article_category.slug}/${item.article_topic.slug}/${item.slug}`}
                              >
                                <Text>
                                  <p className="fs-14 line-clamp-3 t-transform-cpt">
                                    {item.title.toLowerCase()}
                                  </p>
                                </Text>
                              </a>
                            }
                          />
                        </List.Item>
                      )}
                    ></List>
                  )}
                </div>
              </Widget>
            </WidgetContainer>
          </Col>
        </Row>
      </Wrapper>
    </>
  );
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("session");
  return {
    props: {
      user: user ? user : null,
    },
  };
});
