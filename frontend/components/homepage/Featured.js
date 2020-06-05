import { Tooltip, Row, Col, PageHeader } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import Shimmer from "../global/shimmer";
import Story from "../global/story";

const Featured = () => {
  return (
    <>
      <Row className="highlights" style={{ height: "100%" }}>
        <Col xs={21} sm={14} md={12} lg={12} xl={6}>
          <Shimmer story />
          {/* <Story
            image="https://i.pinimg.com/originals/0b/46/b2/0b46b242910f95dbbde264a40163a5cf.jpg"
            title="A Good Day To Die Hard"
            content="This is default content placeholder for you"
            category="REACT"
          /> */}
        </Col>
        <Col xs={21} sm={14} md={12} lg={12} xl={6}>
          <Shimmer story />
          {/* <Story
            image="https://www.pixel4k.com/wp-content/uploads/2018/10/meteors-mininimalist-4k_1540755562.jpg"
            title="A Good Day To Die Hard"
            content="This is default content placeholder for you"
            category="REACT"
          /> */}
        </Col>
        <Col xs={21} sm={14} md={12} lg={12} xl={6}>
          <Shimmer story />
          {/* <Story
            image="https://api.time.com/wp-content/uploads/2020/04/coronajihad-india-coronavirus-islamophobia.jpg"
            title="A Good Day To Die Hard"
            content="This is default content placeholder for you"
            category="REACT"
          /> */}
        </Col>
        <Col xs={21} sm={14} md={12} lg={12} xl={6}>
          <Shimmer story />
        </Col>
      </Row>
    </>
  );
};

export default Featured;
