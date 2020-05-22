import { Layout } from "antd";
import Nav from "components/global/nav";
import Sidebar from "components/global/sidebar";
import Wrapper from "components/global/wrapper";

const { Content } = Layout;

const Index = () => {
  return (
    <Wrapper>
      <Layout>
        <Nav />
        <Layout>
          <Sidebar admin />
          <Layout className="mainLayout">
            <Content className="site-layout">Something</Content>
          </Layout>
        </Layout>
      </Layout>
    </Wrapper>
  );
};

export default Index;
