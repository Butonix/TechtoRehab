import {
  Form,
  Row,
  Col,
  Typography,
  Result,
  Input,
  Card,
  Tabs,
  Avatar,
  Skeleton,
  Drawer,
  List,
  Button,
  Space,
  message,
} from "antd";
import { useQuery, useMutation, gql, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

const getArticlesQuery = gql`
  query getArticles($offset: Int, $limit: Int, $featured: Boolean) {
    articles(
      offset: $offset
      limit: $limit
      where: { featured: { _eq: false } }
    ) {
      id
      title
      featured_image
      excerpt
      slug
      updated_at
      users_to_articles {
        authors {
          username
          profile_picture
        }
      }
      article_category {
        slug
        title
      }
      article_topic {
        slug
        title
      }

      comments {
        id
        replies {
          id
          commentId
          replies_to_reply {
            id
            replyId
          }
        }
      }
    }

    articles_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const setUnfeaturedQuery = gql`
  mutation setUnfeatured($id: uuid!) {
    update_articles(where: { id: { _eq: $id } }, _set: { featured: false }) {
      affected_rows
    }
  }
`;

const setFeaturedQuery = gql`
  mutation setFeatured($id: uuid!) {
    update_articles(where: { id: { _eq: $id } }, _set: { featured: true }) {
      affected_rows
    }
  }
`;

const setEditorPickQuery = gql`
  mutation setEditorPick($id: uuid!) {
    update_articles(where: { id: { _eq: $id } }, _set: { editors_pick: true }) {
      affected_rows
    }
  }
`;

const setUneditorpickQuery = gql`
  mutation setUneditorpick($id: uuid!) {
    update_articles(
      where: { id: { _eq: $id } }
      _set: { editors_pick: false }
    ) {
      affected_rows
    }
  }
`;

const getFeaturedArticlesQuery = gql`
  query getFeaturedArticles {
    articles(where: { featured: { _eq: true } }) {
      id
      title
      featured_image
      excerpt
      featured
      editors_pick
      slug
      updated_at
      users_to_articles {
        authors {
          username
          profile_picture
        }
      }
      article_category {
        title
      }
      article_topic {
        title
      }

      comments {
        id
        replies {
          id
          commentId
          replies_to_reply {
            id
            replyId
          }
        }
      }
    }
  }
`;

const getEditorPicksQuery = gql`
  query getEditorsPick {
    articles(where: { editors_pick: { _eq: true } }) {
      id
      title
      featured_image
      excerpt
      editors_pick
      featured
      slug
      updated_at
      users_to_articles {
        authors {
          username
          profile_picture
        }
      }
      article_category {
        title
      }
      article_topic {
        title
      }

      comments {
        id
        replies {
          id
          commentId
          replies_to_reply {
            id
            replyId
          }
        }
      }
    }
  }
`;

const searchArticlo = gql`
  query getArticles($title: String) {
    articles(where: { title: { _ilike: $title } }) {
      id
      title
      featured_image
      excerpt
      slug
      updated_at

      users_to_articles {
        authors {
          username
          profile_picture
        }
      }

      article_category {
        title
      }
      article_topic {
        title
      }

      comments {
        id
        replies {
          id
          commentId
          replies_to_reply {
            id
            replyId
          }
        }
      }
    }

    articles_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const deleteArticleQuery = gql`
  mutation deleteArticleMutation($id: uuid!) {
    delete_articles_and_views(where: { articleId: { _eq: $id } }) {
      affected_rows
    }
    delete_reactions_to_articles(where: { article_id: { _eq: $id } }) {
      affected_rows
    }
    delete_articles_and_users(where: { article_id: { _eq: $id } }) {
      affected_rows
    }
    delete_articles_and_bookmarks(where: { articleId: { _eq: $id } }) {
      affected_rows
    }
    delete_articles(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const deleteCommentQuery = gql`
  mutation deleteComment($id: uuid!) {
    delete_comments(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const deleteReplyQuery = gql`
  mutation deleteReply($id: uuid!, $commentId: uuid!) {
    delete_comments_and_replies(
      where: { id: { _eq: $id }, commentId: { _eq: $commentId } }
    ) {
      affected_rows
    }
  }
`;

const deleteReplyToReplyQuery = gql`
  mutation deleteReplyToReply($id: uuid!, $replyId: uuid!) {
    delete_reply_and_reply(
      where: { id: { _eq: $id }, replyId: { _eq: $replyId } }
    ) {
      affected_rows
    }
  }
`;
const { Text, Paragraph, Title } = Typography;

const ArticlesManager = () => {
  const router = useRouter();
  const [managerTabState, setManagerTabState] = useState("default");
  const {
    data: getArticleData,
    loading: getArticleLoading,
    error: getArticleError,
    fetchMore,
    refetch,
    networkStatus,
  } = useQuery(getArticlesQuery, {
    variables: {
      offset: 0,
      limit: 5,
    },
    notifyOnNetworkStatusChange: true,
    // pollInterval: 2000,
  });

  const [
    getFeaturedArticles,
    {
      data: getFeaturedArticlesData,
      loading: getFeaturedArticlesLoading,
      error: getFeaturedArticlesError,
      refetch: getFeaturedArticlesRefetch,
    },
  ] = useLazyQuery(getFeaturedArticlesQuery, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  const [
    getEditorspick,
    {
      data: getEditorspickData,
      loading: getEditorspickLoading,
      error: geteditorspickError,
      refetch: getEditorspickRefetch,
    },
  ] = useLazyQuery(getEditorPicksQuery, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  const [setFeatured] = useMutation(setFeaturedQuery, {
    onCompleted: () => {
      message.success("Article is now Featured");
      setManagerTabState("featured");
      getFeaturedArticles();
    },
  });

  const [setUnfeatured] = useMutation(setUnfeaturedQuery, {
    onCompleted: () => {
      getFeaturedArticlesRefetch();
      message.success("Article removed from Featured");
    },
  });

  const [setEditorPick] = useMutation(setEditorPickQuery, {
    onCompleted: () => {
      message.success("Article is Editor Pick");
      setManagerTabState("editors_pick");
      getEditorspick();
    },
  });

  const [setUneditorpick] = useMutation(setUneditorpickQuery, {
    onCompleted: () => {
      getEditorspickRefetch();
      message.success("Article removed from editor picks");
    },
  });

  const [deleteReplyToReply] = useMutation(deleteReplyToReplyQuery);

  const [deleteReply] = useMutation(deleteReplyQuery);

  const [deleteComment] = useMutation(deleteCommentQuery);

  const [
    searchArticles,
    {
      loading: searchArticlesLoading,
      data: searchArticlesData,
      error: searchArticlesError,
    },
  ] = useLazyQuery(searchArticlo, {
    pollInterval: 100,
    onError: () => message.error("Error Searching Articles"),
  });

  const [
    deleteArticle,
    { loading: deleteArticleLoading, data: deleteArticleData },
  ] = useMutation(deleteArticleQuery, {
    onCompleted: () => {
      refetch();
    },
  });

  const [articleManagerDrawer, setArticleManagerDrawer] = useState(false);
  const [articleManagerDrawerData, setArticleManagerDrawerData] = useState({});

  const deleteComments = (commentsArray) => {
    commentsArray.map((comments) => {
      if (comments.replies) {
        comments.replies.map((replies) => {
          console.log(comments.id);
          console.log(replies.id);

          if (replies.replies_to_reply) {
            replies.replies_to_reply.map((replyToReply) => {
              console.log(replyToReply.id);
              deleteReplyToReply({
                variables: {
                  id: replyToReply.id,
                  replyId: replyToReply.replyId,
                },
              });
              return;
            });
          }
          deleteReply({
            variables: { id: replies.id, commentId: replies.commentId },
          });
          return;
        });
        deleteComment({ variables: { id: comments.id } });
      } else {
        deleteComment({ variables: { id: comments.id } });
      }
    });
  };

  return getArticleError ? (
    <Result
      className="pd-10 mt-20"
      status="error"
      title="Server Error"
      extra={
        <Button type="primary" key="console" onClick={() => router.reload()}>
          Reload Page
        </Button>
      }
    />
  ) : (
    <Row justify="center">
      <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={14} className="pd-10">
        <Title level={4} className="mt-20 mb-20 mr-10">
          Article Manager
        </Title>

        <Tabs
          onTabClick={(tab) => setManagerTabState(tab)}
          onChange={(change) => {
            if (change == "featured") {
              return getFeaturedArticles();
            } else if (change == "editors_pick") {
              return getEditorspick();
            } else {
              return refetch();
            }
          }}
          tabBarExtraContent={
            <Button
              onClick={() => {
                fetch("/api/generateSitemap", {
                  headers: {
                    "content-type": "application/json",
                    accept: "application/json",
                  },
                  method: "POST",
                  body: JSON.stringify({
                    posts: getArticleData.articles,
                  }),
                }).then((res) =>
                  res.json().then((result) => console.log(result))
                );
              }}
            >
              Generate Sitemap
            </Button>
          }
          activeKey={managerTabState}
        >
          <Tabs.TabPane tab="Default" key="default">
            {getArticleLoading ? (
              <Skeleton
                className="mt-20"
                round
                active
                paragraph={{ rows: 1 }}
                avatar
                title
              />
            ) : (
              <Form layout="vertical">
                <Form.Item label="Search Article" className="mb-5">
                  <Input
                    onChange={(val) => {
                      if (val.target.value.length >= 6) {
                        val = "%" + val.target.value + "%";
                        return searchArticles({
                          variables: { title: val },
                        });
                      } else {
                        return searchArticles({
                          variables: { title: "" },
                        });
                      }
                    }}
                  />
                </Form.Item>
                {(searchArticlesData &&
                  searchArticlesData.articles.length > 0) ||
                getArticleData ? (
                  <>
                    <List
                      className="mt-20"
                      dataSource={
                        searchArticlesData &&
                        searchArticlesData.articles.length > 0
                          ? searchArticlesData.articles
                          : getArticleData
                          ? getArticleData.articles
                          : []
                      }
                      loadMore={
                        <div className="d-flex jc-center mt-20">
                          <Button
                            disabled={
                              networkStatus == 3 ||
                              getArticleData.articles.length >=
                                getArticleData.articles_aggregate.aggregate
                                  .count
                                ? true
                                : false
                            }
                            onClick={() =>
                              fetchMore({
                                variables: {
                                  offset: getArticleData.articles.length,
                                  limit: 5,
                                },
                                updateQuery: (prev, { fetchMoreResult }) => {
                                  if (!fetchMoreResult) {
                                    console.log("not");
                                    return prev;
                                  }
                                  var abc = Object.assign({}, prev, {
                                    articles: [
                                      ...prev.articles,
                                      ...fetchMoreResult.articles,
                                    ],
                                  });
                                },
                              })
                            }
                          >
                            {networkStatus == 3 ? "Loading..." : "Show More"}
                          </Button>
                        </div>
                      }
                      renderItem={(item) =>
                        networkStatus == 3 ? (
                          <Skeleton
                            className="mt-30"
                            avatar
                            paragraph={2}
                            title
                          />
                        ) : (
                          <List.Item key={item.id}>
                            <List.Item.Meta
                              title={
                                <a
                                  href={
                                    process.env.NEXT_PUBLIC_WEB_ADDRESS +
                                    "/" +
                                    item.article_category.title +
                                    "/" +
                                    (item.article_topic !== null
                                      ? item.article_topic.title + "/"
                                      : "") +
                                    item.slug
                                  }
                                >
                                  <Paragraph
                                    ellipsis={{ rows: 2 }}
                                    className="fs-14"
                                  >
                                    {item.title}
                                  </Paragraph>
                                </a>
                              }
                              description={
                                <Paragraph
                                  ellipsis={{ rows: 2 }}
                                  className="fs-14"
                                >
                                  {item.excerpt}
                                </Paragraph>
                              }
                              avatar={
                                <Avatar
                                  size={45}
                                  src={
                                    "https://ik.imagekit.io/ttr/tr:n-avatar/" +
                                    item.featured_image
                                  }
                                />
                              }
                            />
                            <i className="ri-more-fill ri-lg va-minus-6 mg-x-10"></i>
                            <Button
                              type="link"
                              icon={
                                <i
                                  className="ri-edit-line ri-lg va-minus-2 fs-20"
                                  style={{
                                    color: "inherit",
                                  }}
                                ></i>
                              }
                              className="ml-10"
                              onClick={() => {
                                setArticleManagerDrawerData(item);
                                setArticleManagerDrawer(true);
                              }}
                            />
                          </List.Item>
                        )
                      }
                    />
                    <Drawer
                      visible={articleManagerDrawer}
                      maskClosable
                      onClose={() => setArticleManagerDrawer(false)}
                      closable={false}
                      placement="right"
                      width="300px"
                      bodyStyle={{ padding: 0 }}
                    >
                      <Card
                        cover={
                          <img
                            src={
                              "https://ik.imagekit.io/ttr/tr:n-med/" +
                              articleManagerDrawerData.featured_image
                            }
                            className="o-fit-cover"
                            width="100%"
                            height={200}
                          />
                        }
                        style={{ marginTop: -1 }}
                      >
                        {articleManagerDrawerData ? (
                          <>
                            <Paragraph
                              ellipsis={{ rows: 3 }}
                              className="fs-16 t-transform-cpt"
                              strong
                            >
                              {articleManagerDrawerData.title}
                            </Paragraph>

                            <Paragraph
                              ellipsis={{ rows: 2 }}
                              className="mt-20 t-transform-cpt"
                            >
                              {articleManagerDrawerData.excerpt}
                            </Paragraph>
                            <div>
                              <Space className="mt-20">
                                {articleManagerDrawerData.users_to_articles
                                  ? articleManagerDrawerData.users_to_articles.map(
                                      (mapped, index) => {
                                        if (
                                          articleManagerDrawerData
                                            .users_to_articles.length > 1 &&
                                          index + 1 <
                                            articleManagerDrawerData
                                              .users_to_articles.length
                                        ) {
                                          return (
                                            <div
                                              key={articleManagerDrawerData.id}
                                            >
                                              <Avatar
                                                src={
                                                  "https://ik.imagekit.io/ttr/tr:n-avatar/" +
                                                  mapped.authors.profile_picture
                                                }
                                                className="mr-10"
                                              />
                                              <Text className="t-transform-cpt">
                                                {mapped.authors.username}
                                              </Text>
                                              <i className="ri-more-fill ri-lg va-minus-6 mg-x-10"></i>
                                            </div>
                                          );
                                        } else {
                                          return (
                                            <>
                                              <Avatar
                                                src={
                                                  "https://ik.imagekit.io/ttr/tr:n-avatar/" +
                                                  mapped.authors.profile_picture
                                                }
                                              />
                                              <Text
                                                className="t-transform-cpt"
                                                key={
                                                  articleManagerDrawerData.id
                                                }
                                              >
                                                {mapped.authors.username}
                                              </Text>
                                            </>
                                          );
                                        }
                                      }
                                    )
                                  : null}
                              </Space>
                            </div>
                            <Space className="mt-20">
                              <Button
                                className="mr-20"
                                danger
                                onClick={() => {
                                  if (
                                    searchArticlesData &&
                                    searchArticlesData.articles[0].comments
                                  ) {
                                    setArticleManagerDrawer(false);
                                    deleteComments(
                                      searchArticlesData.articles[0].comments
                                    );
                                    deleteArticle({
                                      variables: {
                                        id: articleManagerDrawerData.id,
                                      },
                                    });
                                    setArticleManagerDrawerData({});
                                  } else {
                                    setArticleManagerDrawer(false);
                                    deleteComments(
                                      getArticleData.articles[0].comments
                                    );
                                    deleteArticle({
                                      variables: {
                                        id: articleManagerDrawerData.id,
                                      },
                                    });
                                    setArticleManagerDrawerData({});
                                  }
                                }}
                              >
                                Delete
                              </Button>
                            </Space>
                            <Button>View Article</Button>
                            {articleManagerDrawerData.featured ? (
                              <Button
                                danger
                                className="mt-20"
                                onClick={() => {
                                  setUnfeatured({
                                    variables: {
                                      id: articleManagerDrawerData.id,
                                    },
                                  });
                                }}
                              >
                                Remove From Featured
                              </Button>
                            ) : null}

                            {articleManagerDrawerData.editors_pick ? (
                              <Button
                                danger
                                className="mt-20"
                                onClick={() => {
                                  setUneditorpick({
                                    variables: {
                                      id: articleManagerDrawerData.id,
                                    },
                                  });
                                }}
                              >
                                Remove From Editor's Pick
                              </Button>
                            ) : null}

                            <div className="d-flex mt-20">
                              {!articleManagerDrawerData.featured ? (
                                <Button
                                  type="primary"
                                  className="mt-20 mr-10"
                                  onClick={() => {
                                    setFeatured({
                                      variables: {
                                        id: articleManagerDrawerData.id,
                                      },
                                    });
                                  }}
                                >
                                  Feature
                                </Button>
                              ) : null}

                              {!articleManagerDrawerData.editors_pick ? (
                                <Button
                                  type="primary"
                                  className="mt-20"
                                  onClick={() => {
                                    setEditorPick({
                                      variables: {
                                        id: articleManagerDrawerData.id,
                                      },
                                    });
                                  }}
                                >
                                  Set as Editor's Pick
                                </Button>
                              ) : null}
                            </div>
                          </>
                        ) : null}
                      </Card>
                    </Drawer>
                  </>
                ) : (
                  <Skeleton className="mt-30" avatar paragraph={1} title />
                )}
              </Form>
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Featured" key="featured">
            {getFeaturedArticlesLoading ? (
              <Skeleton
                paragraph={{ rows: 1 }}
                title
                active
                round
                avatar={{
                  shape: "circle",
                }}
              />
            ) : (
              <List
                dataSource={
                  getFeaturedArticlesData
                    ? getFeaturedArticlesData.articles
                    : []
                }
                renderItem={(item) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      title={
                        <a
                          href={
                            process.env.NEXT_PUBLIC_WEB_ADDRESS +
                            "/" +
                            item.article_category.title +
                            "/" +
                            (item.article_topic !== null
                              ? item.article_topic.title + "/"
                              : "") +
                            item.slug
                          }
                        >
                          <Paragraph ellipsis={{ rows: 2 }} className="fs-14">
                            {item.title}
                          </Paragraph>
                        </a>
                      }
                      description={
                        <Paragraph ellipsis={{ rows: 2 }} className="fs-14">
                          {item.excerpt}
                        </Paragraph>
                      }
                      avatar={
                        <Avatar
                          size={45}
                          src={
                            "https://ik.imagekit.io/ttr/tr:n-avatar/" +
                            item.featured_image
                          }
                        />
                      }
                    />
                    <i className="ri-more-fill ri-lg va-minus-6 mg-x-10"></i>
                    <Button
                      type="link"
                      icon={
                        <i
                          className="ri-edit-line ri-lg va-minus-2 fs-20"
                          style={{
                            color: "inherit",
                          }}
                        ></i>
                      }
                      className="ml-10"
                      onClick={() => {
                        setArticleManagerDrawerData(item);
                        setArticleManagerDrawer(true);
                      }}
                    />
                  </List.Item>
                )}
              />
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Editor's Pick" key="editors_pick">
            {getEditorspickLoading ? (
              <Skeleton
                paragraph={{ rows: 1 }}
                title
                active
                round
                avatar={{
                  shape: "circle",
                }}
              />
            ) : (
              <List
                dataSource={
                  getEditorspickData ? getEditorspickData.articles : []
                }
                renderItem={(item) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      title={
                        <a
                          href={
                            process.env.NEXT_PUBLIC_WEB_ADDRESS +
                            "/" +
                            item.article_category.title +
                            "/" +
                            (item.article_topic !== null
                              ? item.article_topic.title + "/"
                              : "") +
                            item.slug
                          }
                        >
                          <Paragraph ellipsis={{ rows: 2 }} className="fs-14">
                            {item.title}
                          </Paragraph>
                        </a>
                      }
                      description={
                        <Paragraph ellipsis={{ rows: 2 }} className="fs-14">
                          {item.excerpt}
                        </Paragraph>
                      }
                      avatar={
                        <Avatar
                          size={45}
                          src={
                            "https://ik.imagekit.io/ttr/tr:n-avatar/" +
                            item.featured_image
                          }
                        />
                      }
                    />
                    <i className="ri-more-fill ri-lg va-minus-6 mg-x-10"></i>
                    <Button
                      type="link"
                      icon={
                        <i
                          className="ri-edit-line ri-lg va-minus-2 fs-20"
                          style={{
                            color: "inherit",
                          }}
                        ></i>
                      }
                      className="ml-10"
                      onClick={() => {
                        setArticleManagerDrawerData(item);
                        setArticleManagerDrawer(true);
                      }}
                    />
                  </List.Item>
                )}
              />
            )}
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};
export default ArticlesManager;
