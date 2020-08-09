import { Row, Col, Card, Typography, List, Space } from "antd";
import Wrapper from "components/global/wrapper";
import withSession from "lib/session";
import Error from "components/global/401";

const { Title, Text, Paragraph } = Typography;
const Create = (props) => {
  return (
    <Wrapper user={props.user}>
      {props.user ? (
        <Row justify="center" className="pd-20">
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={10}>
            <Title level={4} className="mg-y-30">
              CHOOSE AN OPTION
            </Title>

            <Card>
              <List>
                <List.Item
                  extra={
                    <a href="/create/article">
                      <img
                        className="o-fit-cover"
                        src="https://de23g11v4qrwk.cloudfront.net/article.svg"
                        width={150}
                      />
                    </a>
                  }
                >
                  <List.Item.Meta
                    title={
                      <a href="/create/article">
                        <Space>
                          <Text strong className="fs-18">
                            ARTICLE
                          </Text>
                          <i className="ri-arrow-right-line ri-lg va-middle"></i>
                        </Space>
                      </a>
                    }
                  />
                </List.Item>

                <List.Item
                  extra={
                    <img
                      src="https://de23g11v4qrwk.cloudfront.net/coming-soon.svg"
                      width={150}
                    />
                  }
                >
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
      ) : (
        <Error />
      )}
    </Wrapper>
  );
};

export default Create;

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get(["session"]);
  return {
    props: {
      user: user ? user : null,
    },
  };
});
