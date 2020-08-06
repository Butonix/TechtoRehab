import { Dropdown, Typography, message, Menu, Popover } from "antd";
import styled from "styled-components";
import { gql, useLazyQuery, useMutation } from "@apollo/client";

const { Text, Title } = Typography;

const updateReactionQuery = gql`
  mutation updateReaction(
    $userId: uuid!
    $articleId: uuid!
    $reactionId: uuid!
  ) {
    update_reactions_to_articles(
      where: { user_id: { _eq: $userId }, article_id: { _eq: $articleId } }
      _set: { reaction_id: $reactionId }
    ) {
      affected_rows
    }
  }
`;

const insertReactionQuery = gql`
  mutation insertReaction(
    $userId: uuid!
    $articleId: uuid!
    $reactionId: uuid!
  ) {
    insert_reactions_to_articles_one(
      object: {
        article_id: $articleId
        reaction_id: $reactionId
        user_id: $userId
      }
    ) {
      reaction_id
    }
  }
`;

const deleteReactionQuery = gql`
  mutation deleteReaction($userId: uuid!, $articleId: uuid!) {
    delete_reactions_to_articles(
      where: { article_id: { _eq: $articleId }, user_id: { _eq: $userId } }
    ) {
      affected_rows
    }
  }
`;

const ReactionsOverlay = styled.div`
  display: flex;

  i {
    :hover {
      transition: all 400ms cubic-bezier(0.47, 1.64, 0.41, 0.8);
      transform: scale3d(5);
      -webkit-transform: scale3d(2, 2, 2);
    }
  }
`;

const ReactionDropdown = (props) => {
  const [addReaction] = useMutation(insertReactionQuery, {
    onCompleted: () => {
      props.refetch();
      props.setReacted(true);
    },
  });
  const [updateReaction] = useMutation(updateReactionQuery, {
    onCompleted: () => {
      message.success("Reaction Updated");
      props.refetch();
    },
  });
  const [deleteReaction] = useMutation(deleteReactionQuery, {
    onCompleted: () => {
      props.refetch();
      props.setReacted(false);
    },
  });
  return (
    <a className="d-flex">
      <Popover
        trigger="hover"
        arrowPointAtCenter
        placement="topRight"
        autoAdjustOverflow={true}
        content={
          <ReactionsOverlay>
            {props.reactions.map((reaction) => {
              return (
                <Dropdown
                  key={reaction.id}
                  trigger={["click", "hover"]}
                  overlay={
                    <div
                      className="ta-center"
                      style={{
                        background: "rgb(0,0,0,0.8)",
                        borderRadius: 10,
                        width: 80,
                        color: "white",
                      }}
                    >
                      <Text
                        key={reaction.id}
                        className="t-transform-cpt mt-10 ta-center fs-14"
                        style={{
                          color: "rgb(255,255,255,0.8)",
                        }}
                        strong
                      >
                        {reaction.name}
                      </Text>
                    </div>
                  }
                  placement="topRight"
                >
                  <i
                    key={reaction.id}
                    className={`${reaction.code} enable-text-gradient va-minus-6 fs-28 mg-x-15`}
                    style={reaction.gradient}
                    key={reaction.id}
                    onClick={() => {
                      if (props.user && props.user.id.length > 0) {
                        if (props.reacted) {
                          updateReaction({
                            variables: {
                              userId: props.id,
                              articleId: props.articleId,
                              reactionId: reaction.id,
                            },
                          });
                        } else {
                          addReaction({
                            variables: {
                              userId: props.id,
                              articleId: props.articleId,
                              reactionId: reaction.id,
                            },
                          });
                        }
                      } else {
                        props.login(true);
                      }
                    }}
                  />
                </Dropdown>
              );
            })}
          </ReactionsOverlay>
        }
      >
        {props.reacted == true ? (
          <div className="mt-5">
            {props.data
              .filter((filter) => filter.user.id == props.id)
              .map((mapped) => (
                <div key={mapped.reaction.id}>
                  <i
                    key={mapped.reaction.id}
                    className={`${mapped.reaction.code} fs-24 va-middle enable-text-gradient`}
                    style={mapped.reaction.gradient}
                  />
                  <Text strong className="mr-10 ml-10 lh-1 t-transform-cpt ">
                    {mapped.reaction.name}
                  </Text>
                </div>
              ))}
          </div>
        ) : (
          <i
            className="ri-thumb-up-line va-minus-6 lh-2 fs-22"
            style={{
              color: "#3c3c3c",
            }}
          ></i>
        )}
      </Popover>
      {props.reacted ? (
        <div
          onClick={() => {
            deleteReaction({
              variables: {
                userId: props.id,
                articleId: props.articleId,
              },
            });
          }}
        >
          <Text
            style={{
              color: "inherit",
              lineHeight: 3.2,
            }}
            className="mr-10 ml-10 t-transform-cpt"
          >
            Remove
          </Text>
        </div>
      ) : null}
    </a>
  );
};

export default ReactionDropdown;
