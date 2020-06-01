import styled from "styled-components";
import {
  Row,
  Col,
  Space,
  Button,
  Input,
  Typography,
  Select,
  Alert,
} from "antd";
import Announcement from "../global/announcement";
import { useState } from "react";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const AnnouncementsHolder = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  border: 1px solid #cecece;
  padding: 10px;
`;

const Announcements = (props) => {
  return (
    <Row justify="center" className="mb-30">
      <AnnouncementsHolder>
        <Announcement info />
      </AnnouncementsHolder>
    </Row>
  );
};

export default Announcements;
