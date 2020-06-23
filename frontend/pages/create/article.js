import { Row, Col, Menu, Switch, Typography, Space } from "antd";
import Wrapper from "components/global/wrapper";
import { Editor } from "@tinymce/tinymce-react";

const { Text, Title, Paragraph } = Typography;
const createArticle = () => {
  return (
    <Wrapper>
      <Row className="pd-10">
        <Col xs={24} sm={24} md={24} lg={20} xl={20} xxl={20} className="pd-20">
          <Editor
            initialValue="<p>This is the initial content of the editor</p>"
            apiKey="m2scqo7knj5972vza3c3an2ex1x93cw66e1hlb9vejb61ya1"
            init={{
              //   toolbar:
              //     "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview print | image link anchor codesample | ltr rtl",
              toolbar: false,
              menubar: false,
              inline: true,
              plugins:
                "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
              quickbars_insert_toolbar:
                "undo redo quicktable image codesample formatselect",
              quickbars_selection_toolbar:
                "bold italic underline | formatselect quicklink",
              contextmenu: "undo redo | inserttable | help",
            }}
          />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={4}
          xl={4}
          xxl={4}
          style={{ boxShadow: "-4px 3px 3px 1px #f5f5f5" }}
        >
          <Menu className="ta-center">
            <Menu.Item key="1">
              <Space>
                <Text className="va-middle">Enable Full Width</Text>
                <Switch />
              </Space>
            </Menu.Item>

            <Menu.Item key="2">
              <Space>
                <Text className="va-middle">Enable Full Width</Text>
                <Switch />
              </Space>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default createArticle;
