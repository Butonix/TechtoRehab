import { Row, Col, Typography, List, Input, Skeleton, Card } from "antd";
import Moment from "react-moment";
import Wrapper from "components/global/wrapper";
import { gql, useLazyQuery } from "@apollo/client";
import ProgressiveImage from "react-progressive-graceful-image";

const { Text, Title, Paragraph } = Typography;

const searchArticlesQuery = gql`
  query searchArticles($title: String!) {
    articles(where: { title: { _ilike: $title } }, limit: 10) {
      article_category {
        title
        slug
      }
      article_topic {
        title
        slug
      }
      excerpt
      featured_image
      title
      slug
      updated_at
    }
  }
`;

const Search = () => {
  const [
    searchArticles,
    { loading: searchArticlesLoading, data: searchArticlesData },
  ] = useLazyQuery(searchArticlesQuery, {
    pollInterval: 2700,
    fetchPolicy: "cache-and-network",
  });

  return (
    <Wrapper>
      <Row justify="center">
        <Col className="mt-30" xs={24} sm={24} md={24} lg={20} xl={18} xxl={12}>
          <Card cover={<img src="/search-cover.svg" height={250} />}>
            <Title className="mg-y-20" level={4}>
              Search
            </Title>
            <Input
              placeholder="Search your favorite article"
              onChange={(val) =>
                searchArticles({
                  variables: {
                    title: "%" + val.target.value + "%",
                  },
                })
              }
            />
            {searchArticlesData !== undefined ? (
              <List
                className="mt-20"
                dataSource={
                  searchArticlesData ? searchArticlesData.articles : []
                }
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <div className="d-flex">
                        <Moment fromNow>{item.updated_at}</Moment>
                      </div>,
                    ]}
                  >
                    <List.Item.Meta
                      title={
                        <Text className="fs-14 line-clamp-3">{item.title}</Text>
                      }
                      avatar={
                        <ProgressiveImage
                          src={
                            "https://ik.imagekit.io/ttr/tr:n-med/" +
                            item.featured_image
                          }
                          placeholder={
                            "https://ik.imagekit.io/ttr/tr:n-med_placeholder/" +
                            item.featured_image
                          }
                          delay={300}
                          threshold={1}
                        >
                          {(src) => (
                            <img
                              src={src}
                              className="br-circle"
                              alt={`Featured image for ${item.title} on TechtoRehab`}
                              style={{
                                height: 45,
                                width: 45,
                              }}
                            />
                          )}
                        </ProgressiveImage>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <>
                <Skeleton
                  className="mt-30"
                  round
                  avatar={{
                    shape: "circle",
                  }}
                  title
                  paragraph={false}
                />

                <Skeleton
                  className="mt-30"
                  round
                  avatar={{
                    shape: "circle",
                  }}
                  title
                  paragraph={false}
                />

                <Skeleton
                  className="mt-30"
                  round
                  avatar={{
                    shape: "circle",
                  }}
                  title
                  paragraph={false}
                />
              </>
            )}
          </Card>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default Search;
