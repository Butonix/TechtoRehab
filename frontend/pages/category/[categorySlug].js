import {
  Row,
  Col,
  Card,
  Typography,
  Divider,
  Button,
  List,
  Skeleton,
  Avatar,
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
      cover
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

const getCategory2Query = gql`
  query getCategories($slug: String!) {
    category(where: { slug: { _eq: $slug } }) {
      title
      description
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
                getCategoryData &&
                getCategoryData.category[0] &&
                getCategoryData.category[0].cover ? (
                  <img src={getCategoryData.category[0].cover} height={300} />
                ) : (
                  <div
                    className="d-flex jc-center flex-column"
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
                      }}
                    />
                    <Text
                      className="ta-center fs-26 fw-bold"
                      style={{
                        position: "relative",
                        zIndex: 2,
                        marginTop: -170,
                        color: "white",
                      }}
                    >
                      {getCategory2Data.category[0].title}
                    </Text>
                  </div>
                )
              }
            >
              <Title level={4} className="mt-10 mb-30">
                {getCategory2Data.category[0].title}
              </Title>
              {getCategoryLoading ? (
                <Skeleton active />
              ) : (
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
                    <List
                      dataSource={
                        getCategoryData.category[0].articles_to_categories
                      }
                      itemLayout="vertical"
                      renderItem={(item) => (
                        <List.Item
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
                                    src={src}
                                    alt="an alternative text"
                                    style={{
                                      maxWidth: 100,
                                      minWidth: 50,
                                      minHeight: 100,
                                      maxHeight: 100,
                                    }}
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
                                <Paragraph
                                  ellipsis={{ rows: 2 }}
                                  className="mr-20 ml-10 fs-16"
                                >
                                  {item.title}
                                </Paragraph>
                              </a>
                            }
                            description={
                              <Paragraph
                                ellipsis={{ rows: 2 }}
                                className="mr-20 ml-10"
                              >
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
                                );
                              }
                            })}
                          </Reactions>
                        </List.Item>
                      )}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={8} xl={9} xxl={9}>
                    <Card
                      bordered={false}
                      title={
                        <div className="d-flex">
                          <i class="ri-star-line mr-10 va-minus-4 fs-20"></i>
                          <Text>Featured</Text>
                        </div>
                      }
                    >
                      <List.Item actions={[<a>View</a>]}>
                        <List.Item.Meta
                          title={
                            <Paragraph
                              className="fs-14"
                              ellipsis={{
                                rows: 2,
                              }}
                            >
                              {
                                getCategoryData.category[0]
                                  .articles_to_categories[0].title
                              }
                            </Paragraph>
                          }
                          avatar={
                            <ProgressiveImage
                              src={
                                getCategoryData.category[0]
                                  .articles_to_categories[0].featured_image +
                                ".webp"
                              }
                              placeholder={
                                getCategoryData.category[0]
                                  .articles_to_categories[0].featured_image +
                                "-placeholder.webp"
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
                    </Card>
                    <Card
                      bordered={false}
                      className="mt-30"
                      title={
                        <div className="d-flex">
                          <i class="ri-trophy-line mr-10 va-minus-4 fs-20"></i>
                          <Text>Top</Text>
                        </div>
                      }
                    >
                      <List.Item actions={[<a>View</a>]}>
                        <List.Item.Meta
                          title={
                            <Paragraph
                              className="fs-14"
                              ellipsis={{
                                rows: 2,
                              }}
                            >
                              {
                                getCategoryData.category[0]
                                  .articles_to_categories[0].title
                              }
                            </Paragraph>
                          }
                          avatar={
                            <ProgressiveImage
                              src={
                                getCategoryData.category[0]
                                  .articles_to_categories[0].featured_image +
                                ".webp"
                              }
                              placeholder={
                                getCategoryData.category[0]
                                  .articles_to_categories[0].featured_image +
                                "-placeholder.webp"
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
                    </Card>
                  </Col>
                </Row>
              )}
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
