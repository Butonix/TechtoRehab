import withSession from "lib/session";
import Wrapper from "components/global/wrapper";
import {
  Row,
  Col,
  Card,
  Tabs,
  Form,
  message,
  Typography,
  Button,
  Divider,
  Input,
} from "antd";
import { initializeApollo } from "lib/apolloClient";
import { gql, useQuery, useMutation } from "@apollo/client";

const { Text, Paragraph, Title } = Typography;

const getUserSettingsQuery = gql`
  query getUserSettings($id: uuid!) {
    users(where: { id: { _eq: $id } }) {
      first_name
      last_name
      facebook
      twitter
      instagram
      website
      email
      private_info {
        dark_mode
        password
        status
      }
    }
  }
`;

const setUserBasicQuery = gql`
  mutation setBasicUser(
    $id: uuid!
    $fName: String
    $password: String
    $lName: String
  ) {
    update_users(
      where: { id: { _eq: $id } }
      _set: { first_name: $fName, last_name: $lName }
    ) {
      affected_rows
    }

    update_users_private_info(
      where: { user_id: { _eq: $id } }
      _set: { password: $password }
    ) {
      affected_rows
    }
  }
`;

const setUserSocialQuery = gql`
  mutation updateSocial(
    $id: uuid!
    $facebook: String
    $twitter: String
    $website: String
    $instagram: String
  ) {
    update_users(
      where: { id: { _eq: $id } }
      _set: {
        facebook: $facebook
        twitter: $twitter
        website: $website
        instagram: $instagram
      }
    ) {
      affected_rows
    }
  }
`;
const userSettings = (props) => {
  const { data: getUserSettingsData } = useQuery(getUserSettingsQuery, {
    variables: {
      id: props.user.id,
    },
  });

  const [setUserBasic, { data: setBasicUserData }] = useMutation(
    setUserBasicQuery,
    {
      onCompleted: () => message.success("Success!"),
      onError: (err) => console.log(err),
    }
  );

  const [setUserSocial, { data: setUserSocialData }] = useMutation(
    setUserSocialQuery,
    {
      onCompleted: () => message.success("Success!"),
      onError: (err) => message.error("Error Updating Social Links"),
    }
  );

  return (
    <Wrapper user={props.user}>
      <Row justify="center" className="pd-t-20">
        <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={10}>
          <Tabs centered tabPosition="left" size="middle">
            <Tabs.TabPane
              tab={
                <span>
                  <i class="ri-user-smile-fill fs-20 va-minus-6 mr-10"></i>{" "}
                  <Text
                    style={{
                      color: "inherit",
                    }}
                  >
                    Basic Info
                  </Text>
                </span>
              }
              key="basic"
            >
              <Card>
                <Row>
                  <Col span={24}>
                    <Title level={4} className="mg-y-20 fs-18">
                      Update Your Basic Info
                    </Title>
                    <Form
                      layout="vertical"
                      onFinish={(obj) => {
                        if (obj.nPassword && obj.nPassword.length > 6) {
                          fetch("/api/encryptPass", {
                            method: "POST",
                            headers: {
                              accept: "application/json",
                              "content-type": "application/json",
                            },
                            body: JSON.stringify({
                              password: obj.nPassword,
                            }),
                          })
                            .then((res) => res.json())
                            .then((result) => {
                              setUserBasic({
                                variables: {
                                  id: props.user.id,
                                  fName: obj.fName,
                                  lName: obj.lName,
                                  password: result.hash,
                                },
                              });
                            });
                        } else {
                          setUserBasic({
                            variables: {
                              id: props.user.id,
                              fName: obj.fName,
                              lName: obj.lName,
                              password:
                                getUserSettingsData.users[0].private_info
                                  .password,
                            },
                          });
                        }
                      }}
                    >
                      <Form.Item
                        label="First Name"
                        name="fName"
                        initialValue={getUserSettingsData.users[0].first_name}
                      >
                        <Input
                          placeholder={getUserSettingsData.users[0].first_name}
                        />
                      </Form.Item>

                      <Form.Item
                        label="Last Name"
                        name="lName"
                        initialValue={getUserSettingsData.users[0].last_name}
                      >
                        <Input
                          placeholder={getUserSettingsData.users[0].last_name}
                        />
                      </Form.Item>

                      <Form.Item
                        label="New Password"
                        name="nPassword"
                        rules={[
                          {
                            pattern: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$£¥%^&*])[\w!@#$£¥%^&*]{12,}$/,
                            message:
                              "Password - Atleast - 12 - Characters - 1 Capital Letter - 1 Special Character - One Number",
                          },
                        ]}
                      >
                        <Input placeholder="New Password" />
                      </Form.Item>
                      <Form.Item
                        label="Repeat Password"
                        name="rPassword"
                        rules={[
                          ({ getFieldValue }) => ({
                            validator: (rule, value) => {
                              if (value !== getFieldValue("nPassword")) {
                                return Promise.reject("Passwords Must Match");
                              }
                              return Promise.resolve();
                            },
                          }),
                        ]}
                      >
                        <Input placeholder="Repeat Password" />
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              </Card>
            </Tabs.TabPane>

            <Tabs.TabPane
              tab={
                <span>
                  <i class="ri-facebook-circle-fill fs-20 va-minus-6 mr-10"></i>
                  <Text
                    style={{
                      color: "inherit",
                    }}
                  >
                    Social info
                  </Text>
                </span>
              }
              key="social"
            >
              <Card>
                <Title level={4} className="mg-y-20 fs-18">
                  Update Your Social Info
                </Title>
                <Form
                  layout="vertical"
                  onFinish={(obj) => {
                    console.log(obj);
                    setUserSocial({
                      variables: {
                        id: props.user.id,
                        facebook: obj.facebook,
                        twitter: obj.twitter,
                        website: obj.website,
                        instagram: obj.instagram,
                      },
                    });
                  }}
                >
                  <Form.Item
                    name="facebook"
                    label="Facebook"
                    initialValue={getUserSettingsData.users[0].facebook}
                  >
                    <Input placeholder="Facebook profile url" />
                  </Form.Item>

                  <Form.Item
                    name="twitter"
                    label="Twitter"
                    initialValue={getUserSettingsData.users[0].twitter}
                  >
                    <Input placeholder="Twitter profile url" />
                  </Form.Item>

                  <Form.Item
                    name="instagram"
                    label="Instagram"
                    initialValue={getUserSettingsData.users[0].instagram}
                  >
                    <Input placeholder="Instagram profile url" />
                  </Form.Item>

                  <Form.Item
                    name="website"
                    label="Website"
                    initialValue={getUserSettingsData.users[0].website}
                  >
                    <Input placeholder="Website url" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Tabs.TabPane>

            <Tabs.TabPane
              tab={
                <span>
                  <i class="ri-settings-fill mr-10 fs-20 va-minus-6"></i>
                  <Text
                    style={{
                      color: "inherit",
                    }}
                  >
                    Site settings
                  </Text>
                </span>
              }
              key="site"
            >
              <Card>This is card</Card>
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default userSettings;

export const getServerSideProps = withSession(async function ({
  req,
  res,
  query,
}) {
  const { username } = query;
  const user = req.session.get(["session"]);
  if (user) {
    if (user.username == username) {
      const apolloClient = initializeApollo();
      await apolloClient.query({
        query: getUserSettingsQuery,
        variables: {
          id: user.id,
        },
      });

      return {
        props: {
          username: username ? username : null,
          initialApolloState: apolloClient.cache.extract(),
          user: user ? user : null,
        },
      };
    } else {
      res.writeHead(301, {
        Location: "/",
      });
      res.end();
    }
  } else {
    res.writeHead(301, {
      Location: "/",
    });
    res.end();
  }
});
