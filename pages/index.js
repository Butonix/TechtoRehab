import {
  List,
  Row,
  Col,
  Button,
  Tooltip,
  Divider,
  message,
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
import { useQuery, useMutation } from "@apollo/client";
import { useStoreActions } from "easy-peasy";
import InfiniteScroll from "react-infinite-scroller";
import {
  insertBookmarkQuery,
  getArticlesQuery,
  deleteBookmarkQuery,
  getFeaturedArticlesQuery,
} from "components/home/queries";
import withSession from "lib/session";
import Reactions from "components/global/reactions/reacts";
import ProgressiveImage from "react-progressive-graceful-image";
import Moment from "react-moment";
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

  const { data: getFeaturedData, loading: getFeaturedLoading } = useQuery(
    getFeaturedArticlesQuery
  );

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

  const addBookmark = (objecto, count) => {
    if (!count) {
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
          <Col xs={0} sm={0} md={0} lg={0} xl={5} xxl={4} className="pd-r-20">
            <Menu
              theme="light"
              className="mg-auto pd-y-20"
              mode="vertical-left"
              style={{ height: "100vh", position: "sticky", top: 10 }}
            >
              <Menu.Item
                key="home"
                icon={
                  <i class="ri-arrow-go-back-line fs-22 va-minus-6 mr-10"></i>
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
                icon={<i class="ri-apps-2-fill fs-22 va-minus-6 mr-10"></i>}
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
            lg={20}
            xl={14}
            xxl={16}
            className="mg-x-auto pd-x-20"
          >
            <div className="wd-100-pc mt-30">
              <Title level={4} className="">
                Featured
              </Title>
              <Divider />
            </div>
            {getFeaturedLoading || !getFeaturedData ? (
              <Row justify="space-between">
                <Col xs={0} sm={0} md={7} lg={7} xl={7} xxl={8}>
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
                <Col xs={24} sm={24} md={7} lg={7} xl={7} xxl={6}>
                  <Skeleton
                    className="mt-10 mb-30"
                    title={{
                      width: "100%",
                    }}
                    active
                    round
                    paragraph={{ rows: 1, width: "50%" }}
                  />
                  <Skeleton
                    className="mt-10 mb-30"
                    title={{
                      width: "100%",
                    }}
                    active
                    round
                    paragraph={{ rows: 1, width: "50%" }}
                  />
                </Col>
                <Col xs={0} sm={0} md={7} lg={7} xl={7} xxl={8}>
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
            ) : getFeaturedData.articles.length < 1 ? null : (
              <Row>
                <Col xs={0} sm={0} md={11} lg={10} xl={10} xxl={8}>
                  <List size="large" itemLayout="vertical">
                    <List.Item>
                      <img
                        className="mb-20"
                        width="100%"
                        style={{
                          maxHeight: 150,
                        }}
                        src={
                          "https://ik.imagekit.io/ttr/tr:n-med/" +
                          getFeaturedData.articles[0].featured_image
                        }
                      />
                      <List.Item.Meta
                        title={
                          <Text className="fs-14 line-clamp">
                            {getFeaturedData.articles[0].title}
                          </Text>
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
                      return (
                        <List.Item
                          className="article-list-item"
                          extra={
                            <img
                              className="mb-20 featured-list-image"
                              src={
                                "https://ik.imagekit.io/ttr/tr:n-med/" +
                                item.featured_image
                              }
                            />
                          }
                          actions={[<a>Hello</a>]}
                        >
                          <List.Item.Meta
                            title={
                              <Text className="fs-14 line-clamp mr-20">
                                {item.title}
                              </Text>
                            }
                          />
                        </List.Item>
                      );
                    })}
                  </List>
                </Col>

                <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={7}>
                  <List size="large" itemLayout="vertical">
                    <List.Item>
                      <img
                        className="mb-20"
                        width="100%"
                        src={
                          "https://ik.imagekit.io/ttr/tr:n-med/" +
                          getFeaturedData.articles[1].featured_image
                        }
                        style={{
                          maxHeight: 150,
                        }}
                      />
                      <List.Item.Meta
                        title={
                          <Text className="fs-14 line-clamp">
                            {getFeaturedData.articles[1].title}
                          </Text>
                        }
                        description={
                          <Text className="fs-14 line-clamp">
                            {getFeaturedData.articles[1].excerpt}
                          </Text>
                        }
                      />
                    </List.Item>
                  </List>
                </Col>
              </Row>
            )}
            <div className="wd-100-pc mt-30">
              <Title level={4} className="">
                News Feed
              </Title>
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
                {console.log(data.articles.length > 0)}
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
                        item.updated_at == item.created_at ? (
                          <div>
                            <Moment fromNow>{item.created_at}</Moment>
                          </div>
                        ) : (
                          <div>
                            <Moment fromNow>{item.updated_at}</Moment>
                          </div>
                        ),
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
                      <div className="d-flex">
                        {/* <Badge
                          className="mr-20"
                          status="processing"
                          color="geekblue"
                          text={
                            <Text
                              className=""
                              style={{
                                color: "rgba(0,0,0,.45)",
                              }}
                            >
                              Featured
                            </Text>
                          }
                        /> */}
                        {/* <Text
                          className=""
                          style={{
                            color: "rgba(0,0,0,.45)",
                          }}
                        >
                          Based On Your Choices
                        </Text> */}
                      </div>
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
                            mapped.authors.profile_picture.includes("google") ||
                            mapped.authors.profile_picture.includes(
                              "https://platform-lookaside.fbsbx.com/"
                            )
                              ? mapped.authors.profile_picture
                              : "https://ik.imagekit.io/ttr/tr:n-avatar/" +
                                mapped.authors.profile_picture
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
                                              ? mapped2.user.profile_picture.includes(
                                                  "ik.imagekit.io"
                                                )
                                                ? "https://ik.imagekit.io/ttr/n-avatar" +
                                                  mapped2.user.profile_picture
                                                : mapped2.user.profile_picture
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

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("session");
  return {
    props: {
      user: user ? user : null,
    },
  };
});
