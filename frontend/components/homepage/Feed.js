import { useState } from "react";

import {
  Tooltip,
  Avatar,
  Space,
  Skeleton,
  Row,
  Typography,
  Menu,
  Dropdown,
  PageHeader,
  Button,
  List,
} from "antd";
import { UserOutlined, ArrowRightOutlined, ReloadOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

const menu = (
  <Menu onClick={() => {}}>
    <Menu.Item key="1">
      <UserOutlined />
      1st menu item
    </Menu.Item>
    <Menu.Item key="2">
      <UserOutlined />
      2nd menu item
    </Menu.Item>
    <Menu.Item key="3">
      <UserOutlined />
      3rd item
    </Menu.Item>
  </Menu>
);

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([
    {
      href: "http://ant.design",
      title: `My Experience Of Working In A Government Hospital In Pakistan`,
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      description:
        "Ant Design, a design language for background applications, is refined by Ant UED Team.",
      content:
        "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
      cover:
        "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
    },
  ]);
  const onLoad = () => {
    setLoading(true);
    setData(
      data.concat([...new Array(1)].map(() => ({ loading: true, name: {} })))
    );
    var ampData = {
      href: "http://ant.design",
      title: `From Hero To React In Under 30 Days !`,
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      description:
        "Ant Design, a design language for background applications, is refined by Ant UED Team.",
      content:
        "(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
      cover:
        "https://static.vecteezy.com/system/resources/previews/000/158/077/non_2x/kerala-sunset-vector-background.jpg",
    };
    setTimeout(() => {
      setData(data.concat(ampData));
      setLoading(false);
      window.dispatchEvent(new Event("resize"));
    }, 5000);
  };

  const loadMore = !loading ? (
    <div
      style={{
        textAlign: "center",
        marginTop: 12,
        height: 32,
        lineHeight: "32px",
      }}
    >
      <Button type="primary" icon={<ReloadOutlined />} onClick={onLoad}>
        Load More
      </Button>
    </div>
  ) : null;
  return (
    <>
      <PageHeader
        title="News Feed"
        extra={[
          <>
            <span>See More</span> <ArrowRightOutlined />
          </>,
        ]}
      />
      <Row>
        <List
          itemLayout="vertical"
          dataSource={data}
          style={{ margin: "0px 20px" }}
          loadMore={loadMore}
          renderItem={(item) => (
            <List.Item
              key={item.title}
              actions={[
                !item.loading ? (
                  <Space>
                    <Avatar />
                    <span>Afzaal Afridi</span>
                  </Space>
                ) : (
                  <div></div>
                ),
                <Dropdown overlay={menu}>
                  <a onClick={(e) => e.preventDefault()}>
                    <i
                      class="ri-more-2-fill ri-lg"
                      style={{ margin: "2px 0px" }}
                    ></i>
                  </a>
                </Dropdown>,
                <Tooltip title="Bookmark This">
                  <a>
                    <i
                      class="ri-bookmark-line ri-lg"
                      onFocus={(e) => e.preventDefault()}
                    ></i>
                  </a>
                </Tooltip>,
                <Space>
                  <span>2 Min Read</span>
                </Space>,
              ]}
              extra={
                !item.cover ? (
                  <div class="ph-item">
                    <div class="ph-picture"></div>
                  </div>
                ) : (
                  <img width={272} alt="logo" src={item.cover} />
                )
              }
            >
              <Skeleton className="skeleton" loading={item.loading} active>
                <List.Item.Meta
                  title={<a href={item.href}>{item.title}</a>}
                  description={["From Technology"]}
                />
                <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                  {item.content}
                </Paragraph>
              </Skeleton>
            </List.Item>
          )}
        />
      </Row>
    </>
  );
};

export default Feed;
