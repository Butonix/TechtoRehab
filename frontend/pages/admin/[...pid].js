import { Layout, PageHeader, Card } from "antd";
import Nav from "components/global/nav";
import Sidebar from "components/global/sidebar";
import Router, { useRouter } from "next/router";
import Announcements from "components/admin/announcements";
import Articles from "components/admin/articles";
import Wrapper from "components/global/wrapper";
import Comments from "components/admin/comments";
import Reports from "components/admin/reports";
import UsersView from "components/admin/users/view";
import UsersCreate from "components/admin/users/create";

const { Content } = Layout;

const Indexo = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <Wrapper>
      <Layout>
        <Nav />
        <Layout>
          <Sidebar id={pid[0]} id2={pid[1]} admin />
          <Layout className="mainLayout">
            <Content className="site-layout">
              <PageHeader
                onBack={() => Router.back()}
                title={
                  pid[1]
                    ? pid[1].toUpperCase() + "" + " " + pid[0].toUpperCase()
                    : "" + " " + pid[0].toUpperCase()
                }
              />
              <Card>
                {pid[0] == "announcements" && !pid[1] ? (
                  <Announcements
                    pid={pid[0] == "announcements" ? pid[0] : null}
                  />
                ) : null}
                {pid[0] == "articles" && !pid[1] ? (
                  <Articles pid={pid[0] == "articles" ? pid[0] : null} />
                ) : null}
                {pid[0] == "comments" && !pid[1] ? (
                  <Comments pid={pid[0] == "comments" ? pid[0] : null} />
                ) : null}

                {pid[0] == "reports" && !pid[1] ? (
                  <Reports pid={pid[0] == "reports" ? pid[0] : null} />
                ) : null}

                {pid[0] == "users" && pid[1] == "view" ? (
                  <UsersView
                    pid={pid[0] == "users" ? pid[0] : null}
                    pid1={pid[1] == "view" ? pid[1] : null}
                  />
                ) : null}
                {pid[0] == "users" && pid[1] == "create" ? (
                  <UsersCreate
                    pid={pid[0] == "users" ? pid[0] : null}
                    pid1={pid[1] == "view" ? pid[1] : null}
                  />
                ) : null}
              </Card>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Wrapper>
  );
};

export default Indexo;
