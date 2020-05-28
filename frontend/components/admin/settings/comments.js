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

const CommentSettings = () => {
  return (
    <Row>
      <Col sm={24} md={24} lg={24} xl={16} xxl={12}>
        <Typography.Title level={4} style={{ marginBottom: "30px" }}>
          Update Details
        </Typography.Title>
        <Form name="basic" layout="vertical" wrapperCol={{ span: 24 }}>
          <Form.Item label="Article Collaboration" name="article-requests">
            <Radio.Group defaultValue={2}>
              <Radio value={1}>Yes</Radio>
              <Radio value={2}>No</Radio>
            </Radio.Group>
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
export default CommentSettings;
