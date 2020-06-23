import gql from "graphql-tag";

export const getArticlesQuery = gql`
  query MyQuery($offset: Int, $limit: Int) {
    articles(offset: $offset, limit: $limit) {
      id
      title
      excerpt
      content
      featured_image
      bookmark
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
    site_settings {
      setting_name
      setting_value
    }

    reactions {
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

export const updateBookmarkQuery = gql`
  mutation update($id: uuid!, $bookmark: Boolean!) {
    update_articles(
      where: { id: { _eq: $id } }
      _set: { bookmark: $bookmark }
    ) {
      affected_rows
    }
  }
`;
