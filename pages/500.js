import Head from "next/head";
import { Result, Button, Row, Col } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import Wrapper from "components/global/wrapper";

const Error500 = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>500 Internal Server Error</title>
      </Head>
      <Wrapper
        seo={{
          title: "500 Internal Server Error",
          description: "Internal Server Error. Please Try Again Later",
          images: [
            {
              url: "/500.jpg",
              width: 800,
              height: 600,
              alt: "500 Internal Server Error",
            },
          ],
        }}
      >
        <Row justify="center">
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={18}>
            <Result
              status="error"
              title="500 Internal Server Error"
              subTitle="Internal Server Error. Please Try Again Later"
              icon={<img src="/500.svg" height={400} width="100%" />}
              style={{ margin: "10%" }}
              extra={[
                <Button type="primary" onClick={() => router.reload()}>
                  Reload
                </Button>,
                <Button type="link" onClick={() => router.reload()}>
                  Contact Support
                </Button>,
              ]}
            />
          </Col>
        </Row>
      </Wrapper>
    </>
  );
};

export default Error500;
