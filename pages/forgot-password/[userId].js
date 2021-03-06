import {
  Form,
  Row,
  Col,
  Input,
  Card,
  Typography,
  Button,
  Skeleton,
  Result,
  Alert,
} from "antd";
import Wrapper from "components/global/wrapper";
import { useRouter } from "next/router";
import { gql, useQuery, useMutation } from "@apollo/client";
import { initializeApollo } from "lib/apolloClient";
import Link from "next/link";
import { useState } from "react";

const { Text, Title } = Typography;

const checkTokenQuery = gql`
  query checkToken($id: uuid!, $token: String!) {
    users_aggregate(
      where: {
        id: { _eq: $id }
        private_info: { reset_token: { _eq: $token } }
      }
    ) {
      aggregate {
        count
      }
      nodes {
        private_info {
          reset_token_expire
        }
      }
    }
  }
`;

const newPasswordQuery = gql`
  mutation newPasswordQuery(
    $userId: uuid!
    $password: String!
    $token: String
  ) {
    update_users_private_info(
      where: { user_id: { _eq: $userId } }
      _set: { password: $password, reset_token: $token }
    ) {
      affected_rows
    }
  }
`;

const forgotPassword = (props) => {
  const router = useRouter();
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const {
    loading: checktokenLoading,
    data: checkTokenData,
    error: checkTokenError,
  } = useQuery(checkTokenQuery, {
    onCompleted: (data) => console.log(data),
    variables: {
      id: props.userId,
      token: props.token,
    },
    onError: (err) => console.log(err),
  });

  const [newPassword, { data: newPasswordData }] = useMutation(
    newPasswordQuery,
    {
      onCompleted: (data) => {
        setPasswordSuccess(true);
        router.push("/get-started");
      },
    }
  );
  return (
    <Wrapper>
      <Row justify="center" className="pd-20">
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
          <Card
            bodyStyle={{
              padding: 0,
            }}
          >
            {props.userId && props.token ? (
              checktokenLoading ? (
                <Skeleton round title active />
              ) : checkTokenData && checkTokenData.users_aggregate ? (
                checkTokenData.users_aggregate.aggregate.count == 1 ? (
                  Math.round(
                    (Date.now() -
                      new Date(
                        checkTokenData.users_aggregate.nodes[0].private_info[0].reset_token_expire
                      )) /
                      60000
                  ) < 31 ? (
                    <>
                      <img
                        src="/forgot-password.svg"
                        height={500}
                        width="100%"
                      />

                      {passwordSuccess ? (
                        <Alert
                          className="mg-y-20"
                          message="Change Successful!"
                          description="Your Password Has Been Successfully Changed. Now Try Signning In"
                          type="success"
                          showIcon
                        />
                      ) : null}
                      <div className="pd-20">
                        <Title level={4} className="fs-18 mg-y-20">
                          Enter The New Password
                        </Title>
                        <Form
                          layout="vertical"
                          onFinish={(obj) => {
                            fetch("/api/encryptPass", {
                              method: "POST",
                              headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                password: obj.password,
                              }),
                            })
                              .then((res) => res.json())
                              .then((result) => {
                                newPassword({
                                  variables: {
                                    userId: props.userId,
                                    password: result.hash,
                                    token: undefined,
                                  },
                                });
                              });
                          }}
                        >
                          <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                              {
                                required: true,
                              },
                              {
                                pattern: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$£¥%^&*])[\w!@#$£¥%^&*]{12,}$/,
                                message:
                                  "Password - Atleast - 12 - Characters - 1 Capital Letter - 1 Special Character - One Number",
                              },
                            ]}
                          >
                            <Input.Password
                              palceholder="Enter Password"
                              autoComplete="new-password"
                            />
                          </Form.Item>
                          <Form.Item
                            label="Reapeat-Password"
                            name="rPassword"
                            rules={[
                              ({ getFieldValue }) => ({
                                validator: (rule, val) => {
                                  if (val !== getFieldValue("password")) {
                                    return Promise.reject(
                                      "Passwords must be same"
                                    );
                                  }
                                  return Promise.resolve();
                                },
                              }),
                            ]}
                          >
                            <Input.Password palceholder="Repeat The Password" />
                          </Form.Item>
                          <Form.Item>
                            <Button type="primary" htmlType="submit">
                              Submit
                            </Button>
                          </Form.Item>
                        </Form>
                      </div>
                    </>
                  ) : (
                    <Result
                      status="warning"
                      title="Ooops !"
                      subTitle={
                        <Text strong>
                          Seems like you followed either a Expired or an Invalid
                          Reset link
                        </Text>
                      }
                      extra={[
                        <Button type="primary" key="console">
                          <Link href="/get-started">
                            <a>
                              <Text style={{ color: "inherit" }}>
                                Go Back To Reset Form
                              </Text>
                            </a>
                          </Link>
                        </Button>,
                      ]}
                    />
                  )
                ) : (
                  <Result
                    status="warning"
                    title="Ooops !"
                    subTitle={
                      <Text strong>
                        Seems like you followed either a Expired or an Invalid
                        Reset link
                      </Text>
                    }
                    extra={[
                      <Button type="primary" key="console">
                        <Link href="/get-started">
                          <a>
                            <Text style={{ color: "inherit" }}>
                              Go Back To Reset Form
                            </Text>
                          </a>
                        </Link>
                      </Button>,
                    ]}
                  />
                )
              ) : (
                <Result
                  status="warning"
                  title="Ooops !"
                  subTitle={
                    <Text strong>
                      Seems like you followed either a Expired or an Invalid
                      Reset link
                    </Text>
                  }
                  extra={[
                    <Button type="primary" key="console">
                      <Link href="/get-started">
                        <a>
                          <Text style={{ color: "inherit" }}>
                            Go Back To Reset Form
                          </Text>
                        </a>
                      </Link>
                    </Button>,
                  ]}
                />
              )
            ) : (
              <Result
                status="warning"
                title="Ooops !"
                subTitle={
                  <Text strong>
                    Seems like you followed either a Expired or an Invalid Reset
                    link
                  </Text>
                }
                extra={[
                  <Button type="primary" key="console">
                    <Link href="/get-started">
                      <a>
                        <Text style={{ color: "inherit" }}>
                          Go Back To Reset Form
                        </Text>
                      </a>
                    </Link>
                  </Button>,
                ]}
              />
            )}
          </Card>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default forgotPassword;

export const getServerSideProps = async ({ query }) => {
  if (query.userId && query.token) {
    const apolloClient = initializeApollo();
    await apolloClient.query({
      query: checkTokenQuery,
      variables: {
        id: query.userId,
        token: query.token,
      },
    });
  }
  return {
    props: {
      token: query ? query.token : null,
      userId: query ? query.userId : null,
    },
  };
};
