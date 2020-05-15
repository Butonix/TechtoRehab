import Stories from "react-insta-stories";
import {
  Row,
  Col,
  Result,
  Input,
  Typography,
  Button,
  Space,
  Select,
} from "antd";
import { useState } from "react";
import styled from "styled-components";
import Router from "next/router";
import { urlObjectKeys } from "next/dist/next-server/lib/utils";

const { Paragraph, Title, Text } = Typography;
const { Option } = Select;

const Story = styled.div`
  display: flex;
  flex-flow: column;
  height: 615px;
  width: 369px;
  font-size: 14px;
  font-weight: 600;
  position: relative;
  margin: 0 20px;
  :after {
    position: absolute;
    z-index: 2;
  }
  .image {
    z-index: 1;
    background-image: url("https://dynaimage-cdn-cnn-com.cdn.ampproject.org/i/s/dynaimage.cdn.cnn.com/cnn/w_768,h_1024,c_scale/https%3A%2F%2Fdynaimage.cdn.cnn.com%2Fcnn%2Fx_552%2Cy_0%2Cw_798%2Ch_1064%2Cc_crop%2Fhttps%253A%252F%252Fstamp.static.cnn.io%252F5b3f861ad045070021cb6c51%252FAntarctica-cover%252520image.jpg");
    background-size: cover;
    background-position: center;
    height: 615px;
    width: 369px;
  }

  .filter {
    z-index: 2;
    position: absolute;
    height: 100%;
    width: 100%;
    background-image: linear-gradient(
      180deg,
      transparent,
      transparent 50%,
      rgba(11, 11, 11, 0.8)
    );
  }
  .content {
    position: absolute;
    bottom: 0;
    margin-bottom: 20px;
    width: 350px;
    z-index: 3;
    padding: 32px;

    .logo {
      margin: 10px 0px;
      img {
        height: 40px;
        width: 40px;
      }
    }

    .category {
      margin: 5px 0px;
      font-size: 14px;
    }

    .title {
      font-size: 20px;
      line-height: 1.3;
      font-weight: 700;
    }

    .author {
      margin: 5px 0px;
      font-size: 12px;
    }

    .date {
      font-size: 12px;
    }
  }
`;

const Creator = () => {
  const [title, setTitle] = useState("Enter Title For Page 1");
  const [summary, setSummary] = useState(`content`);
  const [category, setCategory] = useState(`content`);
  const [backgrounda, setBackground] = useState(
    "https://c4.wallpaperflare.com/wallpaper/410/867/750/vector-forest-sunset-forest-sunset-forest-wallpaper-preview.jpg"
  );
  const [highlightData, setHighlightData] = useState([
    {
      title: title,
      category: category,
      content: summary,
      authors: ["", ""],
      date: "May 14th, 2019",
      image: backgrounda,
    },
  ]);
  const [page, setPage] = useState(0);

  var data = {
    title: title,
    category: "",
    content: summary,
    authors: ["", ""],
    date: "May 14th, 2019",
    image: backgrounda,
  };

  // var addData = () => {
  //   Object.assign(highlightData[page], data);
  //   setHighlightData([...highlightData]);
  // };
  var changePage = () => {
    if (page == 3) {
      alert("You can Add at most 4 Status");
      return;
    } else {
      setPage(page + 1);
      setHighlightData(
        highlightData.concat({
          title: "Add Title For Page" + " " + (page + 1 + 1),
          category: "",
          content: summary,
          authors: ["", ""],
          date: "May 14th, 2019",
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
    data.title = e.target.value;
    Object.assign(highlightData[page], data);
    setHighlightData([...highlightData]);
  };

  var onSummary = (e) => {
    data.content = e.target.value;
    Object.assign(highlightData[page], data);
    setHighlightData([...highlightData]);
  };

  var onCategory = (e) => {
    data.category = e.target.value;
    Object.assign(highlightData[page], data);
    setHighlightData([...highlightData]);
  };

  return (
    <>
      <Row justify="center" className="highlight-row" style={{}}>
        {highlightData.map((mapped, index) => (
          <Col className="highlight-decide" md={11} xxl={8}>
            <Title
              level={4}
              style={{
                textAlign: "center",
                margin: "20px 0px",
              }}
            >
              {/* Page {index + 1} */}
            </Title>
            <Story>
              <div
                className="image"
                style={{
                  backgroundImage: `url(${mapped.image})`,
                }}
              />
              <div className="filter" />
              <div className="content">
                <div className="logo">
                  <img src="http://localhost:3000/art.svg" />
                </div>
                <div className="category">{mapped.category}</div>
                <div className="title">{mapped.title}</div>
                <div className="summary">{mapped.content}</div>
                <div className="author">
                  {mapped.authors.length > 1
                    ? mapped.authors.map((mappedAuthor) => mapped.author)
                    : mapped.authors[0]}
                </div>
                <div className="date">Published {mapped.date}</div>
              </div>
            </Story>
          </Col>
        ))}
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
                  style={{
                    width: "100%",
                    marginLeft: "30px",
                  }}
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
            <Text strong>
              *Changes Are Previewed & Automatically Saved While You Type
            </Text>
          </Row>
        </Col>
      </Row>
      <Row justify="center" className="highlight-decide">
        <Col xxl={12} xl={12} style={{ margin: "auto" }}>
          <Text style={{ lineHeight: 3 }}>Title</Text>
          <Input
            placeholder="Add A Title"
            onChange={(e) => setTitle(e.target.value)}
            value={highlightData[page].title}
            onInput={(e) => onTitle(e)}
            allowClear
          />
          {page == 0 ? (
            <>
              <Text style={{ lineHeight: 3 }}>Category</Text>
              <Input
                placeholder="Basic usage"
                onInput={(e) => onCategory(e)}
                onChange={(e) => setCategory(e.target.value)}
              />
            </>
          ) : null}
          {page > 0 ? (
            <>
              <Text style={{ lineHeight: 3 }}>Summary</Text>
              <Input
                placeholder="Basic usage"
                onChange={(e) => setSummary(e)}
                onInput={(e) => onSummary(e)}
              />
            </>
          ) : null}
          <Text style={{ lineHeight: 3 }}>
            Background Image (Must Be Valid URL)
          </Text>
          <Input
            placeholder="Basic usage"
            onChange={(e) => setBackground(e.target.value)}
            defaultValue="https://c4.wallpaperflare.com/wallpaper/410/867/750/vector-forest-sunset-forest-sunset-forest-wallpaper-preview.jpg"
          />
          <Space style={{ margin: "10px 0px" }}>
            {/* <Button
              onClick={addData}
              type="primary"
              style={{ marginTop: "20px" }}
            >
              Submit
            </Button> */}
            <Button
              onClick={changePage}
              style={{
                marginTop: "20px",
                marginLeft: "15px",
              }}
              type="primary"
            >
              Add Highlight
            </Button>
            <Button
              onClick={removePage}
              style={{
                marginTop: "20px",
                marginLeft: "15px",
                fontWeight: "bold",
              }}
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
