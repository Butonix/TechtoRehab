import {
  Form,
  Row,
  Col,
  Typography,
  Result,
  Input,
  Skeleton,
  List,
  Button,
  Space,
  message,
} from "antd";
import gql from "graphql-tag";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";

const getArticlesQuery = gql`
  query getArticles($offset: Int, $limit: Int) {
    articles(offset: $offset, limit: $limit) {
      id
      title
      featured_image
      excerpt
      slug
      updated_at
      users_to_articles {
        authors {
          username
          profile_picture
        }
      }
      article_category {
        title
      }
      article_topic {
        title
      }
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
      featured_image
      excerpt
      slug
      updated_at

      users_to_articles {
        authors {
          username
          profile_picture
        }
      }

      article_category {
        title
      }
      article_topic {
        title
      }
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
  const router = useRouter();
  const {
    data: getArticleData,
    loading: getArticleLoading,
    error: getArticleError,
    fetchMore,
    networkStatus,
  } = useQuery(getArticlesQuery, {
    variables: {
      offset: 0,
      limit: 1,
    },
    notifyOnNetworkStatusChange: true,
  });

  const [
    searchArticles,
    {
      loading: searchArticlesLoading,
      data: searchArticlesData,
      error: searchArticlesError,
    },
  ] = useLazyQuery(searchArticlo, {
    pollInterval: 100,
    onError: () => message.error("Error Searching Articles"),
  });

  return getArticleError ? (
    <Result
      className="pd-10 mt-20"
      status="error"
      title="Server Error"
      extra={
        <Button type="primary" key="console" onClick={() => router.reload()}>
          Reload Page
        </Button>
      }
    />
  ) : (
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
          {(searchArticlesData && searchArticlesData.articles.length > 0) ||
          getArticleData ? (
            <List
              itemLayout="vertical"
              className="mt-20"
              dataSource={
                searchArticlesData && searchArticlesData.articles.length > 0
                  ? searchArticlesData.articles
                  : getArticleData
                  ? getArticleData.articles
                  : []
              }
              loadMore={
                <div className="d-flex jc-center mt-20">
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
              renderItem={(item) =>
                networkStatus == 3 ? (
                  <Skeleton className="mt-30" avatar paragraph={2} title />
                ) : (
                  <List.Item
                    extra={
                      <img
                        className="o-fit-cover br-5"
                        src={item.featured_image}
                        width={250}
                      />
                    }
                    key={item.id}
                  >
                    <List.Item.Meta
                      title={
                        <a
                          href={
                            process.env.NEXT_PUBLIC_WEB_ADDRESS +
                            "/" +
                            item.article_category.title +
                            "/" +
                            (item.article_topic !== null
                              ? item.article_topic.title + "/"
                              : "") +
                            item.slug
                          }
                        >
                          <Paragraph ellipsis={{ rows: 2 }}>
                            {item.title}
                          </Paragraph>
                        </a>
                      }
                      description={
                        <Paragraph ellipsis={{ rows: 2 }}>
                          {item.excerpt}
                        </Paragraph>
                      }
                    />
                    <Space>
                      {item.users_to_articles.map((mapped, index) => {
                        if (
                          item.users_to_articles.length > 1 &&
                          index + 1 < item.users_to_articles.length
                        ) {
                          return (
                            <div key={item.id}>
                              <Text className="t-transform-cpt">
                                {mapped.authors.username}
                              </Text>
                              <i className="ri-more-fill ri-lg va-minus-6 mg-x-10"></i>
                            </div>
                          );
                        } else {
                          return (
                            <Text className="t-transform-cpt" key={item.id}>
                              {mapped.authors.username}
                            </Text>
                          );
                        }
                      })}
                    </Space>
                    <i className="ri-more-fill ri-lg va-minus-6 mg-x-10"></i>

                    <Button
                      danger
                      type="primary"
                      icon={
                        <i
                          className="ri-delete-bin-7-line ri-lg va-minus-2"
                          style={{ color: "white" }}
                        ></i>
                      }
                      className="ml-10"
                    />
                  </List.Item>
                )
              }
            />
          ) : (
            <>
              <Skeleton className="mt-30" avatar paragraph={1} title />
              <Skeleton className="mt-30" avatar paragraph={1} title />
            </>
          )}
        </Form>
      </Col>
    </Row>
  );
};
export default ArticlesManager;
