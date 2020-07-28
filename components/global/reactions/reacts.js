import styled from "styled-components";
import { Modal, Tabs, Typography, Dropdown, Avatar } from "antd";
import { useState } from "react";

const ReactionsContainer = styled.div`
  display: flex;
`;

const Reaction = styled.div`
  margin-left: -6px;
  font-size: 24px;
  i {
    vertical-align: -8px;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
  }
`;

const ModalReaction = styled.div`
  display: flex;
  font-size: 22px;
  i {
    vertical-align: -8px;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
  }

  .count {
    margin-left: 10px;
    font-size: 14px;
    line-height: 2.3;
  }
`;

const { Text, Title, Paragraph } = Typography;
const Reactions = (props) => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <ReactionsContainer>
        {props.reactions.map((reaction) => {
          var match = props.data.find(
            (elem) => elem.reaction.id == reaction.id
          );
          if (match) {
            return (
              <a>
                <Dropdown
                  overlay={
                    <div
                      className="ta-center"
                      style={{
                        background: "rgb(0,0,0,0.8)",
                        borderRadius: 10,
                        width: 80,
                        color: "white",
                      }}
                    >
                      <Text
                        className="t-transform-cpt mt-10 ta-center"
                        style={{
                          color: "rgb(255,255,255,0.8)",
                        }}
                        strong
                      >
                        {reaction.name}
                      </Text>
                    </div>
                  }
                  placement="bottomCenter"
                >
                  <Reaction
                    onClick={() => {
                      setModal(true);
                    }}
                  >
                    <i className={reaction.code} style={reaction.gradient} />
                  </Reaction>
                </Dropdown>
              </a>
            );
          }
        })}
      </ReactionsContainer>
      <Modal
        maskClosable
        onCancel={() => setModal(false)}
        visible={modal}
        footer={false}
        closable={false}
      >
        <Tabs animated>
          {props.reactions.map((reaction) => {
            var el = props.data.find((elem) => elem.reaction.id == reaction.id);
            if (el) {
              return (
                <Tabs.TabPane
                  tab={
                    <ModalReaction>
                      <i className={reaction.code} style={reaction.gradient} />
                      <div className="count">
                        {
                          props.data.filter(
                            (filter) => filter.reaction.id == reaction.id
                          ).length
                        }
                      </div>
                    </ModalReaction>
                  }
                  key={reaction.name}
                >
                  {props.data
                    .filter((filter) => filter.reaction.id == reaction.id)
                    .map((mapped) => (
                      <div className="mt-10 mb-20">
                        <Avatar
                          size={35}
                          src={mapped.user.profile_picture + ".webp"}
                          className="mr-10"
                        />
                        <Text
                          strong
                          className=" t-transform-cpt mt-5 va-middle"
                        >
                          {mapped.user.username}
                        </Text>
                      </div>
                    ))}
                </Tabs.TabPane>
              );
            }
          })}
        </Tabs>
      </Modal>
    </>
  );
};

export default Reactions;
