import {
  Card,
  Row,
  Badge,
  Col,
  Layout,
  Typography,
  Button,
  Dropdown,
  Space,
  Tabs,
  Tag,
  Menu,
  Divider,
  Select,
} from "antd";
import Wrapper from "components/global/wrapper";
import Nav from "components/global/nav";
import Sidebar from "components/global/sidebar";
import { useRouter } from "next/router";
import Feed from "components/homepage/Feed";

const { Content } = Layout;
const { Text, Paragraph, Title } = Typography;
const { Option } = Select;

const menu2 = (
  <Menu className="pd-10">
    <Menu.Item icon={<i class="ri-notification-off-line fs-16 va-minus-2"></i>}>
      <Text>
        <Divider type="vertical" />
        Unfollow
      </Text>
    </Menu.Item>
  </Menu>
);

const Category = () => {
  const router = useRouter();
  const { cat } = router.query;
  return (
    <Wrapper>
      <Layout>
        <Nav />
        <Layout>
          <Sidebar />
          <Layout className="mainLayout">
            <Content className="site-layout pd-zero">
              <Card
                title={`${cat}`.replace(/-/g, " ").toUpperCase()}
                cover={
                  <img
                    src="https://wallpapercave.com/wp/wp4923979.png"
                    height="250px"
                    className="o-fit-cover"
                  />
                }
                extra={
                  <Badge
                    className="category-status"
                    color="magenta"
                    text={<Text strong>TRENDING</Text>}
                    status="processing"
                  />
                }
              >
                <Row justify="center">
                  <Col>
                    <Button
                      type="text"
                      icon={
                        <i class="ri-notification-3-line ri-lg va-minus-4"></i>
                      }
                    >
                      <Text strong>
                        <Divider type="vertical" />
                        Follow
                      </Text>
                    </Button>
                    <Dropdown overlay={menu2}>
                      <Button
                        type="text"
                        icon={<i class="ri-check-line ri-lg va-minus-4"></i>}
                      >
                        <Text strong>
                          <Divider type="vertical" />
                          Following
                        </Text>
                      </Button>
                    </Dropdown>
                  </Col>
                </Row>
                <Row justify="center" className="mt-10">
                  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Tabs defaultActiveKey="1">
                      <Tabs.TabPane key="1" tab="TOP 10">
                        <Feed />
                      </Tabs.TabPane>
                      <Tabs.TabPane key="2" tab="FEATURED">
                        Pane 1
                      </Tabs.TabPane>
                      <Tabs.TabPane key="3" tab="ALL">
                        Pane 1
                      </Tabs.TabPane>
                    </Tabs>
                  </Col>
                </Row>
                <Row>
                  <Col></Col>
                </Row>
              </Card>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Wrapper>
  );
};

export default Category;
