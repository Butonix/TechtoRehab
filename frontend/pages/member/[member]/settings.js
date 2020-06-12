import {
  Layout,
  Card,
  Typography,
  Row,
  Col,
  Divider,
  Form,
  Input,
  Button,
  Select,
  Tabs,
} from "antd";
import Sidebar from "components/global/sidebar";
import Wrapper from "components/global/wrapper";
import Nav from "components/global/nav";
import { useState } from "react";

const { Content } = Layout;
const { Text, Paragraph, Title } = Typography;

const MemberSettings = () => {
  const [progress, setProgress] = useState(0);
  return (
    <Wrapper>
      <Layout>
        <Nav />
        <Layout>
          <Sidebar />
          <Layout className="mainLayout">
            <Content className="site-layout pd-zero">
              <Card
                cover={
                  <img
                    src="https://i.imgur.com/zfNtfSb.jpg"
                    className="o-fit-cover"
                    height="240px"
                  />
                }
                bodyStyle={{ padding: 0 }}
              >
                <Row justify="center" className="pd-15">
                  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Row justify="center" className="mb-30">
                      <Title className="pd-20 ta-center" level={4}>
                        Account Settings
                      </Title>
                      <Divider className="mt-5" />
                    </Row>
                    <Tabs tabPosition="left">
                      <Tabs.TabPane tab="Basic Info" key="1">
                        <Form
                          wrapperCol={{ span: 12 }}
                          layout="vertical"
                          onFinish={() => alert("finished")}
                          onFinishFailed={() => alert("failed")}
                        >
                          <Form.Item
                            label="Username"
                            name="username"
                            className="ml-5"
                          >
                            <Input defaultValue="dukesa" disabled />
                          </Form.Item>

                          <Form.Item
                            label="Current Password"
                            name="current-password"
                            hasFeedback
                            rules={[
                              {
                                required: true,
                                message: `A Password is required`,
                              },
                              {
                                validator: async (_, val) => {
                                  if (val) {
                                    return new Promise((resolve, reject) => {
                                      setTimeout(() => {
                                        if (val == "Password12#$") {
                                          return resolve();
                                        } else {
                                          return reject("Password is Wrong");
                                        }
                                      }, 5000);
                                    });
                                  } else {
                                    return;
                                  }
                                },
                              },
                            ]}
                          >
                            <Input.Password minLength={8} maxLength={20} />
                          </Form.Item>

                          <Form.Item
                            label=" New Password"
                            name="new-password"
                            hasFeedback
                            rules={[
                              {
                                required: true,
                                message: `A Password is required`,
                              },
                              {
                                message:
                                  "Password must have atleast one Small, one Capitalized, one Number and one Special Symbol",
                                pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                              },
                              {
                                message: "Must Be Atleast 12 Characters Long",
                                min: 12,
                              },
                            ]}
                          >
                            <Input.Password />
                          </Form.Item>

                          <Form.Item
                            label="Repeat Password"
                            name="repeat-password"
                            hasFeedback
                            rules={[
                              {
                                required: true,
                                message: `A Password is required`,
                              },

                              ({ getFieldValue }) => ({
                                validator(rule, value) {
                                  if (
                                    !value ||
                                    getFieldValue("new-password") === value
                                  ) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(
                                    "The two passwords that you entered do not match!"
                                  );
                                },
                              }),
                            ]}
                          >
                            <Input.Password />
                          </Form.Item>
                          <Form.Item>
                            <Button type="primary" htmlType="submit">
                              Submit
                            </Button>
                          </Form.Item>
                        </Form>
                      </Tabs.TabPane>
                      <Tabs.TabPane tab="Account Preferences" key="2">
                        <Form layout="vertical">
                          <Form.Item
                            label="Collaboration Features"
                            wrapperCol={{ span: 12 }}
                          >
                            <Select defaultValue="1">
                              <Select.Option value="1">Activate</Select.Option>
                              <Select.Option value="2">
                                De-Activate
                              </Select.Option>
                            </Select>
                          </Form.Item>
                          <Form.Item label="Verfication Status">
                            <Row>
                              <Button type="primary">Apply</Button>
                            </Row>
                          </Form.Item>
                        </Form>
                      </Tabs.TabPane>
                      <Tabs.TabPane tab="Website Preferences" key="3">
                        <Form layout="vertical" wrapperCol={{ span: 12 }}>
                          <Form.Item label="Website Theme">
                            <Select defaultValue={1}>
                              <Select.Option value={1}>Dark Mode</Select.Option>
                              <Select.Option value={0}>
                                Light Mode
                              </Select.Option>
                            </Select>
                          </Form.Item>
                        </Form>
                      </Tabs.TabPane>
                    </Tabs>
                  </Col>
                </Row>
              </Card>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Wrapper>
  );
};

export default MemberSettings;
