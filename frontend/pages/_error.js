function Error({ statusCode }) {
  return (
    <Result
      status="error"
      title="Error Fetching Data"
      subTitle="Please try again in a few minutes"
      icon={<img src="/server-error.svg" />}
      style={{ margin: "10%" }}
      extra={[
        <Button type="primary" onClick={() => router.reload()}>
          Reload Page
        </Button>,
        <Button type="link" onClick={() => router.reload()}>
          Contact Support
          {console.log(error)}
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
