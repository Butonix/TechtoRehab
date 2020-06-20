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
import { useLazyQuery, useQuery, useMutation } from "@apollo/react-hooks";
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

const checkEmailo = gql`
  query checkEmail($email: String!) {
    users_aggregate(where: { email: { _eq: $email } }) {
      aggregate {
        count
      }
    }
  }
`;

const addUsero = gql`
  mutation addUser(
    $uName: String!
    $fName: String
    $lName: String
    $password: String!
    $email: String!
  ) {
    insert_users_one(
      object: {
        first_name: $fName
        last_name: $lName
        username: $uName
        email: $email
        password: $password
      }
    ) {
      id
    }
  }
`;

const { Text, Title, Paragraph } = Typography;

const UsersManager = () => {
  const [form] = Form.useForm();
  var [availableUserName, setAvailableUserName] = useReducer(
    (state, action) => {
      state = action;
      return state;
    },
    null
  );

  var [availableUserEmail, setAvailableUserEmail] = useReducer(
    (state, action) => {
      state = action;
      return state;
    },
    null
  );

  const [
    addUser,
    { loading: addUserLoading, data: addUserData, error: addUserError },
  ] = useMutation(addUsero, {
    onError: (err) => message.error("Error Adding User"),
    onCompleted: (succ) => message.success("User Added Successfully"),
    errorPolicy: "all",
  });

  const [sendUser, { loading, data }] = useLazyQuery(getUser, {
    onError: () => message.error("Couldn't Fetch Users"),
    errorPolicy: "all",
  });

  const [
    checkUser,
    { loading: checkUserLoading, data: checkUserData },
  ] = useLazyQuery(checkUsero, {
    onError: () => message.error("Couldn't Fetch User"),
    errorPolicy: "all",
    fetchPolicy: "network-only",
  });

  const [
    checkEmail,
    { loading: checkEmailLoading, data: checkEmailData },
  ] = useLazyQuery(checkEmailo, {
    onError: () => message.error("Couldn't Fetch Email"),
    errorPolicy: "all",
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (checkUserData && checkUserData.users_aggregate) {
      if (checkUserData.users_aggregate.aggregate.count == 1) {
        return setAvailableUserName("unavailable");
      }
      if (
        checkUserData.users_aggregate.aggregate.count == 0 ||
        checkUserData.users_aggregate.aggregate.count == undefined
      ) {
        if (availableUserName == null) {
          return;
        } else {
          return setAvailableUserName("available");
        }
      }
    }
  }, [checkUserData]);

  useEffect(() => {
    if (checkEmailData && checkEmailData.users_aggregate) {
      if (checkEmailData.users_aggregate.aggregate.count == 1) {
        return setAvailableUserEmail("unavailable");
      }
      if (
        checkEmailData.users_aggregate.aggregate.count == 0 ||
        checkEmailData.users_aggregate.aggregate.count == undefined
      ) {
        if (availableUserEmail == null) {
          return;
        } else {
          return setAvailableUserEmail("available");
        }
      }
    }
  }, [checkEmailData]);

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
                if (val.target.value.length >= 4) {
                  var newValue = "%" + val.target.value + "%";
                  sendUser({ variables: { username: newValue } });
                } else {
                  var newValue = val.target.value;
                  sendUser({ variables: { username: newValue } });
                }
              }}
            />
            {data !== undefined && data.users.length > 0 ? (
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
        <Form
          layout="vertical"
          form={form}
          onFinish={(values) => {
            addUser({
              variables: {
                uName: values.uName,
                fName: values.fName,
                lName: values.lName,
                password: values.password,
                email: values.email,
              },
            });
            form.resetFields();
            setAvailableUserName(null);
            setAvailableUserEmail(null);
          }}
        >
          <Form.Item label="First Name" name="fName">
            <Input style={{ width: "100%" }} placeholder="enter first name" />
          </Form.Item>

          <Form.Item label="Last Name" name="lName">
            <Input style={{ width: "100%" }} placeholder="enter last name" />
          </Form.Item>
          <Form.Item
            label="Username"
            name="uName"
            hasFeedback
            validateStatus={
              availableUserName == "validating"
                ? "validating"
                : availableUserName == "available"
                ? "success"
                : availableUserName == null
                ? null
                : "error"
            }
            rules={[
              {
                required: true,
              },
            ]}
            help={
              <Text
                type={availableUserName == "unavailable" ? "danger" : null}
                mark={availableUserName == "validating" ? true : false}
                strong
                className="lh-1"
                style={{ position: "absolute", marginTop: -23, right: 35 }}
              >
                {availableUserName == "validating"
                  ? "Checking Username"
                  : availableUserName == "available"
                  ? "Username Available!"
                  : availableUserName == "unavailable"
                  ? "Username Already Exists"
                  : availableUserName == null
                  ? null
                  : null}
              </Text>
            }
          >
            <Input
              style={{ width: "100%" }}
              placeholder="enter username"
              onChange={(vals) => {
                if (vals.target.value.length > 0) {
                  setAvailableUserName("validating");
                  return checkUser({ variables: { user: vals.target.value } });
                } else {
                  setAvailableUserName(null);
                }
              }}
              allowClear={true}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
              },
            ]}
            validateStatus={
              availableUserEmail == "validating"
                ? "validating"
                : availableUserEmail == "available"
                ? "success"
                : availableUserEmail == null
                ? null
                : "error"
            }
            help={
              <Text
                type={availableUserEmail == "unavailable" ? "danger" : null}
                mark={availableUserEmail == "validating" ? true : false}
                strong
                className="lh-1"
                style={{ position: "absolute", marginTop: -23, right: 35 }}
              >
                {availableUserEmail == "validating"
                  ? "Checking Email"
                  : availableUserEmail == "available"
                  ? "Email Is Valid"
                  : availableUserEmail == "unavailable"
                  ? "Email is Already Registered"
                  : availableUserEmail == null
                  ? null
                  : null}
              </Text>
            }
            hasFeedback
          >
            <Input
              type="email"
              onChange={(vals) => {
                if (vals.target.value.length > 0) {
                  setAvailableUserEmail("validating");
                  return checkEmail({
                    variables: { email: vals.target.value },
                  });
                } else {
                  setAvailableUserEmail(null);
                }
              }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
              },
              {
                pattern: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$£¥%^&*])[\w!@#$£¥%^&*]{10,}$/,
                message:
                  "Password Must Be Atleast 10 Characters Long With One Digit, One Special Character, One Small and One Capital Letter",
              },
            ]}
            label="Password"
          >
            <Input.Password autoComplete="new-password" />
          </Form.Item>
          <Form.Item
            name="rPassword"
            label="Repeat Password"
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(rule, val) {
                  if (!val || val === getFieldValue("password")) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords don't match");
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="submit">
            <Button
              htmlType="submit"
              disabled={
                availableUserName && availableUserEmail == "available"
                  ? false
                  : true
              }
            >
              Submit
            </Button>
          </Form.Item>
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
