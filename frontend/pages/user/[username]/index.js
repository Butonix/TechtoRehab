import withSession from "lib/session";
import { useRouter } from "next/router";
import Wrapper from "components/global/wrapper";
import Error from "components/global/401";
import { initializeApollo } from "lib/apolloClient";
import gql from "graphql-tag";
import { Row, Col, Card, Typograph, Typography, Avatar, Badge } from "antd";
import { reducer } from "easy-peasy";

const { Text, Title, Paragraph } = Typography;

const User = (props) => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <Wrapper user={props.user}>
      {props.user ? (
        <Row justify="center" className="mt-0">
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              cover={
                <img
                  src="https://i.pinimg.com/originals/00/28/18/002818a09f6ecbba8a39873f1e0f42e0.jpg"
                  width="100%"
                  className="o-fit-cover"
                  height={400}
                />
              }
            >
              <Row className="d-flex jc-center">
                <Avatar
                  size={100}
                  src="https://www.svgrepo.com/show/165192/avatar.svg"
                  style={{
                    margin: "auto",
                    marginTop: -70,
                    zIndex: 3,
                    position: "relative",
                  }}
                />
              </Row>
            </Card>
            <Row className="d-flex jc-center">
              <Text className="ta-center fs-18 mt-20" strong>
                Dukesx
                <i
                  class="ri-checkbox-circle-fill fs-16"
                  style={{
                    position: "absolute",
                    bottom: 108,
                    marginLeft: 5,
                    color: "#00AAFB",
                  }}
                ></i>
              </Text>
            </Row>
            <Row className="d-flex jc-center mt-5">
              <Text className="fs-16 ta-center" strong>
                Verified Author
              </Text>
            </Row>
            <Card>Hello</Card>
          </Col>
        </Row>
      ) : (
        <Error />
      )}
    </Wrapper>
  );
};

export default User;

export const getServerSideProps = withSession(async function ({
  req,
  res,
  pathname,
}) {
  const user = req.session.get("session");
  if (user) {
    // const apolloClient = initializeApollo();
    // await apolloClient.query({
    //   query: gql``,
    //   variables: {
    //     offset: 0,
    //     limit: 5,
    //   },
    // });
    return {
      props: {
        user: user ? user : null,
        // initialApolloState: apolloClient.cache.extract(),
      },
    };
  } else {
    res.statusCode = 401;

    return {
      props: {},
    };
  }
});
