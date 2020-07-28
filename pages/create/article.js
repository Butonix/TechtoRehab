import {
  Row,
  Col,
  Menu,
  Select,
  Input,
  Form,
  Typography,
  Space,
  Skeleton,
  Button,
  Upload,
  message,
} from "antd";
import Wrapper from "components/global/wrapper";
import { initializeApollo } from "lib/apolloClient";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import withSession from "lib/session";
import urlSlug from "url-slug";
import { useRouter } from "next/router";
import Error from "components/global/401";
var Gist = require("react-gist");

const getCatsandTopicsQuery = gql`
  query catsAndTopics {
    topic {
      title
      slug
      id
    }
    category {
      title
      slug
      id
    }
  }
`;

const insertPostQuery = gql`
  mutation MyMutation(
    $title: String!
    $excerpt: String!
    $featuredImage: String!
    $content: jsonb!
    $category: uuid!
    $topic: uuid!
    $slug: String!
    $userId: uuid!
  ) {
    insert_articles_one(
      object: {
        title: $title
        excerpt: $excerpt
        featured_image: $featuredImage
        content: $content
        category: $category
        topic: $topic
        slug: $slug
        users_to_articles: { data: { user_id: $userId } }
      }
    ) {
      id
      title
      slug
      article_category {
        slug
      }
      article_topic {
        slug
      }
      created_at
    }
  }
`;

const checkTitleQuery = gql`
  query checkTitle($title: String!) {
    articles_aggregate(where: { title: { _eq: $title } }) {
      aggregate {
        count
      }
    }
  }
`;

const MyEditor = dynamic(
  () => import("@tinymce/tinymce-react").then((res) => res.Editor),
  { loading: () => <Skeleton paragraph={{ rows: 2 }} title />, ssr: false }
);

const { Text, Title, Link } = Typography;
const createArticle = (props) => {
  var count = 0;
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  const [editorContent, setEditorContent] = useState(`Ncie Content`);
  const [permalink, setPermalink] = useState("Enter A Title");
  const [title, setTitle] = useState(null);
  const [category, setCategory] = useState(null);
  const [topic, setTopic] = useState(null);
  const [titleApprove, setTitleApprove] = useState(null);
  const [content, setContent] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (checkTitleData && checkTitleData.articles_aggregate) {
      if (checkTitleData.articles_aggregate.aggregate.count == 1) {
        setTitleApprove("unavailable");
        setPermalink("Enter A Title");
      } else {
        setTitleApprove("available");
        var titlo = title;
        var permalink;

        setTitle(titlo);
        permalink = urlSlug(titlo).toLowerCase();
        setPermalink(permalink);
      }
    }
  });

  const {
    data: getCatsAndTopicsData,
    loading: getCatsAndTopicsLoading,
    error: getCatsAndTopicsError,
  } = useQuery(getCatsandTopicsQuery);

  const [
    insertArticle,
    {
      loading: insertArticleLoading,
      data: insertArticleData,
      error: insertArticleError,
    },
  ] = useMutation(insertPostQuery, {
    onCompleted: (data) => {
      form.resetFields();
      router.push({
        pathname: "/create/published",
        query: {
          id: data.insert_articles_one.id,
          title: data.insert_articles_one.title,
          slug: data.insert_articles_one.slug,
          category: data.insert_articles_one.article_category.slug,
          topic: data.insert_articles_one.article_topic.slug,
        },
      });
    },
    onError: (err) => message.error(err),
  });

  const [
    checkTitle,
    {
      loading: checkTitleLoading,
      data: checkTitleData,
      error: checkTitleError,
    },
  ] = useLazyQuery(checkTitleQuery);

  const handleImagePreview = (info) => {
    if (info.file.response && info.file.response.path) {
      setImage(info.file.response.path);
      return info.file.response.path;
    }
  };

  var handleEditor = (content, editor) => {
    setEditorContent(content);
  };

  var handleTitle = (e) => {
    setTitleApprove("validating");
    var title = e.target.value;
    setTitle(title);
    checkTitle({
      variables: {
        title: title,
      },
    });
  };

  useEffect(() => {
    if (count < 1) {
      const EditorJS = require("@editorjs/editorjs");
      const LinkTool = require("@editorjs/link");
      const Header = require("@editorjs/header");
      const SimpleImage = require("@editorjs/simple-image");
      const ImageTool = require("@editorjs/image");
      const Checklist = require("@editorjs/checklist");
      const List = require("@editorjs/list");
      const Embed = require("@editorjs/embed");
      const CodeTool = require("@editorjs/code");
      const InlineCode = require("@editorjs/inline-code");
      const Marker = require("@editorjs/marker");
      const Underline = require("@editorjs/underline");
      const Delimiter = require("@editorjs/delimiter");
      const Quote = require("@editorjs/quote");
      const Table = require("@editorjs/table");
      const Warning = require("@editorjs/warning");

      const editor = new EditorJS({
        holder: "content",
        placeholder: "Write something Awesome",
        autofocus: true,
        onChange: (val) => {
          editor
            .save()
            .then((outputData) => {
              console.log(outputData);
              setContent(outputData);
            })
            .catch((error) => {
              console.log("Saving failed: ", error);
            });
        },
        tools: {
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/linkpreview", // Your backend endpoint for url data fetching
            },
          },
          code: CodeTool,
          header: Header,
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: "/api/editorImageUpload", // Your backend file uploader endpoint
                byUrl: "/api/editorImageUpload", // Your endpoint that provides uploading by Url
              },
            },
          },
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          embed: {
            class: Embed,
            config: {
              services: {
                codesandbox: {
                  regex: /https?:\/\/codesandbox.io\/([^\/\?\&]*)\/([^\/\?\&]*)/,
                  embedUrl: "https://codesandbox.io/embed/<%= remote_id %>",
                  html:
                    "<iframe height='500' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
                  height: 500,
                  width: 800,
                  id: (groups) => groups.join("/embed/"),
                },
                stackblitz: {
                  regex: /https?:\/\/stackblitz.com\/edit\/([^\/\?\&]*)/,
                  embedUrl:
                    "https://stackblitz.com/edit/<%= remote_id %>?embed=1",
                  html:
                    "<iframe height='500' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
                  height: 500,
                  width: 800,
                  id: (groups) => groups.join("/embed/"),
                },
                giphy: {
                  regex: /https?:\/\/giphy.com\/gifs\/([^\/\?\&]*)/,
                  embedUrl: "https://giphy.com/embed/<%= remote_id %>",
                  html:
                    "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
                  height: 300,
                  width: 800,
                  id: (groups) => {
                    groups = groups[0].substring(
                      groups[0].length - 18,
                      groups[0].length
                    );
                    return groups;
                  },
                },
              },
            },
          },

          inlineCode: {
            class: InlineCode,
            shortcut: "CMD+SHIFT+M",
          },
          Marker: {
            class: Marker,
            shortcut: "CMD+SHIFT+M",
          },
          underline: Underline,
          delimiter: Delimiter,
          quote: Quote,
          table: {
            class: Table,
          },
          warning: Warning,
        },
      });
      editor.isReady
        .then(() => {
          count = count + 1;
          return count;
        })
        .catch((reason) => {
          console.log(`Editor.js initialization failed because of ${reason}`);
        });
    }
  }, []);

  return (
    <Wrapper user={props.user}>
      {props.user && props.user.id ? (
        <Row className="pd-10">
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={19}
            xl={20}
            xxl={20}
            className="pd-20"
          >
            <Form layout="vertical" form={form} wrapperCol={24}>
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Article Title Is Required",
                  },
                ]}
                validateStatus={
                  titleApprove == "available"
                    ? "success"
                    : titleApprove == "unavailable"
                    ? "error"
                    : ""
                }
                hasFeedback
                help={
                  <Text
                    type={titleApprove == "unavailable" ? "danger" : null}
                    mark={titleApprove == "validating" ? true : false}
                    strong
                    className="lh-1"
                    style={{ position: "absolute", marginTop: -23, right: 35 }}
                  >
                    {titleApprove == "validating"
                      ? "Checking"
                      : titleApprove == "available"
                      ? "Available!"
                      : titleApprove == "unavailable"
                      ? "Already Taken"
                      : titleApprove == null
                      ? null
                      : null}
                  </Text>
                }
              >
                <Input onChange={handleTitle} />
              </Form.Item>
              <Link className="mt-10 lh-1">
                {process.env.NEXT_PUBLIC_WEB_ADDRESS +
                  "/" +
                  (category ? category + "/" : "") +
                  (topic ? topic + "/" : "") +
                  permalink}
              </Link>
              <Form.Item
                label="Content"
                className="mt-20"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <div id="content" />
              </Form.Item>

              <Form.Item
                label="Excerpt"
                name="excerpt"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Excerpt/Summary is Required",
                  },
                  {
                    validator: (rule, val) => {
                      val = val.split(" ");
                      if (val.length < 20 || val.length > 50) {
                        return Promise.reject(
                          "Excerpt Should Be Min 20 Words and Maximum 50 "
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input.TextArea rows={2} />
              </Form.Item>
            </Form>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={5}
            xl={4}
            xxl={4}
            style={{ boxShadow: "-4px 3px 3px 1px #f5f5f5" }}
            className="pd-20"
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={(data) => {
                var sendTitle = data.title;
                var sendCategory = data.category;
                var sendTopic = data.topic;
                var sendFeaturedImage = data.featuredImage.file.response.path;
                var sendExcerpt = data.excerpt;
                var sendContent = content;
                var sendSlug = permalink;
                insertArticle({
                  variables: {
                    title: sendTitle,
                    category: sendCategory,
                    topic: sendTopic,
                    excerpt: sendExcerpt,
                    content: sendContent,
                    slug: sendSlug,
                    featuredImage: sendFeaturedImage,
                    userId: props.user.id,
                  },
                });
              }}
            >
              <Form.Item
                label="Category"
                name="category"
                rules={[
                  {
                    required: true,
                    message: "Category Is Required",
                  },
                ]}
              >
                <Select
                  className="ml-auto va-middle"
                  onChange={(val) => {
                    var category = getCatsAndTopicsData.category.filter(
                      (filtered) => filtered.id == val
                    );
                    setCategory(category[0].slug);
                  }}
                >
                  {getCatsAndTopicsData && getCatsAndTopicsData.category ? (
                    getCatsAndTopicsData.category.map((category) => {
                      return (
                        <Select.Option key={category.id} value={category.id}>
                          {category.title}
                        </Select.Option>
                      );
                    })
                  ) : (
                    <Select.Option>Error Loading Categories</Select.Option>
                  )}
                </Select>
              </Form.Item>
              <Form.Item
                label="Topic"
                name="topic"
                rules={[
                  {
                    required: true,
                    message: "Topic Is Required",
                  },
                ]}
              >
                <Select
                  className="ml-auto va-middle"
                  onChange={(val) => {
                    var topic = getCatsAndTopicsData.topic.filter(
                      (filtered) => filtered.id == val
                    );
                    setTopic(topic[0].slug);
                  }}
                >
                  {getCatsAndTopicsData && getCatsAndTopicsData.topic ? (
                    getCatsAndTopicsData.topic.map((topic) => {
                      return (
                        <Select.Option key={topic.id} value={topic.id}>
                          {topic.title}
                        </Select.Option>
                      );
                    })
                  ) : (
                    <Select.Option>Error Loading Categories</Select.Option>
                  )}
                </Select>
              </Form.Item>
              <Form.Item
                label="Featured Image"
                className="featured-image-uploader d-flex"
                name="featuredImage"
                rules={[
                  {
                    required: true,
                    message: "Article Cannot Be Without Featured Image",
                  },
                ]}
                valuePropName="file"
              >
                <Upload
                  name="imageUpload"
                  listType="picture-card"
                  className="large-upload-picture-card mg-y-10 ml-auto"
                  showUploadList={false}
                  action="/api/imageUpload"
                  onChange={handleImagePreview}
                  accept=".jpeg, .jpg"
                >
                  {image ? (
                    <img
                      className="o-fit-cover"
                      width="200px"
                      height="200px"
                      src={image + ".webp"}
                    />
                  ) : (
                    <Text>Upload</Text>
                  )}
                </Upload>
              </Form.Item>
              {image ? (
                <Form.Item className="d-flex flex-column ai-center ta-center">
                  <Button
                    className="mt-10 mg-x-20"
                    danger
                    onClick={async () => {
                      const response = await fetch("/api/removeImage", {
                        method: "POST",
                        mode: "cors",
                        cache: "no-cache",
                        credentials: "same-origin",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        redirect: "follow",
                        referrerPolicy: "no-referrer",
                        body: JSON.stringify({
                          path: image + ".webp",
                        }),
                      })
                        .then((res) => {
                          if (res.ok == true) {
                            setImage(null);
                          }
                        })
                        .then((err) => console.log(err));
                    }}
                  >
                    Remove Featured Image
                  </Button>
                </Form.Item>
              ) : null}
              <Form.Item className="d-flex flex-column ai-center ta-center">
                {titleApprove == "available" ? (
                  <Button
                    type="primary"
                    className="mt-10 wd-100-pc mg-x-20"
                    htmlType="submit"
                  >
                    Publish Article
                  </Button>
                ) : title == null ? (
                  <Text strong type="danger" className="ta-center lh-2">
                    Please Enter A Title Before Publishing
                  </Text>
                ) : (
                  <Text strong type="danger" className="ta-center mt-20">
                    Title Must Be Available Before You Can Publish
                  </Text>
                )}
              </Form.Item>
            </Form>
          </Col>
        </Row>
      ) : (
        <Error />
      )}
    </Wrapper>
  );
};

export default createArticle;

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get(["session"]);
  if (user) {
    const apolloClient = initializeApollo();
    await apolloClient.query({
      query: getCatsandTopicsQuery,
    });
  }

  return {
    props: {
      user: user ? user : null,
    },
  };
});
