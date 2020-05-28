import { Row, Col, Layout } from "antd";
import { useRouter } from "next/router";
import Nav from "components/global/nav";
import Wrapper from "components/global/wrapper";
import Sidebar from "components/global/sidebar";

const Author = () => {
  const router = useRouter();
  var { author } = router.query;
  const { Content } = Layout;
  return (
    <Layout>
      <Nav />
      <Layout>
        <Sidebar />
        <Layout className="mainLayout">
          <Content className="site-layout">>{author}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Author;
