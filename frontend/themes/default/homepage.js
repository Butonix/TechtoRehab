import Home from "pages";
import Head from "next/head";
import { Row, Col, Typography } from "antd";

const Homepage = (props) => {
  return (
    <Row>
      <Col>
        <Typography.Text>{props.title}</Typography.Text>
      </Col>
    </Row>
  );
};

export default Homepage;
