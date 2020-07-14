import {
  Row,
  Col,
  Card,
  Typography,
  Button,
  List,
  Skeleton,
  Avatar,
} from "antd";
import Wrapper from "components/global/wrapper";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Head from "next/head";
import { initializeApollo } from "lib/apolloClient";
import withSession from "lib/session";
import gradient from "random-gradient";
import {
  LazyLoadImage,
  LazyLoadComponent,
  trackWindowScroll,
} from "react-lazy-load-image-component";
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
      }
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
          <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={16}>
            <Card
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
                <Row>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={15}
                    xl={14}
                    xxl={13}
                    className="mr-30"
                  >
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
                              <LazyLoadImage
                                className="o-fit-cover list-image"
                                placeholder={
                                  <img
                                    src={
                                      item.featured_image + "-placeholder.webp"
                                    }
                                  />
                                }
                                src={item.featured_image + ".webp"}
                              />
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
                                  className="mg-x-10"
                                >
                                  {item.title}
                                </Paragraph>
                              </a>
                            }
                            description={
                              <Paragraph
                                ellipsis={{ rows: 2 }}
                                className="mg-x-10"
                              >
                                {item.excerpt}
                              </Paragraph>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={8}
                    xl={9}
                    xxl={9}
                    className="ml-30"
                  >
                    <Card
                      bordered={false}
                      title={
                        <div className="d-flex">
                          <i class="ri-trophy-line mr-10 va-minus-4 fs-20"></i>
                          <Text>Top 5</Text>
                        </div>
                      }
                    >
                      <List.Item actions={[<a>View</a>]}>
                        <List.Item.Meta
                          title={
                            getCategoryData.category[0]
                              .articles_to_categories[0].title
                          }
                          avatar={
                            <Avatar
                              style={{
                                marginTop: 5,
                              }}
                              shape="square"
                              size={40}
                              src={
                                getCategoryData.category[0]
                                  .articles_to_categories[0].featured_image +
                                ".webp"
                              }
                            />
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
