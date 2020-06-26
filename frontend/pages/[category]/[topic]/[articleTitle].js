import Wrapper from "components/global/wrapper";
import {
  Row,
  Col,
  Modal,
  Mentions,
  Tabs,
  Typography,
  Drawer,
  List,
  Comment,
  Card,
  Divider,
  Space,
  Avatar,
  Form,
  Input,
  Button,
  message,
  Menu,
  Dropdown,
} from "antd";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks";
import { getArticlesQuery, insertBookmarkQuery } from "components/home/queries";
import { initializeApollo } from "lib/apolloClient";
import { Reactions } from "components/home/sub/reactions-holder";
import Head from "next/head";
import { useState } from "react";

const getArticleQuery = gql`
  query getArticle($articleSlug: String!) {
    articles(where: { slug: { _eq: $articleSlug } }) {
      id
      title
      content
      excerpt
      updated_at
      created_at
      featured_image
      reactions_to_articles {
        user {
          username
          profile_picture
        }
        reaction {
          id
          name
          code
          color
          gradient
          type
        }
      }
      users_to_articles {
        authors {
          username
        }
      }
      article_topic {
        title
      }
      article_category {
        title
      }

      comments {
        id
        content
        updated_at
        author {
          profile_picture
          username
        }
        replies {
          id
          content
          updated_at
          commentId
          replyAuthor {
            profile_picture
            username
          }
          replies_to_reply {
            id
            content
            updated_at
            author {
              profile_picture
              username
            }
          }
        }
      }
    }

    reactions {
      id
      name
      color
      code
      gradient
    }
  }
`;

const insertReactionQuery = gql`
  mutation insertReaction($articleId: uuid!, $reactionId: uuid!) {
    insert_reactions_to_articles(
      objects: {
        article_id: $articleId
        reaction_id: $reactionId
        user_id: "b8c1db5d-a4dc-4790-8632-9b586d571735"
      }
    ) {
      affected_rows
    }
  }
`;

const insertCommentQuery = gql`
  mutation insertComment(
    $articleId: uuid!
    $content: String!
    $userId: uuid!
    $repliedTo: uuid
  ) {
    insert_comments_one(
      object: { userId: $userId, articleId: $articleId, content: $content }
    ) {
      id
    }
  }
`;

const insertReplyQuery = gql`
  mutation insertReply($commentId: uuid!, $content: String!, $userId: uuid!) {
    insert_comments_and_replies_one(
      object: { commentId: $commentId, content: $content, userId: $userId }
    ) {
      repliedTo {
        content
      }
    }
  }
`;

const replyToReplyQuery = gql`
  mutation replyToReply($content: String!, $userId: uuid!, $replyId: uuid!) {
    insert_reply_and_reply(
      objects: { content: $content, userId: $userId, replyId: $replyId }
    ) {
      affected_rows
    }
  }
`;

const { Title, Paragraph, Text } = Typography;
const Article = () => {
  const router = useRouter();
  const { category, topic, articleTitle } = router.query;

  const [reactionsModal, setReactionsModal] = useState(false);

  const {
    loading: getArticleLoading,
    data: getArticleData,
    error: getArticleError,
    refetch: getArticleRefetch,
  } = useQuery(getArticleQuery, {
    variables: {
      articleSlug: articleTitle,
    },
  });

  const [insertReaction, { data: insertReactionData }] = useMutation(
    insertReactionQuery,
    {
      onError: (err) => message.error("Error Reacting To Post"),
      onCompleted: () => message.success("Reacted Successfully"),
    }
  );

  const [insertComment, { data: insertCommentData }] = useMutation(
    insertCommentQuery,
    {
      onError: (err) => console.log(err),
      onCompleted: () => message.success("Successfully Added Comment"),
    }
  );

  const [insertReply, { data: insertReplyData }] = useMutation(
    insertReplyQuery,
    {
      onError: (err) => console.log(err),
    }
  );

  const [
    replyToReply,
    { data: replyToReplyData },
  ] = useMutation(replyToReplyQuery, { onError: (err) => console.log(err) });

  // const [comment, setComment] = useState("");

  const getCount = (array, id) => {
    var count = array.filter((filtered) => filtered.reaction.id == id);
    return count.length;
  };

  const [showReply, setShowReply] = useState(false);
  const [replyData, setReplyData] = useState(null);

  const reactionsMenu = (
    <Menu className="pd-10">
      <Reactions>
        {getArticleData.reactions.map((reactions) => {
          return (
            <div className="reaction-holder">
              <div
                className="reaction fs-26 mg-x-5 hoverable-reactions"
                onClick={() => {
                  insertReaction({
                    variables: {
                      articleId: getArticleData.articles[0].id,
                      reactionId: reactions.id,
                    },
                  });
                  getArticleRefetch();
                }}
              >
                <a>
                  <i
                    className={`${reactions.code} va-minus-4`}
                    style={reactions.color ? color : reactions.gradient}
                  ></i>
                </a>
              </div>
            </div>
          );
        })}
      </Reactions>
    </Menu>
  );
  return (
    <Wrapper>
      <Head>
        <link rel="stylesheet" type="text/css" href="/prism.css" />
        <script src="/prism.js"></script>
      </Head>
      <Row justify="center">
        <Col
          xs={24}
          sm={24}
          md={16}
          lg={12}
          xl={12}
          xxl={6}
          className="d-flex flex-column mg-x-30 t-transform-cpt jc-center"
        >
          <Title
            level={3}
            className="lh-1-5 pd-x-20 mt-30"
            style={{ fontWeight: 400 }}
          >
            {getArticleData.articles[0].title}
          </Title>

          <Paragraph
            className="pd-x-20 lh-2 mt-10 fs-14"
            ellipsis={{ rows: 2 }}
          >
            {getArticleData.articles[0].excerpt}
          </Paragraph>
          <Card className="mg-x-5">
            <Row>
              <Space>
                <Avatar src="https://1.bp.blogspot.com/-N7JSp_PRkuI/XhV5ljsxEUI/AAAAAAAALHA/cevL4UW3PMUzwh1SCIn32uJajD-atR5zwCLcBGAsYHQ/s3840/Color-Abstract-wallpaper.jpeg" />{" "}
                <Text>
                  {getArticleData.articles[0].users_to_articles.map(
                    (mapped) => mapped.authors.username
                  )}
                </Text>
              </Space>
              <div className="ml-auto va-middle lh-2-5">
                <Text className="mr-10" strong>
                  Published:
                </Text>
                {new Date(getArticleData.articles[0].created_at).toDateString()}
              </div>
            </Row>
            <Row></Row>
          </Card>
          {/* <Text className="mt-20 ml-10">
            Last Updated:
            {new Date(getArticleData.articles[0].updated_at).toDateString()}
          </Text> */}
        </Col>
        <Col xs={24} sm={24} md={16} lg={12} xl={12} xxl={10} className="">
          <img
            width="100%"
            className="o-fit-cover mt-30"
            src={getArticleData.articles[0].featured_image}
            style={{ maxWidth: 800 }}
          />
        </Col>
      </Row>
      <Row justify="center" className="mt-30 pd-20">
        <Col xs={24} sm={24} md={16} lg={12} xl={12} xxl={12}>
          <div
            dangerouslySetInnerHTML={{
              __html: getArticleData.articles[0].content,
            }}
          />
        </Col>
      </Row>
      <Row className="mt-10 mg-x-5 mb-20 mt-10" justify="center">
        <Col xs={24} sm={24} md={16} lg={12} xl={12} xxl={12}>
          <Divider orientation="left">React To This</Divider>
          <Card>
            <Row>
              <a>
                <Reactions>
                  {getArticleData.reactions.map((reactions) => {
                    return (
                      <div
                        className="reaction-holder"
                        onClick={() => setReactionsModal(true)}
                      >
                        <div className="reaction fs-22">
                          <i
                            className={`${reactions.code} va-minus-4`}
                            style={reactions.color ? color : reactions.gradient}
                          ></i>
                        </div>
                      </div>
                    );
                  })}
                  <div className="reaction-total">
                    <Text className="lh-2" strong>
                      {getArticleData.articles[0].reactions_to_articles.length}
                    </Text>
                  </div>
                </Reactions>
              </a>
              <Modal
                visible={reactionsModal}
                footer={false}
                closable
                maskClosable
                onCancel={() => setReactionsModal(false)}
                title="Reactions"
                bodyStyle={{
                  padding: "15px 15px",
                  paddingBottom: "45px",
                  paddingTop: 5,
                  height: 300,
                  overflowY: "auto",
                }}
              >
                <Tabs>
                  {getArticleData.reactions.map((reactions) => {
                    return (
                      <Tabs.TabPane
                        key={reactions.id}
                        tab={
                          <Reactions>
                            <div className="reaction-holder">
                              <div className="reaction fs-22">
                                <i
                                  className={`${reactions.code} va-minus-4`}
                                  style={
                                    reactions.color ? color : reactions.gradient
                                  }
                                ></i>
                              </div>
                              <div className="reaction-count">
                                <Text className="lh-2-5" strong>
                                  {getCount(
                                    getArticleData.articles[0]
                                      .reactions_to_articles,
                                    reactions.id
                                  )}
                                </Text>
                              </div>
                            </div>

                            <div class="reaction-name">
                              <Text>{reactions.name}</Text>
                            </div>
                          </Reactions>
                        }
                      >
                        <div className="d-flex flex-column">
                          {getArticleData.articles[0].reactions_to_articles.map(
                            (reactionsToArticles) => {
                              if (
                                reactionsToArticles.reaction.id == reactions.id
                              )
                                return (
                                  <Space className="mg-y-10">
                                    <Avatar
                                      src={
                                        reactionsToArticles.user.profile_picture
                                      }
                                    />
                                    <Text>
                                      {reactionsToArticles.user.username}
                                    </Text>
                                  </Space>
                                );
                            }
                          )}
                        </div>
                      </Tabs.TabPane>
                    );
                  })}
                </Tabs>
              </Modal>
              <Dropdown
                placement="topCenter"
                className="ml-auto"
                overlay={reactionsMenu}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Button
                    className="lh-1"
                    type="text"
                    icon={
                      <i class="ri-thumb-up-line fs-22 va-minus-4 mr-10"></i>
                    }
                  ></Button>
                </a>
              </Dropdown>
            </Row>
          </Card>
          <Divider orientation="center">Meta Information</Divider>
          <Card>
            <Row>
              <div className="wd-100pc">
                <Text strong className="fs-18 lh-3">
                  Sources
                </Text>
                <List>
                  <List.Item
                    actions={[<a key="list-loadmore-edit">View Source</a>]}
                  >
                    <List.Item.Meta title="Hello" />
                  </List.Item>

                  <List.Item
                    actions={[<a key="list-loadmore-edit">View Source</a>]}
                  >
                    <List.Item.Meta title="Hello" />
                  </List.Item>
                </List>
              </div>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row justify="center" className="pd-20">
        <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={10}>
          <Divider orientation="center">Comments</Divider>
          <Form
            wrapperCol={{ span: 24 }}
            onFinish={(values) => {
              insertComment({
                variables: {
                  articleId: getArticleData.articles[0].id,
                  userId: "281ba274-1f2f-41d6-99d0-81c3b517fa03",
                  content: values.comment,
                },
              });
              return getArticleRefetch();
            }}
          >
            <Form.Item
              label={"Write Comment"}
              name="comment"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea rows={4}></Input.TextArea>
            </Form.Item>
            <Form.Item name="submit">
              <div
                className="d-flex flex-column wd-100pc"
                style={{ justifyContent: "flex-end" }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: 120, marginLeft: "auto" }}
                >
                  Add Comment
                </Button>
              </div>
            </Form.Item>
          </Form>

          {getArticleData.articles[0] && getArticleData.articles[0].comments
            ? getArticleData.articles[0].comments.map((comment) => {
                return (
                  <Comment
                    key={comment.id}
                    datetime={
                      new Date(comment.updated_at).toLocaleDateString() +
                      " at " +
                      new Date(comment.updated_at).toLocaleTimeString()
                    }
                    className="pd-10"
                    avatar={<Avatar src={comment.author.profile_picture} />}
                    author={comment.author.username}
                    content={comment.content}
                    actions={[
                      <div className="d-flex wd-100pc jc-end">
                        <a
                          className="t-transform-cpt mr-20"
                          onClick={() => {
                            setReplyData({ comment: comment });
                            setShowReply(true);
                          }}
                        >
                          Reply To {comment.author.username}
                        </a>
                        <a>
                          <Text type="danger" className="t-transform-cpt">
                            Report
                          </Text>
                        </a>
                      </div>,
                    ]}
                    children={comment.replies.map((replies) => {
                      return replies.commentId == comment.id ? (
                        <Comment
                          className="pd-10"
                          datetime={
                            new Date(replies.updated_at).toLocaleDateString() +
                            " at " +
                            new Date(replies.updated_at).toLocaleTimeString()
                          }
                          content={replies.content}
                          key={replies.id}
                          avatar={
                            <Avatar src={replies.replyAuthor.profile_picture} />
                          }
                          author={replies.replyAuthor.username}
                          actions={[
                            <div className="d-flex wd-100pc jc-end">
                              <a
                                className="t-transform-cpt mr-20"
                                onClick={() => {
                                  setReplyData({ reply: replies });
                                  setShowReply(true);
                                }}
                              >
                                Reply To {comment.author.username}
                              </a>
                              <a>
                                <Text type="danger" className="t-transform-cpt">
                                  Report
                                </Text>
                              </a>
                            </div>,
                          ]}
                          children={
                            replies.replies_to_reply.replyId ==
                            replies.replies_to_reply.id
                              ? replies.replies_to_reply.map(
                                  (repliesToReply) => {
                                    return (
                                      <Comment
                                        datetime={
                                          new Date(
                                            repliesToReply.updated_at
                                          ).toLocaleDateString() +
                                          " at " +
                                          new Date(
                                            repliesToReply.updated_at
                                          ).toLocaleTimeString()
                                        }
                                        className="pd-10"
                                        avatar={
                                          <Avatar
                                            src={
                                              repliesToReply.author
                                                .profile_picture
                                            }
                                          />
                                        }
                                        content={repliesToReply.content}
                                        author={repliesToReply.author.username}
                                      />
                                    );
                                  }
                                )
                              : null
                          }
                        />
                      ) : null;
                    })}
                  />
                );
              })
            : null}

          <Drawer
            visible={showReply}
            onClose={() => setShowReply(false)}
            maskClosable
            placement="bottom"
            bodyStyle={{
              padding: "40px 20px",
            }}
            height={340}
          >
            <Row justify="center">
              <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={6}>
                <Title level={4}>Reply</Title>
                <Form
                  wrapperCol={{ span: 24 }}
                  layout="vertical"
                  onFinish={(values) => {
                    var newData = replyData;
                    if (newData.comment) {
                      console.log("replying");
                      insertReply({
                        variables: {
                          commentId: newData.comment.id,
                          userId: "281ba274-1f2f-41d6-99d0-81c3b517fa03",
                          content: values.reply,
                        },
                      });
                      setShowReply(false);
                      getArticleRefetch();
                    } else {
                      console.log("replying to reply");
                      replyToReply({
                        variables: {
                          replyId: newData.reply.id,
                          userId: "281ba274-1f2f-41d6-99d0-81c3b517fa03",
                          content: values.reply,
                        },
                      });
                      setShowReply(false);
                      getArticleRefetch();
                    }
                  }}
                >
                  <Form.Item
                    label={
                      <div className="d-flex">
                        <Avatar size={45} className="mt-20" />
                        <Text className="mt-30 lh-1-5 ml-20">Dukesx</Text>
                      </div>
                    }
                    name="reply"
                    rules={[
                      {
                        validator: (rule, val) => {
                          if (val.length < 1) {
                            return Promise.reject("Enter A Value");
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Mentions className="mt-10" style={{ height: 100 }}>
                      <Mentions.Option key="1" value="afzaal">
                        Afzaal
                      </Mentions.Option>
                      <Mentions.Option key="2" value="duka">
                        Duka
                      </Mentions.Option>
                    </Mentions>
                  </Form.Item>
                  <Form.Item className="wd-100pc">
                    <Button type="link" className="ml-auto" htmlType="submit">
                      Add Reply
                    </Button>
                    <a
                      onClick={() => {
                        setShowReply(false);
                      }}
                    >
                      <Text type="secondary">Cancel</Text>
                    </a>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Drawer>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default Article;

export const getServerSideProps = async (context) => {
  const { articleTitle } = context.params;
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: getArticleQuery,
    variables: {
      articleSlug: articleTitle,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};
