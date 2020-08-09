import styled from "styled-components";
import { Tooltip } from "antd";

const FeedTag = styled.div`
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;
  background-color: #ff4e00;
  background-image: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%);
  border-radius: 7px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  margin-left: 10px;
  font-size: 26px;
  vertical-align: -4px;
`;

const Feed = (props) => (
  <Tooltip title="Feed">
    <FeedTag style={props.style}>
      <i class="ri-list-check-2"></i>
    </FeedTag>
  </Tooltip>
);
export default Feed;
