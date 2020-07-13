import { Row, Col, Card, Typography, Button, List, Skeleton } from "antd";
import Wrapper from "components/global/wrapper";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Head from "next/head";
import { initializeApollo } from "lib/apolloClient";
import withSession from "lib/session";

const getCategoryQuery = gql`
  query getCategories($slug: String!) {
    category(where: { slug: { _eq: $slug } }) {
      id
      slug
      title
      description
      cover
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
const { Title, Text } = Typography;
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
                        backgroundColor: "#7f53ac",
                        backgroundImage:
                          "linear-gradient(315deg, #7f53ac 0%, #647dee 74%)",
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
                  <Col>Column</Col>
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
