import Head from "next/head";
import { Result, Button, Row, Col } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";

const Error404 = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>404 Not Found</title>
      </Head>
      <Row justify="center">
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <Result
            status="error"
            title="404 Not Found"
            subTitle="The Page You Are Looking For Is Either Removed or Doesn't Exist"
            icon={<img src="/404.svg" height={400} width="100%" />}
            style={{ margin: "10%" }}
            extra={[
              <Button type="primary" onClick={() => router.push("/")}>
                Back To Website
              </Button>,
              <Button type="link" onClick={() => router.reload()}>
                Contact Support
              </Button>,
            ]}
          />
        </Col>
      </Row>
    </>
  );
};

export default Error404;
