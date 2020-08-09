import {
  Row,
  Col,
  Card,
  Typography,
  Divider,
  Button,
  List,
  Skeleton,
} from "antd";
import Wrapper from "components/global/wrapper";
import { gql, useQuery } from "@apollo/client";
import { initializeApollo } from "lib/apolloClient";
import withSession from "lib/session";
import gradient from "random-gradient";
import ProgressiveImage from "react-progressive-graceful-image";
import Reactions from "components/global/reactions/reacts";
import InfiniteScroll from "react-infinite-scroller";
import Moment from "react-moment";
import { BreadcrumbJsonLd } from "next-seo";

const getTopicQuery = gql`
  query getTopic($slug: String, $limit: Int, $offset: Int) {
    topic(where: { slug: { _eq: $slug } }) {
      id
      slug
      title
      description
    }

    reactions {
      id
      code
      color
      gradient
      name
      type
    }
  }
`;

const getArticleQuery = gql`
  query getArticles($offset: Int, $limit: Int, $slug: String) {
    articles(
      offset: $offset
      limit: $limit
      order_by: { updated_at: desc }
      where: { article_topic: { slug: { _eq: $slug } } }
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

    articles_aggregate(where: { article_topic: { slug: { _eq: $slug } } }) {
      aggregate {
        count
      }
    }
  }
`;

const getTopArticlesQuery = gql`
  query getTopArticles($slug: String!) {
    articles(
      order_by: { views_aggregate: { count: desc } }
      where: { article_topic: { slug: { _eq: $slug } } }
      limit: 5
    ) {
      title
      featured_image
      article_category {
        title
        slug
      }
      slug
      views_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

const getFeaturedArticlesQuery = gql`
  query getFeaturedArticles($slug: String!) {
    articles(
      where: {
        featured: { _eq: true }
        article_topic: { slug: { _eq: $slug } }
      }
    ) {
      title
      slug
      featured_image
      article_category {
        title
        slug
      }
    }
  }
`;

const getTopic2Query = gql`
  query getTopics($slug: String!) {
    topic(where: { slug: { _eq: $slug } }) {
      title
      description
      slug
      cover
    }
  }
`;
const { Title, Text, Paragraph } = Typography;

const Topic = (props) => {
  const { data: getTopicData, loading: getTopicLoading, fetchMore } = useQuery(
    getTopicQuery,
    {
      variables: {
        slug: props.slug,
        limit: 5,
        offset: 0,
      },
    }
  );

  const {
    data: getArticleData,
    loading: getArticleLoading,
    fetchMore: fetchMore2,
  } = useQuery(getArticleQuery, {
    variables: {
      slug: props.slug,
      limit: 5,
      offset: 0,
    },
  });

  const { data: getTopic2Data } = useQuery(getTopic2Query, {
    ssr: true,
    variables: {
      slug: props.slug,
    },
  });

  const { data: getTopArticlesData, loading: getTopArticlesLoading } = useQuery(
    getTopArticlesQuery,
    {
      variables: {
        slug: props.slug,
      },
    }
  );

  const {
    data: getFeaturedArticlesData,
    loading: getFeaturedArticlesLoading,
  } = useQuery(getFeaturedArticlesQuery, {
    variables: {
      slug: props.slug,
    },
  });

  return (
    <>
      <Wrapper
        seo={{
          title: getTopic2Data.topic[0].title,
          description: getTopic2Data.topic[0].description,
          images: [
            {
              url:
                getTopic2Data.topic[0].cover !== null
                  ? "https://ik.imagekit.io/ttr/tr:n-high/" +
                    getTopic2Data.topic[0].cover
                  : null,
              width: 650,
              height: 450,
              alt: "OG Topic Image",
            },
          ],
        }}
        user={props.user}
      >
        <BreadcrumbJsonLd
          itemListElements={[
            {
              position: 1,
              name: "Home",
              item: "https://techtorehab.com",
            },
            {
              position: 2,
              name: "topics",
              item: "https://techtorehab.com/topics",
            },
            {
              position: 3,
              name: getTopic2Data.topic[0].title,
              item:
                "https://techtorehab.com/category/" +
                getTopic2Data.topic[0].slug,
            },
          ]}
        />
        <Row justify="center" className="mg-y-20">
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={22}>
            <Card
              bodyStyle={{
                padding: 10,
              }}
              cover={
                getTopic2Data && getTopic2Data.topic[0].cover ? (
                  <ProgressiveImage
                    src={
                      "https://ik.imagekit.io/ttr/tr:n-high/" +
                      getTopic2Data.topic[0].cover
                    }
                    placeholder={
                      "https://ik.imagekit.io/ttr/tr:n-high_placeholder/" +
                      getTopic2Data.topic[0].cover
                    }
                    threshold={1}
                    delay={600}
                  >
                    {(src) => (
                      <img
                        src={src}
                        height={300}
                        width="100%"
                        style={{
                          objectPosition: "top",
                        }}
                        alt={`Featured image for category ${getTopic2Data.topic[0].title} on TechtoRehab`}
                      />
                    )}
                  </ProgressiveImage>
                ) : (
                  <div
                    className="d-flex jc-center flex-column ai-center"
                    style={{
                      height: 300,
                    }}
                  >
                    <div
                      style={{
                        background: gradient(getTopic2Data.topic[0].title),
                        height: 300,
                        position: "relative",
                        zIndex: 1,
                        width: "100%",
                      }}
                    />
                    <Paragraph
                      className="ta-center fs-26 fw-bold t-transform-cpt line-clamp-2"
                      style={{
                        position: "absolute",
                        zIndex: 2,
                        top: 130,

                        color: "white",
                      }}
                    >
                      {getTopic2Data.topic[0].title}
                    </Paragraph>
                  </div>
                )
              }
            >
              <Row justify="space-between">
                <Col xs={24} sm={24} md={24} lg={15} xl={14} xxl={13}>
                  <Divider
                    orientation="left"
                    style={{
                      fontSize: 18,
                    }}
                  >
                    Latest Entries
                  </Divider>
                  {getArticleLoading || getTopicLoading ? (
                    <div className="mt-30">
                      <Skeleton
                        className="mt-30"
                        active
                        avatar
                        round
                        paragraph={{
                          rows: 1,
                        }}
                      />
                      <Skeleton
                        className="mt-30"
                        active
                        avatar
                        round
                        paragraph={{
                          rows: 1,
                        }}
                      />
                    </div>
                  ) : (
                    <InfiniteScroll
                      initialLoad={false}
                      pageStart={0}
                      hasMore={
                        getArticleData.articles.length > 0
                          ? getArticleData.articles_aggregate.aggregate.count >
                            getArticleData.articles.length
                            ? true
                            : false
                          : false
                      }
                      loadMore={() =>
                        fetchMore2({
                          variables: {
                            offset: getArticleData.articles.length,
                          },
                          updateQuery: (previous, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return previous;
                            return Object.assign({}, previous, {
                              articles: [
                                ...previous.articles,
                                ...fetchMoreResult.articles,
                              ],
                            });
                          },
                        })
                      }
                      loader={
                        <>
                          <Skeleton
                            className="mt-20"
                            avatar
                            title
                            paragraph={{ rows: 1 }}
                            active
                            key="sk-1"
                          />
                          <Skeleton
                            className="mt-20"
                            avatar
                            title
                            paragraph={{ rows: 1 }}
                            active
                            round
                            key="sk-2"
                          />

                          <Skeleton
                            className="mt-20"
                            avatar
                            title
                            paragraph={{ rows: 1 }}
                            active
                            round
                            key="sk-2"
                          />

                          <Skeleton
                            className="mt-20"
                            avatar
                            title
                            paragraph={{ rows: 1 }}
                            active
                            round
                            key="sk-2"
                          />

                          <Skeleton
                            className="mt-20"
                            avatar
                            title
                            paragraph={{ rows: 1 }}
                            active
                            round
                            key="sk-2"
                          />
                        </>
                      }
                      useWindow={true}
                    >
                      <List
                        dataSource={
                          getArticleData ? getArticleData.articles : []
                        }
                        itemLayout="vertical"
                        renderItem={(item) => (
                          <List.Item
                            className="article-list-item"
                            extra={[
                              <a
                                href={`/article/${item.article_category.slug}/${getTopic2Data.topic[0].slug}/${item.slug}`}
                              >
                                {console.log(getArticleData.articles.length)}
                                <ProgressiveImage
                                  src={
                                    "https://ik.imagekit.io/ttr/tr:n-med/" +
                                    item.featured_image
                                  }
                                  placeholder={
                                    "https://ik.imagekit.io/ttr/tr:n-med_placeholder/" +
                                    item.featured_image
                                  }
                                  threshold={1}
                                  delay={600}
                                >
                                  {(src) => (
                                    <img
                                      className="list-image"
                                      src={src}
                                      alt={`Featured Image for ${item.title} on TechtoRehab`}
                                    />
                                  )}
                                </ProgressiveImage>
                              </a>,
                            ]}
                            actions={[
                              <Moment className="ml-10" fromNow>
                                {item.updated_at}
                              </Moment>,
                              <Row className="">
                                <Reactions
                                  reactions={getTopicData.reactions}
                                  data={item.reactions_to_articles}
                                />
                              </Row>,
                            ]}
                          >
                            <List.Item.Meta
                              title={
                                <a
                                  href={`/article/${item.article_category.slug}/${getTopic2Data.topic[0].slug}/${item.slug}`}
                                >
                                  <Paragraph className="mr-20 ml-10 fs-16 line-clamp-2">
                                    {item.title}
                                  </Paragraph>
                                </a>
                              }
                              description={
                                <Paragraph className="mr-20 ml-10 line-clamp-2">
                                  {item.excerpt}
                                </Paragraph>
                              }
                            />
                          </List.Item>
                        )}
                      />
                    </InfiniteScroll>
                  )}
                </Col>
                <Col xs={24} sm={24} md={24} lg={8} xl={9} xxl={9}>
                  <Card
                    bordered={false}
                    title={
                      <div className="d-flex">
                        <i className="ri-star-line mr-10 va-minus-4 fs-20"></i>
                        <Text
                          style={{
                            marginTop: 2,
                          }}
                        >
                          Featured
                        </Text>
                      </div>
                    }
                  >
                    {getFeaturedArticlesLoading ? (
                      <Skeleton
                        active
                        avatar={{
                          shape: "circle",
                        }}
                        paragraph={false}
                        title
                        round
                      />
                    ) : (
                      <List
                        dataSource={
                          getFeaturedArticlesData &&
                          getFeaturedArticlesData.articles.length > 0
                            ? getFeaturedArticlesData.articles
                            : []
                        }
                        renderItem={(item) => (
                          <List.Item>
                            <List.Item.Meta
                              title={
                                <Paragraph className="fs-14 line-clamp-2">
                                  <a
                                    href={`/article/${item.article_category.title}/${getTopic2Data.topic[0].slug}/${item.slug}`}
                                    style={{
                                      color: "inherit",
                                    }}
                                  >
                                    {item.title}
                                  </a>
                                </Paragraph>
                              }
                              avatar={
                                <ProgressiveImage
                                  src={
                                    "https://ik.imagekit.io/ttr/tr:n-avatar/" +
                                    item.featured_image
                                  }
                                  placeholder={
                                    "https://ik.imagekit.io/ttr/tr:n-avatar_placeholder/" +
                                    item.featured_image
                                  }
                                  threshold={1}
                                  delay={600}
                                >
                                  {(src) => (
                                    <img
                                      src={src}
                                      alt={`Featured image for ${item.title} on TechtoRehab`}
                                      style={{
                                        height: 45,
                                        width: 45,
                                        borderRadius: "50%",
                                      }}
                                    />
                                  )}
                                </ProgressiveImage>
                              }
                            />
                          </List.Item>
                        )}
                      />
                    )}
                  </Card>
                  <Card
                    bordered={false}
                    title={
                      <div className="d-flex">
                        <i className="ri-trophy-line mr-10 va-minus-4 fs-20"></i>
                        <Text
                          style={{
                            marginTop: 2,
                          }}
                        >
                          Top 5
                        </Text>
                      </div>
                    }
                  >
                    {getTopArticlesLoading ? (
                      <Skeleton
                        active
                        avatar={{
                          shape: "circle",
                        }}
                        paragraph={false}
                        title
                        round
                      />
                    ) : (
                      <List
                        dataSource={
                          getTopArticlesData &&
                          getTopArticlesData.articles.length > 0
                            ? getTopArticlesData.articles
                            : []
                        }
                        renderItem={(item) => (
                          <List.Item>
                            <List.Item.Meta
                              title={
                                <Paragraph className="fs-14 line-clamp-2">
                                  <a
                                    href={`/article/${item.article_category.title}/${getTopic2Data.topic[0].slug}/${item.slug}`}
                                    style={{
                                      color: "inherit",
                                    }}
                                  >
                                    {item.title}
                                  </a>
                                </Paragraph>
                              }
                              avatar={
                                <ProgressiveImage
                                  src={
                                    "https://ik.imagekit.io/ttr/tr:n-avatar/" +
                                    item.featured_image
                                  }
                                  placeholder={
                                    "https://ik.imagekit.io/ttr/tr:n-avatar_placeholder/" +
                                    item.featured_image
                                  }
                                  threshold={1}
                                  delay={600}
                                >
                                  {(src) => (
                                    <img
                                      src={src}
                                      className="o-fiit-cover"
                                      alt={`Featured Image for ${item.title} on TechtoRehab`}
                                      style={{
                                        height: 45,
                                        width: 45,
                                        borderRadius: "50%",
                                      }}
                                    />
                                  )}
                                </ProgressiveImage>
                              }
                            />
                          </List.Item>
                        )}
                      />
                    )}
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Wrapper>
    </>
  );
};

export default Topic;

export const getServerSideProps = withSession(async ({ req, res, params }) => {
  const { topicSlug } = params;
  const user = req.session.get(["session"]);
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: getTopic2Query,
    variables: {
      slug: topicSlug,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      slug: topicSlug,
      user: user ? user : null,
    },
  };
});
