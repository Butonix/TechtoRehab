import styled from "styled-components";
import { useStoreState } from "easy-peasy";
import { Typography } from "antd";

const { Text } = Typography;

const Announcemento = styled.div`
  display: flex;
  padding: 15px;
  font-size: 14px;
  margin: 10px 0px;

  .icon {
    margin-right: 10px;
  }

  .close {
    margin-right: 10px;
  }

  .button {
    margin-left: auto;
    margin-right: 10px;
  }
`;

const Announcement = (props) => {
  const darkState = useStoreState((state) => state.site.dark);
  return (
    <Announcemento
      style={{
        background: props.info
          ? darkState
            ? "#141414"
            : "#ffffff"
          : props.alert
          ? "rgb(255, 8, 76)"
          : null,
        border: props.alert
          ? null
          : darkState
          ? "1px solid #292929"
          : "1px solid #cecece",
      }}
    >
      <div className="icon">
        <i
          class="ri-information-fill ri-lg"
          style={{
            color: props.alert
              ? "#ffffff"
              : props.info
              ? darkState
                ? "##177ddc"
                : "#177ddc"
              : null,
          }}
        ></i>
      </div>
      <Text
        strong
        style={{
          color: props.alert
            ? "#ffffff"
            : props.info
            ? darkState
              ? "#ffffff"
              : "#1414114"
            : null,
        }}
      >
        Get Our App at Google Play
      </Text>
      {props.app ? (
        <div className="button">
          <i class="ri-google-play-fill ri-lg" style={{ color: "#3cd581" }}></i>
        </div>
      ) : null}

      <div className={props.app ? "close" : "close ml-auto"}>
        <i
          class="ri-close-line ri-lg"
          style={{
            color: props.alert
              ? "#ffffff"
              : props.info
              ? darkState
                ? "#177ddc"
                : "#177ddc"
              : null,
          }}
        ></i>
      </div>
    </Announcemento>
  );
};

export default Announcement;
