import {
  Row,
  Col,
  Typography,
  Form,
  Input,
  Comment,
  Avatar,
  List,
  Space,
} from "antd";
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";

const getCommentsQuery = gql`
  query getComments {
    comments(limit: 5, order_by: { updated_at: desc }) {
      updated_at
      content
      id
      author {
        profile_picture
        username
      }
      article {
        title
      }
      replies(limit: 5) {
        updated_at
        commentId
        content
        id
        replyAuthor {
          profile_picture
          username
        }
        replies_to_reply(limit: 5) {
          updated_at
          replyId
          content
          id
          author {
            profile_picture
            username
          }
        }
      }
    }
  }
`;

const searchCommentQuery = gql`
  query searchComments($content: String!) {
    comments(
      limit: 5
      order_by: { updated_at: desc }
      where: { content: { _ilike: $content } }
    ) {
      id
      content
      author {
        profile_picture
        username
      }
      article {
        title
      }
      replies {
        id
        content
        commentId
        replyAuthor {
          profile_picture
          username
        }
        replies_to_reply {
          id
          content
          replyId
          author {
            profile_picture
            username
          }
        }
      }
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
const { Text, Title, Paragraph } = Typography;

const CommentsManager = () => {
  const {
    loading: getCommentsLoading,
    data: getCommentsData,
    error: getCommentsError,
    refetch: getCommentsRefetch,
  } = useQuery(getCommentsQuery);
  const [
    searchComments,
    {
      loading: searchCommentsLoading,
      data: searchCommentsData,
      error: searchCommentsError,
    },
  ] = useLazyQuery(searchCommentQuery, {
    onError: (err) => console.log(err),
  });

  const [deleteComment, { error: deleteCommentError }] = useMutation(
    deleteCommentQuery,
    {
      onError: (err) => console.log(err),
      onCompleted: () => getCommentsRefetch(),
    }
  );

  const [deleteReply, { error: deleteReplyError }] = useMutation(
    deleteReplyQuery,
    {
      onError: (err) => console.log(err),
      onCompleted: () => getCommentsRefetch(),
    }
  );

  const [deleteReplyToReply, { error: deleteReplyToReplyError }] = useMutation(
    deleteReplyToReplyQuery,
    {
      onError: (err) => console.log(err),
      onCompleted: () => getCommentsRefetch(),
    }
  );

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

  const DeleteCommentFromThird = (repliesToReplies) => {
    deleteReplyToReply({
      variables: {
        id: repliesToReplies.id,
        replyId: repliesToReplies.replyId,
      },
    });
  };
  return (
    <Row justify="center">
      <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={14} className="pd-10">
        <Title level={4} className="mt-20 mb-20">
          Search Comments
        </Title>
        <Form layout="vertical">
          <Form.Item label="Search Comment" name="search">
            <Input
              onChange={(val) => {
                var input = val.target.value;
                var sendInput = "%" + input + "%";
                if (input.length >= 1) {
                  searchComments({
                    variables: {
                      content: sendInput,
                    },
                  });
                } else {
                  searchComments({
                    variables: {
                      content: "%%",
                    },
                  });
                }
              }}
            />
          </Form.Item>
        </Form>

        <List
          dataSource={
            searchCommentsData
              ? searchCommentsData.comments
              : getCommentsData && getCommentsData.comments
              ? getCommentsData.comments
              : []
          }
          renderItem={(comments) => (
            <List.Item key={comments.id}>
              <Comment
                key={comments.id}
                actions={[
                  <Space>
                    <a
                      onClick={() => {
                        deleteCommentFromTop(comments);
                      }}
                    >
                      <Text type="danger">Delete</Text>
                    </a>
                  </Space>,
                ]}
                avatar={
                  <Avatar
                    src={
                      comments.author.profile_picture.includes("ik.imagekit.io")
                        ? "https://ik.imagekit.io/ttr/tr:n-avatar/" +
                          comments.author.profile_picture
                        : comments.author.profile_picture
                    }
                  />
                }
                datetime={
                  new Date(comments.updated_at).toLocaleDateString() +
                  " at " +
                  new Date(comments.updated_at).toLocaleTimeString()
                }
                content={comments.content}
                author={comments.author.username}
                children={
                  comments.replies
                    ? comments.replies.map((replies) => {
                        return (
                          <Comment
                            key={replies.id}
                            datetime={
                              new Date(
                                replies.updated_at
                              ).toLocaleDateString() +
                              " at " +
                              new Date(replies.updated_at).toLocaleTimeString()
                            }
                            avatar={
                              <Avatar
                                src={
                                  replies.replyAuthor.profile_picture.includes(
                                    "ik.imagekit.io"
                                  )
                                    ? "https://ik.imagekit.io/ttr/tr:n-avatar/" +
                                      replies.replyAuthor.profile_picture
                                    : replies.replyAuthor.profile_picture
                                }
                              />
                            }
                            content={replies.content}
                            author={replies.replyAuthor.username}
                            actions={[
                              <Space>
                                <a
                                  onClick={() => {
                                    DeleteCommentFromSecond(replies);
                                  }}
                                >
                                  <Text type="danger">Delete</Text>
                                </a>
                              </Space>,
                            ]}
                            children={
                              replies.replies_to_reply
                                ? replies.replies_to_reply.map(
                                    (repliesToReply) => {
                                      return (
                                        <Comment
                                          key={repliesToReply.id}
                                          actions={[
                                            <Space>
                                              <a
                                                onClick={() => {
                                                  DeleteCommentFromThird(
                                                    repliesToReply
                                                  );
                                                }}
                                              >
                                                <Text type="danger">
                                                  Delete
                                                </Text>
                                              </a>
                                            </Space>,
                                          ]}
                                          datetime={
                                            new Date(
                                              repliesToReply.updated_at
                                            ).toLocaleDateString() +
                                            " at " +
                                            new Date(
                                              repliesToReply.updated_at
                                            ).toLocaleTimeString()
                                          }
                                          content={repliesToReply.content}
                                          author={
                                            repliesToReply.author.username
                                          }
                                          avatar={
                                            repliesToReply.author.profile_picture.includes(
                                              "ik.imagekit.io"
                                            )
                                              ? "https://ik.imagekit.io/ttr/tr:n-avatar/" +
                                                repliesToReply.author
                                                  .profile_picture
                                              : repliesToReply.author
                                                  .profile_picture
                                          }
                                        />
                                      );
                                    }
                                  )
                                : null
                            }
                          />
                        );
                      })
                    : null
                }
              />
            </List.Item>
          )}
        />
        {/* {data && data.comments
          ? data.comments.map((comments) => {
              return (
                <Comment
                  avatar={<Avatar src={comments.author.profile_picture} />}
                  content={comments.content}
                  author={comments.author.username}
                  children={
                    comments.replies
                      ? comments.replies.commentId == comments.id
                        ? comments.replies.map((replies) => {
                            return (
                              <Comment
                                avatar={
                                  <Avatar
                                    src={replies.replyAuthor.profile_picture}
                                  />
                                }
                                content={replies.content}
                                author={replies.replyAuthor.username}
                                children={
                                  replies.replies_to_reply
                                    ? replies.replies_to_reply.replyId ==
                                      replies.id
                                      ? replies.replies_to_reply.map(
                                          (repliesToReply) => {
                                            return (
                                              <Comment
                                                content={repliesToReply.content}
                                                author={
                                                  repliesToReply.author.username
                                                }
                                                avatar={
                                                  repliesToReply.author
                                                    .profile_picture
                                                }
                                              />
                                            );
                                          }
                                        )
                                      : null
                                    : null
                                }
                              />
                            );
                          })
                        : null
                      : null
                  }
                />
              );
            })
          : null} */}
      </Col>
    </Row>
  );
};

export default CommentsManager;
