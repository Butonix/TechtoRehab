import styled from "styled-components";
import { Tooltip } from "antd";
const Editors = styled.div`
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;
  display: flex;
  font-weight: bold;
  margin-left: 10px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-color: #f9484a;
  background-image: linear-gradient(315deg, #f9484a 0%, #fbd72b 74%);
  font-size: 26px;
`;

const EditorsPick = () => {
  return (
    <Tooltip title="Editor's Choice">
      <Editors>
        <i class="ri-quill-pen-fill"></i>
      </Editors>
    </Tooltip>
  );
};

export default EditorsPick;
