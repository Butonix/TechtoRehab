import { Card, Row, Col, Layout, Typography } from "antd";
import Wrapper from "components/global/wrapper";
import Nav from "components/global/nav";
import Sidebar from "components/global/sidebar";
import { useRouter } from "next/router";

const { Content } = Layout;
const { Text, Paragraph, Title } = Typography;
const Category = () => {
  const router = useRouter();
  const { cat } = router.query;
  return (
    <Wrapper>
      <Layout>
        <Nav />
        <Layout>
          <Sidebar />
          <Layout className="mainLayout">
            <Content className="site-layout">
              <Card title={`${cat}`.replace(/-/g, " ").toUpperCase()}>
                <Row>
                  <Col>Column</Col>
                </Row>
              </Card>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Wrapper>
  );
};

export default Category;
