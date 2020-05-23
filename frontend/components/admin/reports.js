import { Row, Col, Typography, Table, Button, Tabs } from "antd";
import { useStoreActions } from "easy-peasy";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const Reports = () => {
  return (
    <Tabs type="card">
      <TabPane tab="Articles" key={1}>
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
                      <Button type="primary" style={{ margin: 5 }} danger>
                        Delete
                      </Button>
                    </>
                  ),
                },
              ]}
              dataSource={[
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
      </TabPane>

      <TabPane tab="Authors" key={2}>
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
                      <Button type="primary" style={{ margin: 5 }} danger>
                        Delete
                      </Button>
                    </>
                  ),
                },
              ]}
              dataSource={[
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
      </TabPane>

      <TabPane tab="Comments" key={3}>
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
                      <Button type="primary" style={{ margin: 5 }} danger>
                        Delete
                      </Button>
                    </>
                  ),
                },
              ]}
              dataSource={[
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
      </TabPane>
    </Tabs>
  );
};

export default Reports;
