import { Layout, Row, Col, Card, Typography, Space, Anchor } from "antd";
import Sidebar from "components/global/sidebar";
import Wrapper from "components/global/wrapper";
import Nav from "components/global/nav";
import { useRouter } from "next/router";

const { Text, Paragraph, Title } = Typography;
const { Content } = Layout;

const StaticPages = () => {
  const router = useRouter();
  const { category, topic } = router.query;
  return (
    <Wrapper>
      <Layout>
        <Nav />
        <Layout>
          <Sidebar />
          <Layout className="mainLayout">
            <Content className="site-layout pd-zero">
              <Row>
                <Col span={24}>
                  <Card
                    title={topic.toUpperCase()}
                    bodyStyle={{ padding: 0 }}
                    cover={
                      <img
                        className="o-fit-cover"
                        src="https://i.redditmedia.com/0CcuY4Nhna1qanO7NkioGBbJIZ-hl7xpoe_80lC1HUY.jpg?w=1024&s=3f4f98d18da5fb9fed6a837495a48e69"
                        height="240px"
                      />
                    }
                    extra={
                      <div className="d-flex">
                        <i class="ri-double-quotes-l ri-lg lh-1-6 mr-10"></i>
                        <Anchor affix={false}>
                          <Anchor.Link href="#cite" title="Cite This Page" />
                        </Anchor>
                      </div>
                    }
                  >
                    <Row justify="center pd-20">
                      <Col
                        className="ta-justify lh-1-5 fs-16"
                        xs={24}
                        sm={24}
                        lg={18}
                        xl={18}
                        xxl={18}
                      >
                        <Row className="mt-10">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nunc est est, laoreet a urna non, sollicitudin
                          euismod tortor. Donec nec mauris nulla. Vivamus
                          porttitor, metus eget pharetra venenatis, mauris ex
                          tristique est, in scelerisque est nisl vitae dui. In
                          accumsan cursus viverra. Morbi imperdiet erat at odio
                          cursus sollicitudin. Nullam ullamcorper accumsan leo,
                          sed gravida metus finibus eu. Cras in sem id dolor
                          suscipit porttitor. Mauris fermentum cursus tellus at
                          ultricies. Fusce eget leo quis erat scelerisque
                          laoreet a vel ipsum. Etiam consequat est id velit
                          imperdiet, non pretium lorem semper. Phasellus sodales
                          elit ac nunc rhoncus aliquet. Fusce varius elementum
                          volutpat. Cras ut luctus dui, vitae gravida diam.
                          Donec dolor risus, sagittis sed lacus eget, sodales
                          placerat tellus. Cras pretium semper tellus eu
                          efficitur. Fusce felis lorem, sodales semper interdum
                          at, malesuada non lacus. Ut suscipit viverra felis,
                          pharetra auctor odio maximus ut. Vivamus malesuada,
                          orci id aliquam mollis, neque elit euismod ipsum, quis
                          feugiat nibh tellus vel eros.
                        </Row>

                        <Row className="mt-10">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nunc est est, laoreet a urna non, sollicitudin
                          euismod tortor. Donec nec mauris nulla. Vivamus
                          porttitor, metus eget pharetra venenatis, mauris ex
                          tristique est, in scelerisque est nisl vitae dui. In
                          accumsan cursus viverra. Morbi imperdiet erat at odio
                          cursus sollicitudin. Nullam ullamcorper accumsan leo,
                          sed gravida metus finibus eu. Cras in sem id dolor
                          suscipit porttitor. Mauris fermentum cursus tellus at
                          ultricies. Fusce eget leo quis erat scelerisque
                          laoreet a vel ipsum. Etiam consequat est id velit
                          imperdiet, non pretium lorem semper. Phasellus sodales
                          elit ac nunc rhoncus aliquet. Fusce varius elementum
                          volutpat. Cras ut luctus dui, vitae gravida diam.
                          Donec dolor risus, sagittis sed lacus eget, sodales
                          placerat tellus. Cras pretium semper tellus eu
                          efficitur. Fusce felis lorem, sodales semper interdum
                          at, malesuada non lacus. Ut suscipit viverra felis,
                          pharetra auctor odio maximus ut. Vivamus malesuada,
                          orci id aliquam mollis, neque elit euismod ipsum, quis
                          feugiat nibh tellus vel eros.
                        </Row>

                        <Row className="mt-10">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nunc est est, laoreet a urna non, sollicitudin
                          euismod tortor. Donec nec mauris nulla. Vivamus
                          porttitor, metus eget pharetra venenatis, mauris ex
                          tristique est, in scelerisque est nisl vitae dui. In
                          accumsan cursus viverra. Morbi imperdiet erat at odio
                          cursus sollicitudin. Nullam ullamcorper accumsan leo,
                          sed gravida metus finibus eu. Cras in sem id dolor
                          suscipit porttitor. Mauris fermentum cursus tellus at
                          ultricies. Fusce eget leo quis erat scelerisque
                          laoreet a vel ipsum. Etiam consequat est id velit
                          imperdiet, non pretium lorem semper. Phasellus sodales
                          elit ac nunc rhoncus aliquet. Fusce varius elementum
                          volutpat. Cras ut luctus dui, vitae gravida diam.
                          Donec dolor risus, sagittis sed lacus eget, sodales
                          placerat tellus. Cras pretium semper tellus eu
                          efficitur. Fusce felis lorem, sodales semper interdum
                          at, malesuada non lacus. Ut suscipit viverra felis,
                          pharetra auctor odio maximus ut. Vivamus malesuada,
                          orci id aliquam mollis, neque elit euismod ipsum, quis
                          feugiat nibh tellus vel eros.
                        </Row>

                        <Row className="mt-10">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nunc est est, laoreet a urna non, sollicitudin
                          euismod tortor. Donec nec mauris nulla. Vivamus
                          porttitor, metus eget pharetra venenatis, mauris ex
                          tristique est, in scelerisque est nisl vitae dui. In
                          accumsan cursus viverra. Morbi imperdiet erat at odio
                          cursus sollicitudin. Nullam ullamcorper accumsan leo,
                          sed gravida metus finibus eu. Cras in sem id dolor
                          suscipit porttitor. Mauris fermentum cursus tellus at
                          ultricies. Fusce eget leo quis erat scelerisque
                          laoreet a vel ipsum. Etiam consequat est id velit
                          imperdiet, non pretium lorem semper. Phasellus sodales
                          elit ac nunc rhoncus aliquet. Fusce varius elementum
                          volutpat. Cras ut luctus dui, vitae gravida diam.
                          Donec dolor risus, sagittis sed lacus eget, sodales
                          placerat tellus. Cras pretium semper tellus eu
                          efficitur. Fusce felis lorem, sodales semper interdum
                          at, malesuada non lacus. Ut suscipit viverra felis,
                          pharetra auctor odio maximus ut. Vivamus malesuada,
                          orci id aliquam mollis, neque elit euismod ipsum, quis
                          feugiat nibh tellus vel eros.
                        </Row>
                      </Col>
                    </Row>
                    <Row className="mt-20 pd-x-10" justify="center">
                      <Col>
                        <Title className="anchor-heading" level={4}>
                          Reference
                        </Title>
                        <Paragraph
                          id="cite"
                          copyable
                          code
                          ellipsis={{
                            rows: 1,
                            expandable: true,
                            symbol: "more",
                          }}
                        >
                          Lachman Test. (2020, April 27). Physiopedia, .
                          Retrieved 10:48, June 9, 2020 from
                          https://www.physio-pedia.com/index.php?title=Lachman_Test&oldid=236286.
                        </Paragraph>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Wrapper>
  );
};

export default StaticPages;
