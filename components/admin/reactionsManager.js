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

const { Text, Paragraph, Title } = Typography;
const random = require("simple-random-number-generator");
const ReactionsManager = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [gradient, setGradient] = useState(null);
  return (
    <Row justify="center">
      <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={14} className="pd-10">
        <Title level={4} className="mt-20 mb-20">
          Reactions Manager
        </Title>
        <Tabs>
          <Tabs.TabPane tab="Reactions" key="reactions"></Tabs.TabPane>
          <Tabs.TabPane tab="Create" key="create">
            <Row justify="space-between">
              <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={14}>
                <Form
                  layout="vertical"
                  wrapperCol={{
                    span: 24,
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
                  <Form.Item>
                    <Button type="primary" className="mg-x-10">
                      Add Reaction
                    </Button>
                    <Button
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
                </Form>
                <Divider orientation="center">OR</Divider>
                <Form
                  layout="vertical"
                  onFinish={(fin) => {
                    setGradient([fin.color1, fin.color2]);
                  }}
                >
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
                      <Button type="primary" htmlType="submit">
                        Update Colors
                      </Button>
                    </Form.Item>
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
