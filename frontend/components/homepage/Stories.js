import Stories from "react-insta-stories";
import { Row, Col, Modal, Typography } from "antd";
import { useState, useEffect } from "react";
import ReactPlaceholder from "react-placeholder";

const Storia = () => {
  const [time, setTime] = useState(5);
  useEffect(() => {
    setTimeout(() => {
      setTime(0);
    }, 3000);
  });

  return (
    <Row className="highlights">
      {time == 0 ? (
        <>
          <Col
            xs={23}
            sm={12}
            md={12}
            lg={12}
            xl={6}
            style={{ padding: "10px" }}
          >
            <Stories
              stories={[
                {
                  url: "https://picsum.photos/1080/1920",
                  seeMore: ({ close }) => (
                    <div
                      style={{
                        background: "white",
                        zIndex: 2,
                        height: "100%",
                        width: "100%",
                        color: "black",
                      }}
                    >
                      <p>Hello World</p>
                      <a href="#" onClick={close}>
                        Close Modal
                      </a>
                    </div>
                  ),
                  content: () => {
                    return (
                      <div
                        style={{
                          background: "red",
                          width: "100%",
                          padding: "20px",
                        }}
                      >
                        <Typography.Title
                          level={4}
                          style={{ marginTop: "5%" }}
                        >
                          The most simple Contentful + React tutorial using a
                          NextJS
                        </Typography.Title>
                        <Typography.Title
                          level={4}
                          style={{ marginTop: "10%" }}
                        >
                          In This Article, You Will Learn:
                        </Typography.Title>
                        <Typography.Paragraph style={{ margin: "0px" }}>
                          <ul>
                            <li>
                              <Typography.Text>This is text</Typography.Text>
                            </li>
                          </ul>
                        </Typography.Paragraph>
                      </div>
                    );
                  },
                },
                {
                  url: "https://picsum.photos/1080/1920",
                  seeMore: ({ close }) => (
                    <div style={{ width: "100%", height: "100%" }}>Hello</div>
                  ),
                  header: {
                    heading: "",
                    subheading: "",
                  },
                  content: () => {
                    return (
                      <div
                        style={{
                          background:
                            "url(https://image.freepik.com/free-vector/abstract-colorful-background_23-2147997828.jpg)",
                          width: "100%",
                          padding: "20px",
                        }}
                      >
                        <Typography.Title
                          level={4}
                          style={{
                            marginTop: "50%",
                            background: "rgba(0,0,0, 0.4)",
                          }}
                        >
                          In This Article, You Will Learn:
                        </Typography.Title>
                        <Typography.Paragraph
                          style={{
                            margin: "0px",
                            background: "rgba(0,0,0, 0.4)",
                          }}
                        >
                          <ul>
                            <li>
                              <Typography.Text>This is text</Typography.Text>
                            </li>
                            <li>
                              <Typography.Text>This is text</Typography.Text>
                            </li>
                            <li>
                              <Typography.Text>This is text</Typography.Text>
                            </li>
                            <li>
                              <Typography.Text>This is text</Typography.Text>
                            </li>
                          </ul>
                        </Typography.Paragraph>
                      </div>
                    );
                  },
                },
              ]}
              defaultInterval={9000}
              width={"100%"}
              height={500}
              isPaused={true}
              storyStyles={{
                padding: "10px",
              }}
            />
          </Col>
          <Col
            xs={23}
            sm={12}
            md={12}
            lg={12}
            xl={6}
            style={{ padding: "10px" }}
          >
            <Stories
              stories={[
                {
                  url: "https://picsum.photos/1080/1920",
                  seeMore: ({ close }) => (
                    <div
                      style={{
                        background: "white",
                        zIndex: 2,
                        height: "100%",
                        width: "100%",
                        color: "black",
                      }}
                    >
                      <p>Hello World</p>
                      <a href="#" onClick={close}>
                        Close Modal
                      </a>
                    </div>
                  ),
                  header: {
                    heading: "From Zero To React In 10 Days",
                    subheading: "5 Objectives",
                  },
                  content: () => {
                    return (
                      <div
                        style={{
                          background: "red",
                          width: "100%",
                          padding: "20px",
                        }}
                      >
                        <Typography.Title
                          level={4}
                          style={{ marginTop: "50%" }}
                        >
                          In This Article, You Will Learn:
                        </Typography.Title>
                        <Typography.Paragraph style={{ margin: "0px" }}>
                          <ul>
                            <li>
                              <Typography.Text>This is text</Typography.Text>
                            </li>
                          </ul>
                        </Typography.Paragraph>
                      </div>
                    );
                  },
                },
                {
                  url: "https://picsum.photos/1080/1920",
                  seeMore: ({ close }) => (
                    <div style={{ width: "100%", height: "100%" }}>Hello</div>
                  ),
                  header: {
                    heading: "From Zero To React In 10 Days",
                    subheading: "5 Objectives",
                  },
                  content: () => {
                    return (
                      <div
                        style={{
                          background:
                            "url(https://image.freepik.com/free-vector/abstract-colorful-background_23-2147997828.jpg)",
                          width: "100%",
                          padding: "20px",
                        }}
                      >
                        <Typography.Title
                          level={4}
                          style={{
                            marginTop: "50%",
                            background: "rgba(0,0,0, 0.4)",
                          }}
                        >
                          In This Article, You Will Learn:
                        </Typography.Title>
                        <Typography.Paragraph
                          style={{
                            margin: "0px",
                            background: "rgba(0,0,0, 0.4)",
                          }}
                        >
                          <ul>
                            <li>
                              <Typography.Text>This is text</Typography.Text>
                            </li>
                            <li>
                              <Typography.Text>This is text</Typography.Text>
                            </li>
                            <li>
                              <Typography.Text>This is text</Typography.Text>
                            </li>
                            <li>
                              <Typography.Text>This is text</Typography.Text>
                            </li>
                          </ul>
                        </Typography.Paragraph>
                      </div>
                    );
                  },
                },
              ]}
              defaultInterval={3000}
              width={"100%"}
              height={500}
              isPaused={false}
            />
          </Col>

          <Col
            xs={23}
            sm={12}
            md={12}
            lg={12}
            xl={6}
            style={{ padding: "10px" }}
          >
            <Stories
              stories={[
                {
                  url: "https://picsum.photos/1080/1920",
                  seeMore: ({ close }) => (
                    <div
                      style={{
                        background: "white",
                        zIndex: 2,
                        height: "100%",
                        width: "100%",
                        color: "black",
                      }}
                    >
                      <p>Hello World</p>
                      <a href="#" onClick={close}>
                        Close Modal
                      </a>
                    </div>
                  ),
                  header: {
                    heading: "From Zero To React In 10 Days",
                    subheading: "5 Objectives",
                  },
                  content: () => {
                    return (
                      <div
                        style={{
                          background: "red",
                          width: "100%",
                          padding: "20px",
                        }}
                      >
                        <Typography.Title
                          level={4}
                          style={{ marginTop: "50%" }}
                        >
                          In This Article, You Will Learn:
                        </Typography.Title>
                        <Typography.Paragraph style={{ margin: "0px" }}>
                          <ul>
                            <li>
                              <Typography.Text>This is text</Typography.Text>
                            </li>
                          </ul>
                        </Typography.Paragraph>
                      </div>
                    );
                  },
                },
                {
                  url: "https://picsum.photos/1080/1920",
                  seeMore: ({ close }) => (
                    <div style={{ width: "100%", height: "100%" }}>Hello</div>
                  ),
                  header: {
                    heading: "From Zero To React In 10 Days",
                    subheading: "5 Objectives",
                  },
                  content: () => {
                    return (
                      <div
                        style={{
                          background:
                            "url(https://image.freepik.com/free-vector/abstract-colorful-background_23-2147997828.jpg)",
                          width: "100%",
                          padding: "20px",
                        }}
                      >
                        <Typography.Title
                          level={4}
                          style={{
                            marginTop: "50%",
                            background: "rgba(0,0,0, 0.4)",
                          }}
                        >
                          In This Article, You Will Learn:
                        </Typography.Title>
                        <Typography.Paragraph
                          style={{
                            margin: "0px",
                            background: "rgba(0,0,0, 0.4)",
                          }}
                        >
                          <ul>
                            <li>
                              <Typography.Text>This is text</Typography.Text>
                            </li>
                            <li>
                              <Typography.Text>This is text</Typography.Text>
                            </li>
                            <li>
                              <Typography.Text>This is text</Typography.Text>
                            </li>
                            <li>
                              <Typography.Text>This is text</Typography.Text>
                            </li>
                          </ul>
                        </Typography.Paragraph>
                      </div>
                    );
                  },
                },
              ]}
              defaultInterval={3000}
              width={"100%"}
              height={500}
              isPaused={false}
            />
          </Col>

          <Col
            xs={23}
            sm={12}
            md={12}
            lg={12}
            xl={6}
            style={{ padding: "10px" }}
          >
            <Stories
              stories={[
                {
                  url: "https://picsum.photos/1080/1920",
                  seeMore: ({ close }) => (
                    <div
                      style={{
                        background: "white",
                        zIndex: 2,
                        height: "100%",
                        width: "100%",
                        color: "black",
                      }}
                    >
                      <p>Hello World</p>
                      <a href="#" onClick={close}>
                        Close Modal
                      </a>
                    </div>
                  ),
                  header: {
                    heading: "From Zero To React In 10 Days",
                    subheading: "5 Objectives",
                  },
                  content: () => {
                    return (
                      <div
                        style={{
                          background: "red",
                          width: "100%",
                          padding: "20px",
                        }}
                      >
                        <Typography.Title
                          level={4}
                          style={{ marginTop: "50%" }}
                        >
                          In This Article, You Will Learn:
                        </Typography.Title>
                        <Typography.Paragraph style={{ margin: "0px" }}>
                          <ul>
                            <li>
                              <Typography.Text>This is text</Typography.Text>
                            </li>
                          </ul>
                        </Typography.Paragraph>
                      </div>
                    );
                  },
                },
                {
                  url: "https://picsum.photos/1080/1920",
                  seeMore: ({ close }) => (
                    <div style={{ width: "100%", height: "100%" }}>Hello</div>
                  ),
                  header: {
                    heading: "From Zero To React In 10 Days",
                    subheading: "5 Objectives",
                  },
                  content: () => {
                    return (
                      <div
                        style={{
                          background:
                            "url(https://image.freepik.com/free-vector/abstract-colorful-background_23-2147997828.jpg)",
                          width: "100%",
                          padding: "20px",
                        }}
                      >
                        <Typography.Title
                          level={4}
                          style={{
                            marginTop: "50%",
                            background: "rgba(0,0,0, 0.4)",
                          }}
                        >
                          In This Article, You Will Learn:
                        </Typography.Title>
                        <Typography.Paragraph
                          style={{
                            margin: "0px",
                            background: "rgba(0,0,0, 0.4)",
                          }}
                        >
                          <ul>
                            <li>
                              <Typography.Text>This is text</Typography.Text>
                            </li>
                            <li>
                              <Typography.Text>This is text</Typography.Text>
                            </li>
                            <li>
                              <Typography.Text>This is text</Typography.Text>
                            </li>
                            <li>
                              <Typography.Text>This is text</Typography.Text>
                            </li>
                          </ul>
                        </Typography.Paragraph>
                      </div>
                    );
                  },
                },
              ]}
              defaultInterval={3000}
              width={"100%"}
              height={500}
              isPaused={false}
            />
          </Col>
        </>
      ) : (
        <>
          <Col
            xs={23}
            sm={12}
            md={12}
            lg={12}
            xl={6}
            style={{ padding: "10px" }}
          >
            <div class="ph-item" style={{ height: "500px", width: "300px" }}>
              <div class="ph-col-2">
                <div class="ph-col-2 empty" />
                <div class="ph-avatar" />
              </div>
              <div class="ph-col-12">
                <div class="ph-picture"></div>
                <div class="ph-row">
                  <div class="ph-col-4"></div>
                  <div class="ph-col-8 empty"></div>
                  <div class="ph-col-6"></div>
                  <div class="ph-col-6 empty"></div>
                  <div class="ph-col-12"></div>
                </div>
              </div>
            </div>
          </Col>
          <Col
            xs={23}
            sm={12}
            md={12}
            lg={12}
            xl={6}
            style={{ padding: "10px" }}
          >
            <div class="ph-item" style={{ height: "500px", width: "300px" }}>
              <div class="ph-col-2">
                <div class="ph-col-2 empty" />
                <div class="ph-avatar" />
              </div>
              <div class="ph-col-12">
                <div class="ph-picture"></div>
                <div class="ph-row">
                  <div class="ph-col-4"></div>
                  <div class="ph-col-8 empty"></div>
                  <div class="ph-col-6"></div>
                  <div class="ph-col-6 empty"></div>
                  <div class="ph-col-12"></div>
                </div>
              </div>
            </div>
          </Col>
          <Col
            xs={23}
            sm={12}
            md={12}
            lg={12}
            xl={6}
            style={{ padding: "10px" }}
          >
            <div class="ph-item" style={{ height: "500px", width: "300px" }}>
              <div class="ph-col-2">
                <div class="ph-col-2 empty" />
                <div class="ph-avatar" />
              </div>
              <div class="ph-col-12">
                <div class="ph-picture"></div>
                <div class="ph-row">
                  <div class="ph-col-4"></div>
                  <div class="ph-col-8 empty"></div>
                  <div class="ph-col-6"></div>
                  <div class="ph-col-6 empty"></div>
                  <div class="ph-col-12"></div>
                </div>
              </div>
            </div>
          </Col>
          <Col
            xs={23}
            sm={12}
            md={12}
            lg={12}
            xl={6}
            style={{ padding: "10px" }}
          >
            <div class="ph-item" style={{ height: "500px", width: "300px" }}>
              <div class="ph-col-2">
                <div class="ph-col-2 empty" />
                <div class="ph-avatar" />
              </div>
              <div class="ph-col-12">
                <div class="ph-picture"></div>
                <div class="ph-row">
                  <div class="ph-col-4"></div>
                  <div class="ph-col-8 empty"></div>
                  <div class="ph-col-6"></div>
                  <div class="ph-col-6 empty"></div>
                  <div class="ph-col-12"></div>
                </div>
              </div>
            </div>
          </Col>
        </>
      )}
    </Row>
  );
};

export default Storia;
