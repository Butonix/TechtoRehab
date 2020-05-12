import Stories from "react-insta-stories";
import { Row, Col, Input, Typography, Button, Space, Select } from "antd";
import { useState } from "react";
import Router from "next/router";

const { Paragraph, Title, Text } = Typography;
const { Option } = Select;
const Creator = () => {
  //   var formRef = React.createRef();
  const [title, setTitle] = useState("titla");
  const [summary, setSummary] = useState(`content`);
  const [backgrounda, setBackground] = useState("");
  const [highlightData, setHighlightData] = useState([]);

  var data = {
    url: "https://picsum.photos/1080/1920",
    seeMore: ({ close }) => (document.location.href = "http://localhost:3000"),
    header: {
      heading: title,
      subHeading: title,
    },
    content: () => (
      <div
        style={{
          background: backgrounda.includes("jpg", 0)
            ? `url(${backgrounda})`
            : backgrounda.includes("jpg", 0)
            ? `url(${backgrounda})`
            : backgrounda,
          width: "100%",
        }}
      >
        <p
          style={{
            marginTop: "30%",
            padding: 20,
            background: "rgba(0,0,0,0.5)",
          }}
        >
          {summary}
        </p>
      </div>
    ),
  };

  var addData = () => {
    setHighlightData([...highlightData, data]);
  };
  console.log(summary);
  return (
    <Row justify="center">
      <Col xs={24} sm={24} md={10} lg={10} xl={6} xxl={6}>
        <Stories
          stories={highlightData.map((mapped) => mapped)}
          defaultInterval={9000}
          width={"100%"}
          height={500}
          isPaused={true}
        />
      </Col>
      <Col
        xs={24}
        sm={24}
        md={10}
        lg={10}
        xl={14}
        xxl={14}
        style={{ padding: 20 }}
      >
        <div style={{ marginTop: "20px" }} />
        <Space>
          <Text>Article Title</Text>
          <Select
            defaultValue="Page-1"
            style={{ width: "100%", marginLeft: "100%" }}
          >
            <Option value="Page-1">Status Page 1</Option>
            <Option value="Page-2">Status Page 2</Option>
            <Option value="Page-3">Status Page 3</Option>
            <Option value="Page-4">Status Page 4</Option>
          </Select>
        </Space>
        <Input
          placeholder="Basic usage"
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginTop: "20px" }}
        />
        <div style={{ marginTop: "20px" }} />
        <Text>Summary</Text>
        <Input.TextArea
          placeholder="Basic usage"
          onChange={(e) => setSummary(e.target.value)}
          style={{ marginTop: "20px" }}
        />
        <div style={{ marginTop: "20px" }} />
        <Text>Background Image/Color</Text>
        <Input
          placeholder="Basic usage"
          onChange={(e) => setBackground(e.target.value)}
          style={{ marginTop: "20px" }}
        />
        <Button onClick={addData} style={{ marginTop: "20px" }}>
          {highlightData.length == 0 ? 'Preview' : 'Add Another Page'}
        </Button>
      </Col>
    </Row>
  );
};

export default Creator;
