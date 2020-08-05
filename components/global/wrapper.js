import { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import {
  Menu,
  Typography,
  Layout,
  Drawer,
  Alert,
  Form,
  Button,
  Input,
  Result,
  Row,
  Col,
  message,
} from "antd";
import Navbar from "./nav";
import Link from "next/link";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { Swipeable } from "react-swipeable";
import { NextSeo, ArticleJsonLd } from "next-seo";
import { nanoid } from "nanoid";

const checkTokenQuery = gql`
  query checkToken($userId: uuid!) {
    users(where: { id: { _eq: $userId } }) {
      private_info {
        confirm_token
      }
    }
  }
`;

const activateUserQuery = gql`
  mutation activateUser($id: uuid!, $status: String!, $token: String!) {
    update_users_private_info(
      where: { user_id: { _eq: $id } }
      _set: { status: $status, confirm_token: $token }
    ) {
      affected_rows
    }
  }
`;

const resendTokenQuery = gql`
  mutation resendToken($id: uuid!, $token: String!) {
    update_users_private_info(
      where: { user_id: { _eq: $id } }
      _set: { confirm_token: $token }
    ) {
      affected_rows
    }
  }
`;

const wrapper = (props) => {
  const darkState = useStoreState((state) => state.site.dark);
  const setDark = useStoreActions((actions) => actions.site.setDark);
  const setAuth = useStoreActions((actions) => actions.site.setAuth);
  const sidebar = useStoreState((state) => state.site.sidebar);
  const setSidebar = useStoreActions((actions) => actions.site.setSidebar);
  const [token, setToken] = useState(null);
  const [tokenSuccess, setTokenSuccess] = useState(false);
  const [tokenFail, setTokenFail] = useState(false);
  const router = useRouter();

  const [
    activateUser,
    { loading: activateUserLoading, data: activateUserData },
  ] = useMutation(activateUserQuery, {
    onCompleted: () => {
      setTokenFail(false);
      setTokenSuccess(true);
      fetch("/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.user.id,
          status: "confirmed",
          email: props.user.email,
          profilePicture: props.user.profilePicture,
          username: props.user.username,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          setTimeout(router.reload(), 3000);
        });
    },
  });

  const [
    checkToken,
    {
      loading: checkTokenLoading,
      data: checkTokenData,
      error: checkTokenError,
    },
  ] = useLazyQuery(checkTokenQuery, {
    onCompleted: (data) => {
      if (data.users[0].private_info[0].confirm_token == token) {
        activateUser({
          variables: {
            id: props.user.id,
            status: "confirmed",
            token: "",
          },
        });
      } else {
        setTokenFail(true);
      }
    },
    onError: (err) => console.log(err),
  });

  const [resendToken] = useMutation(resendTokenQuery, {
    onCompleted: (data) => {
      message.success("Token has been sent to email");
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    /** Get html */
    var hotml = document.documentElement;

    /**                  */
    /**                  */
    /**                  */
    /** DARK MODE TOGGLE */
    /**                  */
    /**                  */
    /**                  */
    /**                  */

    // var mql = window.matchMedia("(prefers-color-scheme: dark)");
    // mql.addEventListener("change", () => {
    //   if (
    //     window.matchMedia &&
    //     window.matchMedia("(prefers-color-scheme: dark)").matches
    //   ) {
    //     setDark(true);
    //   }

    //   if (
    //     window.matchMedia &&
    //     window.matchMedia("(prefers-color-scheme: light)").matches
    //   ) {
    //     setDark(false);
    //   }
    // });

    // if (darkState) {
    //   if (hotml.classList.contains("light")) {
    //     hotml.classList.remove("light");
    //   }
    //   if (hotml.classList.contains("dark")) {
    //     hotml.classList.remove("dark");
    //   }
    //   hotml.classList.add("dark");
    // } else {
    //   if (hotml.classList.contains("dark")) {
    //     hotml.classList.remove("dark");
    //   }
    //   hotml.classList.add("light");
    // }

    // var cont = document.getElementsByClassName("mainLayout")[0];
    // var listener = SwipeListener(cont);
    // cont.addEventListener("swipe", function (e) {
    //   var directions = e.detail.directions;
    //   var x = e.detail.x;
    //   var y = e.detail.y;
    //   if (directions.right) {
    //     settingSide;
    //   }
    // });
  });

  const { Content } = Layout;
  const { Text, Paragraph, Title } = Typography;

  return (
    <>
      <NextSeo
        title={props.seo ? props.seo.title : "Tech To Rehab"}
        description={
          props.seo
            ? props.seo.description
            : "The Open Source Collaboration Platform"
        }
        canonical={props.seo ? props.seo.url : "https://techtorehab.com"}
        openGraph={{
          url: props.seo ? props.seo.url : "https://techtorehab.com",
          title: props.seo ? props.seo.title : "Tech To Rehab",
          description: props.seo
            ? props.seo.description
            : "The Open Source Collaboration Platform",
          site_name: "Tech To Rehab",
          article: props.seo && props.seo.article ? props.seo.article : false,
          images: props.seo
            ? props.seo.images !== undefined
              ? props.seo.images
              : [
                  {
                    url: "https://techtorehab.com/TTR-LIGHT-sqaure.jpeg",
                    width: 650,
                    height: 450,
                    alt: "OG Tech To Rehab Logo",
                  },
                ]
            : null,
          type: props.seo ? props.seo.type : "website",
          profile: props.seo ? props.seo.profile : false,
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <Layout>
        <Navbar user={props.user} />
        <Layout>
          <Drawer
            placement="left"
            visible={sidebar}
            closable={false}
            onClose={() => setSidebar(false)}
            bodyStyle={{ padding: 0 }}
          >
            {props.admin ? (
              <Menu
                theme="light"
                className="mt-20"
                defaultSelectedKeys={props.route ? `${props.route}` : ["home"]}
                style={{
                  position: "sticky",
                  height: "100vh",
                  top: 10,
                  borderRight: 0,
                }}
              >
                <Menu.Item
                  key="home"
                  icon={
                    <i
                      className="ri-dashboard-2-line ri-lg va-minus-4 mr-10"
                      style={{ color: "inherit" }}
                    ></i>
                  }
                >
                  <Link href="/admin">
                    <a>Dashboard</a>
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="articles"
                  icon={
                    <i
                      className="ri-book-open-line ri-lg va-minus-4 mr-10"
                      style={{ color: "inherit" }}
                    ></i>
                  }
                >
                  <Link href="/admin/articles">
                    <a>Articles</a>
                  </Link>
                </Menu.Item>

                <Menu.Item
                  key="categories"
                  icon={
                    <i
                      className="ri-node-tree ri-lg va-minus-4 mr-10"
                      style={{ color: "inherit" }}
                    ></i>
                  }
                >
                  <Link href="/admin/categories">
                    <a>Categories</a>
                  </Link>
                </Menu.Item>

                <Menu.Item
                  key="topics"
                  icon={
                    <i
                      className="ri-git-merge-fill ri-lg va-minus-4 mr-10"
                      style={{ color: "inherit" }}
                    ></i>
                  }
                >
                  <Link href="/admin/topics">
                    <a>Topics</a>
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="reactions"
                  icon={
                    <i
                      className="ri-emotion-laugh-line ri-lg va-minus-4 mr-10"
                      style={{ color: "inherit" }}
                    ></i>
                  }
                >
                  <Link href="/admin/reactions">
                    <a>Reactions</a>
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="users"
                  icon={
                    <i
                      className="ri-user-smile-line ri-lg va-minus-4 mr-10"
                      style={{ color: "inherit" }}
                    ></i>
                  }
                >
                  <Link href="/admin/users">
                    <a>Users</a>
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="comments"
                  icon={
                    <i
                      className="ri-question-answer-line ri-lg va-minus-4 mr-10"
                      style={{ color: "inherit" }}
                    ></i>
                  }
                >
                  <Link href="/admin/comments">
                    <a>Comments</a>
                  </Link>
                </Menu.Item>
              </Menu>
            ) : (
              <Menu
                theme="light"
                className="mt-20"
                defaultSelectedKeys={props.route ? `${props.route}` : ["home"]}
                style={{
                  position: "sticky",
                  height: "100vh",
                  top: 10,
                  borderRight: 0,
                }}
              >
                <Menu.Item
                  key="home"
                  icon={
                    <i class="ri-arrow-go-back-line fs-22 va-minus-6 mr-10"></i>
                  }
                  onClick={() => (location.href = "/")}
                >
                  <Text
                    style={{
                      color: "inherit",
                    }}
                  >
                    Home
                  </Text>
                </Menu.Item>
                <Menu.Item
                  key="categories"
                  onClick={() => (location.href = "/categories")}
                  icon={<i class="ri-apps-2-fill fs-22 va-minus-6 mr-10"></i>}
                >
                  <Text
                    style={{
                      color: "inherit",
                    }}
                  >
                    Categories
                  </Text>
                </Menu.Item>
              </Menu>
            )}
          </Drawer>

          <Layout className="mainLayout">
            <Content className="site-layout">
              <Swipeable onSwipedRight={(eventData) => setSidebar(true)}>
                {props.user ? (
                  props.user.status == "pending" ? (
                    <Row justify="center" className="pd-20">
                      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
                        <Result
                          status="warning"
                          title="Activation Pending"
                          icon={
                            <img
                              src="/email-confirm.svg"
                              width="100%"
                              height={400}
                            />
                          }
                          subTitle={
                            <div className="pd-10 d-flex flex-column ai-center">
                              <div>
                                <Paragraph
                                  ellipsis={{ rows: 2 }}
                                  className="fs-16"
                                  style={{ width: "380px" }}
                                  strong
                                >
                                  Your Account Doesn't Seems To Be Confirmed.
                                  Please check your inbox for a confirmation
                                  token
                                </Paragraph>
                              </div>
                            </div>
                          }
                          extra={
                            <>
                              {tokenFail ? (
                                <Alert
                                  message="Error"
                                  description="TWrong Token, Please Retry"
                                  type="error"
                                  showIcon
                                  style={{ textAlign: "left" }}
                                  className="mg-y-20"
                                />
                              ) : tokenSuccess ? (
                                <Alert
                                  message="Success!"
                                  description="Token Verified, Now Redirecting..."
                                  type="success"
                                  showIcon
                                  style={{ textAlign: "left" }}
                                  className="mg-y-20"
                                />
                              ) : null}
                              <Form
                                layout="vertical"
                                onFinish={(obj) => {
                                  return checkToken({
                                    variables: {
                                      userId: props.user.id,
                                    },
                                  });
                                }}
                              >
                                <Form.Item
                                  label="Confirmation Token"
                                  name="token"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Token Cannot be empty!",
                                    },
                                  ]}
                                >
                                  <Input
                                    placeholder="Confirmation Token From Email"
                                    onChange={(val) => {
                                      setToken(val.target.value);
                                    }}
                                  />
                                </Form.Item>
                                <Form.Item>
                                  <Button type="primary" htmlType="submit">
                                    Submit
                                  </Button>
                                  <Button
                                    type="link"
                                    onClick={() => {
                                      var token = nanoid();
                                      fetch("api/resendToken", {
                                        headers: {
                                          "content-type": "application/json",
                                          accept: "application/json",
                                        },
                                        method: "POST",
                                        body: JSON.stringify({
                                          token: token,
                                          username: props.user.username,
                                          email: props.user.email,
                                        }),
                                      }).then((res) =>
                                        res.json().then((result) => {
                                          if (result.result == "ok") {
                                            resendToken({
                                              variables: {
                                                id: props.user.id,
                                                token: token,
                                              },
                                            });
                                          } else {
                                            message.error(
                                              "Error Sending Email"
                                            );
                                          }
                                        })
                                      );
                                    }}
                                  >
                                    Resend Token
                                  </Button>
                                </Form.Item>
                              </Form>
                            </>
                          }
                        />
                      </Col>
                    </Row>
                  ) : (
                    props.children
                  )
                ) : (
                  props.children
                )}
              </Swipeable>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default wrapper;
