import { Row, Col, Card, Typography, Button, List, Skeleton } from "antd";
import Wrapper from "components/global/wrapper";
import { gql, useQuery } from "@apollo/client";
import withSession from "lib/session";
import gradient from "random-gradient";
import { BreadcrumbJsonLd } from "next-seo";

const getCategoriesQuery = gql`
  query getCategories {
    category {
      id
      slug
      title
      description
      cover
    }
  }
`;
const { Title, Text, Paragraph } = Typography;
const Categories = (props) => {
  const { data: getCategoriesData, loading: getCategoriesLoading } = useQuery(
    getCategoriesQuery
  );
  return (
    <Wrapper
      user={props.user}
      seo={{
        title: "Categories",
        description:
          "Choose from a variety of categories, from tech all the way to rehab, we have it all",
      }}
      route="categories"
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
            name: "Categories",
            item: "https://techtorehab.com/categories",
          },
        ]}
      />
      <Row justify="center" className="mg-y-20">
        <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={16}>
          <Card>
            <Title level={4} className="mt-10 mb-30">
              Categories
            </Title>
            {getCategoriesLoading ? (
              <div className="d-flex jc-space-around flex-wrap">
                <Skeleton.Input
                  className="mg-x-10 mg-y-10"
                  style={{
                    width: 350,
                    height: 300,
                  }}
                  active
                />

                <Skeleton.Input
                  className="mg-x-10 mg-y-10"
                  style={{
                    width: 350,
                    height: 300,
                  }}
                  active
                />

                <Skeleton.Input
                  className="mg-x-10 mg-y-10"
                  style={{
                    width: 350,
                    height: 300,
                  }}
                  active
                />
              </div>
            ) : (
              <List
                grid={{
                  xs: 1,
                  sm: 2,
                  md: 3,
                  lg: 3,
                  xl: 3,
                  xxl: 3,
                }}
                dataSource={getCategoriesData.category}
                renderItem={(item) => (
                  <List.Item className="mr-10">
                    <Card
                      cover={
                        item.cover ? (
                          <img
                            src={`${
                              "https://ik.imagekit.io/ttr/tr:n-med/" +
                              item.cover
                            }`}
                            height={300}
                            alt={`Featured image for category ${item.title} on TechtoRehab`}
                          />
                        ) : (
                          <div
                            className="d-flex jc-center flex-column ai-center"
                            style={{
                              height: 300,
                            }}
                          >
                            <div
                              style={{
                                background: gradient(item.title),
                                height: 300,
                                position: "relative",
                                zIndex: 1,
                                width: "100%",
                              }}
                            />

                            <Paragraph
                              className="ta-center fs-26 fw-bold t-transform-cpt"
                              ellipsis={{
                                rows: 2,
                              }}
                              style={{
                                position: "absolute",
                                zIndex: 2,
                                top: 130,

                                color: "white",
                              }}
                            >
                              <a
                                href={`/category/${item.slug}`}
                                style={{
                                  color: "inherit",
                                }}
                              >
                                {item.title}
                              </a>
                            </Paragraph>
                          </div>
                        )
                      }
                    >
                      <Card.Meta
                        title={
                          <a
                            className="t-transform-cpt"
                            href={`/category/${item.slug}`}
                          >
                            <Text>{item.title}</Text>
                          </a>
                        }
                        description={
                          item.description
                            ? item.description
                            : "This is a default category"
                        }
                      />
                    </Card>
                  </List.Item>
                )}
              />
            )}
          </Card>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default Categories;

export const getServerSideProps = withSession(async ({ req, res }) => {
  const user = req.session.get(["session"]);
  return {
    props: {
      user: user ? user : null,
    },
  };
});
