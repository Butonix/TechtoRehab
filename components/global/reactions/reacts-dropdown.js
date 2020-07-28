import { Dropdown, Typography } from "antd";
import styled from "styled-components";
import { gql, useLazyQuery } from "@apollo/client";

const { Text, Title } = Typography;

const ReactionsOverlay = styled.div`
  display: flex;
  border-radius: 30px;
  padding: 5px 20px;
  background: rgb(255, 255, 255, 1);
  box-shadow: 0px 0px 6px 1px #cfcfcf;
  i {
    :hover {
      transition: all 400ms cubic-bezier(0.47, 1.64, 0.41, 0.8);
      transform: scale3d(5);
      -webkit-transform: scale3d(2, 2, 2);
    }
  }
  :first-child {
    margin-left: 20px;
  }
`;

const ReactionDropdown = (props) => {
  return (
    <a>
      <Dropdown
        placement="topCenter"
        overlay={
          <ReactionsOverlay>
            {props.reactions.map((reaction) => {
              return (
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
                        className="t-transform-cpt mt-10 ta-center fs-14"
                        style={{
                          color: "rgb(255,255,255,0.8)",
                        }}
                        strong
                      >
                        {reaction.name}
                      </Text>
                    </div>
                  }
                  placement="topCenter"
                >
                  <i
                    className={`${reaction.code} enable-text-gradient va-minus-6 fs-28 mg-x-15`}
                    style={reaction.gradient}
                  />
                </Dropdown>
              );
            })}
          </ReactionsOverlay>
        }
      >
        {props.reacted == true ? (
          <a>
            <div className="mt-5">
              {/* <Text
                strong
                className="mr-10 lh-1"
                style={{
                  verticalAlign: 6,
                }}
              >
                I am thinking
              </Text> */}
              {props.data
                .filter((filter) => filter.user.id == props.id)
                .map((mapped) => (
                  <>
                    <i
                      className={`${mapped.reaction.code} fs-24 va-middle enable-text-gradient`}
                      style={mapped.reaction.gradient}
                    />
                    <Text
                      strong
                      className="mr-10 ml-10 lh-1 t-transform-cpt "
                      //   style={{
                      //     verticalAlign: 6,
                      //   }}
                    >
                      {mapped.reaction.name}
                    </Text>
                  </>
                ))}
            </div>
          </a>
        ) : (
          <i
            className="ri-thumb-up-line va-minus-6 lh-2 fs-22"
            style={{
              color: "#3c3c3c",
            }}
          ></i>
        )}
      </Dropdown>
    </a>
  );
};

export default ReactionDropdown;
