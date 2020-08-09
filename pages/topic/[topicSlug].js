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
// import ReactionsDropdown from "components/global/reactions/reacts-dropdown";
import Moment from "react-moment";
import { BreadcrumbJsonLd } from "next-seo";

const getTopicQuery = gql`
  query getCategories($slug: String!) {
    topic(where: { slug: { _eq: $slug } }) {
      id
      slug
      title
      description
      articles_to_topics {
        title
        excerpt
        featured_image
        updated_at

        article_category {
          title
          slug
        }

        slug
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
            reactions_to_reactions_aggregate {
              aggregate {
                count
              }
            }
          }
        }
        reactions_to_articles_aggregate {
          aggregate {
            count
          }
        }
      }
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

const Categories = (props) => {
  const { data: getTopicData, loading: getTopicLoading } = useQuery(
    getTopicQuery,
    {
      variables: {
        slug: props.slug,
      },
    }
  );

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
          <Col xs={24} sm={24} md={24} lg={24} xl={20} xxl={16}>
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
                      className="ta-center fs-26 fw-bold t-transform-cpt line-clamp"
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
                  {getTopicLoading ? (
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
                    <List
                      dataSource={getTopicData.topic[0].articles_to_topics}
                      itemLayout="vertical"
                      renderItem={(item) => (
                        <List.Item
                          className="article-list-item"
                          extra={[
                            <a
                              href={`/article/${item.article_category.slug}/${getTopic2Data.topic[0].slug}/${item.slug}`}
                            >
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
                                <Paragraph className="mr-20 ml-10 fs-16 line-clamp">
                                  {item.title}
                                </Paragraph>
                              </a>
                            }
                            description={
                              <Paragraph className="mr-20 ml-10 line-clamp">
                                {item.excerpt}
                              </Paragraph>
                            }
                          />
                        </List.Item>
                      )}
                    />
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
                                <Paragraph className="fs-14 line-clamp">
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
                                        height: 35,
                                        width: 35,
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
                                <Paragraph className="fs-14 line-clamp">
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
                                      alt={`Featured Image for ${item.title} on TechtoRehab`}
                                      style={{
                                        height: 35,
                                        width: 35,
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

export default Categories;

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
