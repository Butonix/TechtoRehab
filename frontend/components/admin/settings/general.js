import {
  Row,
  Col,
  Typography,
  Button,
  Upload,
  Form,
  Card,
  Select,
  Radio,
  Input,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
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
  return (
    <Row>
      <Col sm={24} md={24} lg={24} xl={16} xxl={12}>
        <Typography.Title level={4} style={{ marginBottom: "30px" }}>
          Update Details
        </Typography.Title>
        <Form name="basic" layout="vertical" wrapperCol={{ span: 24 }}>
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
          <Typography.Text style={{ fontSize: 20, lineHeight: 3 }}>
            Open Graph Settings
          </Typography.Text>
          <Form.Item label="Open Graph Picture" name="og-pic">
            <Upload.Dragger
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
            </Upload.Dragger>
          </Form.Item>
          <Form.Item>
            <Button type="primary" style={{ width: "100%" }}>
              Update Settings
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col
        sm={24}
        xs={24}
        md={24}
        lg={24}
        xl={8}
        xxl={12}
        style={{ padding: 10 }}
      >
        <Card title="Key">Card</Card>
      </Col>
    </Row>
  );
};
export default GeneralSettings;
