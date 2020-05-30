import styled from "styled-components";
import { Row, Col, Space, Button, Input, Typography, Select, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const AnnouncementHolder = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  overflow: auto;
  height: 200px;
  padding: 10px;
  width: 100%;
  justify-content: center;
`;

const Announcement = styled.div`
  display: flex;
  background: red;
  color: white;
  font-size: 16px;
  padding: 10px;
  width: 500px;
  height: 50px;
  margin: 10px;

  .type {
  }
  .title {
    width: 300px;
    max-width: 450px;
  }
  .button {
    margin-left: auto;
    margin-right: 10px;
    margin-top: auto;
    margin-bottom: auto;
    i {
      color: white;
    }
  }
  .close {
    margin-left: auto;
    margin-top: auto;
    margin-bottom: auto;
    i {
      color: white;
    }
  }
`;

var announces = [
  {
    id: "id-1",
    title: "Title is important",
    type: "info",
  },
  {
    id: "id-2",
    title: `Get Our App On Android`,
    type: "app",
    link: "https://google.com",
  },
  {
    id: "id-3",
    title: `Get Our App On Android`,
    type: "app",
    link: "https://google.com",
  },
  {
    id: "id-4",
    title: "Title is important",
    type: "info",
  },
];

const Announcements = (props) => {
  const [announce, setAnnounce] = useState(null);
  const [type, setType] = useState("");
  return props.pid ? (
    <>
      <Title level={4}>Active Announcements</Title>
      <Row className="mg-30" justify="center">
        <AnnouncementHolder>
          {announces.map((mapped) => (
            <Announcement
              style={{
                background:
                  mapped.type == "info"
                    ? "blue"
                    : mapped.type == "important"
                    ? "red"
                    : mapped.type == "app"
                    ? "green"
                    : null,
              }}
            >
              <Space>
                <div className="type">
                  {mapped.type == "info" ? (
                    <i class="ri-information-line ri-lg"></i>
                  ) : mapped.type == "important" ? (
                    <i class="ri-alert-fill ri-lg"></i>
                  ) : mapped.type == "app" ? (
                    <i class="ri-google-play-line ri-lg"></i>
                  ) : null}
                </div>
                <div className="title">{mapped.title}</div>
              </Space>
              {mapped.type == "app" ? (
                <div className="button">
                  <a href={mapped.link}>
                    <i class="ri-link ri-lg"></i>
                  </a>
                </div>
              ) : null}
              <div
                className="close"
                style={{ marginLeft: mapped.type == "app" ? 10 : null }}
              >
                <i class="ri-close-line ri-lg"></i>
              </div>
            </Announcement>
          ))}
        </AnnouncementHolder>
      </Row>
      <Row justify="center">
        <Title level={4}>Create An Announcement</Title>
      </Row>
      <Row style={{ margin: 28 }} justify="center">
        <Col>
          <Text className="fs-18 lh-3">Announcement Text</Text>
          <Input />
          <Text className="lh-6 fs-18">Announcement Type</Text>
          <Select
            className="ml-20 lh-6"
            style={{ width: 120 }}
            defaultValue="info"
            onChange={(value) => setType(value)}
          >
            <Option value="info">Info</Option>
            <Option value="important">Important</Option>
            <Option value="app">App</Option>
          </Select>
          {type == "app" ? (
            <>
              <div className="lh-3 fs-18">App Store Link</div>
              <Input />
            </>
          ) : null}
          <Row justify="center">
            <Button type="primary mt-30" icon={<UploadOutlined />}>
              Submit
            </Button>
          </Row>
        </Col>
      </Row>
    </>
  ) : null;
};

export default Announcements;
