import {
  Layout,
  Space,
  Spin,
  Empty,
  Row,
  Col,
  Typography,
  Input,
  PageHeader,
} from "antd";
import { CheckOutlined, LoadingOutlined } from "@ant-design/icons";
import Nav from "../components/global/nav.js";
import Sidebar from "../components/global/sidebar";
import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import dynamic from "next/dynamic";

var CreateHighlight = dynamic(
  () => import("../components/compose/createHighlight"),
  { ssr: false }
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
class Compose extends React.Component {
  state = {
    dark: false,
    tempTitle: null,
    title: "",
    typing: false,
  };
  componentDidMount() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this.setState({
        dark: true,
      });
    } else {
      this.setState({
        dark: false,
      });
    }

    var mql = window.matchMedia("(prefers-color-scheme: dark)");
    mql.addEventListener("change", () => {
      // if (
      //   window.matchMedia &&
      //   window.matchMedia("(prefers-color-scheme: dark)").matches
      // ) {
      //   console.log("before update", this.state.dark);
      //   this.setState({
      //     dark: true,
      //   });
      //   console.log("after update", this.state.dark);
      // } else {
      //   this.setState({
      //     dark: false,
      //   });
      // }

      location.reload();
    });
  }

  handleChange = (e) => {
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

  handleText = () => {
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

  render() {
    return (
      <Layout>
        <Nav />
        <Layout>
          <Sidebar />
          <Layout className="mainLayout">
            <Content className="site-layout">
              <div style={{ margin: "20px 0px" }} />
              <PageHeader
                className="composeHeader"
                extra={
                  <Space>
                    <span>Url:</span>
                    <a>
                      {"https://localhost:3000/articleCategories/" +
                        this.state.title}
                    </a>
                  </Space>
                }
                title="COMPOSE ARTICLE"
              />

              <Input
                placeholder="Article Title"
                allowClear
                suffix={[
                  this.state.typing ? (
                    <Space style={{ margin: "0px 10px" }}>
                      <CheckOutlined
                        style={{ color: "#34A852" }}
                        height="1.3em"
                        width="1.3em"
                        onClick={this.handleText}
                      />
                    </Space>
                  ) : null,
                ]}
                onChange={(e) => this.handleChange(e)}
              />
              <div style={{ margin: "20px 0px" }} />
              <Editor
                apiKey="m2scqo7knj5972vza3c3an2ex1x93cw66e1hlb9vejb61ya1"
                initialValue="<p>Initial content</p>"
                init={{
                  skin: this.state.dark == true ? "oxide-dark" : "",
                  height: 500,
                  menubar: false,
                  plugins:
                    "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
                  mobile: {
                    theme: "mobile",
                    menubar: true,
                  },
                  imagetools_cors_hosts: ["picsum.photos"],
                  menubar: "file edit view insert format tools table help",
                  toolbar:
                    "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
                  toolbar_sticky: true,
                  autosave_ask_before_unload: true,
                  autosave_interval: "30s",
                  autosave_prefix: "{path}{query}-{id}-",
                  autosave_restore_when_empty: false,
                  autosave_retention: "2m",
                  image_advtab: true,
                  content_css: "//www.tiny.cloud/css/codepen.min.css",
                  link_list: [
                    { title: "My page 1", value: "http://www.tinymce.com" },
                    { title: "My page 2", value: "http://www.moxiecode.com" },
                  ],
                  image_list: [
                    { title: "My page 1", value: "http://www.tinymce.com" },
                    { title: "My page 2", value: "http://www.moxiecode.com" },
                  ],
                  image_class_list: [
                    { title: "None", value: "" },
                    { title: "Some class", value: "class-name" },
                  ],
                  importcss_append: true,
                  file_picker_callback: function (callback, value, meta) {
                    /* Provide file and text for the link dialog */
                    if (meta.filetype === "file") {
                      callback("https://www.google.com/logos/google.jpg", {
                        text: "My text",
                      });
                    }

                    /* Provide image and alt text for the image dialog */
                    if (meta.filetype === "image") {
                      callback("https://www.google.com/logos/google.jpg", {
                        alt: "My alt text",
                      });
                    }

                    /* Provide alternative source and posted for the media dialog */
                    if (meta.filetype === "media") {
                      callback("movie.mp4", {
                        source2: "alt.ogg",
                        poster: "https://www.google.com/logos/google.jpg",
                      });
                    }
                  },
                  templates: [
                    {
                      title: "New Table",
                      description: "creates a new table",
                      content:
                        '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
                    },
                    {
                      title: "Starting my story",
                      description: "A cure for writers block",
                      content: "Once upon a time...",
                    },
                    {
                      title: "New list with dates",
                      description: "New List with dates",
                      content:
                        '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
                    },
                  ],
                  template_cdate_format:
                    "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
                  template_mdate_format:
                    "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
                  height: 600,
                  image_caption: true,
                  quickbars_selection_toolbar:
                    "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
                  noneditable_noneditable_class: "mceNonEditable",
                  toolbar_mode: "sliding",
                  contextmenu: "link image imagetools table",
                  image_uploadtab: true,
                  images_upload_handler: function (blobInfo, success, failure) {
                    var xhr, formData;
                    xhr = new XMLHttpRequest();
                    xhr.withCredentials = false;
                    xhr.open("POST", "http://localhost:3000/api/imageHandler");

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
                    console.log(blobInfo.blob().type);
                    var finalData = JSON.stringify({
                      info: blobInfo.blob().name,
                      type: blobInfo.blob().type,
                      base64: blobInfo.base64(),
                    });
                    console.log(finalData);
                    xhr.send(finalData);
                  },
                  images_upload_url: "http://localhost:3000/api/imageHandler",
                }}
                onChange={onChanger}
                onEditorChange={onChanger}
              />
              <>
                <Title level={4} style={{ margin: "20px 0px" }}>
                  Highlights
                </Title>
                <Row>
                  {!highlightData ? (
                    <Empty />
                  ) : /* (
                    <Stories
                      stories={[highlightData.map((mapped) => mapped)]}
                      defaultInterval={3000}
                      width={"100%"}
                      height={500}
                      isPaused={false}
                    />
                    
                  ) */ null}
                </Row>
                <Title level={4} style={{ margin: "20px 0px" }}>
                  Create A Highlight
                </Title>
                <CreateHighlight />
              </>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default Compose;
