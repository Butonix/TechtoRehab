import styled from "styled-components";
import { Tooltip } from "antd";

const FeaturedTag = styled.div`
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;
  background-color: #6617cb;
  background-image: linear-gradient(315deg, #6617cb 0%, #cb218e 74%);
  border-radius: 7px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  margin-left: 10px;
  font-size: 26px;
  vertical-align: -4px;
`;

const Featured = () => (
  <Tooltip title="Featured">
    <FeaturedTag>
      <i class="ri-shield-star-fill"></i>
    </FeaturedTag>
  </Tooltip>
);
export default Featured;
