import { Row, Col, Input, Form } from "antd";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";
import { useState } from "react";

const getUser = gql`
  query MyQuery($username: String!) {
    users(where: { username: { _ilike: $username } }) {
      username
    }
  }
`;
const UsersManager = () => {
  const [sendUser, { loading, data }] = useLazyQuery(getUser);
  const [value, setValue] = useState(data);
  // const sendData = async (newValue) => {
  //   setValue(val);
  // };

  return (
    <Row className="mt-20">
      <Col span={24}>
        <Form layout="vertical">
          <Form.Item label="Search User">
            <Input
              style={{ width: "100%" }}
              placeholder="enter name/username of the user"
              onChange={(val) => {
                var newValue = "%" + val.target.value + "%";
                return sendUser({ variables: { username: newValue } });
              }}
            />
            {data ? data.users.map((mapped) => <p>{mapped.username}</p>) : null}
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default UsersManager;
