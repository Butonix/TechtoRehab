import {
  Row,
  Col,
  Typography,
  Tabs,
  Form,
  Drawer,
  Upload,
  Input,
  List,
  Skeleton,
  Card,
  Avatar,
  Button,
  message,
} from "antd";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useState } from "react";
import gradient from "random-gradient";
import { useEffect } from "react";

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
  const [drawer, setDrawer] = useState(false);
  const [drawerData, setDrawerData] = useState(null);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  useEffect(() => {
    if (drawerData) {
      form2.setFieldsValue({ title: drawerData.title });
    }
  }, [drawerData]);

  const { data: getCategoriesData, loading: getCategoriesLoading } = useQuery(
    getCategoriesQuery
  );

  const [addCategory, { loading: addCategoryLoading }] = useMutation(
    addCategoryQuery,
    {
      onCompleted: () => {
        setSlug(null);
        setCover(null);
        form.resetFields();
        message.success("Category Added!");
      },
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
                          onClick={() => {
                            setDrawerData(item);
                            setDrawer(true);
                          }}
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
                        avatar={
                          item.cover ? (
                            <Avatar size={40} src={item.cover + ".webp"} />
                          ) : (
                            <div
                              className="d-flex jc-center flex-column ai-center"
                              style={{
                                height: 40,
                                width: 40,
                              }}
                            >
                              <div
                                className="br-circle"
                                style={{
                                  background: gradient(item.title),
                                  height: 40,
                                  position: "relative",
                                  zIndex: 1,
                                  width: "100%",
                                }}
                              />

                              <Paragraph
                                className="ta-center fs-22 lh-1 fw-bold t-transform-cpt"
                                ellipsis={{
                                  rows: 2,
                                }}
                                style={{
                                  position: "absolute",
                                  zIndex: 2,

                                  color: "white",
                                }}
                              >
                                <a
                                  href={`/category/${item.slug}`}
                                  style={{
                                    color: "inherit",
                                  }}
                                >
                                  J
                                </a>
                              </Paragraph>
                            </div>
                          )
                        }
                      />
                    </List.Item>
                  )}
                />
              )}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Create" key="createCat">
              <Form
                form={form}
                layout="vertical"
                onFinish={(finish) => {
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
                        style={{ width: "100%", height: 200 }}
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
        <Drawer
          placement="right"
          closable={false}
          maskClosable
          onClose={() => setDrawer(false)}
          visible={drawer}
          bodyStyle={{
            padding: 0,
          }}
          width={300}
        >
          {drawerData ? (
            <Card
              bordered={false}
              cover={
                drawerData.cover ? (
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    className="upload-zero-padding"
                  >
                    {drawerData.cover ? (
                      <img
                        src={
                          drawerData.cover ? drawerData.cover + ".webp" : null
                        }
                        height={300}
                        width="100%"
                      />
                    ) : null}
                  </Upload>
                ) : (
                  <div
                    className="d-flex jc-center flex-column ai-center"
                    style={{
                      height: 300,
                    }}
                  >
                    <div
                      style={{
                        background: gradient(drawerData.title),
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
                        href={`/category/${drawerData.slug}`}
                        style={{
                          color: "inherit",
                        }}
                      >
                        {drawerData.title}
                      </a>
                    </Paragraph>
                  </div>
                )
              }
            >
              <Form layout="vertical" form={form2}>
                <Form.Item
                  label="Title"
                  name="title"
                  initialValue={drawerData.title}
                >
                  <Input placeholder="Title" />
                </Form.Item>
              </Form>

              <div className="mg-y-20 d-flex flex-column">
                <Button className="mg-y-20" danger>
                  Remove Cover
                </Button>
                <Button type="primary">Replace Cover</Button>
              </div>
            </Card>
          ) : null}
        </Drawer>
      </Col>
    </Row>
  );
};

export default categoryManager;
