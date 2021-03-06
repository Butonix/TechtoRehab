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
        updated_at

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
      where: { article_category: { slug: { _eq: $slug } } }
      limit: 5
    ) {
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
  query getFeaturedArticles($slug: String!) {
    articles(
      where: {
        featured: { _eq: true }
        article_category: { slug: { _eq: $slug } }
      }
    ) {
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
      slug
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
      {console.log(props.slug)}
      <Wrapper
        seo={{
          title: getCategory2Data.category[0].title,
          description: getCategory2Data.category[0].description,
          images: [
            {
              url:
                getCategory2Data.category[0].cover !== null
                  ? "https://ik.imagekit.io/ttr/tr:n-high/" +
                    getCategory2Data.category[0].cover
                  : null,
              width: 650,
              height: 450,
              alt: "OG Category Image",
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
              name: "categories",
              item: "https://techtorehab.com/categories",
            },
            {
              position: 3,
              name: getCategory2Data.category[0].title,
              item:
                "https://techtorehab.com/category/" +
                getCategory2Data.category[0].slug,
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
                getCategory2Data && getCategory2Data.category[0].cover ? (
                  <ProgressiveImage
                    src={
                      "https://ik.imagekit.io/ttr/tr:n-high/" +
                      getCategory2Data.category[0].cover
                    }
                    placeholder={
                      "https://ik.imagekit.io/ttr/tr:n-high_placeholder/" +
                      getCategory2Data.category[0].cover
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
                        alt={`Featured image for category ${getCategory2Data.category[0].title} on TechtoRehab`}
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
                      className="ta-center fs-26 fw-bold t-transform-cpt line-clamp-2"
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
                                reactions={getCategoryData.reactions}
                                data={item.reactions_to_articles}
                              />
                            </Row>,
                          ]}
                        >
                          <List.Item.Meta
                            title={
                              <a
                                href={`/article/${item.article_category.slug}/${item.article_topic.slug}/${item.slug}`}
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
