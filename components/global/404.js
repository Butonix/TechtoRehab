import Head from "next/head";
import { Result, Button, Typography } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";

const { Text } = Typography;
const Error404 = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>404 Not Found</title>
      </Head>
      <Result
        status="error"
        title="404 Not Found"
        subTitle={
          <Text strong>
            The Page You are Looking For Either Doesn't Exist or Has Been
            Removed
          </Text>
        }
        icon={<img src="/404.svg" height={500} />}
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
    </>
  );
};

export default Error404;
