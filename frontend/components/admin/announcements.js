import styled from "styled-components";
import { Row, Col, Space, Button, Input, Typography, Select, Form } from "antd";
import Announcement from "../global/announcement";
import { useState } from "react";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const AnnouncementsHolder = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  border: 1px solid #292929;
  padding: 10px;
`;

const Announcements = (props) => {
  return (
    <>
      <Row className="mb-30">
        <Title level={4} className="mg-20">
          Active Announcements
        </Title>
        <AnnouncementsHolder>
          <Announcement alert />
        </AnnouncementsHolder>
      </Row>
      <Row justify="space-around">
        <Col xs={24} sm={24} md={20} lg={20} xl={7} xxl={6} className="mg-20">
          <Title level={4} className="mg-20">
            Enter Announcement Details
          </Title>
          <Paragraph className="mg-20">
            Announcements are banners placed at the top of the website for:
            <ul className="mg-10">
              <li>Marketing</li>
              <li>Conveying Alerts</li>
              <li>Notify users of activity</li>
            </ul>
            <Space direction="vertical">
              <Text type="danger" strong>
                Maximum Banners are: 2
              </Text>
              <Text type="warning" strong>
                Note: After 2 banners, you need to delete one of them in order
                to add another
              </Text>
            </Space>
          </Paragraph>
        </Col>
        <Col xs={24} sm={24} md={20} lg={20} xl={16} xxl={12}>
          <Form layout="vertical">
            <Form.Item label="Message">
              <Input placeholder="Enter Your Message" />
            </Form.Item>
            <Form.Item label="Announcement Type">
              <Select defaultValue="alert">
                <Select.Option value="alert">Alert/Important</Select.Option>
                <Select.Option value="app">App Marketing</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Playstore Link">
              <Input placeholder="playstore link" />
            </Form.Item>
            <Form.Item label="Appstore Link">
              <Input placeholder="apple store link" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" className="unset-button">
                Submit Form
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Announcements;
