import { Row, Col, Card, Typography, Button, List, Skeleton } from "antd";
import Wrapper from "components/global/wrapper";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const getCategoriesQuery = gql`
  query getCategories {
    category {
      id
      slug
      title
      description
      cover
    }
  }
`;
const { Title, Text } = Typography;
const Categories = () => {
  const { data: getCategoriesData, loading: getCategoriesLoading } = useQuery(
    getCategoriesQuery
  );
  return (
    <Wrapper>
      <Row justify="center" className="mg-y-20">
        <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={16}>
          <Card>
            <Title level={4} className="mt-10 mb-30">
              Categories
            </Title>
            {getCategoriesLoading ? (
              <Skeleton active />
            ) : (
              <List
                grid={{
                  xs: 1,
                  sm: 2,
                  md: 3,
                  lg: 3,
                  xl: 3,
                  xxl: 3,
                }}
                dataSource={getCategoriesData.category}
                renderItem={(item) => (
                  <List.Item className="mr-10">
                    <Card
                      cover={
                        <a href={`/category/${item.slug}`}>
                          <img
                            alt="example"
                            width={300}
                            height={300}
                            src={
                              item.cover ? item.cover : "/image-placeholder.svg"
                            }
                          />
                        </a>
                      }
                    >
                      <Card.Meta
                        title={
                          <a href={`/category/${item.slug}`}>
                            <Text>{item.title}</Text>
                          </a>
                        }
                        description={
                          item.description
                            ? item.description
                            : "This is a default category"
                        }
                      />
                    </Card>
                  </List.Item>
                )}
              />
            )}
          </Card>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default Categories;
