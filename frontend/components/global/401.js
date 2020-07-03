import Head from "next/head";
import { Result, Button } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";

const error = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>401 Unauthorized</title>
      </Head>
      <Result
        status="error"
        title="401 Unauthorized"
        subTitle="You need to be logged in to access this page"
        icon={<img src="/401.svg" height={400} />}
        style={{ margin: "10%" }}
        extra={[
          <Button type="primary">
            <Link href="/get-started">
              <a>Sign In</a>
            </Link>
          </Button>,
          <Button type="secondary" onClick={() => router.push("/")}>
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

export default error;
