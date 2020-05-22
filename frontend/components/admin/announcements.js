import styled from "styled-components";
import { Row, Col, Space, Button, Input, Typography, Select } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const AnnouncementHolder = styled.div`
  display: flex;
  overflow: auto;
  width: 100%;
  padding: 10px;
`;

const Announcement = styled.div`
  display: flex;
  background: red;
  color: white;
  font-size: 16px;
  padding: 10px;
  width: 100%;
  height: 50px;
  margin: 0px 20px;

  .type {
  }
  .title {
  }
  .button {
    margin-left: auto;
    margin-right: 10px;
    margin-top: auto;
    margin-bottom: auto;
  }
  .close {
    margin-left: auto;
    margin-top: auto;
    margin-bottom: auto;
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
];

const Announcements = (props) => {
  const [announce, setAnnounce] = useState(null);
  const [type, setType] = useState("");
  return props.pid ? (
    <>
      <Row style={{ margin: 28 }}>
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
          <Text style={{ lineHeight: 3, fontSize: 18 }}>Announcement Text</Text>
          <Input />
          <Text style={{ lineHeight: 6, fontSize: 18 }}>Announcement Type</Text>
          <Select
            style={{ width: 120, marginLeft: 20, lineHeight: 6 }}
            defaultValue="info"
            onChange={(value) => setType(value)}
          >
            <Option value="info">Info</Option>
            <Option value="important">Important</Option>
            <Option value="app">App</Option>
          </Select>
          {type == "app" ? (
            <>
              <div style={{ lineHeight: 3, fontSize: 18 }}>App Store Link</div>
              <Input />
            </>
          ) : null}
        </Col>
      </Row>
    </>
  ) : null;
};

export default Announcements;
