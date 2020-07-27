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
import { Reactions } from "components/global/reactions";

const getCategoryQuery = gql`
  query getCategories($slug: String!) {
    category(where: { slug: { _eq: $slug } }) {
      id
      slug
      title
      description
      articles_to_categories {
        title
        excerpt
        featured_image
        article_category {
          title
          slug
        }
        article_topic {
          title
          slug
        }
        slug
        reactions_to_articles {
          reaction_id
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
  query getTopArticles {
    articles(order_by: { views_aggregate: { count: desc } }) {
      title
      featured_image
      article_category {
        title
        slug
      }
      article_topic {
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
  query getFeaturedArticles {
    articles(where: { featured: { _eq: true } }) {
      title
      article_topic {
        title
        slug
      }
      slug
      featured_image
      article_category {
        title
        slug
      }
    }
  }
`;

const getCategory2Query = gql`
  query getCategories($slug: String!) {
    category(where: { slug: { _eq: $slug } }) {
      title
      description
      cover
    }
  }
`;
const { Title, Text, Paragraph } = Typography;

const Categories = (props) => {
  const { data: getCategoryData, loading: getCategoryLoading } = useQuery(
    getCategoryQuery,
    {
      variables: {
        slug: props.slug,
      },
    }
  );

  const { data: getCategory2Data } = useQuery(getCategory2Query, {
    ssr: true,
    variables: {
      slug: props.slug,
    },
  });

  const { data: getTopArticlesData, loading: getTopArticlesLoading } = useQuery(
    getTopArticlesQuery
  );

  const {
    data: getFeaturedArticlesData,
    loading: getFeaturedArticlesLoading,
  } = useQuery(getFeaturedArticlesQuery);

  return (
    <>
      <Wrapper
        seo={{
          title: getCategory2Data.category[0].title,
          description: getCategory2Data.category[0].description,
        }}
        user={props.user}
      >
        <Row justify="center" className="mg-y-20">
          <Col xs={24} sm={24} md={24} lg={24} xl={20} xxl={16}>
            <Card
              bodyStyle={{
                padding: 10,
              }}
              cover={
                getCategory2Data && getCategory2Data.category[0].cover ? (
                  <ProgressiveImage
                    src={getCategory2Data.category[0].cover + ".webp"}
                    placeholder={
                      getCategory2Data.category[0].cover + "-placeholder.webp"
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
                        alt="an alternative text"
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
                        background: gradient(
                          getCategory2Data.category[0].title
                        ),
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
                      {getCategory2Data.category[0].title}
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
                  {getCategoryLoading ? (
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
                      dataSource={
                        getCategoryData.category[0].articles_to_categories
                      }
                      itemLayout="vertical"
                      renderItem={(item) => (
                        <List.Item
                          className="article-list-item"
                          extra={[
                            <a
                              href={`/article/${item.article_category.slug}/${item.article_topic.slug}/${item.slug}`}
                            >
                              <ProgressiveImage
                                src={item.featured_image + ".webp"}
                                placeholder={
                                  item.featured_image + "-placeholder.webp"
                                }
                                threshold={1}
                                delay={600}
                              >
                                {(src) => (
                                  <img
                                    className="list-image"
                                    src={src}
                                    alt="an alternative text"
                                  />
                                )}
                              </ProgressiveImage>
                            </a>,
                          ]}
                        >
                          <List.Item.Meta
                            title={
                              <a
                                href={`/article/${item.article_category.slug}/${item.article_topic.slug}/${item.slug}`}
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
                          <Reactions>
                            {getCategoryData.reactions.map((reaction) => {
                              if (
                                item.reactions_to_articles.find(
                                  (elem) => elem.reaction_id == reaction.id
                                )
                              ) {
                                console.log(item);
                                return (
                                  <>
                                    <div
                                      className="reaction-holder"
                                      key={reaction.name}
                                    >
                                      <div
                                        className="reaction fs-22"
                                        key={reaction.name}
                                      >
                                        <i
                                          className={`${reaction.code} va-middle`}
                                          style={reaction.gradient}
                                        ></i>
                                      </div>
                                    </div>
                                    <div className="reaction-total mt-10">
                                      {
                                        item.reactions_to_articles_aggregate
                                          .aggregate.count
                                      }
                                    </div>
                                  </>
                                );
                              }
                            })}
                          </Reactions>
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
                        <i class="ri-star-line mr-10 va-minus-4 fs-20"></i>
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
                          getFeaturedArticlesData
                            ? getFeaturedArticlesData.articles
                            : null
                        }
                        renderItem={(item) => (
                          <List.Item>
                            <List.Item.Meta
                              title={
                                <Paragraph className="fs-14 line-clamp">
                                  <a
                                    href={`/article/${item.article_category.title}/${item.article_topic.title}/${item.slug}`}
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
                                  src={item.featured_image + ".webp"}
                                  placeholder={
                                    item.featured_image + "-placeholder.webp"
                                  }
                                  threshold={1}
                                  delay={600}
                                >
                                  {(src) => (
                                    <img
                                      src={src}
                                      alt="an alternative text"
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
                        <i class="ri-trophy-line mr-10 va-minus-4 fs-20"></i>
                        <Text
                          style={{
                            marginTop: 2,
                          }}
                        >
                          Top
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
                          getTopArticlesData
                            ? getTopArticlesData.articles
                            : null
                        }
                        renderItem={(item) => (
                          <List.Item>
                            <List.Item.Meta
                              title={
                                <Paragraph className="fs-14 line-clamp">
                                  <a
                                    href={`/article/${item.article_category.title}/${item.article_topic.title}/${item.slug}`}
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
                                  src={item.featured_image + ".webp"}
                                  placeholder={
                                    item.featured_image + "-placeholder.webp"
                                  }
                                  threshold={1}
                                  delay={600}
                                >
                                  {(src) => (
                                    <img
                                      src={src}
                                      alt="an alternative text"
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
  const { categorySlug } = params;
  const user = req.session.get(["session"]);
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: getCategory2Query,
    variables: {
      slug: categorySlug,
    },
  });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      slug: categorySlug,
      user: user ? user : null,
    },
  };
});
