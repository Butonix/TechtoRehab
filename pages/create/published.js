import { Row, Col, Card, Button, Typography, Result } from "antd";
import Wrapper from "components/global/wrapper";
import { useRouter } from "next/router";
import withSession from "lib/session";

const { Text, Title, Paragraph } = Typography;
const PublishedArticle = (props) => {
  const router = useRouter();
  return (
    <Wrapper user={props.user}>
      <Row justify="center" className="pd-y-20">
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={10}>
          <Card
            bodyStyle={{
              padding: 0,
            }}
          >
            {props.id ? (
              <>
                <Title
                  className=" ta-center mt-10 fs-22 mt-30 mb-30 lh-2 fw-400 pd-x-10"
                  level={4}
                >
                  Awsum 😁😁💯 How 'bout another one then ehh ? 😎😋
                </Title>

                <img
                  src="https://de23g11v4qrwk.cloudfront.net/published.svg"
                  width="100%"
                  className="o-fit-cover published-page-image"
                />
                <Row justify="center" className="mt-30 mb-30">
                  <Button className="mr-20" type="primary">
                    <a
                      href={`/article/${props.category}/${
                        props.topic ? props.topic : ""
                      }/${props.slug}`}
                    >
                      <Text className="color-inherit">View Article</Text>
                    </a>
                  </Button>
                  <Button className="compose-button2" type="secondary">
                    <a href="/create">
                      <Text className="fw-bold">Write Another</Text>
                    </a>
                  </Button>
                </Row>
              </>
            ) : (
              <Result
                title="Error"
                status="error"
                subTitle="It seems you followed the wrong url"
                extra={
                  <>
                    <Button type="primary" onClick={() => router.back()}>
                      Go Back
                    </Button>
                  </>
                }
              />
            )}
          </Card>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default PublishedArticle;

export const getServerSideProps = withSession(async function ({
  req,
  res,
  query,
}) {
  const user = req.session.get(["session"]);
  const { id, title, slug, category, topic } = query;
  return {
    props: {
      id: id ? id : null,
      title: title ? title : null,
      slug: slug ? slug : null,
      category: category ? category : null,
      topic: topic ? topic : null,
      user: user ? user : null,
    },
  };
});
