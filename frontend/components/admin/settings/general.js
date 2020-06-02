import {
  Row,
  Col,
  Typography,
  Button,
  Upload,
  Form,
  Card,
  Space,
  Radio,
  Input,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

const fileList = [
  {
    uid: "-1",
    name: "image.png",
    status: "done",
    url:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
];

const GeneralSettings = () => {
  const [image, setImage] = useState(null);

  const changer = (info) => {
    if (info.file.status === "done") {
      const reader = new FileReader();
      reader.readAsDataURL(info.file.originFileObj);
      reader.onload = () => setImage(reader.result);
    }
  };

  return (
    <Row>
      <Col xs={24} sm={24} md={24} lg={24} xl={16} xxl={12}>
        <Typography.Title level={4} style={{ marginBottom: "30px" }}>
          Update Details
        </Typography.Title>
        <Form name="basic" layout="vertical">
          <Form.Item label="Site Title" name="site-name">
            <Input placeholder="Hello" />
          </Form.Item>
          <Form.Item label="Site Tagline" name="site-tagline">
            <Input placeholder="Hello" />
          </Form.Item>
          <Form.Item label="SEO Tags" name="seo-tags">
            <Input placeholder="Hello" />
          </Form.Item>
          <Form.Item label="Site Mode" name="site-mode">
            <Radio.Group defaultValue={2}>
              <Radio value={1}>Maintenance</Radio>
              <Radio value={2}>Available</Radio>
            </Radio.Group>
          </Form.Item>
          <Typography.Text className="fs-20 lh-3">
            Open Graph Settings
          </Typography.Text>
          <Form.Item label="Open Graph Picture" name="og-pic">
            {/* <Upload.Dragger
              defaultFileList={fileList}
              listType="picture-card"
              accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              beforeUpload={(file) => {
                return false;
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from
                uploading company data or other band files
              </p>
            </Upload.Dragger> */}

            <Upload
              name="avatar"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              onChange={changer}
              listType="picture"
              progress={{
                strokeColor: {
                  "0%": "#108ee9",
                  "100%": "#87d068",
                },
                strokeWidth: 3,
                format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
              }}
              onRemove={() => setImage(null)}
            >
              {image ? (
                <img
                  src={image}
                  width="250px"
                  height="250px"
                  className="o-fit-cover"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <Card
                  className="mg-20"
                  style={{
                    borderStyle: "dashed",
                    borderWidth: 2,
                    borderColor: "#292929",
                    width: 150,
                    height: 150,
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Space direction="vertical">
                    <a>
                      <PlusOutlined /> Upload File
                    </a>
                  </Space>
                </Card>
              )}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary wd-100pc">Update Settings</Button>
          </Form.Item>
        </Form>
      </Col>
      <Col className="pd-10" sm={24} xs={24} md={24} lg={24} xl={8} xxl={12}>
        <Card title="Key">Card</Card>
      </Col>
    </Row>
  );
};
export default GeneralSettings;
