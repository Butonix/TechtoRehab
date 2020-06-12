import {
  Layout,
  Space,
  Card,
  Button,
  Form,
  Row,
  Col,
  Typography,
  Input,
  PageHeader,
  Skeleton,
} from "antd";
import { CheckOutlined, LoadingOutlined } from "@ant-design/icons";
import Nav from "components/global/nav.js";
import Sidebar from "components/global/sidebar";
import React from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
import Shimmer from "components/global/shimmer";
import Wrapper from "components/global/wrapper";
import { useStoreState } from "easy-peasy";

var CreateEditor = dynamic(
  () => import("@tinymce/tinymce-react").then((editor) => editor.Editor),
  { ssr: false, loading: () => <Shimmer editor /> }
);

const onChanger = (content, editor) => {
  console.log("Content is" + content);
};
const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
var highlightData = [
  {
    url: "",
    header: {
      heading: "",
      subHeading: "",
    },
    content: () => {},
  },
];

const Compose = () => {
  const darkState = useStoreState((state) => state.site.dark);
  var handleChange = (e) => {
    if (e.target.value == "") {
      this.setState({
        title: "",
        typing: false,
      });
    } else {
      this.setState({
        typing: true,
        tempTitle: e.target.value,
      });
    }
  };

  var handleText = () => {
    var lastLength = this.state.tempTitle.length - 1;
    console.log(lastLength);
    var tempoTitle = this.state.tempTitle.replace(/ /g, "-");

    if (tempoTitle.includes("-", lastLength)) {
      console.log("yes it as");
      tempoTitle = tempoTitle.slice(0, lastLength);
    }
    this.setState({
      typing: false,
      title: tempoTitle,
    });
  };

  return (
    <Wrapper>
      <Layout>
        <Nav />
        <Layout>
          <Sidebar global />

          <Layout className="mainLayout">
            <Content className="site-layout pd-zero">
              <Card
                title="Create Article"
                cover={
                  <img
                    src="https://images.wallpaperscraft.ru/image/gory_luna_les_139359_1366x768.jpg"
                    className="o-fit-cover"
                    height="240px"
                  />
                }
                extra={
                  <Space>
                    <Button type="primary" className="unset-button">
                      Publish
                    </Button>
                    <Button type="primary" className="unset-button">
                      Save Draft
                    </Button>
                  </Space>
                }
                bodyStyle={{ padding: 0 }}
              >
                <Row className="pd-10">
                  <Col span={24}>
                    <Form layout="vertical" wrapperCol={{ span: 24 }}>
                      <Form.Item label="Title">
                        <Input />
                        <Space>
                          <Text className="lh-3">URL:</Text>
                          <Typography.Paragraph
                            style={{ height: 10 }}
                            ellipsis={{
                              rows: 3,
                              expandable: true,
                              symbol: "More",
                            }}
                          >
                            <a>
                              https://techtorehab.com/react/javascript/Welcome-To-The-Jungle-Is-Jumanji-Tyle
                            </a>
                          </Typography.Paragraph>
                        </Space>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
                <Row className="pd-x-10">
                  <Col span={24}>
                    <CreateEditor
                      apiKey="m2scqo7knj5972vza3c3an2ex1x93cw66e1hlb9vejb61ya1"
                      initialValue="<p>Initial content</p>"
                      init={{
                        height: 500,
                        plugins:
                          "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
                        images_upload_handler: function (
                          blobInfo,
                          success,
                          failure
                        ) {
                          var xhr, formData;
                          xhr = new XMLHttpRequest();
                          xhr.withCredentials = false;
                          xhr.open(
                            "POST",
                            "http://localhost:3000/api/imageHandler"
                          );

                          xhr.onload = function () {
                            var json;

                            if (xhr.status != 200) {
                              failure("HTTP Error: " + xhr.status);
                              return;
                            }

                            json = JSON.parse(xhr.responseText);
                            if (!json || typeof json.location != "string") {
                              failure("Invalid JSON: " + xhr.responseText);
                              return;
                            }

                            success(json.location);
                          };
                          var finalData = JSON.stringify({
                            info: blobInfo.blob().name,
                            type: blobInfo.blob().type,
                            base64: blobInfo.base64(),
                          });
                          console.log(finalData);
                          xhr.send(finalData);
                        },
                        images_upload_url:
                          "http://localhost:3000/api/imageHandler",
                      }}
                    />
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

export default Compose;
