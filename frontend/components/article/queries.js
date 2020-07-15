import { gql } from "@apollo/client";

export const getArticleQuery = gql`
  query getArticle($articleSlug: String!) {
    articles(
      where: { slug: { _eq: $articleSlug } }
      order_by: { views_aggregate: { count: desc } }
    ) {
      id
      title
      content
      excerpt
      updated_at
      created_at
      featured_image
      reactions_to_articles {
        user {
          id
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
          profile_picture
        }
      }
      article_topic {
        title
      }
      article_category {
        title
      }

      views_aggregate {
        aggregate {
          count
        }
      }

      comments(order_by: { updated_at: desc }) {
        id
        content
        updated_at
        author {
          id
          profile_picture
          username
        }
        replies {
          id
          content
          updated_at
          commentId
          replyAuthor {
            id
            profile_picture
            username
          }
          replies_to_reply {
            id
            content
            updated_at
            replyId
            author {
              id
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

export const insertReactionQuery = gql`
  mutation insertReaction(
    $articleId: uuid!
    $reactionId: uuid!
    $userId: uuid!
  ) {
    insert_reactions_to_articles(
      objects: {
        article_id: $articleId
        reaction_id: $reactionId
        user_id: $userId
      }
    ) {
      affected_rows
    }
  }
`;

export const insertCommentQuery = gql`
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

export const insertReplyQuery = gql`
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

export const replyToReplyQuery = gql`
  mutation replyToReply($content: String!, $userId: uuid!, $replyId: uuid!) {
    insert_reply_and_reply(
      objects: { content: $content, userId: $userId, replyId: $replyId }
    ) {
      affected_rows
    }
  }
`;

export const deleteCommentQuery = gql`
  mutation deleteComment($id: uuid!) {
    delete_comments(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const deleteReplyQuery = gql`
  mutation deleteReply($id: uuid!, $commentId: uuid!) {
    delete_comments_and_replies(
      where: { id: { _eq: $id }, commentId: { _eq: $commentId } }
    ) {
      affected_rows
    }
  }
`;

export const deleteReplyToReplyQuery = gql`
  mutation deleteReplyToReply($id: uuid!, $replyId: uuid!) {
    delete_reply_and_reply(
      where: { id: { _eq: $id }, replyId: { _eq: $replyId } }
    ) {
      affected_rows
    }
  }
`;

export const updateViewsQuery = gql`
  mutation updateViews($id: uuid!, $ip: String!) {
    insert_articles_and_views_one(object: { articleId: $id, ip: $ip }) {
      ip
    }
  }
`;

export const updateReactionQuery = gql`
  mutation updateReaction($userId: uuid!, $reactionId: uuid!) {
    update_reactions_to_articles(
      where: { user_id: { _eq: $userId } }
      _set: { reaction_id: $reactionId }
    ) {
      affected_rows
    }
  }
`;

export const removeReactionQuery = gql`
  mutation removeReaction($id: uuid!, $articleId: uuid!) {
    delete_reactions_to_articles(
      where: { article_id: { _eq: $articleId }, user_id: { _eq: $id } }
    ) {
      affected_rows
    }
  }
`;
