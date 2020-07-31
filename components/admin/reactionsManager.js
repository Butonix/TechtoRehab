import {
  Form,
  Row,
  Col,
  Typography,
  Result,
  Input,
  Divider,
  Card,
  Avatar,
  Select,
  Skeleton,
  Drawer,
  List,
  Button,
  Space,
  message,
  Tabs,
} from "antd";
import { useQuery, useMutation, gql, useLazyQuery } from "@apollo/client";
import icons from "public/icons.json";
import { useState } from "react";
import gradients from "public/gradients.json";

const getReactionsQuery = gql`
  query getReactions {
    reactions {
      id
      code
      gradient
      name
    }
  }
`;

const addReactionQuery = gql`
  mutation addReaction($code: String!, $gradient: jsonb!, $name: String!) {
    insert_reactions_one(
      object: { code: $code, gradient: $gradient, name: $name }
    ) {
      gradient
    }
  }
`;

const deleteReactionQuery = gql`
  mutation deleteReaction($id: uuid!) {
    delete_reactions_to_articles(where: { reaction_id: { _eq: $id } }) {
      affected_rows
    }
    delete_reactions(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const { Text, Paragraph, Title } = Typography;
const random = require("simple-random-number-generator");
const ReactionsManager = () => {
  const [form] = Form.useForm();
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [gradient, setGradient] = useState(null);

  const {
    data: getReactionsData,
    loading: getReactionsLoading,
    refetch: getReactionsRefetch,
  } = useQuery(getReactionsQuery);
  const [addReaction] = useMutation(addReactionQuery, {
    onCompleted: () => {
      message.success("Reaction Added");
      getReactionsRefetch();
    },
    onError: (err) => console.log(err),
  });

  const [deleteReaction] = useMutation(deleteReactionQuery, {
    onCompleted: () => {
      message.success("Reaction Deleted");
      getReactionsRefetch();
    },
    onError: () => message.error("Couldnt Delete Reaction"),
  });
  return (
    <Row justify="center">
      <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={14} className="pd-10">
        <Title level={4} className="mt-20 mb-20">
          Reactions Manager
        </Title>
        <Tabs>
          <Tabs.TabPane tab="Reactions" key="reactions">
            {getReactionsLoading ? (
              <Skeleton
                avatar={{
                  shape: "circle",
                  size: 40,
                }}
                paragraph={false}
                title
                round
                active
              />
            ) : (
              <List
                dataSource={getReactionsData ? getReactionsData.reactions : []}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <a
                        onClick={() => {
                          deleteReaction({
                            variables: {
                              id: item.id,
                            },
                          });
                        }}
                      >
                        <i className="ri-delete-bin-line va-middle fs-20"></i>
                      </a>,
                    ]}
                  >
                    <List.Item.Meta
                      title={
                        <Text className="fs-16 t-transform-cpt">
                          {item.name}
                        </Text>
                      }
                      avatar={
                        <i
                          className={`${item.code} fs-22 va-middle mr-10 text-enable-gradient`}
                          style={item.gradient}
                        />
                      }
                    />
                  </List.Item>
                )}
              />
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Create" key="create">
            <Row justify="space-between">
              <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={14}>
                <Form
                  layout="vertical"
                  wrapperCol={{
                    span: 24,
                  }}
                  form={form}
                  onFinish={(data) => {
                    addReaction({
                      variables: {
                        name: data.rName,
                        code: selectedIcon,
                        gradient: {
                          backgroundColor: gradient[0],
                          backgroundImage: `linear-gradient(180deg, ${gradient[0]} 0%, ${gradient[1]} 74%)`,
                        },
                      },
                    });
                  }}
                >
                  <Form.Item
                    label="Reaction Name"
                    name="rName"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="Reaction Name" />
                  </Form.Item>
                  <Form.Item name="icon" label="Icon">
                    <Select
                      placeholder="Choose Icon"
                      onChange={(val) => {
                        setSelectedIcon(val);
                      }}
                      showSearch
                      allowClear
                    >
                      {icons.icons.map((icons) => (
                        <Select.Option
                          value={"ri-" + icons.substring(0, icons.length - 4)}
                        >
                          {icons}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item label="Colors">
                    <Form.Item
                      name="color1"
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
                      }}
                    >
                      <Input placeholder="First - for e.g #F3E6E8" />
                    </Form.Item>
                    <Form.Item
                      name="color2"
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
                        margin: "0 8px",
                      }}
                    >
                      <Input placeholder="Second - for e.g #F3E6E8" />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        icon={
                          <i className="ri-check-line fs-16 va-middle mr-10"></i>
                        }
                        onClick={() => {
                          var color1 = form.getFieldValue("color1");
                          var color2 = form.getFieldValue("color2");
                          setGradient([color1, color2]);
                        }}
                      >
                        Update Colors
                      </Button>
                      <Divider type="vertical" />
                      <Button
                        icon={
                          <i className="ri-refresh-line fs-16 va-middle mr-10"></i>
                        }
                        onClick={() => {
                          var number = random({
                            min: 0,
                            max: 333,
                          });
                          const gradient = gradients[Math.floor(number)];
                          setGradient(gradient.colors);
                        }}
                      >
                        Generate Gradient
                      </Button>
                    </Form.Item>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Add Reaction
                    </Button>
                    <Button
                      type="link"
                      className="ml-10"
                      onClick={() => {
                        form.resetFields();
                        setSelectedIcon(null);
                        setGradient(null);
                      }}
                    >
                      Reset Form
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={5} xxl={9}>
                <div className="d-flex flex-column ai-center">
                  <Text strong>Preview:</Text>
                  {selectedIcon ? (
                    <i
                      className={`${selectedIcon} va-middle text-enable-gradient`}
                      style={{
                        fontSize: 60,
                        backgroundColor: gradient ? gradient[0] : "black",
                        backgroundImage: gradient
                          ? `linear-gradient(180deg, ${gradient[0]} 0%, ${gradient[1]} 74%)`
                          : "unset",
                      }}
                    />
                  ) : (
                    <Text className="va-middle mt-10" strong type="danger">
                      Please Choose An Icon
                    </Text>
                  )}
                </div>
              </Col>
            </Row>
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default ReactionsManager;
