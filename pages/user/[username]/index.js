import withSession from "lib/session";
import { useRouter } from "next/router";
import Wrapper from "components/global/wrapper";
import { initializeApollo } from "lib/apolloClient";
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import {
  Row,
  Col,
  Card,
  Tabs,
  Upload,
  List,
  Tooltip,
  Skeleton,
  Button,
  Typography,
  Avatar,
  Badge,
} from "antd";
import { useState } from "react";
import Error404 from "components/global/404";
import ProgressiveImage from "react-progressive-graceful-image";
import Moment from "react-moment";
import { SocialProfileJsonLd, BreadcrumbJsonLd } from "next-seo";

const { Text, Title, Paragraph } = Typography;

const getUserQuery = gql`
  query getUser($username: String!) {
    users(where: { username: { _eq: $username } }) {
      id
      email
      first_name
      last_name
      username
      created_at
      profile_picture
      facebook
      instagram
      twitter
      website
      cover
      private_info {
        blocked
        dark_mode
        on_boarding
        role
        status
      }
    }
  }
`;

const updateCoverQuery = gql`
  mutation updateCover($id: uuid!, $cover: String!) {
    update_users(where: { id: { _eq: $id } }, _set: { cover: $cover }) {
      affected_rows
    }
  }
`;

const updateProfilePictureQuery = gql`
  mutation updateProfilePicture($id: uuid!, $dp: String!) {
    update_users(where: { id: { _eq: $id } }, _set: { profile_picture: $dp }) {
      affected_rows
    }
  }
`;

const getContributionsQuery = gql`
  query getContribs($id: uuid!) {
    articles_and_users(where: { user_id: { _eq: $id } }) {
      article {
        id
        title
        slug
        featured_image
        featured
        excerpt
        updated_at
        article_category {
          slug
        }
        article_topic {
          slug
        }
      }
    }
  }
`;

const getUserBookmarksQuery = gql`
  query getBookmarks($id: uuid!) {
    users(where: { id: { _eq: $id } }) {
      bookmarks {
        bookmarkedArticle {
          id
          title
          slug
          excerpt
          featured_image
          featured
          updated_at
          article_category {
            slug
          }
          article_topic {
            slug
          }
        }
      }
    }
  }
`;

const User = (props) => {
  const router = useRouter();
  const { tab } = router.query;

  const { data: getUserData, error: getUserError } = useQuery(getUserQuery, {
    variables: {
      username: props.username,
    },
  });

  const [cover, setCover] = useState(
    getUserData.users.length > 0 && getUserData.users[0].cover
      ? getUserData.users[0].cover
      : null
  );
  const [dp, setDp] = useState(
    getUserData.users.length > 0 && getUserData.users[0].profile_picture
      ? getUserData.users[0].profile_picture.includes("http") ||
        getUserData.users[0].profile_picture.includes("https")
        ? getUserData.users[0].profile_picture
        : getUserData.users[0].profile_picture
      : null
  );

  const [updateCover, { data: updateCoverData }] = useMutation(
    updateCoverQuery
  );

  const [
    updateprofilePicture,
    { data: updateProfilePictureData },
  ] = useMutation(updateProfilePictureQuery);

  const handleCoverPreview = (obj) => {
    if (obj.file.response && obj.file.response.path) {
      setCover(obj.file.response.path);
      updateCover({
        variables: {
          id: getUserData.users[0].id,
          cover: obj.file.response.path,
        },
      });
    }
  };

  const handleDpPreview = (obj2) => {
    if (obj2.file.response && obj2.file.response.path) {
      setDp(obj2.file.response.path + "?tr=h-100,w-100");
      updateprofilePicture({
        variables: {
          id: getUserData.users[0].id,
          dp: obj2.file.response.path,
        },
      });
    }
  };

  const [
    getUserContributions,
    { loading: getUserContributionsLoading, data: getUserContributionsData },
  ] = useLazyQuery(getContributionsQuery);

  const [
    getUserBookmarks,
    { loading: getUserBookmarksLoading, data: getUserBookmarksData },
  ] = useLazyQuery(getUserBookmarksQuery);

  return (
    <Wrapper
      user={props.user}
      seo={{
        title: props.username.replace(
          props.username.charAt(0),
          props.username.charAt(0).toUpperCase()
        ),
        description:
          props.username.replace(
            props.username.charAt(0),
            props.username.charAt(0).toUpperCase()
          ) + " on Tech To Rehab",
        images: [
          {
            url:
              getUserData.users[0].profile_picture !== null
                ? "https://ik.imagekit.io/ttr/tr:n-high/" +
                  getUserData.users[0].profile_picture
                : null,
            width: 650,
            height: 450,
            alt: "Profile Photo",
          },
        ],
        profile: {
          firstName:
            getUserData.users[0].first_name !== null
              ? getUserData.users[0].first_name
              : null,
          lastName:
            getUserData.users[0].last_name !== null
              ? getUserData.users[0].last_name
              : null,
          username: getUserData ? getUserData.users[0].username : null,
        },
        type: "profile",
      }}
    >
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: "Home",
            item: "https://techtorehab.com",
          },
          {
            position: 2,
            name: "Users",
            item: "https://techtorehab.com/users",
          },
          {
            position: 3,
            name: getUserData.users[0].username,
            item:
              "https://etechtorehab.com/user/" + getUserData.users[0].username,
          },
        ]}
      />
      <SocialProfileJsonLd
        type="Person"
        name={getUserData.users[0].username}
        url={"https://techtorehab.com/user/" + getUserData.users[0].username}
        sameAs={[
          getUserData.facebook !== null ? getUserData.users[0].facebook : "",
          getUserData.users[0].twitter !== null
            ? getUserData.users[0].twitter
            : "",
          getUserData.users[0].instagram !== null
            ? getUserData.users[0].instagram
            : "",
        ]}
      />
      {getUserError || getUserData.users.length < 1 ? (
        <Error404 />
      ) : (
        <Row justify="center" className="pd-y-20">
          <Col xs={24} sm={24} md={24} lg={16} xl={12} xxl={12}>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className="wd-100pc"
              cover={
                props.user ? (
                  props.user.username == router.query.username ? (
                    <div>
                      <ProgressiveImage
                        src={
                          cover
                            ? "https://ik.imagekit.io/ttr/tr:n-high/" + cover
                            : "/image-placeholder.png"
                        }
                        threshold={1}
                        placeholder={
                          cover
                            ? "https://ik.imagekit.io/ttr/tr:n-high_placeholder/" +
                              cover
                            : "/image-placeholder.png"
                        }
                      >
                        {(src) => (
                          <img
                            src={src}
                            height={400}
                            width="100%"
                            className="o-fit-cover"
                            style={{
                              position: "relative",
                              zIndex: 1,
                            }}
                          />
                        )}
                      </ProgressiveImage>
                      <Upload
                        name="imageUpload"
                        action="/api/imageUpload"
                        onChange={handleCoverPreview}
                        showUploadList={false}
                        className="cover-imageUpload"
                        style={{ width: "100%" }}
                      >
                        <Button
                          type="secondary"
                          icon={
                            <i className="ri-camera-fill fs-16 va-minus-4 mr-10"></i>
                          }
                          style={{
                            position: "absolute",
                            right: 0,
                            marginRight: 10,
                            marginTop: -60,
                            zIndex: 2,
                          }}
                        >
                          {cover ? "Update" : "Upload"}
                        </Button>
                      </Upload>
                    </div>
                  ) : (
                    <ProgressiveImage
                      threshold={1}
                      src={
                        cover
                          ? "https://ik.imagekit.io/ttr/tr:n-high/" + cover
                          : "/image-placeholder.png"
                      }
                      placeholder={
                        cover
                          ? "https://ik.imagekit.io/ttr/tr:n-high_placeholder/" +
                            cover
                          : "/image-placeholder.png"
                      }
                    >
                      {(src) => (
                        <img
                          src={src}
                          height={400}
                          width="100%"
                          className="o-fit-cover"
                          style={{
                            position: "relative",
                            zIndex: 1,
                          }}
                        />
                      )}
                    </ProgressiveImage>
                  )
                ) : (
                  <ProgressiveImage
                    src={
                      cover
                        ? "https://ik.imagekit.io/ttr/tr:n-high/" + cover
                        : "/image-placeholder.png"
                    }
                    placeholder={
                      cover
                        ? "https://ik.imagekit.io/ttr/tr:n-high_placeholder/" +
                          cover
                        : "/image-placeholder.png"
                    }
                  >
                    {(src) => (
                      <img
                        src={src}
                        height={400}
                        width="100%"
                        className="o-fit-cover"
                        style={{
                          position: "relative",
                          zIndex: 1,
                        }}
                      />
                    )}
                  </ProgressiveImage>
                )
              }
            >
              <Row className="d-flex jc-center">
                {props.user ? (
                  props.user.username == router.query.username ? (
                    <>
                      <Upload
                        action="/api/imageUpload"
                        name="imageUpload"
                        onChange={handleDpPreview}
                        showUploadList={false}
                        className="dp-imageUpload"
                      >
                        <Button
                          shape="circle"
                          className="avatar-upload-button"
                          icon={
                            <i
                              className="ri-camera-2-fill va-minus-2 fs-18"
                              style={{
                                color: "inherit",
                              }}
                            ></i>
                          }
                        />
                      </Upload>
                      <Avatar
                        size={100}
                        src={
                          dp
                            ? dp.includes(
                                "https://platform-lookaside.fbsbx.com/"
                              ) || dp.includes("google")
                              ? dp
                              : "https://ik.imagekit.io/ttr/tr:n-med/" + dp
                            : "/avatar-placeholder.jpeg"
                        }
                        style={{
                          margin: "auto",
                          marginTop: -70,
                          zIndex: 3,
                          position: "relative",
                        }}
                      />
                    </>
                  ) : (
                    <Avatar
                      size={100}
                      src={
                        dp
                          ? dp.includes(
                              "https://platform-lookaside.fbsbx.com/"
                            ) || dp.includes("google")
                            ? dp
                            : "https://ik.imagekit.io/ttr/tr:n-med/" + dp
                          : "/avatar-placeholder.jpeg"
                      }
                      style={{
                        margin: "auto",
                        marginTop: -70,
                        zIndex: 3,
                        position: "relative",
                      }}
                    />
                  )
                ) : (
                  <Avatar
                    size={100}
                    src={
                      dp
                        ? dp.includes(
                            "https://platform-lookaside.fbsbx.com/"
                          ) || dp.includes("google")
                          ? dp
                          : "https://ik.imagekit.io/ttr/tr:n-med/" + dp
                        : "/avatar-placeholder.jpeg"
                    }
                    style={{
                      margin: "auto",
                      marginTop: -70,
                      zIndex: 3,
                      position: "relative",
                    }}
                  />
                )}
              </Row>
              <Row className="d-flex jc-center"></Row>
            </Card>
            <Row className="d-flex jc-center">
              <Text
                className="ta-center fs-18 mt-20 ml-10 t-transform-cpt"
                strong
              >
                {router.query.username}
                <Tooltip title="Verified">
                  <i
                    className="ri-checkbox-circle-fill fs-16"
                    style={{
                      position: "absolute",
                      marginLeft: 5,
                      color: "#00AAFB",
                    }}
                  ></i>
                </Tooltip>
              </Text>
            </Row>

            <Row justify="center" className="mg-y-20 social-row-profile">
              {getUserData.users[0].facebook &&
              getUserData.users[0].facebook.length > 1 ? (
                <div className="mg-x-5">
                  <a
                    href={getUserData.users[0].facebook}
                    className="va-minus-2"
                  >
                    <img src="/facebook.svg" height={23} width={23} />
                  </a>
                </div>
              ) : null}

              {getUserData.users[0].instagram &&
              getUserData.users[0].instagram.length > 1 ? (
                <div className="mg-x-5">
                  <a href={getUserData.users[0].instagram}>
                    <img src="/instagram.svg" height={30} width={30} />
                  </a>
                </div>
              ) : null}

              {getUserData.users[0].twitter &&
              getUserData.users[0].twitter.length > 1 ? (
                <div className="mg-x-5">
                  <a href={getUserData.users[0].twitter}>
                    <img src="/twitter.svg" height={30} width={30} />
                  </a>
                </div>
              ) : null}

              {/* {getUserData.users[0].website &&
              getUserData.users[0].website.length > 1 ? (
                <div className="mg-x-10">
                  <Text className="mr-10" strong>
                    Website:
                  </Text>
                  <Text>{getUserData.users[0].website}</Text>
                </div>
              ) : null} */}
            </Row>
            <Card className="mg-y-20">
              <Row justify="center">
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={24}>
                  <Tabs
                    defaultActiveKey={tab ? tab : "profile"}
                    className="fs-14"
                    onChange={(data) => {
                      if (data == "contributions") {
                        getUserContributions({
                          variables: {
                            id: getUserData.users[0].id,
                          },
                        });
                      } else if (data == "bookmarks") {
                        getUserBookmarks({
                          variables: {
                            id: getUserData.users[0].id,
                          },
                        });
                      }
                    }}
                  >
                    <Tabs.TabPane tab="Profile" key="profile">
                      <div className="mg-y-20">
                        <Text className="mr-10" strong>
                          First Name:
                        </Text>
                        <Text>
                          {getUserData && getUserData.users
                            ? getUserData.users[0].first_name
                            : "Not Specified"}
                        </Text>
                      </div>

                      <div className="mg-y-20">
                        <Text className="mr-10" strong>
                          Last Name:
                        </Text>
                        <Text>
                          {getUserData.users[0].last_name
                            ? getUserData.users[0].last_name
                            : "Not Specified"}
                        </Text>
                      </div>

                      <div className="mg-y-20">
                        <Text className="mr-10" strong>
                          Email:
                        </Text>
                        <Text>
                          {getUserData.users[0].email
                            ? getUserData.users[0].email
                            : "Not Specified"}
                        </Text>
                      </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Contributions" key="contributions">
                      {getUserContributionsLoading ? (
                        <Skeleton
                          className="mt-20"
                          avatar
                          title
                          active
                          round
                          key="a-list-item"
                        />
                      ) : getUserContributionsData ? (
                        getUserContributionsData.articles_and_users.length <
                        1 ? (
                          <div className="d-flex jc-center flex-column ai-center">
                            <Text className="fs-16 mg-y-20" strong>
                              No contributions yet
                            </Text>
                            <img src="/empty.svg" width={250} height={250} />
                          </div>
                        ) : (
                          <List
                            itemLayout="vertical"
                            dataSource={
                              getUserContributionsData
                                ? getUserContributionsData.articles_and_users
                                : []
                            }
                            renderItem={(item) => (
                              <List.Item
                                key={item.article.id}
                                className="article-list-item"
                                extra={
                                  <img
                                    className="ml-20 list-image"
                                    src={
                                      "https://ik.imagekit.io/ttr/tr:n-med/" +
                                      item.article.featured_image
                                    }
                                  />
                                }
                                actions={[
                                  <Moment fromNow className=" lh-2 ml-5">
                                    {item.article.updated_at}
                                  </Moment>,
                                ]}
                              >
                                <List.Item.Meta
                                  title={
                                    <a
                                      href={`/article/${item.article.article_category.slug}/${item.article.article_topic.slug}/${item.article.slug}`}
                                    >
                                      <Paragraph className="fs-14 line-clamp">
                                        {item.article.title}
                                      </Paragraph>
                                    </a>
                                  }
                                  description={
                                    <Paragraph className="fs-14 line-clamp">
                                      {item.article.excerpt}
                                    </Paragraph>
                                  }
                                />
                              </List.Item>
                            )}
                          />
                        )
                      ) : null}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Bookmarks" key="bookmarks">
                      {getUserBookmarksLoading ? (
                        <Skeleton
                          className="mt-20"
                          avatar
                          title
                          active
                          round
                          key="a-list-item"
                        />
                      ) : getUserBookmarksData ? (
                        getUserBookmarksData.users[0].bookmarks.length < 1 ? (
                          <div className="d-flex jc-center flex-column ai-center">
                            <Text className="fs-16 mg-y-20" strong>
                              No bookmarks yet
                            </Text>
                            <img src="/empty.svg" width={250} height={250} />
                          </div>
                        ) : (
                          <List
                            itemLayout="vertical"
                            dataSource={
                              getUserBookmarksData
                                ? getUserBookmarksData.users[0].bookmarks
                                : []
                            }
                            renderItem={(item) => (
                              <List.Item
                                key={item.bookmarkedArticle.id}
                                className="article-list-item"
                                extra={
                                  <img
                                    className="ml-20 list-image"
                                    src={
                                      "https://ik.imagekit.io/ttr/tr:n-med/" +
                                      item.bookmarkedArticle.featured_image
                                    }
                                  />
                                }
                                actions={[
                                  <Moment fromNow className=" lh-2 ml-5">
                                    {item.bookmarkedArticle.updated_at}
                                  </Moment>,
                                ]}
                              >
                                <List.Item.Meta
                                  title={
                                    <a
                                      href={`/article/${item.bookmarkedArticle.article_category.slug}/${item.bookmarkedArticle.article_topic.slug}/${item.bookmarkedArticle.slug}`}
                                    >
                                      <Paragraph className="fs-14 line-clamp">
                                        {item.bookmarkedArticle.title}
                                      </Paragraph>
                                    </a>
                                  }
                                  description={
                                    <Paragraph className="fs-14 line-clamp">
                                      {item.bookmarkedArticle.excerpt}
                                    </Paragraph>
                                  }
                                />
                              </List.Item>
                            )}
                          />
                        )
                      ) : null}
                    </Tabs.TabPane>
                  </Tabs>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      )}
    </Wrapper>
  );
};

export default User;

export const getServerSideProps = withSession(async function ({
  req,
  res,
  query,
}) {
  const { username } = query;
  const user = req.session.get(["session"]);
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: getUserQuery,
    variables: {
      username: username,
    },
  });

  return {
    props: {
      username: username ? username : null,
      initialApolloState: apolloClient.cache.extract(),
      user: user ? user : null,
    },
  };
});
