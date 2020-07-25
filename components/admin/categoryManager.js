import {
  Row,
  Col,
  Typography,
  Tabs,
  Form,
  Upload,
  Input,
  List,
  Skeleton,
  Avatar,
  Button,
  message,
} from "antd";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useState } from "react";

const { Text, Paragraph, Title } = Typography;

const getCategoriesQuery = gql`
  query getCategories {
    category {
      title
      slug
      description
      cover
    }
  }
`;

const addCategoryQuery = gql`
  mutation addCategory(
    $title: String!
    $cover: String
    $slug: String!
    $description: String!
  ) {
    insert_category_one(
      object: {
        cover: $cover
        description: $description
        title: $title
        slug: $slug
      }
    ) {
      slug
    }
  }
`;

const categoryManager = () => {
  const [cover, setCover] = useState(null);
  const [slug, setSlug] = useState(null);

  const { data: getCategoriesData, loading: getCategoriesLoading } = useQuery(
    getCategoriesQuery
  );

  const [addCategory, { loading: addCategoryLoading }] = useMutation(
    addCategoryQuery,
    {
      onCompleted: () => message.success("Category Added!"),
      onError: (err) => console.log(err),
    }
  );

  return (
    <Row justify="center">
      <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={14} className="pd-10">
        <Title className="mt-20 mb-20" level={4}>
          Category Manager
        </Title>
        <Row>
          <Tabs
            defaultActiveKey="cats"
            style={{
              width: "100%",
            }}
          >
            <Tabs.TabPane tab="Categories" key="cats">
              {getCategoriesLoading ? (
                <Skeleton
                  className="mt-10"
                  active
                  avatar={{
                    shape: "circle",
                  }}
                  paragraph={false}
                  title
                  round
                />
              ) : (
                <List
                  dataSource={getCategoriesData.category}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <Button
                          type="link"
                          icon={
                            <i
                              className="ri-edit-2-line ri-lg va-middle fs-20"
                              style={{
                                color: "inherit",
                              }}
                            ></i>
                          }
                          className="ml-10"
                        />,
                        <a href={`/category/${item.slug}`}>
                          <Button
                            type="link"
                            icon={
                              <i
                                className="ri-external-link-line ri-lg va-middle fs-20"
                                style={{
                                  color: "inherit",
                                }}
                              ></i>
                            }
                            className="ml-10"
                          />
                        </a>,
                      ]}
                    >
                      <List.Item.Meta
                        title={
                          <Text className="fs-14 t-transform-cpt">
                            {item.title}
                          </Text>
                        }
                        avatar={<Avatar size={40} src={item.cover + ".webp"} />}
                      />
                    </List.Item>
                  )}
                />
              )}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Create" key="createCat">
              <Form
                layout="vertical"
                onFinish={(finish) => {
                  console.log(finish);
                  console.log(slug);
                  addCategory({
                    variables: {
                      title: finish.title,
                      description: finish.description,
                      cover: finish.cover.fileList[0].response.path,
                      slug: slug,
                    },
                  });
                }}
              >
                <Form.Item
                  name="title"
                  label="Category Title"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    placeholder="Category Title"
                    onChange={(input) => {
                      if (input.target.value.length > 4) {
                        setSlug(input.target.value);
                      } else {
                        setSlug(null);
                      }
                    }}
                  />
                </Form.Item>
                {slug ? (
                  <Text
                    style={{
                      verticalAlign: 15,
                    }}
                    strong
                  >
                    Permalink:{" "}
                    <a
                      className="fw-400"
                      href={`/category/${slug.toLowerCase()}`}
                    >
                      {"/category/" + slug.toLowerCase()}
                    </a>
                  </Text>
                ) : null}

                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Category Description" />
                </Form.Item>
                <Form.Item
                  name="cover"
                  label="Category Cover"
                  valuePropName="cover"
                >
                  <Upload
                    className="medium-upload-picture-card mg-y-10 ml-auto"
                    name="imageUpload"
                    listType="picture-card"
                    showUploadList={false}
                    action="/api/imageUpload"
                    onChange={(info) => {
                      if (info.file.status === "done") {
                        setCover(info.fileList[0].response.path);
                      }
                    }}
                  >
                    {cover ? (
                      <img
                        src={cover + ".webp"}
                        alt="avatar"
                        style={{ width: "200px", height: 200 }}
                      />
                    ) : (
                      <Text>Upload</Text>
                    )}
                  </Upload>
                </Form.Item>
                {slug ? (
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                ) : (
                  <Text type="danger" strong>
                    Please Enter A Title Of Minimum 4 Characters
                  </Text>
                )}
              </Form>
            </Tabs.TabPane>
          </Tabs>
        </Row>
      </Col>
    </Row>
  );
};

export default categoryManager;
