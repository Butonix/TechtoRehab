import { Row, Col, Typography, Table, Button, Card } from "antd";
import { useStoreActions } from "easy-peasy";

const { Title, Text, Paragraph } = Typography;

const Comments = () => {
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
                title: "Comment",
                dataIndex: "comment",
                width: 300,
              },
              {
                title: "Author",
                dataIndex: "author",
                width: 80,
              },
              {
                title: "Replied To",
                dataIndex: "repliedto",
                width: 80,
              },
              { title: "Page", dataIndex: "page", width: 300 },
              {
                title: "Actions",
                dataIndex: "actions",
                fixed: "right",
                width: 60,
                render: (text, record) => (
                  <>
                    <Button type="primary mg-5" danger>
                      Delete
                    </Button>
                  </>
                ),
              },
            ]}
            dataSource={[
              {
                key: 1,
                comment: <a>Very Nice</a>,
                author: <a>Dukesx</a>,
                repliedto: <a>This is good</a>,
                page: (
                  <a>
                    How To Become A True Keyboard Warrior (And Stop Using Your
                    Mouse)
                  </a>
                ),
              },
              {
                key: 1,
                comment: "Very Nice",
                author: <a>Dukesx</a>,
                repliedto: <a>Dukea</a>,
                page: (
                  <a>
                    How To Become A True Keyboard Warrior (And Stop Using Your
                    Mouse)
                  </a>
                ),
              },
              {
                key: 1,
                comment: "Very Nice",
                author: <a>Dukesx</a>,
                repliedto: null,
                page: (
                  <a>
                    How To Become A True Keyboard Warrior (And Stop Using Your
                    Mouse)
                  </a>
                ),
              },
              {
                key: 1,
                comment: "Very Nice",
                author: <a>Dukesx</a>,
                repliedto: <a>Dukea</a>,
                page: (
                  <a>
                    How To Become A True Keyboard Warrior (And Stop Using Your
                    Mouse)
                  </a>
                ),
              },
              {
                key: 1,
                comment: "Very Nice",
                author: <a>Dukesx</a>,
                repliedto: <a>Dukea</a>,
                page: (
                  <a>
                    How To Become A True Keyboard Warrior (And Stop Using Your
                    Mouse)
                  </a>
                ),
              },
              {
                key: 1,
                comment: "Very Nice",
                author: <a>Dukesx</a>,
                repliedto: <a>Dukea</a>,
                page: (
                  <a>
                    How To Become A True Keyboard Warrior (And Stop Using Your
                    Mouse)
                  </a>
                ),
              },
              {
                key: 1,
                comment: "Very Nice",
                author: <a>Dukesx</a>,
                repliedto: <a>Dukea</a>,
                page: (
                  <a>
                    How To Become A True Keyboard Warrior (And Stop Using Your
                    Mouse)
                  </a>
                ),
              },
              {
                key: 1,
                comment: "Very Nice",
                author: <a>Dukesx</a>,
                repliedto: <a>Dukea</a>,
                page: (
                  <a>
                    How To Become A True Keyboard Warrior (And Stop Using Your
                    Mouse)
                  </a>
                ),
              },
              {
                key: 1,
                comment: "Very Nice",
                author: <a>Dukesx</a>,
                repliedto: <a>Dukea</a>,
                page: (
                  <a>
                    How To Become A True Keyboard Warrior (And Stop Using Your
                    Mouse)
                  </a>
                ),
              },
              {
                key: 1,
                comment: "Very Nice",
                author: <a>Dukesx</a>,
                repliedto: <a>Dukea</a>,
                page: (
                  <a>
                    How To Become A True Keyboard Warrior (And Stop Using Your
                    Mouse)
                  </a>
                ),
              },
            ]}
          />
        </Col>
      </Row>
    </>
  );
};

export default Comments;
