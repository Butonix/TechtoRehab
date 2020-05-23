import { Row, Col, Typography, Table, Button, Card } from "antd";
import { useStoreActions } from "easy-peasy";

const { Title, Text, Paragraph } = Typography;

const Articles = () => {
  return (
    <>
      <Row justify="center">
        <Col xl={24}>
          <Table
            size="large"
            scroll={{ x: "100vw" }}
            pagination={{ pageSize: 5 }}
            columns={[
              {
                title: "Title",
                dataIndex: "title",
                width: 500,
              },
              {
                title: "Summary",
                dataIndex: "summary",
                width: 400,
              },
              {
                title: "Category",
                dataIndex: "category",
                width: 150,
              },
              { title: "Topic", dataIndex: "topic" },
              {
                title: "Actions",
                dataIndex: "actions",
                fixed: "right",
                width: 120,
                render: (text, record) => (
                  <>
                    <Button type="primary" style={{ margin: 5 }} danger>
                      Delete
                    </Button>
                    <Button type="primary" style={{ margin: 5 }}>
                      PM Author
                    </Button>
                  </>
                ),
              },
            ]}
            dataSource={[
              {
                key: 1,
                title: (
                  <a>
                    How To Become A True Keyboard Warrior (And Stop Using Your
                    Mouse)
                  </a>
                ),
                summary:
                  "In this article you will learn to live by 5 pillars of islam",
                category: <a>Javascript</a>,
                topic: <a>React</a>,
              },
              {
                key: 2,
                title: (
                  <a>
                    How To Become A True Keyboard Warrior (And Stop Using Your
                    Mouse)
                  </a>
                ),
                summary:
                  "In this article you will learn to live by 5 pillars of islam",
                category: <a>Javascript</a>,
                topic: <a>React</a>,
              },
              {
                key: 3,
                title: (
                  <a>
                    How To Become A True Keyboard Warrior (And Stop Using Your
                    Mouse)
                  </a>
                ),
                summary:
                  "In this article you will learn to live by 5 pillars of islam",
                category: <a>Javascript</a>,
                topic: <a>React</a>,
              },
              {
                key: 4,
                title: (
                  <a>
                    How To Become A True Keyboard Warrior (And Stop Using Your
                    Mouse)
                  </a>
                ),
                summary:
                  "In this article you will learn to live by 5 pillars of islam",
                category: <a>Javascript</a>,
                topic: <a>React</a>,
              },
              {
                key: 5,
                title: (
                  <a>
                    How To Become A True Keyboard Warrior (And Stop Using Your
                    Mouse)
                  </a>
                ),
                summary:
                  "In this article you will learn to live by 5 pillars of islam",
                category: <a>Javascript</a>,
                topic: <a>React</a>,
              },
              {
                key: 6,
                title: (
                  <a>
                    How To Become A True Keyboard Warrior (And Stop Using Your
                    Mouse)
                  </a>
                ),
                summary:
                  "In this article you will learn to live by 5 pillars of islam",
                category: <a>Javascript</a>,
                topic: <a>React</a>,
              },
              {
                key: 7,
                title: (
                  <a>
                    How To Become A True Keyboard Warrior (And Stop Using Your
                    Mouse)
                  </a>
                ),
                summary:
                  "In this article you will learn to live by 5 pillars of islam",
                category: <a>Javascript</a>,
                topic: <a>React</a>,
              },
              {
                key: 8,
                title: <a>How To Become</a>,
                summary:
                  "In this article you will learn to live by 5 pillars of islam",
                category: <a>Javascript</a>,
                topic: <a>React</a>,
              },
              {
                key: 9,
                title: (
                  <a>
                    How To Become A True Keyboard Warrior (And Stop Using Your
                    Mouse)
                  </a>
                ),
                summary:
                  "In this article you will learn to live by 5 pillars of islam",
                category: <a>Javascript</a>,
                topic: <a>React</a>,
              },
              {
                key: 10,
                title: (
                  <a>
                    How To Become A True Keyboard Warrior (And Stop Using Your
                    Mouse)
                  </a>
                ),
                summary:
                  "In this article you will learn to live by 5 pillars of islam",
                category: <a>Javascript</a>,
                topic: <a>React</a>,
              },
              {
                key: 11,
                title: (
                  <a>
                    How To Become A True Keyboard Warrior (And Stop Using Your
                    Mouse)
                  </a>
                ),
                summary:
                  "In this article you will learn to live by 5 pillars of islam",
                category: <a>Javascript</a>,
                topic: <a>React</a>,
              },
              {
                key: 12,
                title: (
                  <a>
                    How To Become A True Keyboard Warrior (And Stop Using Your
                    Mouse)
                  </a>
                ),
                summary:
                  "In this article you will learn to live by 5 pillars of islam",
                category: <a>Javascript</a>,
                topic: <a>React</a>,
              },
              {
                key: 13,
                title: (
                  <a>
                    How To Become A True Keyboard Warrior (And Stop Using Your
                    Mouse)
                  </a>
                ),
                summary:
                  "In this article you will learn to live by 5 pillars of islam",
                category: <a>Javascript</a>,
                topic: <a>React</a>,
              },

              {
                key: 14,
                title: (
                  <a>
                    How To Become A True Keyboard Warrior (And Stop Using Your
                    Mouse)
                  </a>
                ),
                summary:
                  "In this article you will learn to live by 5 pillars of islam",
                category: <a>Javascript</a>,
                topic: <a>React</a>,
              },

              {
                key: 15,
                title: (
                  <a>
                    How To Become A True Keyboard Warrior (And Stop Using Your
                    Mouse)
                  </a>
                ),
                summary:
                  "In this article you will learn to live by 5 pillars of islam",
                category: <a>Javascript</a>,
                topic: <a>React</a>,
              },
            ]}
          />
        </Col>
      </Row>
    </>
  );
};

export default Articles;
