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

//Extra Cards

{
  /* <Col xs={23} sm={12} md={12} lg={12} xl={6}>
          <Card
            style={{ margin: "20px" }}
            cover={
              <img src="https://image.freepik.com/free-vector/abstract-colorful-flow-shapes-background_23-2148244293.jpg" />
            }
            loading={false}
            hoverable={true}
            actions={[
              <Tooltip title="Bookmark This">
                <a>
                  <i class="ri-bookmark-line ri-lg"></i>
                </a>
              </Tooltip>,
              <Dropdown overlay={menu} trigger={["click"]} placement="topRight">
                <a onClick={(e) => e.preventDefault()}>
                  <i class="ri-more-2-line ri-lg"></i>
                </a>
              </Dropdown>,
            ]}
          >
            <Card.Meta
              title="Data Visualization Libraries for React Developers in 2019"
              description="This is a random excerpt of a post you should know"
            />
          </Card>
        </Col>
        <Col xs={23} sm={12} md={12} lg={12} xl={6}>
          <Card
            style={{ margin: "20px" }}
            cover={
              <img src="https://image.freepik.com/free-vector/abstract-colorful-flow-shapes-background_23-2148244293.jpg" />
            }
            loading={false}
            hoverable={true}
            actions={[
              <Tooltip title="Bookmark This">
                <a>
                  <i class="ri-bookmark-line ri-lg"></i>
                </a>
              </Tooltip>,
              <Dropdown overlay={menu} trigger={["click"]} placement="topRight">
                <a onClick={(e) => e.preventDefault()}>
                  <i class="ri-more-2-line ri-lg"></i>
                </a>
              </Dropdown>,
            ]}
          >
            <Card.Meta
              title="The Most Comprehensive Lesson On React Javascript"
              description="This is a random excerpt of a post you should know"
            />
          </Card>
        </Col>
        <Col xs={23} sm={12} md={12} lg={12} xl={6}>
          <Card
            style={{ margin: "20px" }}
            cover={
              <img src="https://image.freepik.com/free-vector/abstract-colorful-flow-shapes-background_23-2148244293.jpg" />
            }
            loading={false}
            hoverable={true}
            actions={[
              <Tooltip title="Bookmark This">
                <a>
                  <i class="ri-bookmark-line ri-lg"></i>
                </a>
              </Tooltip>,
              <Dropdown overlay={menu} trigger={["click"]} placement="topRight">
                <a onClick={(e) => e.preventDefault()}>
                  <i class="ri-more-2-line ri-lg"></i>
                </a>
              </Dropdown>,
            ]}
          >
            <Card.Meta
              title="The Most Comprehensive Lesson On React Javascript"
              description="This is a random excerpt of a post you should know"
            />
          </Card>
        </Col>
        <Col xs={23} sm={12} md={12} lg={12} xl={6}>
          <Card
            style={{ margin: "20px" }}
            cover={
              <img src="https://image.freepik.com/free-vector/abstract-colorful-flow-shapes-background_23-2148244293.jpg" />
            }
            loading={false}
            hoverable={true}
            actions={[
              <Tooltip title="Bookmark This">
                <a>
                  <i class="ri-bookmark-line ri-lg"></i>
                </a>
              </Tooltip>,
              <Dropdown overlay={menu} trigger={["click"]} placement="topRight">
                <a onClick={(e) => e.preventDefault()}>
                  <i class="ri-more-2-line ri-lg"></i>
                </a>
              </Dropdown>,
            ]}
          >
            <Card.Meta
              title="The Most Comprehensive Lesson On React Javascript"
              description="This is a random excerpt of a post you should know"
            />
          </Card>
        </Col> */
}
