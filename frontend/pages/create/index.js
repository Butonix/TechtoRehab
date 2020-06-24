import { Row, Col, Card, Typography, List, Space } from "antd";
import Wrapper from "components/global/wrapper";

const { Title, Text, Paragraph } = Typography;
const Create = () => {
  return (
    <Wrapper>
      <Row justify="center" className="pd-20">
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={10}>
          <Title level={4} className="mg-y-30">
            CHOOSE AN OPTION
          </Title>

          <Card>
            <List>
              <List.Item
                extra={
                  <a>
                    <img
                      className="o-fit-cover"
                      src="article.svg"
                      width={150}
                    />
                  </a>
                }
              >
                <List.Item.Meta
                  title={
                    <a
                      href={`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/create/article`}
                    >
                      <Space>
                        <Text strong className="fs-18">
                          ARTICLE
                        </Text>
                        <i class="ri-arrow-right-line ri-lg va-middle"></i>
                      </Space>
                    </a>
                  }
                />
              </List.Item>

              <List.Item extra={<img src="comingSoon.svg" width={150} />}>
                <List.Item.Meta
                  title={
                    <Text strong className="fs-18">
                      Coming Soon!
                    </Text>
                  }
                />
              </List.Item>
            </List>
          </Card>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default Create;
