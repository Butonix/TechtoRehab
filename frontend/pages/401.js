import Head from "next/head";

const error = () => {
  return (
    <>
      <Head>
        <title>401 Unauthorized</title>
      </Head>
      <p>Sorry</p>
    </>
  );
};

export default error;

export async function getServerSideProps(context) {
  context.res.statusCode = 401;
  return { props: {} };
}
