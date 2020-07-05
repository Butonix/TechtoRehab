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
  Result,
  Button,
  message,
  Menu,
  Dropdown,
} from "antd";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { initializeApollo } from "lib/apolloClient";
import { Reactions } from "components/home/sub/reactions-holder";
import Head from "next/head";
import { useState, useEffect } from "react";
import {
  deleteCommentQuery,
  deleteReplyToReplyQuery,
  deleteReplyQuery,
  replyToReplyQuery,
  getArticleQuery,
  insertCommentQuery,
  insertReplyQuery,
  insertReactionQuery,
} from "components/article/queries";

import withSession from "lib/session";
import ProgressiveImage from "react-progressive-image";
import lozad from "lozad";
//
//
//
//
//
//

const { Title, Paragraph, Text } = Typography;

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

const Article = (props) => {
  //
  //
  //
  //
  //
  //
  const router = useRouter();
  //
  //
  //
  //
  //
  //
  const { category, topic, articleTitle } = router.query;

  const [reactionsModal, setReactionsModal] = useState(false);
  //
  //
  //
  //
  //
  //

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

  //
  //
  //

  const [insertReaction, { data: insertReactionData }] = useMutation(
    insertReactionQuery,
    {
      onError: (err) => message.error("Error Reacting To Post"),
      onCompleted: () => getArticleRefetch(),
    }
  );

  //
  //
  //

  const [insertComment, { data: insertCommentData }] = useMutation(
    insertCommentQuery,
    {
      onError: (err) => console.log(err),
      onCompleted: () => {
        getArticleRefetch();
        return window.scrollTo(0, document.body.scrollHeight);
      },
    }
  );

  //
  //
  //

  const [insertReply, { data: insertReplyData }] = useMutation(
    insertReplyQuery,
    {
      onError: (err) => console.log(err),
      onCompleted: () => {
        getArticleRefetch();
      },
    }
  );

  //
  //
  //

  const [replyToReply, { data: replyToReplyData }] = useMutation(
    replyToReplyQuery,
    {
      onError: (err) => console.log(err),
      onCompleted: () => {
        getArticleRefetch();
      },
    }
  );

  //
  //
  //

  const [deleteComment, { error: deleteCommentError }] = useMutation(
    deleteCommentQuery,
    {
      onError: (err) => console.log(JSON.stringify(err)),
      onCompleted: () => getArticleRefetch(),
    }
  );

  //
  //
  //

  const [deleteReply, { error: deleteReplyError }] = useMutation(
    deleteReplyQuery,
    {
      onError: (err) => console.log(err),
      onCompleted: () => getArticleRefetch(),
    }
  );

  //
  //
  //

  const [deleteReplyToReply, { error: deleteReplyToReplyError }] = useMutation(
    deleteReplyToReplyQuery,
    {
      onError: (err) => console.log(err),
      onCompleted: () => getArticleRefetch(),
    }
  );

  //
  //
  //
  //
  //
  //

  const getCount = (array, id) => {
    var count = array.filter((filtered) => filtered.reaction.id == id);
    return count.length;
  };

  //
  //
  //

  const [showReply, setShowReply] = useState(false);
  const [replyData, setReplyData] = useState(null);

  //
  //
  //
  //
  //
  //

  const deleteCommentFromTop = (comments) => {
    if (comments.replies) {
      comments.replies.map((replies) => {
        if (replies.replies_to_reply) {
          replies.replies_to_reply.map((replyToReply) => {
            deleteReplyToReply({
              variables: { id: replyToReply.id, replyId: replyToReply.replyId },
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
  };

  //
  //

  const DeleteCommentFromSecond = (replies) => {
    if (replies.replies_to_reply) {
      replies.replies_to_reply.map((replyToReply) => {
        deleteReplyToReply({
          variables: { id: replyToReply.id, replyId: replyToReply.replyId },
        });
        return;
      });
    }
    deleteReply({
      variables: {
        id: replies.id,
        commentId: replies.commentId,
      },
    });
  };

  //
  //

  const DeleteCommentFromThird = (repliesToReplies) => {
    deleteReplyToReply({
      variables: {
        id: repliesToReplies.id,
        replyId: repliesToReplies.replyId,
      },
    });
  };

  //
  //
  //
  //
  //
  //

  useEffect(() => {
    // const imageObserver = new IntersectionObserver((entries, imgObserver) => {
    //   entries.forEach((entry) => {
    //     const lazyImage = entry.target;
    //     var source = lazyImage.src;
    //     if (entry.isIntersecting) {
    //       lazyImage.src = "/maxresdefault(1)-placeholder.webp";
    //     } else {
    //       lazyImage.src = "http://localhost:3000/images/maxresdefault.webp";
    //     }
    //   });
    // });
    // imageObserver.observe(document.querySelector("img"));
    const el = document.querySelector("img");
    const observer = lozad(el);
    observer.observe();
  });

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
                      userId: props.user.id,
                    },
                  });
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

  //
  //
  //
  //
  //
  //

  return (
    <Wrapper user={props.user}>
      <Head>
        <link rel="stylesheet" type="text/css" href="/prism.css" />
        <script src="/prism.js"></script>
      </Head>
      {getArticleData && getArticleData.articles.length > 0 ? (
        <>
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
                    <Avatar
                      src={
                        getArticleData.articles[0].users_to_articles[0].authors
                          .profile_picture + ".webp"
                      }
                    />
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
                    {new Date(
                      getArticleData.articles[0].created_at
                    ).toDateString()}
                  </div>
                </Row>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={16} lg={12} xl={12} xxl={10} className="">
              <ProgressiveImage
                src={getArticleData.articles[0].featured_image + ".webp"}
                placeholder={
                  getArticleData.articles[0].featured_image +
                  "-placeholder.webp"
                }
              >
                {(src) => (
                  <img
                    width="100%"
                    className="o-fit-cover mt-30"
                    src={src}
                    style={{ maxWidth: 800, maxHeight: 400 }}
                  />
                )}
              </ProgressiveImage>
            </Col>
          </Row>
          <Row justify="center" className="mt-30 pd-10">
            <Col xs={24} sm={24} md={16} lg={12} xl={12} xxl={14}>
              <div
                className="content"
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
                        if (
                          getArticleData.articles[0].reactions_to_articles.find(
                            (elem) => elem.reaction.id == reactions.id
                          )
                        ) {
                          return (
                            <div
                              className="reaction-holder"
                              onClick={() => setReactionsModal(true)}
                            >
                              <div className="reaction fs-22">
                                <i
                                  className={`${reactions.code} va-middle`}
                                  style={
                                    reactions.color ? color : reactions.gradient
                                  }
                                ></i>
                              </div>
                            </div>
                          );
                        }
                      })}
                      <div className="reaction-total">
                        <Text className="lh-2-5 fs-16" strong>
                          {
                            getArticleData.articles[0].reactions_to_articles
                              .length
                          }
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
                                        reactions.color
                                          ? color
                                          : reactions.gradient
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
                                    reactionsToArticles.reaction.id ==
                                    reactions.id
                                  )
                                    return (
                                      <Space className="mg-y-10">
                                        <Avatar
                                          src={
                                            reactionsToArticles.user
                                              .profile_picture
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
                      userId: props.user.id,
                      content: values.comment,
                    },
                  });
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
                  <Mentions rows={4} placeholder="Reply to article" />
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
              {/**   */
              /**   */
              /**   */
              /**** COMMENT INPUT END  ****/
              /**   */
              /**   */
              /**   */}

              {/**   */
              /**   */
              /**   */
              /**** COMMENTS START ****/
              /**   */
              /**   */
              /**   */}
              {getArticleData.articles[0].comments.length !== 0 ? (
                <List
                  dataSource={getArticleData.articles[0].comments}
                  renderItem={(comment) => {
                    return (
                      <List.Item>
                        <Comment
                          key={comment.id}
                          datetime={
                            new Date(comment.updated_at).toLocaleDateString() +
                            " at " +
                            new Date(comment.updated_at).toLocaleTimeString()
                          }
                          className="pd-10"
                          avatar={
                            <Avatar src={comment.author.profile_picture} />
                          }
                          author={comment.author.username}
                          content={comment.content}
                          actions={[
                            <Space>
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
                                <Text
                                  type="danger"
                                  onClick={() => deleteCommentFromTop(comment)}
                                >
                                  Delete
                                </Text>
                              </a>
                            </Space>,
                          ]}
                          children={
                            comment.replies
                              ? comment.replies.map((replies) => {
                                  return replies.commentId == comment.id ? (
                                    <Comment
                                      className="pd-10"
                                      datetime={
                                        new Date(
                                          replies.updated_at
                                        ).toLocaleDateString() +
                                        " at " +
                                        new Date(
                                          replies.updated_at
                                        ).toLocaleTimeString()
                                      }
                                      content={replies.content}
                                      key={replies.id}
                                      avatar={
                                        <Avatar
                                          src={
                                            replies.replyAuthor.profile_picture
                                          }
                                        />
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
                                            <Text
                                              type="danger"
                                              className="t-transform-cpt"
                                              onClick={() =>
                                                DeleteCommentFromSecond(replies)
                                              }
                                            >
                                              Report
                                            </Text>
                                          </a>
                                        </div>,
                                      ]}
                                      children={
                                        replies.replies_to_reply
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
                                                    content={
                                                      repliesToReply.content
                                                    }
                                                    author={
                                                      repliesToReply.author
                                                        .username
                                                    }
                                                    actions={[
                                                      <a
                                                        onClick={() =>
                                                          DeleteCommentFromThird(
                                                            repliesToReply
                                                          )
                                                        }
                                                      >
                                                        <Text type="danger">
                                                          Delete
                                                        </Text>
                                                      </a>,
                                                    ]}
                                                  />
                                                );
                                              }
                                            )
                                          : null
                                      }
                                    />
                                  ) : null;
                                })
                              : null
                          }
                        />
                      </List.Item>
                    );
                  }}
                />
              ) : (
                <Row justify="center" className="mt-30 pd-10">
                  <Col
                    className="d-flex flex-column"
                    xs={24}
                    sm={24}
                    md={16}
                    lg={12}
                    xl={12}
                    xxl={10}
                  >
                    <Text className="ta-center fs-18" strong>
                      No comments found
                    </Text>
                    <img src="/no-comment.svg" />
                  </Col>
                </Row>
              )}

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
                          insertReply({
                            variables: {
                              commentId: newData.comment.id,
                              userId: props.user.id,
                              content: values.reply,
                            },
                          });
                          setShowReply(false);
                        } else {
                          console.log("replying to reply");
                          replyToReply({
                            variables: {
                              replyId: newData.reply.id,
                              userId: props.user.id,
                              content: values.reply,
                            },
                          });
                          setShowReply(false);
                        }
                      }}
                    >
                      <Form.Item
                        label={
                          <div className="d-flex">
                            <Avatar
                              size={45}
                              className="mt-20"
                              src={props.user.profilePicture}
                            />
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
                        <Mentions
                          className="mt-10"
                          rows={4}
                          placeholder="Reply"
                        >
                          <Mentions.Option key="1" value="afzaal">
                            Afzaal
                          </Mentions.Option>
                          <Mentions.Option key="2" value="duka">
                            Duka
                          </Mentions.Option>
                        </Mentions>
                      </Form.Item>
                      <Form.Item className="wd-100pc">
                        <Button
                          type="link"
                          className="ml-auto"
                          htmlType="submit"
                        >
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
        </>
      ) : (
        <Row justify="center">
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={10}>
            <Result
              title="Ooops - Article not found"
              subTitle={
                <Text strong>
                  Sorry, The article has either been removed or you followed a
                  broken link
                </Text>
              }
              status="warning"
              icon={
                <img
                  src="/article-not-found.svg"
                  height={400}
                  width="100%"
                  className="o-fit-cover"
                />
              }
              extra={
                <Button type="primary" onClick={() => router.back()}>
                  Go Back
                </Button>
              }
            />
          </Col>
        </Row>
      )}
    </Wrapper>
  );
};

export default Article;

export const getServerSideProps = withSession(async function ({
  req,
  res,
  query,
}) {
  const user = req.session.get(["session"]);
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: getArticleQuery,
    variables: {
      articleSlug: query.articleTitle,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      user: user ? user : null,
    },
  };
});
