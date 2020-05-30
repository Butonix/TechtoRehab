import { Tooltip, Row, Col, PageHeader } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import Shimmer from "../global/shimmer";
import Story from "../global/story";

const Featured = () => {
  return (
    <>
      <PageHeader
        title="Highlights"
        extra={[
          <>
            <span>See More</span> <ArrowRightOutlined />
          </>,
        ]}
      />

      <Row className="highlights" style={{ height: "100%" }}>
        <Col xs={20} sm={12} md={12} lg={12} xl={6}>
          <Shimmer story />
        </Col>
        <Col xs={20} sm={12} md={12} lg={12} xl={6}>
          <Shimmer story />
        </Col>
        <Col xs={20} sm={12} md={12} lg={12} xl={6}>
          <Shimmer story />
        </Col>
        <Col xs={20} sm={12} md={12} lg={12} xl={6}>
          <Shimmer story />
        </Col>
      </Row>
    </>
  );
};

export default Featured;
