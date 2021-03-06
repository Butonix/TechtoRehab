import { gql } from "@apollo/client";

export const getArticlesQuery = gql`
  query MyQuery($offset: Int, $limit: Int, $id: uuid) {
    articles(
      offset: $offset
      limit: $limit
      order_by: { updated_at: desc }
      where: { featured: { _eq: false }, editors_pick: { _eq: false } }
    ) {
      id
      title
      excerpt
      content
      featured_image
      slug
      updated_at
      created_at
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

      bookmarks {
        bookmarkUser {
          id
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

    articles_aggregate(
      where: { featured: { _eq: false }, editors_pick: { _eq: false } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const getEditorspicksQuery = gql`
  query getEditorspicks {
    articles(where: { editors_pick: { _eq: true } }, limit: 5) {
      article_category {
        title
        slug
      }
      article_topic {
        slug
        title
      }
      excerpt
      featured_image
      id
      slug
      title
      updated_at
    }
  }
`;

export const getFeaturedArticlesQuery = gql`
  query getFeaturedArticles {
    articles(
      where: { featured: { _eq: true } }
      order_by: { updated_at: desc }
    ) {
      id
      featured_image
      content
      slug
      excerpt
      title
      users_to_articles {
        authors {
          username
        }
      }
      article_topic {
        title
        slug
      }
      article_category {
        title
        slug
      }
      bookmarks {
        bookmarkUser {
          id
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
    }

    reactions {
      id
      name
      code
      gradient
      color
      type
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
      bookmarkedArticle {
        featured
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
      returning {
        bookmarkedArticle {
          featured
        }
      }
    }
  }
`;
