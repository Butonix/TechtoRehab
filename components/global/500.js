import Head from "next/head";
import { Result, Button, Typography } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";

const { Text } = Typography;
const Error500 = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>500 Internal Server Error</title>
      </Head>
      <Result
        status="error"
        title="500 Internal Server Error"
        subTitle={<Text strong>Error Fetching Data From Server</Text>}
        icon={<img src="/500.svg" height={300} />}
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
    </>
  );
};

export default Error500;
