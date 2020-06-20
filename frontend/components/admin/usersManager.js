import {
  Row,
  Col,
  Input,
  Skeleton,
  Form,
  List,
  Button,
  Typography,
  Avatar,
  message,
  Anchor,
} from "antd";
import gql from "graphql-tag";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { useState, useEffect, useReducer, useCallback } from "react";

const getUser = gql`
  query MyQuery($username: String!) {
    users(where: { username: { _ilike: $username } }, limit: 10) {
      username
      profile_picture
      created_at
    }
  }
`;

const checkUsero = gql`
  query checkUser($user: String!) {
    users_aggregate(where: { username: { _eq: $user } }) {
      aggregate {
        count
      }
    }
  }
`;

const { Text, Title, Paragraph } = Typography;

const UsersManager = () => {
  var [available, setAvailable] = useReducer((state, action) => {
    state = action;
    return state;
  }, null);

  const [sendUser, { loading, data }] = useLazyQuery(getUser, {
    onError: () => message.error("Couldn't Fetch Users"),
    errorPolicy: "all",
  });

  const [
    checkUser,
    { loading: checkUserLoading, data: checkUserData, refetch },
  ] = useLazyQuery(checkUsero, {
    onError: () => message.error("Couldn't Fetch User"),
    errorPolicy: "all",
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (checkUserData && checkUserData.users_aggregate) {
      if (checkUserData.users_aggregate.aggregate.count == 1) {
        console.log(checkUserData);
        return setAvailable("unavailable");
      }
      return setAvailable("available");
    }
  }, [checkUserData]);

  return (
    <Row className="" justify="center">
      <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={14} className="pd-10">
        <Title level={4} className="mt-20 mb-20">
          User Manager
        </Title>
        <Form layout="vertical">
          <Form.Item label="Search User">
            <Input
              style={{ width: "100%" }}
              placeholder="enter username of the user"
              onChange={(val) => {
                var newValue = "%" + val.target.value + "%";
                sendUser({ variables: { username: newValue } });
              }}
            />
            {data !== undefined ? (
              <List
                dataSource={data ? data.users : []}
                className="mt-20"
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button type="primary" danger>
                        Delete
                      </Button>,
                      <Button type="link" danger>
                        Block
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      title={
                        <Text className="t-transform-cpt">{item.username}</Text>
                      }
                      description={
                        <Paragraph ellipsis={{ rows: 2 }}>
                          {Date(item.created_at)}
                        </Paragraph>
                      }
                      avatar={<Avatar size={40} src={item.profile_picture} />}
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Row className="mt-30">
                <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={14}>
                  <Skeleton
                    avatar
                    title={false}
                    style={{ width: 400 }}
                    paragraph={1}
                  />
                </Col>
              </Row>
            )}
          </Form.Item>
        </Form>
        <Title level={4} className="mt-30 mb-20">
          Create User
        </Title>
        <Form layout="vertical">
          <Form.Item label="First Name" name="fName">
            <Input style={{ width: "100%" }} placeholder="enter first name" />
          </Form.Item>

          <Form.Item label="Last Name" name="lName">
            <Input style={{ width: "100%" }} placeholder="enter last name" />
          </Form.Item>
          <Form.Item
            label="Username"
            name="Uname"
            hasFeedback
            validateStatus={
              available == "validating"
                ? "validating"
                : available == "available"
                ? "success"
                : available == null
                ? null
                : "error"
            }
            shouldUpdate
            rules={[
              {
                required: true,
              },
            ]}
            help={
              <Text
                type={available == "unavailable" ? "danger" : null}
                mark={available == "validating" ? true : false}
                strong
                className="lh-1"
                style={{ position: "absolute", marginTop: -23, right: 35 }}
              >
                {available == "validating"
                  ? "Checking Username"
                  : available == "available"
                  ? "Username Available!"
                  : available == "unavailable"
                  ? "Username Already Exists"
                  : null}
              </Text>
            }
          >
            <Input
              style={{ width: "100%" }}
              placeholder="enter username"
              onChange={(vals) => {
                setAvailable("validating");
                return checkUser({ variables: { user: vals.target.value } });
              }}
            />
          </Form.Item>
          {available ? (
            <Form.Item name="submit">
              <Button htmlType="submit">Submit</Button>
            </Form.Item>
          ) : null}
        </Form>
      </Col>
    </Row>
  );
};

export default UsersManager;

// export const getServerSideProps = async () => {
//   const apolloClient = initializeApollo();
//   await apolloClient.query({
//     query: getUser,
//   });

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//   };
// };
