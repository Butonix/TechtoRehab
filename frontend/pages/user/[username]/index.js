import withSession from "lib/session";
import { useRouter } from "next/router";
import Wrapper from "components/global/wrapper";
import Error from "components/global/401";
import { initializeApollo } from "lib/apolloClient";
import gql from "graphql-tag";
import {
  Row,
  Col,
  Card,
  Tabs,
  Typograph,
  Upload,
  Typography,
  Avatar,
  Badge,
} from "antd";
import { useState } from "react";
import { useLazyQuery, useQuery, useMutation } from "@apollo/react-hooks";
import Error404 from "components/global/404";
import ProgressiveImage from "react-progressive-image";

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
      articles_to_users {
        article {
          featured_image
          excerpt
          title
          article_category {
            title
            slug
          }
          article_topic {
            title
            slug
          }
          slug
        }
      }

      bookmarks {
        bookmarkedArticle {
          content
          excerpt
          title
          article_topic {
            title
            slug
          }
          article_category {
            title
            slug
          }
          slug
        }
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

const User = (props) => {
  const router = useRouter();
  const { tab } = router.query;

  const { data: getUserData, error: getUserError } = useQuery(getUserQuery, {
    variables: {
      username: props.username,
    },
  });

  const [cover, setCover] = useState(
    getUserData.users.length > 0 ? getUserData.users[0].cover : null
  );
  const [dp, setDp] = useState(
    getUserData.users.length > 0
      ? getUserData.users[0].profile_picture + ".webp"
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
      setDp(obj2.file.response.path + ".webp");
      updateprofilePicture({
        variables: {
          id: getUserData.users[0].id,
          dp: obj2.file.response.path,
        },
      });
    }
  };

  if (getUserError) {
    return <p>Bad Error</p>;
  }

  return (
    <Wrapper user={props.user}>
      {console.log(getUserData)}
      {props.username == null || getUserData.users.length < 1 ? (
        <Error404 />
      ) : (
        <Row justify="center" className="pd-y-20">
          <Col xs={24} sm={24} md={24} lg={16} xl={12} xxl={12}>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className="wd-100pc"
              cover={
                <Upload
                  name="imageUpload"
                  action="/api/imageUpload"
                  onChange={handleCoverPreview}
                  showUploadList={false}
                  className="cover-imageUpload"
                  style={{ width: "100%" }}
                >
                  <i
                    class="ri-upload-cloud-2-line fs-22 uploadIcon"
                    style={{
                      visibility: "hidden",
                      top: 20,
                      left: 30,
                      position: "absolute",
                      zIndex: 3,
                      color: "rgba(255, 255, 255, 0.4)",
                      cursor: "pointer",
                    }}
                  ></i>
                  {/* <img
                    src={cover}
                    width="100%"
                    className="o-fit-cover"
                    height={400}
                  /> */}
                  {/* <LazyLoadImage
                    className="o-fit-cover"
                    src={cover + ".webp"}
                    height={400}
                    width="`100%"
                    effect="blur"
                  /> */}
                  <ProgressiveImage
                    src={cover + ".webp"}
                    placeholder={cover + "-placeholder.webp"}
                  >
                    {(src) => (
                      <img
                        src={src}
                        height={400}
                        width="100%"
                        className="o-fit-cover"
                      />
                    )}
                  </ProgressiveImage>
                </Upload>
              }
            >
              <Row className="d-flex jc-center">
                <Upload
                  action="/api/imageUpload"
                  name="imageUpload"
                  onChange={handleDpPreview}
                  showUploadList={false}
                  className="dp-imageUpload"
                >
                  <i
                    class="ri-upload-cloud-2-line fs-22 uploadIcon"
                    style={{
                      visibility: "hidden",
                      bottom: -10,
                      zIndex: 4,
                      position: "relative",
                      color: "rgb(0,0,0,0.2)",
                      left: 63,
                      cursor: "pointer",
                    }}
                  ></i>
                  <Avatar
                    size={100}
                    src={dp}
                    style={{
                      margin: "auto",
                      marginTop: -70,
                      zIndex: 3,
                      position: "relative",
                    }}
                  />
                </Upload>
              </Row>
              <Row className="d-flex jc-center"></Row>
            </Card>
            <Row className="d-flex jc-center">
              <Text className="ta-center fs-18 mt-20" strong>
                Dukesx
                <i
                  class="ri-checkbox-circle-fill fs-16"
                  style={{
                    position: "absolute",
                    marginLeft: 5,
                    color: "#00AAFB",
                  }}
                ></i>
              </Text>
            </Row>

            <Row justify="center" className="mg-y-20">
              {getUserData.users[0].facebook &&
              getUserData.users[0].facebook.length > 1 ? (
                <div className="mg-x-10">
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
                <div className="mg-x-10">
                  <a href={getUserData.users[0].instagram}>
                    <img src="/instagram.svg" height={30} width={30} />
                  </a>
                </div>
              ) : null}

              {getUserData.users[0].twitter &&
              getUserData.users[0].twitter.length > 1 ? (
                <div className="mg-x-10">
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
                      {getUserData &&
                      getUserData.users[0].articles_to_users.length > 1 ? (
                        <p>Ok</p>
                      ) : (
                        <>
                          <Title level={4} className="fs-18 ta-center mg-y-20">
                            Hmmm... Seems Empty
                          </Title>
                          <img
                            src="/empty.svg"
                            className="o-fit-cover mg-y-20"
                            height={400}
                          />
                        </>
                      )}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Bookmarks" key="bookmarks">
                      {getUserData &&
                      getUserData.users[0].bookmarks.length > 1 ? (
                        <p>Yes</p>
                      ) : (
                        <>
                          <Title level={4} className="fs-18 ta-center mg-y-20">
                            Hmmm... Seems Empty
                          </Title>
                          <img
                            src="/empty.svg"
                            className="o-fit-cover mg-y-20"
                            height={400}
                          />
                        </>
                      )}
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