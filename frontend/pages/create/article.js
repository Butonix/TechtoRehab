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
import { useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

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
    $content: String!
    $category: uuid!
    $topic: uuid!
    $slug: String!
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
        users_to_articles: {
          data: { user_id: "59b79adc-f10a-44b3-8cf5-46e0d4e2ecfc" }
        }
      }
    ) {
      created_at
    }
  }
`;

const MyEditor = dynamic(
  () => import("@tinymce/tinymce-react").then((res) => res.Editor),
  { loading: () => <Skeleton paragraph={{ rows: 2 }} title />, ssr: false }
);

const { Text, Title, Paragraph, Link } = Typography;
const createArticle = () => {
  const [form] = Form.useForm();

  const [image, setImage] = useState(null);
  const [editorContent, setEditorContent] = useState(`Ncie Content`);
  const [permalink, setPermalink] = useState("Enter A Title");
  const [title, setTitle] = useState(null);
  const [category, setCategory] = useState(null);
  const [topic, setTopic] = useState(null);

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
    onError: (err) => message.error(err),
  });

  const handleImagePreview = (info) => {
    if (info.file.response && info.file.response.path) {
      setImage(info.file.response.path);
    }
  };

  var handleEditor = (content, editor) => {
    setEditorContent(content);
  };

  var handleTitle = (e) => {
    var title = e.target.value;
    setTitle(title);
    title = title.replace(":", "");
    title = title.split(" ").join("-");
    setPermalink(title.toLowerCase());
  };
  return (
    <Wrapper>
      <Row className="pd-10">
        <Col xs={24} sm={24} md={24} lg={19} xl={20} xxl={20} className="pd-20">
          <Form layout="vertical" form={form}>
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Article Title Is Required",
                },
              ]}
            >
              <Input className="mt-10" onChange={handleTitle} />
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
              name="content"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <MyEditor
                initialValue={editorContent}
                apiKey="m2scqo7knj5972vza3c3an2ex1x93cw66e1hlb9vejb61ya1"
                init={{
                  toolbar: false,
                  menubar: false,
                  inline: true,
                  plugins:
                    "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
                  quickbars_insert_toolbar:
                    "undo redo quicktable image codesample formatselect",
                  quickbars_selection_toolbar:
                    "bold italic underline | formatselect quicklink",
                  contextmenu: "undo redo | inserttable | help",
                }}
                onEditorChange={handleEditor}
              />
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
              <Input />
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
            wrapperCol={{ span: 24 }}
            layout="vertical"
            onFinish={(data) => {
              var sendTitle = data.title;
              var sendCategory = data.category;
              var sendTopic = data.topic;
              var sendFeaturedImage = data.featuredImage.file.response.path;
              var sendExcerpt = data.excerpt;
              var sendContent = data.content.level.content;
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
                },
              });
              form.resetFields();
              setPermalink(null);
              setImage(null);
              setEditorContent(null);
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
              className="featured-image-uploader"
              name="featuredImage"
              rules={[
                {
                  required: true,
                  message: "Article Cannot Be Without Featured Image",
                },
              ]}
            >
              <Upload
                name="avatar"
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
                    src={image}
                  />
                ) : (
                  <Text>Upload</Text>
                )}
              </Upload>
            </Form.Item>
            <Form.Item>
              {image ? (
                <Button
                  className="mt-10"
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
                        path: image,
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
              ) : null}
              <Button
                type="primary"
                className="mt-10 wd-100-pc"
                htmlType="submit"
              >
                Publish Article
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default createArticle;

export const getServerSideProps = async () => {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: getCatsandTopicsQuery,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};