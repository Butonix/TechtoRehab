import {
  Form,
  Row,
  Col,
  Typography,
  Result,
  Input,
  Card,
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
  query getArticles($offset: Int, $limit: Int) {
    articles(offset: $offset, limit: $limit) {
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
    fetchPolicy: "cache-and-network",
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
        <Title level={4} className="mt-20 mb-20">
          Article Manager
        </Title>
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
          {(searchArticlesData && searchArticlesData.articles.length > 0) ||
          getArticleData ? (
            <>
              <List
                className="mt-20"
                dataSource={
                  searchArticlesData && searchArticlesData.articles.length > 0
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
                          getArticleData.articles_aggregate.aggregate.count
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
                    <Skeleton className="mt-30" avatar paragraph={2} title />
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
                            src={item.featured_image + "?tr=h-200,w-200,f-webp"}
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
                        articleManagerDrawerData.featured_image +
                        "tr=h-200,f-webp"
                      }
                      className="o-fit-cover"
                      width="100%"
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
                                    articleManagerDrawerData.users_to_articles
                                      .length > 1 &&
                                    index + 1 <
                                      articleManagerDrawerData.users_to_articles
                                        .length
                                  ) {
                                    return (
                                      <div key={articleManagerDrawerData.id}>
                                        <Avatar
                                          src={mapped.profile_picture}
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
                                        <Avatar src={mapped.profile_picture} />
                                        <Text
                                          className="t-transform-cpt"
                                          key={articleManagerDrawerData.id}
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
                                variables: { id: articleManagerDrawerData.id },
                              });
                              setArticleManagerDrawerData({});
                            } else {
                              setArticleManagerDrawer(false);
                              deleteComments(
                                getArticleData.articles[0].comments
                              );
                              deleteArticle({
                                variables: { id: articleManagerDrawerData.id },
                              });
                              setArticleManagerDrawerData({});
                            }
                          }}
                        >
                          Delete
                        </Button>
                        <Button>View Article</Button>
                      </Space>
                    </>
                  ) : null}
                </Card>
              </Drawer>
            </>
          ) : (
            <Skeleton className="mt-30" avatar paragraph={1} title />
          )}
        </Form>
      </Col>
    </Row>
  );
};
export default ArticlesManager;
