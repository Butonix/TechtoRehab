import Head from "next/head";
import { Result, Button, Row, Col } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import Wrapper from "components/global/wrapper";

const Error404 = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>404 Not Found</title>
      </Head>
      <Wrapper
        seo={{
          title: "404 Page Not Found",
          description: "Page not Found",
          images: [
            {
              url: "https://de23g11v4qrwk.cloudfront.net/404.jpg",
              width: 800,
              height: 600,
              alt: "404 Page not found",
            },
          ],
        }}
      >
        <Row justify="center">
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={18}>
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
      </Wrapper>
    </>
  );
};

export default Error404;
