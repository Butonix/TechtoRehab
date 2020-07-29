import {
  Row,
  Col,
  Typography,
  Tabs,
  Form,
  Drawer,
  Select,
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

const getTopicsQuery = gql`
  query getTopics {
    topic {
      id
      title
      slug
      description
      cover
      parent_category
    }
  }
`;

const getCategoriesQuery = gql`
  query getCategories {
    category {
      id
      title
    }
  }
`;

const addTopicQuery = gql`
  mutation addCategory(
    $title: String!
    $cover: String
    $slug: String!
    $description: String!
    $pCategory: uuid!
  ) {
    insert_topic_one(
      object: {
        cover: $cover
        description: $description
        title: $title
        slug: $slug
        parent_category: $pCategory
      }
    ) {
      slug
    }
  }
`;

const updateTopicQuery = gql`
  mutation updateTopic(
    $id: uuid!
    $title: String!
    $cover: String
    $description: String!
    $slug: String!
    $pCategory: uuid!
  ) {
    update_topic(
      where: { id: { _eq: $id } }
      _set: {
        title: $title
        slug: $slug
        description: $description
        cover: $cover
        parent_category: $pCategory
      }
    ) {
      affected_rows
    }
  }
`;

const topicsManager = () => {
  const [cover, setCover] = useState(null);
  const [slug, setSlug] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [drawerData, setDrawerData] = useState(null);
  const [form2Slug, setForm2Slug] = useState(null);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  useEffect(() => {
    if (drawerData) {
      form2.setFieldsValue({ title: drawerData.title });
      form2.setFieldsValue({ description: drawerData.description });
      form2.setFieldsValue({
        pCategory: drawerData.parent_category,
      });
      setForm2Slug(drawerData.slug);
    }
  }, [drawerData]);

  const {
    data: getTopicsData,
    refetch: getTopicsRefetech,
    loading: getTopicsLoading,
  } = useQuery(getTopicsQuery);

  const [addTopic, { loading: addTopicLoading }] = useMutation(addTopicQuery, {
    onCompleted: () => {
      setSlug(null);
      setCover(null);
      form.resetFields();
      getTopicsRefetech();
      message.success("Category Added!");
    },
    onError: (err) => console.log(err),
  });

  const { data: getCategoriesData, loading: getCategoriesLoading } = useQuery(
    getCategoriesQuery
  );

  const [updateTopic] = useMutation(updateTopicQuery, {
    onCompleted: () => {
      message.success("Topic updated");
      getTopicsRefetech();
    },
    onError: (err) => {
      message.error("Error updating topic");
      console.log(err);
    },
  });

  return (
    <Row justify="center">
      <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={14} className="pd-10">
        <Title className="mt-20 mb-20" level={4}>
          Topics Manager
        </Title>
        <Row>
          <Tabs
            defaultActiveKey="cats"
            style={{
              width: "100%",
            }}
          >
            <Tabs.TabPane tab="Topics" key="cats">
              {getTopicsLoading ? (
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
                  dataSource={getTopicsData.topic}
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
                        <a href={`/topic/${item.slug}`}>
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
                            <Avatar
                              size={40}
                              src={item.cover + "?tr=h-40,w-40,f-webp"}
                            />
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
                                  {item.title.charAt(0)}
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
                  addTopic({
                    variables: {
                      title: finish.title,
                      description: finish.description,
                      cover: finish.cover.fileList[0].response.path,
                      slug: slug,
                      pCategory: finish.pCategory,
                    },
                  });
                }}
              >
                <Form.Item
                  name="title"
                  label="Topic Title"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    placeholder="Topic Title"
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
                    <a className="fw-400" href={`/topic/${slug.toLowerCase()}`}>
                      {"/topic/" + slug.toLowerCase()}
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
                  <Input placeholder="Topic Description" />
                </Form.Item>
                <Form.Item label="Parent Category" name="pCategory">
                  <Select showSearch placeholder="Select a parent category">
                    {getCategoriesLoading ? (
                      <Skeleton round paragraph={false} title avatar={false} />
                    ) : (
                      getCategoriesData.category.map((category) => (
                        <Select.Option value={category.id}>
                          {category.title}
                        </Select.Option>
                      ))
                    )}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="cover"
                  label="Topic Cover"
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
                        src={cover + "tr=h-200,f-webp"}
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
                    name="imageUpload"
                    listType="picture-card"
                    showUploadList={false}
                    action="/api/imageUpload"
                    className="upload-zero-padding"
                    onChange={(info) => {
                      if (info.file.status == "done") {
                        setDrawerData({
                          ...drawerData,
                          cover: info.file.response.path,
                        });
                      }
                    }}
                  >
                    {drawerData.cover ? (
                      <img
                        src={
                          drawerData.cover
                            ? drawerData.cover + "?tr=h-200,f-webp"
                            : null
                        }
                        height={200}
                        width="100%"
                      />
                    ) : null}
                  </Upload>
                ) : (
                  <Upload
                    name="imageUpload"
                    listType="picture-card"
                    showUploadList={false}
                    action="/api/imageUpload"
                    className="upload-zero-padding"
                    onChange={(info) => {
                      console.log(info);
                      if (info.file.status == "done") {
                        setDrawerData({
                          ...drawerData,
                          cover: info.file.response.path,
                        });
                      }
                    }}
                  >
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
                        {drawerData.title}
                      </Paragraph>
                    </div>
                  </Upload>
                )
              }
            >
              <Form
                layout="vertical"
                form={form2}
                onFinish={(data) => {
                  updateTopic({
                    variables: {
                      id: drawerData.id,
                      title: data.title,
                      description: data.description,
                      cover: drawerData.cover,
                      slug: form2Slug,
                      pCategory: data.pCategory,
                    },
                  });
                }}
              >
                <Form.Item
                  label="Title"
                  name="title"
                  initialValue={drawerData.title}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    placeholder="Title"
                    onChange={(val) => {
                      setForm2Slug(val.target.value);
                    }}
                  />
                </Form.Item>
                {form2Slug ? (
                  <Text
                    style={{
                      verticalAlign: 15,
                    }}
                    strong
                  >
                    Permalink:{" "}
                    <a
                      className="fw-400"
                      href={`/topic/${form2Slug.toLowerCase()}`}
                    >
                      {"/topic/" + form2Slug.toLowerCase()}
                    </a>
                  </Text>
                ) : null}
                <Form.Item
                  label="Description"
                  name="description"
                  initialValue={drawerData.description}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Description" />
                </Form.Item>

                <Form.Item
                  label="Parent Category"
                  name="pCategory"
                  initialValue={drawerData.parent_category}
                >
                  <Select showSearch placeholder="Select a parent category">
                    {getCategoriesLoading ? (
                      <Skeleton round paragraph={false} title avatar={false} />
                    ) : (
                      getCategoriesData.category.map((category) => (
                        <Select.Option value={category.id}>
                          {category.title}
                        </Select.Option>
                      ))
                    )}
                  </Select>
                </Form.Item>

                <Form.Item>
                  <div className="d-flex">
                    {drawerData.cover ? (
                      <Button
                        className="mg-x-10"
                        danger
                        onClick={() => {
                          setDrawerData({ ...drawerData, cover: null });
                          updateTopic({
                            variables: {
                              id: drawerData.id,
                              slug: form2Slug,
                              cover: null,
                              description: drawerData.description,
                              title: drawerData.title,
                            },
                          });
                        }}
                      >
                        Remove Cover
                      </Button>
                    ) : null}
                    <Button type="primary" htmlType="submit">
                      Update
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </Card>
          ) : null}
        </Drawer>
      </Col>
    </Row>
  );
};

export default topicsManager;
