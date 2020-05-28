import {
  Layout,
  Comment,
  Row,
  Form,
  Input,
  Col,
  Space,
  PageHeader,
  Tag,
  Avatar,
  Typography,
  Divider,
  Button,
} from "antd";
import { withApollo } from "../.././../lib/apollo";
import { StarFilled, SafetyCertificateFilled } from "@ant-design/icons";
import Nav from "../../../components/global/nav";
import Sidebar from "../../../components/global/sidebar";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useRouter } from "next/router";

const { Content } = Layout;
const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;

var comments = [
  {
    userId: "1208",
    commentTo: "",
    content: "This is not right",
    children: [
      {
        userId: "1900",
        commentTo: "1208",
        content: "This is right",
      },
    ],
  },

  {
    userId: "1200",
    commentTo: "",
    content: "Good article",
  },
];
const routes = [
  {
    path: "index",
    breadcrumbName: "First-level Menu",
  },
  {
    path: "first",
    breadcrumbName: "Second-level Menu",
  },
  {
    path: "second",
    breadcrumbName: "Third-level Menu",
  },
];

const paragraph = `When developing an app with multiple screens, we tend to reuse the same piece of code over many classes: showing error messages, using the same page layout and wiring up some dependencies like for example a Bloc. All this could be solved if were using an abstract base class, however, what if we have a set of features/classes that we want to use on a particular screen but not on others? Since a class can't be a child of more than one class, should we create different base classes, as much as the number of combinations that we have? That's why we have mixins.
Mixins and Base Classes: An introduction
Mixins let us add a set of “features” to a class without using parent-child hierarchy, allowing us to have in the same class one parent and multiple mixin components. As such, since it’s not a parent of our class, mixins don't allow any declaration of constructors. You can read more about them in this article by Romain Rastel with the caveat that Dart 2 now has the mixin keyword, as seen in the documentation.
But how do mixins work? Let's take as an example an abstract class Person.We proceed by changing the constructor of our BasePage to include the bloc object. This will force us to also change all the classes that extend it to add the bloc to their constructors too. The bloc parameter is used as a Generic type so that each class that extends it can declare the correct type of bloc it is using. This makes sure that when we are calling it in the BaseState , we are going to get the correct type of bloc allowing us to access its methods.As a new feature, some of our screens will make API calls and if an error occurs, we need to display an error message in the form of a Snackbar. Additionally, we decide to use the BLoC architecture in which we need to inject a new bloc when each page is created. These two problems will need the following steps:
Change our BasePageby changing its constructor with the new bloc parameter.
ChangeBaseState by adding a new GlobalKey<ScaffoldState>
Create a new mixin that let us display errors messages sent by the bloc in the page using a Snackbar
In our BaseBloc we are just exposing a Sink and a Stream in order to relay error messages.`;

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const { permalink } = params;
//   return { props: { permalink } };
// }
var query = gql`
  query MyQuery($perma: String!) {
    articles(where: { article_permalink: { _eq: $perma } }) {
      article_title
      article_content
    }
  }
`;
function Article() {
  const router = useRouter();
  const { permalink } = router.query;
  var perma = permalink;
  console.log(perma);
  const { loading, error, data } = useQuery(query, {
    variables: { perma },
  });

  var article;
  // data.articles.map((mapped) => {
  //   article = mapped;
  // });
  return (
    <Layout>
      <Nav />
      <Layout>
        <Sidebar article={true} />
        <Layout className="mainLayout">
          <Content className="site-layout">
            <PageHeader breadcrumb={{ routes }} className="articleHeader" />
            <Space direction="vertical">
              <Row justify="center" align="middle">
                <Col
                  xs={24}
                  sm={24}
                  md={10}
                  lg={10}
                  xl={10}
                  xxl={8}
                  className="titleCol"
                >
                  <Title
                    level={2}
                    className="articleTitle"
                    style={{ fontWeight: "700" }}
                  >
                    {article
                      ? article.article_title
                      : `Flutter and Zeplin: Speed up the Development Process from
                    your Design`}
                  </Title>
                  <span>
                    <Space style={{ margin: "5px 5px" }}>
                      <Avatar src="https://static.vecteezy.com/system/resources/previews/000/241/070/original/flat-boy-with-vintage-glasses-avatar-vector-illustration.jpg" />
                      <Text> Afzaal Afridi</Text>
                    </Space>
                    <Space style={{ margin: "5px 5px" }}>
                      <i class="ri-time-line ri-xl"></i>
                      <Text>2 Min Read</Text>
                    </Space>
                    <Space style={{ margin: "5px 5px" }}>
                      <Tag
                        icon={<SafetyCertificateFilled />}
                        color="rgb(23,144,255)"
                        style={{ fontWeight: "600" }}
                      >
                        SPONSORED
                      </Tag>
                    </Space>

                    <Space style={{ margin: "8px 10px" }}>
                      <Tag
                        color="#30F579"
                        style={{ color: "#141414", fontWeight: "600" }}
                        icon={<StarFilled />}
                      >
                        FEATURED
                      </Tag>
                    </Space>
                  </span>
                </Col>
                <Col xs={24} sm={24} md={13} lg={12} xl={10} xxl={10}>
                  <img
                    // width="450px"
                    height="400px"
                    style={{
                      margin: "auto",
                      borderRadius: "15px",
                      padding: "10px",
                      objectFit: "cover",
                      maxWidth: "100%",
                      maxHeight: "400px",
                    }}
                    src="https://c4.wallpaperflare.com/wallpaper/470/932/861/vector-planet-space-meteors-wallpaper-preview.jpg"
                  />
                </Col>
              </Row>
              <Row justify="center">
                <Col
                  xs={24}
                  sm={20}
                  md={20}
                  lg={20}
                  xl={20}
                  xxl={18}
                  style={{ margin: "auto" }}
                >
                  <Title level={1}>Introduction</Title>
                  <Paragraph style={{ textAlign: "justify", fontSize: 16 }}>
                    {/* {data.articles.map((mapped) => (
                      <Title level={1}>{mapped.article_title}</Title>
                    ))} */}
                  </Paragraph>
                  <Title level={2}>Introduction</Title>
                  <Paragraph style={{ textAlign: "justify", fontSize: 16 }}>
                    <img
                      width="100%"
                      style={{
                        borderRadius: "4px",
                        padding: "25px 0px",
                      }}
                      src="https://s2.best-wallpaper.net/wallpaper/1920x1080/1802/Watchtower-moon-mountains-forest-art-picture_1920x1080.jpg"
                    />
                    {paragraph}
                  </Paragraph>
                  {error ? <p>Error Loading</p> : null}
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <>
                      <a href="#">
                        <Title level={3}>Introduction</Title>
                      </a>

                      <Paragraph style={{ textAlign: "justify", fontSize: 16 }}>
                        <Title level={4}>Level 1</Title>
                        {paragraph.slice(20, 300)}
                      </Paragraph>
                      <Paragraph style={{ textAlign: "justify", fontSize: 16 }}>
                        <Title level={3}>
                          Level 2 <a href="#">#</a>
                        </Title>
                        {paragraph.slice(20, 300)}
                      </Paragraph>
                      <Divider orientation="left">References</Divider>
                      <Paragraph>
                        <ol>
                          <li>
                            <span>
                              <a>Website.com</a>
                              For
                              <a href="#Hello">Hello</a>
                            </span>
                          </li>
                        </ol>
                      </Paragraph>
                      <Title level={3}>Comments</Title>
                      <Divider />
                      <div>
                        <Form.Item>
                          <span
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <Avatar src="https://png.pngtree.com/element_our/png_detail/20181026/avatar-vector-icon-man-vector-symbol-avatar-icon-png_219941.jpg" />
                            <TextArea
                              rows={4}
                              style={{ marginLeft: "20px" }}
                              placeholder="Your Comment"
                            />
                          </span>
                        </Form.Item>
                        <Form.Item>
                          <Button
                            className="submitComment"
                            type="primary"
                            htmlType="submit"
                          >
                            Add Comment
                          </Button>
                        </Form.Item>
                      </div>
                      {comments.map((comment) => (
                        <Comment
                          actions={[
                            <span key="comment-nested-reply-to">Reply to</span>,
                          ]}
                          author={<a>Han Solo</a>}
                          avatar={
                            <Avatar
                              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                              alt="Han Solo"
                            />
                          }
                          content={<p>{comment.content}</p>}
                          children={[
                            comment.children
                              ? comment.children.map((child) => (
                                  <Comment
                                    actions={[
                                      <span key="comment-nested-reply-to">
                                        Reply to
                                      </span>,
                                    ]}
                                    author={<a>Han Solo</a>}
                                    avatar={
                                      <Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                        alt="Han Solo"
                                      />
                                    }
                                    content={<p>{child.content}</p>}
                                  />
                                ))
                              : null,
                          ]}
                        />
                      ))}
                    </>
                  )}
                </Col>
              </Row>
              <Row justify="center"></Row>
            </Space>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Article;
