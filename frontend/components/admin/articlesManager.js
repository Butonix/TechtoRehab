import { Form, Row, Col, Typography, Input, List, Button } from "antd";
import gql from "graphql-tag";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";

const getArticlesQuery = gql`
  query getArticles($offset: Int, $limit: Int) {
    articles(offset: $offset, limit: $limit) {
      id
      title
      category
      topic
      featured_image
      excerpt
      updated_at
    }

    articles_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const searchArticlo = gql`
  query getArticles($title: String) {
    articles(where: { title: { _ilike: $title } }) {
      id
      title
      category
      topic
      featured_image
      excerpt
      updated_at
    }

    articles_aggregate {
      aggregate {
        count
      }
    }
  }
`;
const { Text, Paragraph, Title } = Typography;

const ArticlesManager = () => {
  const {
    data: getArticleData,
    loading: getArticleLoading,
    fetchMore,
    networkStatus,
    refetch,
  } = useQuery(getArticlesQuery, {
    variables: {
      offset: 0,
      limit: 1,
    },
    onError: (err) => console.log(err),
    notifyOnNetworkStatusChange: true,
  });

  const [
    searchArticles,
    { loading: searchArticlesLoading, data: searchArticlesData },
  ] = useLazyQuery(searchArticlo, {
    pollInterval: 100,
  });

  return (
    <Row justify="center">
      <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={14} className="pd-10">
        <Title level={4} className="mt-20 mb-20">
          Article Manager
        </Title>
        <Form layout="vertical">
          <Form.Item label="Search Article" className="mb-5">
            <Input
              onChange={(val) => {
                if (val.target.value.length >= 6) {
                  val = "%" + val.target.value + "%";
                  return searchArticles({
                    variables: { title: val },
                  });
                } else {
                  return searchArticles({
                    variables: { title: "" },
                  });
                }
              }}
            />
          </Form.Item>
          <List
            itemLayout="vertical"
            dataSource={
              searchArticlesData && searchArticlesData.articles.length > 0
                ? searchArticlesData.articles
                : getArticleData
                ? getArticleData.articles
                : []
            }
            loadMore={
              <div className="d-flex jc-center mt-20">
                {console.log(searchArticlesData)}
                <Button
                  disabled={networkStatus == 3 ? true : false}
                  onClick={() =>
                    fetchMore({
                      variables: { offset: getArticleData.articles.length },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) {
                          return prev;
                        }
                        return Object.assign({}, prev, {
                          articles: [
                            ...prev.articles,
                            ...fetchMoreResult.articles,
                          ],
                        });
                      },
                    })
                  }
                >
                  {networkStatus == 3 ? "Loading..." : "Show More"}
                </Button>
              </div>
            }
            renderItem={(item) => (
              <List.Item
                extra={
                  <img
                    className="o-fit-cover br-5"
                    src={item.featured_image}
                    width={250}
                  />
                }
              >
                <List.Item.Meta
                  title={
                    <Paragraph ellipsis={{ rows: 2 }}>{item.title}</Paragraph>
                  }
                  description={
                    <Paragraph ellipsis={{ rows: 2 }}>{item.excerpt}</Paragraph>
                  }
                />
              </List.Item>
            )}
          />
        </Form>
      </Col>
    </Row>
  );
};
export default ArticlesManager;
