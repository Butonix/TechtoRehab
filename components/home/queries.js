import { gql } from "@apollo/client";

export const getArticlesQuery = gql`
  query MyQuery($offset: Int, $limit: Int, $id: uuid) {
    articles(offset: $offset, limit: $limit, order_by: { updated_at: desc }) {
      id
      title
      excerpt
      content
      featured_image
      slug
      article_category {
        title
        slug
      }
      article_topic {
        title
        slug
      }
      users_to_articles {
        authors {
          username
          profile_picture
        }
      }
      reactions_to_articles {
        reaction {
          id
          name
          color
          code
          gradient
          type
        }

        user {
          username
          profile_picture
        }
      }

      bookmarks_aggregate(where: { userId: { _eq: $id } }) {
        aggregate {
          count
        }
      }

      views_aggregate {
        aggregate {
          count
        }
      }
    }

    reactions {
      id
      name
      code
      gradient
      color
      type
    }

    articles_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const insertBookmarkQuery = gql`
  mutation update($articleId: uuid!, $id: uuid!) {
    insert_articles_and_bookmarks_one(
      object: { articleId: $articleId, userId: $id }
    ) {
      bookmarkUser {
        username
      }
    }
  }
`;

export const deleteBookmarkQuery = gql`
  mutation deleteBookmark($articleId: uuid!, $id: uuid) {
    delete_articles_and_bookmarks(
      where: { articleId: { _eq: $articleId }, userId: { _eq: $id } }
    ) {
      affected_rows
    }
  }
`;