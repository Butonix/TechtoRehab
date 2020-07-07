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
  Skeleton,
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
  Checkbox,
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
import LazyLoad from "react-lazyload";
import { monokaiSublime } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import dynamic from "next/dynamic";

//
//
//
//
//
//

const Syntax = dynamic(() => import("react-syntax-highlighter"), {
  ssr: false,
});

const CodeMirror = dynamic(
  () => import("react-codemirror2").then((res) => res.UnControlled),
  {
    ssr: false,
  }
);
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
  var count = 0;
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

  const reactionsMenu = (
    <Menu className="pd-5" style={{ borderRadius: 35 }}>
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
                      userId:
                        getArticleData.articles[0].users_to_articles.authors[0]
                          .id,
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
      <Head></Head>
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
                style={{ fontWeight: 600 }}
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
                    <Text strong>Read Time:</Text>
                    {getArticleData.articles[0].temp_content.blocks.map(
                      (blocks, index) => {
                        if (
                          blocks.type == "paragraph" ||
                          blocks.type == "title"
                        ) {
                          count =
                            count + blocks.data.text.split(" ").length - 1;
                        }

                        if (
                          index ==
                          getArticleData.articles[0].temp_content.blocks
                            .length -
                            1
                        ) {
                          return count < 200 ? (
                            <>
                              <Text className="lh-2-5" strong>
                                {"< 1"}
                              </Text>
                              <Text className="lh-2-5">{"minute"}</Text>
                            </>
                          ) : (
                            <>
                              <Text className="lh-2-5 mr-5" strong>
                                {Math.round(count / 200)}
                              </Text>
                              <Text className="lh-2-5">{"minute read"}</Text>
                            </>
                          );
                        }
                      }
                    )}
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
            <Col xs={24} sm={24} md={16} lg={12} xl={12} xxl={8} className="">
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
                    style={{ maxHeight: 400 }}
                  />
                )}
              </ProgressiveImage>
            </Col>
          </Row>
          <Row justify="center" className="mt-30">
            <Col xs={24} sm={24} md={16} lg={12} xl={12} xxl={12}>
              <div className="content">
                {getArticleData.articles[0].temp_content.blocks.map(
                  (blocks) => {
                    return blocks.type == "paragraph" ? (
                      <p
                        className="pd-10"
                        dangerouslySetInnerHTML={{ __html: blocks.data.text }}
                      />
                    ) : blocks.type == "header" ? (
                      <Title
                        level={blocks.data.level}
                        className="pd-10 mg-y-10"
                      >
                        {blocks.data.text.replace(/&nbsp;/g, "")}
                      </Title>
                    ) : blocks.type == "image" ? (
                      <ProgressiveImage
                        src={blocks.data.file.url}
                        placeholder={
                          blocks.data.file.url.slice(
                            0,
                            blocks.data.file.url.length - 5
                          ) + "-placeholder.webp"
                        }
                      >
                        {(src) => (
                          <figure>
                            <img
                              width="100%"
                              className={
                                (blocks.data.stretched ? "" : "pd-10") +
                                "o-fit-cover mg-y-20"
                              }
                              src={src}
                              style={{ maxWidth: 800, maxHeight: 400 }}
                            />
                            <Card>
                              {blocks.data.caption ? (
                                <figcaption className="mt-5 ml-10 fw-600">
                                  Caption -- {blocks.data.caption}
                                </figcaption>
                              ) : null}
                            </Card>
                          </figure>
                        )}
                      </ProgressiveImage>
                    ) : blocks.type == "checklist" ? (
                      <div className="d-flex flex-column ai-center mt-30 mb-30">
                        {blocks.data.items.map((item) => {
                          return (
                            <Checkbox checked={item.checked}>
                              {item.text}
                            </Checkbox>
                          );
                        })}
                      </div>
                    ) : blocks.type == "code" ? (
                      <Syntax
                        style={monokaiSublime}
                        language="auto-detect"
                        showLineNumbers
                      >
                        {blocks.data.code}
                      </Syntax>
                    ) : blocks.type == "list" ? (
                      <Row className="">
                        {blocks.data.style == "ordered" ? (
                          <ol>
                            {blocks.data.items.map((item) => (
                              <li>{item}</li>
                            ))}
                          </ol>
                        ) : (
                          <ul>
                            {blocks.data.items.map((item) => (
                              <li>{item}</li>
                            ))}
                          </ul>
                        )}
                      </Row>
                    ) : blocks.type == "linkTool" ? (
                      <Card className="mt-20 mg-x-10">
                        <Row>
                          <Col span={14}>
                            <a href={blocks.data.link}>
                              <Text className="fs-16" strong>
                                {blocks.data.meta.title}
                              </Text>
                            </a>
                            <Paragraph
                              className="fs-14 mt-10"
                              ellipsis={{ rows: 2 }}
                            >
                              {blocks.data.meta.description}
                            </Paragraph>
                          </Col>
                          <Col span={10} className="d-flex jc-end">
                            <a href={blocks.data.link}>
                              <img
                                width={100}
                                height={100}
                                src={blocks.data.meta.image.url}
                                className="o-fit-cover"
                              />
                            </a>
                          </Col>
                        </Row>
                      </Card>
                    ) : blocks.type == "delimiter" ? (
                      <Row className="pd-x-20 ">
                        <Divider />
                      </Row>
                    ) : blocks.type == "quote" ? (
                      <div className="pd-x-20 mg-y-10">
                        <List.Item>
                          <List.Item.Meta
                            avatar={<i class="ri-double-quotes-l fs-30" />}
                            title={blocks.data.caption}
                            description={blocks.data.text}
                          />
                        </List.Item>
                      </div>
                    ) : blocks.type == "warning" ? (
                      <div className="pd-x-20 mg-y-10">
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <i
                                class="ri-error-warning-fill fs-30"
                                style={{
                                  color: "#fbc500",
                                }}
                              />
                            }
                            title={blocks.data.title}
                            description={blocks.data.message}
                          />
                        </List.Item>
                      </div>
                    ) : blocks.type == "embed" ? (
                      <LazyLoad height={400} placeholder={<Skeleton loading />}>
                        <iframe
                          className="mg-y-20"
                          width="100%"
                          height={500}
                          src={blocks.data.embed}
                        />
                        {blocks.data.caption ? (
                          <Card>
                            <Text className="pd-y-20 ml-10" strong>
                              Caption -- {blocks.data.caption}
                            </Text>
                          </Card>
                        ) : null}
                      </LazyLoad>
                    ) : null;
                  }
                )}
              </div>
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
                      userId:
                        getArticleData.articles[0].users_to_articles.authors.id,
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
                              userId:
                                getArticleData.articles[0].users_to_articles
                                  .authors.id,
                              content: values.reply,
                            },
                          });
                          setShowReply(false);
                        } else {
                          replyToReply({
                            variables: {
                              replyId: newData.reply.id,
                              userId:
                                getArticleData.articles[0].users_to_articles
                                  .authors.id,
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
                              src={
                                props.user ? props.user.profilePicture : null
                              }
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
