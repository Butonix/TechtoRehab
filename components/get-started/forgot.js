import { Typography, Form, Input, Button, Alert } from "antd";
import { useRouter } from "next/router";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { nanoid } from "nanoid";

const checkEmailQuery = gql`
  query checkEmail($email: String!) {
    users_aggregate(where: { email: { _eq: $email } }) {
      aggregate {
        count
      }
      nodes {
        id
      }
    }
  }
`;

const resetTokenQuery = gql`
  mutation resetToken($token: String!, $id: uuid!, $expire: timestamptz!) {
    update_users_private_info(
      _set: { reset_token: $token, reset_token_expire: $expire }
      where: { user_id: { _eq: $id } }
    ) {
      returning {
        reset_token
      }
    }
  }
`;

const { Text, Title, Paragraph } = Typography;

const Forgot = () => {
  const [emailFail, setEmailFail] = useState(false);
  const [emailPass, setEmailPass] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [form] = Form.useForm();
  const router = useRouter();

  const [
    checkEmail,
    { loading: checkEmailLoading, data: checkEmailData },
  ] = useLazyQuery(checkEmailQuery, {
    onCompleted: (data) => {
      if (data.users_aggregate.aggregate.count == 1) {
        setSendingEmail(true);
        resetToken({
          variables: {
            id: data.users_aggregate.nodes[0].id,
            token: nanoid(),
            expire: new Date().toISOString(),
          },
        });
      } else {
        setEmailPass(false);
        setEmailFail(true);
      }
    },
  });

  const [resetToken, { data: resetTokenData }] = useMutation(resetTokenQuery, {
    onCompleted: (data) => {
      fetch("/api/sendForgotEmail", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: checkEmailData.users_aggregate.nodes[0].id,
          email: email,
          token: data.update_users_private_info.returning[0].reset_token,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          setEmailFail(false);
          setSendingEmail(false);
          setEmailPass(true);
        });
    },
  });

  return (
    <>
      <Title level={4} className="mg-y-20 fs-18">
        Reset your password
      </Title>
      {emailFail ? (
        <Alert
          className="mg-y-20"
          message="Error"
          description="Email Does not Exist. Please Try Again"
          type="error"
          showIcon
        />
      ) : emailPass ? (
        <Alert
          className="mg-y-20"
          message="Success!"
          description="Check your email for the reset link"
          type="success"
          showIcon
        />
      ) : sendingEmail ? (
        <Alert
          className="mg-y-20"
          message="Sending Email"
          description={
            <div className="d-flex">
              <Text className="mr-10">Sending Email...</Text>
              <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
              </div>
            </div>
          }
          type="success"
          showIcon
        />
      ) : null}
      <Form
        layout="vertical"
        onFinish={(obj) => {
          checkEmail({
            variables: {
              email: obj.email,
            },
          });
        }}
      >
        <Form.Item label="Email" name="email">
          <Input
            placeholder="Your Email"
            onChange={(val) => {
              setEmail(val.target.value);
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Forgot;
