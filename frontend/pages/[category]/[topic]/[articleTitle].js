import Wrapper from "components/global/wrapper";
import {
  Row,
  Col,
  Modal,
  Tabs,
  Typography,
  Card,
  Divider,
  Space,
  Avatar,
  Button,
  message,
  Menu,
  Dropdown,
} from "antd";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks";
import { getArticlesQuery, insertBookmarkQuery } from "components/home/queries";
import { initializeApollo } from "lib/apolloClient";
import { Reactions } from "components/home/sub/reactions-holder";
import Head from "next/head";
import { useState } from "react";

const getArticleQuery = gql`
  query getArticle($articleSlug: String!) {
    articles(where: { slug: { _eq: $articleSlug } }) {
      id
      title
      content
      excerpt
      updated_at
      created_at
      featured_image
      reactions_to_articles {
        user {
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
        }
      }
      users_to_articles {
        authors {
          username
        }
      }
      article_topic {
        title
      }
      article_category {
        title
      }
    }

    reactions {
      id
      name
      color
      code
      gradient
    }
  }
`;

const insertReactionQuery = gql`
  mutation insertReaction($articleId: uuid!, $reactionId: uuid!) {
    insert_reactions_to_articles(
      objects: {
        article_id: $articleId
        reaction_id: $reactionId
        user_id: "59b79adc-f10a-44b3-8cf5-46e0d4e2ecfc"
      }
    ) {
      affected_rows
    }
  }
`;

const { Title, Paragraph, Text } = Typography;
const Article = () => {
  const router = useRouter();
  const { category, topic, articleTitle } = router.query;

  const [reactionsModal, setReactionsModal] = useState(false);

  const {
    loading: getArticleLoading,
    data: getArticleData,
    error: getArticleError,
    refetch: getArticleRefetch,
  } = useQuery(getArticleQuery, {
    variables: {
      articleSlug: articleTitle,
    },
  });

  const [insertReaction, { data: insertReactionData }] = useMutation(
    insertReactionQuery,
    {
      onError: (err) => message.error("Error Reacting To Post"),
      onCompleted: () => message.success("Reacted Successfully"),
    }
  );

  const getCount = (array, id) => {
    var count = array.filter((filtered) => filtered.reaction.id == id);
    return count.length;
  };

  const reactionsMenu = (
    <Menu className="pd-10">
      <Reactions>
        {getArticleData.reactions.map((reactions) => {
          return (
            <div className="reaction-holder">
              <div
                className="reaction mg-x-5"
                onClick={() => {
                  insertReaction({
                    variables: {
                      articleId: getArticleData.articles[0].id,
                      reactionId: reactions.id,
                    },
                  });
                  getArticleRefetch();
                }}
              >
                <a>
                  <i
                    className={`${reactions.code} va-minus-4`}
                    style={reactions.color ? color : reactions.gradient}
                  ></i>
                </a>
              </div>
            </div>
          );
        })}
      </Reactions>
    </Menu>
  );
  return (
    <Wrapper>
      <Head>
        <link rel="stylesheet" type="text/css" href="/prism.css" />
        <script src="/prism.js"></script>
      </Head>
      <Row justify="center">
        <Col
          xs={24}
          sm={24}
          md={16}
          lg={12}
          xl={12}
          xxl={6}
          className="d-flex flex-column mg-x-30 t-transform-cpt jc-center"
        >
          <Title
            level={3}
            className="lh-1-5 pd-x-20 mt-30"
            style={{ fontWeight: 400 }}
          >
            {getArticleData.articles[0].title}
          </Title>

          <Paragraph
            className="pd-x-20 lh-2 mt-10 fs-14"
            ellipsis={{ rows: 2 }}
          >
            {getArticleData.articles[0].excerpt}
          </Paragraph>
          <Card className="mg-x-5">
            <Row>
              <Space>
                <Avatar src="https://1.bp.blogspot.com/-N7JSp_PRkuI/XhV5ljsxEUI/AAAAAAAALHA/cevL4UW3PMUzwh1SCIn32uJajD-atR5zwCLcBGAsYHQ/s3840/Color-Abstract-wallpaper.jpeg" />{" "}
                <Text>
                  {getArticleData.articles[0].users_to_articles.map(
                    (mapped) => mapped.authors.username
                  )}
                </Text>
              </Space>
              <div className="ml-auto va-middle lh-2-5">
                <Text className="mr-10" strong>
                  Published:
                </Text>
                {new Date(getArticleData.articles[0].created_at).toDateString()}
              </div>
            </Row>
            <Row></Row>
          </Card>
          {/* <Text className="mt-20 ml-10">
            Last Updated:
            {new Date(getArticleData.articles[0].updated_at).toDateString()}
          </Text> */}
        </Col>
        <Col xs={24} sm={24} md={16} lg={12} xl={12} xxl={10} className="">
          <img
            width="100%"
            className="o-fit-cover mt-30"
            src={getArticleData.articles[0].featured_image}
            style={{ maxWidth: 800 }}
          />
        </Col>
      </Row>
      <Row justify="center" className="mt-30 pd-20">
        <Col xs={24} sm={24} md={16} lg={12} xl={12} xxl={12}>
          <div
            dangerouslySetInnerHTML={{
              __html: getArticleData.articles[0].content,
            }}
          />
        </Col>
      </Row>
      <Row className="pd-10 mt-10 mg-x-20 mb-20 mt-10" justify="center">
        <Col xs={24} sm={24} md={16} lg={12} xl={12} xxl={12}>
          <Divider orientation="left">React To This</Divider>
          <Row>
            <a>
              <Reactions>
                {getArticleData.reactions.map((reactions) => {
                  return (
                    <div
                      className="reaction-holder"
                      onClick={() => setReactionsModal(true)}
                    >
                      <div className="reaction fs-22">
                        <i
                          className={`${reactions.code} va-minus-4`}
                          style={reactions.color ? color : reactions.gradient}
                        ></i>
                      </div>
                    </div>
                  );
                })}
                <div className="reaction-total">
                  <Text className="lh-2" strong>
                    {getArticleData.articles[0].reactions_to_articles.length}
                  </Text>
                </div>
              </Reactions>
            </a>
            <Modal
              visible={reactionsModal}
              footer={false}
              closable
              maskClosable
              onCancel={() => setReactionsModal(false)}
              title="Reactions"
              bodyStyle={{
                padding: "15px 15px",
                paddingBottom: "45px",
                paddingTop: 5,
                height: 300,
                overflowY: "auto",
              }}
            >
              <Tabs>
                {getArticleData.reactions.map((reactions) => {
                  return (
                    <Tabs.TabPane
                      key={reactions.id}
                      tab={
                        <Reactions>
                          <div className="reaction-holder">
                            <div className="reaction fs-22">
                              <i
                                className={`${reactions.code} va-minus-4`}
                                style={
                                  reactions.color ? color : reactions.gradient
                                }
                              ></i>
                            </div>
                            <div className="reaction-count">
                              <Text className="lh-2-5" strong>
                                {getCount(
                                  getArticleData.articles[0]
                                    .reactions_to_articles,
                                  reactions.id
                                )}
                              </Text>
                            </div>
                          </div>

                          <div class="reaction-name">
                            <Text>{reactions.name}</Text>
                          </div>
                        </Reactions>
                      }
                    >
                      <div className="d-flex flex-column">
                        {getArticleData.articles[0].reactions_to_articles.map(
                          (reactionsToArticles) => {
                            if (reactionsToArticles.reaction.id == reactions.id)
                              return (
                                <Space className="mg-y-10">
                                  <Avatar
                                    src={
                                      reactionsToArticles.user.profile_picture
                                    }
                                  />
                                  <Text>
                                    {reactionsToArticles.user.username}
                                  </Text>
                                </Space>
                              );
                          }
                        )}
                      </div>
                    </Tabs.TabPane>
                  );
                })}
              </Tabs>
            </Modal>
            <Dropdown
              placement="topCenter"
              className="ml-auto"
              overlay={reactionsMenu}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Button
                  className="lh-1"
                  type="text"
                  icon={<i class="ri-thumb-up-line fs-22 va-minus-4 mr-10"></i>}
                ></Button>
              </a>
            </Dropdown>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default Article;

export const getServerSideProps = async (context) => {
  const { articleTitle } = context.params;
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: getArticleQuery,
    variables: {
      articleSlug: articleTitle,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};
