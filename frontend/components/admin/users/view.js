import { Row, Col, Typography, Table, Button, Card } from "antd";
import { useStoreActions } from "easy-peasy";

const { Title, Text, Paragraph } = Typography;

const userView = () => {
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
                title: "Username",
                dataIndex: "username",
                width: 30,
              },
              {
                title: "First Name",
                dataIndex: "firstN",
                width: 30,
              },
              {
                title: "Last Name",
                dataIndex: "lastN",
                width: 30,
              },
              {
                title: "Actions",
                dataIndex: "actions",
                fixed: "right",
                width: 12,
                render: (text, record) => (
                  <>
                    <Button type="primary mg-5" danger>
                      Delete
                    </Button>
                    <Button type="primary mg-5">View</Button>
                  </>
                ),
              },
            ]}
            dataSource={[
              {
                key: 1,
                username: <a>Very Nice</a>,
                firstN: "Dukesx",
                lastN: "Duka",
              },

              {
                key: 1,
                username: <a>Very Nice</a>,
                firstN: "Dukesx",
                lastN: "Duka",
              },

              {
                key: 1,
                username: <a>Very Nice</a>,
                firstN: "Dukesx",
                lastN: "Duka",
              },

              {
                key: 1,
                username: <a>Very Nice</a>,
                firstN: "Dukesx",
                lastN: "Duka",
              },

              {
                key: 1,
                username: <a>Very Nice</a>,
                firstN: "Dukesx",
                lastN: "Duka",
              },

              {
                key: 1,
                username: <a>Very Nice</a>,
                firstN: "Dukesx",
                lastN: "Duka",
              },

              {
                key: 1,
                username: <a>Very Nice</a>,
                firstN: "Dukesx",
                lastN: "Duka",
              },

              {
                key: 1,
                username: <a>Very Nice</a>,
                firstN: "Dukesx",
                lastN: "Duka",
              },

              {
                key: 1,
                username: <a>Very Nice</a>,
                firstN: "Dukesx",
                lastN: "Duka",
              },

              {
                key: 1,
                username: <a>Very Nice</a>,
                firstN: "Dukesx",
                lastN: "Duka",
              },
            ]}
          />
        </Col>
      </Row>
    </>
  );
};

export default userView;
