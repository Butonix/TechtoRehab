import {
  Row,
  Col,
  Result,
  Input,
  Typography,
  Button,
  Space,
  Modal,
  Select,
} from "antd";
import { UploadOutlined, PlusOutlined, DeleteFilled } from "@ant-design/icons";
import { useState } from "react";
import Story from "../global/story";
import React from "react";

const { Paragraph, Title, Text } = Typography;
const { Option } = Select;

const Creator = (props) => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [authors, setAuthors] = useState(null);
  const [backgrounda, setBackground] = useState("");

  const editorPlace = React.createRef();

  var data = {
    keya: page,
    title: null,
    category: null,
    authors: null,
    date: new Date().toUTCString(),
    image: null,
  };
  var elem;
  const [highlightData, setHighlightData] = useState([data]);

  const [page, setPage] = useState(0);

  var addData = () => {
    // Object.assign(highlightData[page], data);
    // setHighlightData([...highlightData]);
    Modal.success({
      title: "Success!",
      content: "Status Successfully Saved",
    });
  };

  var changePage = () => {
    if (page == 5) {
      Modal.error({
        title: "Error Adding Page",
        content: "Can't Add More Than 6 Pages",
      });
      return;
    } else {
      setTitle(null);
      setSummary(null);
      setBackground(null);
      setPage(page + 1);

      setHighlightData(
        highlightData.concat({
          keya: page,
          title: "Title For Page" + " " + (page + 2),
          content: "Summary For Page" + " " + (page + 2),
          image: backgrounda,
        })
      );
    }
  };

  var removePage = () => {
    if (page == 0) {
      alert("You Cant Remove The Default Page");
      return;
    } else {
      setHighlightData(
        highlightData.filter(
          (filtered) => filtered.title !== highlightData[page].title
        )
      );
      setPage(page - 1);
    }
  };

  var onTitle = (e) => {
    props.setCond("Saving Title");
    Object.assign(highlightData[page], { keya: page, title: e.target.value });
    setHighlightData(highlightData);
  };

  var onSummary = (e) => {
    props.setCond("Saving Summary");
    Object.assign(highlightData[page], { content: e.target.value });
    setHighlightData(highlightData);
  };

  var onCategory = (e) => {
    props.setCond("Saving Category");
    Object.assign(highlightData[page], { category: e.target.value });
    setHighlightData(highlightData);
  };

  var onImage = (e) => {
    props.setCond("Saving Image");
    data.image = e.target.value;
    Object.assign(highlightData[page], { image: e.target.value });
    setHighlightData(highlightData);
  };

  var onAuthors = (val) => {
    props.setCond("Saving Authors");
    val = val.toString();
    var vala;
    if (val.includes(",")) {
      val = val.split(",");
      vala = val;
    } else {
      vala = [val];
    }
    Object.assign(highlightData[page], { authors: vala });
    setHighlightData(highlightData);
  };

  return (
    <>
      <Row justify="center" className="highlight-row">
        {
          (console.log(highlightData),
          highlightData.map((mapped, index) => (
            <Col className="highlight-decide" md={11} xxl={8}>
              <Title
                level={4}
                style={{
                  textAlign: "center",
                  margin: "20px 0px",
                }}
              >
                Page {index + 1}
              </Title>
              <Story
                title={mapped.title}
                category={index < 1 ? mapped.category : null}
                content={index >= 1 ? mapped.content : null}
                authors={index < 1 ? mapped.authors : null}
                date={index < 1 ? mapped.date : null}
                image={mapped.image}
                logo={index < 1 ? true : false}
              />
            </Col>
          )))
        }
        <Col className="warning-col">
          <Result
            status="warning"
            title="Sorry, The Editor Is Only Usable On High Resolution Devices Like Laptop/PC"
            extra={
              <Button type="primary" key="console">
                Go Back
              </Button>
            }
          />
        </Col>
      </Row>
      <Row>
        <Col xl={22} xxl={22}>
          <Row justify="center">
            <Space style={{ margin: "20px auto" }}>
              <Col>
                <Title level={4}>Highlights Page</Title>
              </Col>
              <Col>
                <Select
                  className="ml-30 wd-100pc"
                  onChange={(value) => setPage(value)}
                  value={page}
                >
                  {highlightData.map((mapped, index) => (
                    <Option value={index}> {index + 1}</Option>
                  ))}
                </Select>
              </Col>
            </Space>
          </Row>
          <Row justify="center">
            <Text strong>*Click Update To Preview Changes & Save Page</Text>
          </Row>
        </Col>
      </Row>
      <Row justify="center" className="highlight-decide">
        <Col xxl={12} xl={12} className="mg-auto">
          <div ref={editorPlace}>
            <Text style={{ lineHeight: 3 }}>Title</Text>
            <Input
              placeholder="Add A Title"
              onChange={(e) => setTitle(e.target.value)}
              onInput={(e) => onTitle(e)}
              value={highlightData[page].title}
              onBlur={() => props.setCond("Saved Title Field")}
            />
          </div>

          {page == 0 ? (
            <>
              <Text className="lh-3">Category</Text>
              <Input
                placeholder="Basic usage"
                onChange={(e) => setCategory(e.target.value)}
                defaultValue={data.category}
                value={highlightData[page].category}
                onInput={(e) => onCategory(e)}
                onBlur={() => props.setCond("Saved Category Field")}
              />
            </>
          ) : null}
          {page == 0 ? (
            <>
              <Text className="lh-3">Author/Authors</Text>
              <Select
                mode="multiple"
                className="wd-100pc"
                placeholder="Please Select Author(s)"
                onChange={(value) => onAuthors(value)}
                onBlur={() => props.setCond("Saved Authors Field")}
                defaultValue={highlightData[page].authors}
              >
                <Option value={null} key={1}>
                  Select An Option
                </Option>
                <Option value="Dukesx" key={1}>
                  Dukesx
                </Option>
                <Option value="Dukea" key={2}>
                  Dukea
                </Option>
              </Select>
            </>
          ) : null}
          {page > 0 ? (
            <>
              <Text className="lh-3">Summary</Text>
              <Input
                placeholder="Basic usage"
                onChange={(e) => setSummary(e.target.value)}
                onInput={(e) => onSummary(e)}
                onBlur={() => props.setCond("Saved Summary Field")}
                value={highlightData[page].content}
              />
            </>
          ) : null}
          <Text className="lh-3">Background Image (Must Be Valid URL)</Text>
          <Input
            placeholder="Basic usage"
            // onChange={(e) => setBackground(e.target.value)}
            onBlur={() => props.setCond("Saved Image Field")}
            onInput={(e) => onImage(e)}
            value={highlightData[page].image}
          />
          <Space style={{ margin: "10px 0px" }}>
            <Button
              className="mt-20"
              onClick={addData}
              type="primary"
              icon={<UploadOutlined />}
            >
              Save All
            </Button>
            <Button
              onClick={changePage}
              className="mt-20 ml-15"
              type="primary"
              icon={<PlusOutlined />}
            >
              Add Page
            </Button>
            <Button
              onClick={removePage}
              className="mt-20 ml-15 fw-bold"
              icon={<DeleteFilled />}
              danger
            >
              Remove Page
            </Button>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default Creator;
