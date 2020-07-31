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
  Checkbox,
} from "antd";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { initializeApollo } from "lib/apolloClient";
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
  updateViewsQuery,
  updateReactionQuery,
  removeReactionQuery,
} from "components/article/queries";
import withSession from "lib/session";
import dynamic from "next/dynamic";
import Skeleton, { Comment as Comments } from "@nejcm/react-skeleton";
import { useStoreActions } from "easy-peasy";
import { NextSeo } from "next-seo";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { nanoid } from "nanoid";
import ProgressiveImage from "react-progressive-graceful-image";
import Reactions from "components/global/reactions/reacts";
import ReactionsOverlay from "components/global/reactions/reacts-dropdown";
import { IKImage, IKContext, IKUpload } from "imagekitio-react";

//
//
//
//
//
//
const publicIp = require("public-ip");

const Syntax = dynamic(() => import("react-syntax-highlighter"), {
  ssr: false,
});

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
  const setLoginModal = useStoreActions(
    (actions) => actions.site.setLoginModal
  );
  const [reactionsModal, setReactionsModal] = useState(false);
  const [reacted, setReacted] = useState(false);
  var time = 0;
  var count = 0;

  useEffect(() => {
    if (getArticleData && getArticleData.articles[0]) {
      if (!JSON.parse(localStorage.getItem(getArticleData.articles[0].id))) {
        var a = new Date();
        localStorage.setItem(
          getArticleData.articles[0].id,
          JSON.stringify({
            ip: props.ip,
            expire: a.setDate(a.getDate() + 1),
          })
        );
        updateViews({
          variables: {
            id: getArticleData.articles[0].id,
            ip: props.ip,
          },
        });
      } else {
        var item = JSON.parse(
          localStorage.getItem(getArticleData.articles[0].id)
        );
        if (new Date() > new Date(item.expire)) {
          var a = new Date();
          localStorage.setItem(
            getArticleData.articles[0].id,
            JSON.stringify({
              ip: props.ip,
              expire: a.setDate(a.getDate() + 1),
            })
          );
          updateViews({
            variables: {
              id: getArticleData.articles[0].id,
              ip: props.ip,
            },
          });
        }
      }
      getArticleData.articles[0].reactions_to_articles.map((item) => {
        if (props.user) {
          if (item.user.id == props.user.id) {
            setReacted(true);
          }
        }
      });
    }
  }, []);

  //
  //
  //
  //
  //
  //

  const {
    loading,
    data: getArticleData,
    error: getArticleError,
    refetch: getArticleRefetch,
  } = useQuery(getArticleQuery, {
    variables: {
      articleSlug: articleTitle,
    },
    fetchPolicy: "cache-and-network",
  });

  //
  //
  //

  const [updateViews, { data: updateViewsData }] = useMutation(
    updateViewsQuery,
    {}
  );

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
        // return window.scrollTo(0, document.body.scrollHeight);
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

  const [updateReaction] = useMutation(updateReactionQuery, {
    onCompleted: () => getArticleRefetch(),
  });

  const [removeReaction] = useMutation(removeReactionQuery, {
    onCompleted: () => getArticleRefetch(),
  });

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

  return (
    <Wrapper
      user={props.user}
      seo={{
        title: getArticleData
          ? getArticleData.articles[0].title
          : "Tech To Rehab",
        description: getArticleData
          ? getArticleData.articles[0].excerpt
          : "The Open Source Collaboration Platform",
      }}
    >
      {getArticleData.articles[0] ? (
        <>
          <Row justify="center" className="mb-30">
            <Col xs={24} sm={24} md={20} lg={14} xl={12} xxl={10}>
              <Title level={1} className="lh-1-5 pd-x-20 mt-30">
                {getArticleData.articles[0].title}
              </Title>

              <Paragraph className="pd-x-20 lh-2 mt-10 fs-14 line-clamp">
                {getArticleData.articles[0].excerpt}
              </Paragraph>
              <div className="d-flex pd-x-20">
                <Space>
                  {getArticleData.articles[0].content.blocks.map(
                    (blocks, index) => {
                      if (
                        blocks.type == "paragraph" ||
                        blocks.type == "title"
                      ) {
                        count = count + blocks.data.text.split(" ").length - 1;
                      }

                      if (
                        index ==
                        getArticleData.articles[0].content.blocks.length - 1
                      ) {
                        return count < 200 ? (
                          <div key={index}>
                            <Text className="lh-2-5" strong>
                              {"< 1 "}
                            </Text>
                            <Text className="lh-2-5">{"Minute Read"}</Text>
                          </div>
                        ) : (
                          <div key={index}>
                            <Text className="lh-2-5 mr-5" strong>
                              {Math.round(count / 200)}
                            </Text>
                            <Text className="lh-2-5">{"Minute read"}</Text>
                          </div>
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
              </div>
            </Col>
          </Row>

          <Row justify="center">
            <Col xs={24} sm={24} md={20} lg={16} xl={10} xxl={12}>
              <ProgressiveImage
                src={
                  "https://ik.imagekit.io/ttr/tr:n-high/" +
                  getArticleData.articles[0].featured_image
                }
                placeholder={
                  "https://ik.imagekit.io/ttr/tr:n-high_placeholder/" +
                  getArticleData.articles[0].featured_image
                }
                threshold={1}
                delay={600}
              >
                {(src) => (
                  <img
                    src={src}
                    className="article-title-image br-5"
                    alt="an alternative text"
                  />
                )}
              </ProgressiveImage>
            </Col>
          </Row>

          <Row justify="center" className="mt-20">
            <Col xs={24} sm={24} md={18} lg={14} xl={12} xxl={10}>
              <div className="content">
                {getArticleData.articles[0].content.blocks.map(
                  (blocks, index) => {
                    return blocks.type == "paragraph" ? (
                      <p
                        className="pd-x-10 mt-10 mb-10"
                        dangerouslySetInnerHTML={{ __html: blocks.data.text }}
                        key={index + blocks.type}
                      />
                    ) : blocks.type == "header" ? (
                      <Title
                        level={1}
                        className="pd-x-10 mt-30 mb-30 ml-10 mr-10"
                        key={index + blocks.type}
                        style={
                          index == "0" ? { marginTop: "20px !important" } : null
                        }
                      >
                        {blocks.data.text.replace(/&nbsp;/gi, "")}
                      </Title>
                    ) : blocks.type == "image" ? (
                      <Row justify="center" key={blocks.type + nanoid()}>
                        <figure className="mg-y-10 figure">
                          <ProgressiveImage
                            src={
                              "https://ik.imagekit.io/ttr/tr:n-high/" +
                              blocks.data.file.url.split("/")[4]
                            }
                            placeholder={
                              "https://ik.imagekit.io/ttr/tr:n-high_placeholder/" +
                              blocks.data.file.url.split("/")[4]
                            }
                            threshold={1}
                          >
                            {(src) => (
                              <img src={src} alt="an alternative text" />
                            )}
                          </ProgressiveImage>

                          {blocks.data.caption.length > 0 ? (
                            <Card key={index + blocks.type} bordered={false}>
                              <figcaption
                                className="mt-5 ml-10 ta-center"
                                key={index + blocks.type}
                              >
                                {blocks.data.caption.replace(/&nbsp;/gi, "")}
                              </figcaption>
                            </Card>
                          ) : null}
                        </figure>
                      </Row>
                    ) : blocks.type == "checklist" ? (
                      <div
                        className="d-flex flex-column mt-30 mb-30 ml-20"
                        key={index + blocks.type}
                      >
                        {blocks.data.items.map((item, indexe) => {
                          return (
                            <Checkbox
                              checked={item.checked}
                              key={indexe + blocks.type}
                            >
                              {item.text}
                            </Checkbox>
                          );
                        })}
                      </div>
                    ) : blocks.type == "code" ? (
                      <LazyLoad
                        height={300}
                        once
                        key={index + blocks.type}
                        placeholder={
                          <Skeleton>
                            <Skeleton.Rectangle height={300} />
                          </Skeleton>
                        }
                      >
                        <Syntax
                          style={props.theme}
                          language="auto-detect"
                          showLineNumbers
                          key={index + blocks.type}
                        >
                          {blocks.data.code}
                        </Syntax>
                      </LazyLoad>
                    ) : blocks.type == "list" ? (
                      <Row
                        className=""
                        key={index + blocks.type}
                        key={index + blocks.type}
                      >
                        {blocks.data.style == "ordered" ? (
                          <ol key={index + blocks.type}>
                            {blocks.data.items.map((item, indexa) => (
                              <li
                                key={indexa + blocks.type}
                                dangerouslySetInnerHTML={{ __html: item }}
                              />
                            ))}
                          </ol>
                        ) : (
                          <ul>
                            {blocks.data.items.map((item, indexo) => (
                              <li
                                key={indexo + blocks.type}
                                dangerouslySetInnerHTML={{ __html: item }}
                              />
                            ))}
                          </ul>
                        )}
                      </Row>
                    ) : blocks.type == "linkTool" ? (
                      <Row justify="center">
                        <Col xs={24} sm={24} md={22} lg={18} xl={18} xxl={16}>
                          <Card
                            className="mt-20 mb-20"
                            key={index + blocks.type}
                            cover={
                              <a href={blocks.data.link}>
                                <ProgressiveImage
                                  src={blocks.data.meta.image.url}
                                  threshold={1}
                                >
                                  {(src, loading) => {
                                    return loading ? (
                                      <div
                                        className="shine"
                                        style={{
                                          width: "100%",
                                          height: 400,
                                        }}
                                      />
                                    ) : (
                                      <img
                                        src={src}
                                        alt="an alternative text"
                                        className="link-image"
                                      />
                                    );
                                  }}
                                </ProgressiveImage>
                              </a>
                            }
                          >
                            <Col>
                              <a href={blocks.data.link}>
                                <Paragraph
                                  className="fs-16"
                                  strong
                                  ellipsis={{ rows: 2 }}
                                >
                                  {blocks.data.meta.title}
                                </Paragraph>
                              </a>
                              <Paragraph
                                className="fs-14 mt-10"
                                ellipsis={{ rows: 2 }}
                              >
                                {blocks.data.meta.description}
                              </Paragraph>
                              <Text>{blocks.data.meta.site_name}</Text>
                            </Col>
                          </Card>
                        </Col>
                      </Row>
                    ) : blocks.type == "delimiter" ? (
                      <Row className="pd-x-20" key={index + blocks.type}>
                        <Divider />
                      </Row>
                    ) : blocks.type == "quote" ? (
                      <div
                        className="pd-x-20 mg-y-10"
                        key={index + blocks.type}
                      >
                        <List.Item>
                          <List.Item.Meta
                            avatar={<i className="ri-double-quotes-l fs-30" />}
                            title={blocks.data.caption}
                            description={blocks.data.text}
                          />
                        </List.Item>
                      </div>
                    ) : blocks.type == "warning" ? (
                      <div
                        className="pd-x-20 mg-y-10"
                        key={index + blocks.type}
                      >
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <i
                                className="ri-error-warning-fill fs-30"
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
                      <LazyLoadComponent
                        height={500}
                        key={index + blocks.type}
                        placeholder={
                          <span>
                            <div
                              className="shine"
                              style={{
                                width: "100%",
                                height: 500,
                              }}
                            />
                          </span>
                        }
                        threshold={400}
                      >
                        <iframe
                          className="mg-y-20"
                          width="100%"
                          key={index + blocks.type}
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
                      </LazyLoadComponent>
                    ) : null;
                  }
                )}
              </div>
            </Col>
          </Row>
          <Row justify="center">
            <Col xs={24} sm={24} md={20} lg={18} xl={12} xxl={12}>
              <Card className="mt-20">
                <Row>
                  <Text className="fs-18 mb-20" strong>
                    Authors
                  </Text>
                </Row>

                <List
                  dataSource={getArticleData.articles[0].users_to_articles}
                  renderItem={(item) => {
                    return (
                      <List.Item
                        actions={[
                          <a href={`/user/${item.authors.username}`}>
                            View Profile
                          </a>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={
                            <ProgressiveImage
                              src={
                                item.authors.profile_picture &&
                                item.authors.profile_picture.length > 0
                                  ? item.authors.profile_picture.includes(
                                      "ik.imagekit.io"
                                    )
                                    ? "https://ik.imagekit.io/ttr/tr:n-avatar/" +
                                      item.authors.profile_picture
                                    : item.authors.profile_picture
                                  : "/blank.svg"
                              }
                              placeholder={
                                item.authors.profile_picture &&
                                item.authors.profile_picture.length > 0
                                  ? item.authors.profile_picture.includes(
                                      "ik.imagekit.io"
                                    )
                                    ? "https://ik.imagekit.io/ttr/tr:n-avatar_placeholder/" +
                                      item.authors.profile_picture
                                    : item.authors.profile_picture
                                  : "/blank.svg"
                              }
                              threshold={1}
                            >
                              {(src) => (
                                <img
                                  src={src}
                                  className="content-author-img"
                                  alt="an alternative text"
                                />
                              )}
                            </ProgressiveImage>
                          }
                          title={
                            <Text className="t-transform-cpt lh-2-5 fs-14">
                              {item.authors.username}
                            </Text>
                          }
                        />
                      </List.Item>
                    );
                  }}
                />
              </Card>
            </Col>
          </Row>
          <Row className="mt-10 mg-x-5 mb-20 mt-10" justify="center">
            <Col xs={24} sm={24} md={20} lg={18} xl={12} xxl={12}>
              <Divider orientation="left" className="mobile-bottom-bar-heading">
                React To This
              </Divider>
              <Card className="mobile-bottom-bar">
                <Row justify="space-between">
                  <Reactions
                    data={getArticleData.articles[0].reactions_to_articles}
                    reactions={getArticleData.reactions}
                  />
                  <ReactionsOverlay
                    id={props.user ? props.user.id : null}
                    data={getArticleData.articles[0].reactions_to_articles}
                    reactions={getArticleData.reactions}
                    articleId={getArticleData.articles[0].id}
                    reacted={reacted}
                    refetch={getArticleRefetch}
                    setReacted={setReacted}
                  />
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
                        <List.Item.Meta
                          title={<Text className="fs-14">Hello</Text>}
                        />
                      </List.Item>

                      <List.Item
                        actions={[<a key="list-loadmore-edit">View Source</a>]}
                      >
                        <List.Item.Meta
                          title={<Text className="fs-14">Hello</Text>}
                        />
                      </List.Item>
                    </List>
                  </div>
                </Row>
              </Card>
            </Col>
          </Row>

          <Row justify="center" className="pd-20">
            <Col xs={24} sm={24} md={20} lg={18} xl={12} xxl={10}>
              <Divider orientation="center">Comments</Divider>
              {props.user && props.user.id ? (
                <Form
                  wrapperCol={{ span: 24 }}
                  onFinish={(values) => {
                    return !props.user
                      ? setLoginModal(true)
                      : insertComment({
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
              ) : (
                <Card className="wd-100pc" bodyStyle={{ padding: 15 }}>
                  <Row justify="center">
                    <Text className="fs-14 ta-center" strong>
                      Please Signin To Comment
                    </Text>
                  </Row>
                </Card>
              )}

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

              <LazyLoadComponent
                threshold={-100}
                placeholder={
                  <span className="mt-30 lh-3">
                    <Skeleton>
                      <Comments />
                    </Skeleton>
                  </span>
                }
              >
                {getArticleData.articles[0].comments.length !== 0 ? (
                  <List
                    dataSource={getArticleData.articles[0].comments}
                    renderItem={(comment) => {
                      return (
                        <List.Item>
                          <Comment
                            key={comment.id}
                            datetime={
                              new Date(
                                comment.updated_at
                              ).toLocaleDateString() +
                              " at " +
                              new Date(comment.updated_at).toLocaleTimeString()
                            }
                            className="pd-10"
                            avatar={
                              <Avatar
                                src={
                                  comment.author.profile_picture.includes(
                                    "ik.imagekit.io"
                                  )
                                    ? "https://ik.imagekit.io/ttr/tr:n-avatar/" +
                                      comment.author.profile_picture
                                    : comment.author.profile_picture
                                }
                              />
                            }
                            author={
                              <a href={`/user/${comment.author.username}`}>
                                {comment.author.username}
                              </a>
                            }
                            content={comment.content}
                            actions={[
                              props.user ? (
                                <>
                                  <a
                                    className="t-transform-cpt mr-20"
                                    onClick={() => {
                                      return !props.user
                                        ? setLoginModal(true)
                                        : (setReplyData({ comment: comment }),
                                          setShowReply(true));
                                    }}
                                  >
                                    Reply To{" "}
                                    {comment.author.username ==
                                    props.user.username
                                      ? "Self"
                                      : comment.author.username}
                                  </a>
                                  ,
                                  {props.user ? (
                                    <a
                                      onClick={() =>
                                        comment.author.id == props.user.id
                                          ? deleteCommentFromTop(comment)
                                          : null
                                      }
                                    >
                                      {comment.author.id == props.user.id ? (
                                        <Text type="danger">Delete</Text>
                                      ) : null}
                                    </a>
                                  ) : null}
                                </>
                              ) : null,
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
                                              replies.replyAuthor.profile_picture.includes(
                                                "ik.imagekit.io"
                                              )
                                                ? "https://ik.imagekit.io/ttr/tr:n-avatar/" +
                                                  replies.replyAuthor
                                                    .profile_picture
                                                : replies.replyAuthor
                                                    .profile_picture
                                            }
                                          />
                                        }
                                        author={
                                          <a
                                            href={`/user/${replies.replyAuthor.username}`}
                                          >
                                            {replies.replyAuthor.username}
                                          </a>
                                        }
                                        actions={[
                                          props.user ? (
                                            <div className="d-flex wd-100pc">
                                              <a
                                                className="t-transform-cpt mr-20"
                                                onClick={() => {
                                                  return !props.user
                                                    ? setLoginModal(true)
                                                    : (setReplyData({
                                                        reply: replies,
                                                      }),
                                                      setShowReply(true));
                                                }}
                                              >
                                                Reply To{" "}
                                                {replies.replyAuthor.username ==
                                                props.user.username
                                                  ? "Self"
                                                  : replies.replyAuthor
                                                      .username}
                                              </a>
                                              <a
                                                onClick={() =>
                                                  replies.replyAuthor.id ==
                                                  props.user.id
                                                    ? DeleteCommentFromSecond(
                                                        replies
                                                      )
                                                    : null
                                                }
                                              >
                                                {replies.replyAuthor.id ==
                                                props.user.id ? (
                                                  <Text
                                                    type="danger"
                                                    className="t-transform-cpt"
                                                  >
                                                    Delete
                                                  </Text>
                                                ) : null}
                                              </a>
                                            </div>
                                          ) : null,
                                        ]}
                                        children={
                                          replies.replies_to_reply
                                            ? replies.replies_to_reply.map(
                                                (repliesToReply) => {
                                                  return (
                                                    <Comment
                                                      key={repliesToReply.id}
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
                                                            repliesToReply.author.profile_picture.includes(
                                                              "ik.imagekit.io"
                                                            )
                                                              ? "https://ik.imagekit.io/ttr/tr:n-avatar/" +
                                                                repliesToReply
                                                                  .author
                                                                  .profile_picture
                                                              : repliesToReply
                                                                  .author
                                                                  .profile_picture
                                                          }
                                                        />
                                                      }
                                                      content={
                                                        repliesToReply.content
                                                      }
                                                      author={
                                                        <a
                                                          href={`/user/${repliesToReply.author.username}`}
                                                        >
                                                          {
                                                            repliesToReply
                                                              .author.username
                                                          }
                                                        </a>
                                                      }
                                                      actions={[
                                                        props.user ? (
                                                          <a
                                                            onClick={() =>
                                                              repliesToReply
                                                                .author.id ==
                                                              props.user.id
                                                                ? DeleteCommentFromThird(
                                                                    repliesToReply
                                                                  )
                                                                : null
                                                            }
                                                          >
                                                            {repliesToReply
                                                              .author.id ==
                                                            props.user.id ? (
                                                              <Text type="danger">
                                                                Delete
                                                              </Text>
                                                            ) : null}
                                                          </a>
                                                        ) : null,
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
              </LazyLoadComponent>

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
                              src={
                                props.user
                                  ? "https://ik.imagekit.io/ttr/tr:n-avatar/" +
                                    props.user.profilePicture
                                  : null
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
        <>
          <NextSeo
            title="404 - Article Not Found!"
            description="The article you are looking for either doesn't exist or has been removed"
          />
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
        </>
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
  const monokai = (
    await import("react-syntax-highlighter/dist/cjs/styles/hljs")
  ).monokaiSublime;

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
      ip: await publicIp.v4(),
      theme: monokai,
      data: apolloClient.cache.extract(),
    },
  };
});
