import { Result, Button } from "antd";
import { useRouter } from "next/router";

function Error({ statusCode }) {
  const router = useRouter();
  return (
    <Result
      status="error"
      title="Error Fetching Data"
      subTitle="Please try again in a few minutes"
      icon={<img src="/server-error.svg" height={500} />}
      style={{ margin: "10%" }}
      extra={[
        <Button type="primary" onClick={() => router.reload()}>
          Reload Page
        </Button>,
        <Button type="link" onClick={() => router.reload()}>
          Contact Support
        </Button>,
      ]}
    />
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
