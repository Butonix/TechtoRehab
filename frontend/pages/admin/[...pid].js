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
import GeneralSettings from "components/admin/settings/general";
import ArticleSettings from "components/admin/settings/article";
import CommentSettings from "components/admin/settings/comments";
import UsersSettings from "components/admin/settings/users";
import SecuritySettings from "components/admin/settings/security";

const { Content } = Layout;

const Indexo = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <Wrapper>
      <Layout>
        <Nav />
        <Layout>
          <Sidebar
            id={pid[0] == "articles" ? "posts" : pid[0]}
            id2={pid[1]}
            admin
          />
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
              {!pid[0] == "announcements" ? (
                <Card>
                  {pid[0] == "announcements" && !pid[1] ? (
                    <Announcements />
                  ) : null}
                  {pid[0] == "articles" && !pid[1] ? <Articles /> : null}
                  {pid[0] == "comments" && !pid[1] ? <Comments /> : null}

                  {pid[0] == "reports" && !pid[1] ? <Reports /> : null}

                  {pid[0] == "users" && pid[1] == "view" ? <UsersView /> : null}
                  {pid[0] == "users" && pid[1] == "create" ? (
                    <UsersCreate />
                  ) : null}

                  {pid[0] == "settings" && pid[1] == "general" ? (
                    <GeneralSettings />
                  ) : null}
                  {pid[0] == "settings" && pid[1] == "article" ? (
                    <ArticleSettings />
                  ) : null}
                  {pid[0] == "settings" && pid[1] == "comments" ? (
                    <CommentSettings />
                  ) : null}
                  {pid[0] == "settings" && pid[1] == "users" ? (
                    <UsersSettings />
                  ) : null}
                  {pid[0] == "settings" && pid[1] == "security" ? (
                    <SecuritySettings />
                  ) : null}
                </Card>
              ) : (
                <>
                  {pid[0] == "announcements" && !pid[1] ? (
                    <Announcements />
                  ) : null}
                  {pid[0] == "articles" && !pid[1] ? <Articles /> : null}
                  {pid[0] == "comments" && !pid[1] ? <Comments /> : null}

                  {pid[0] == "reports" && !pid[1] ? <Reports /> : null}

                  {pid[0] == "users" && pid[1] == "view" ? <UsersView /> : null}
                  {pid[0] == "users" && pid[1] == "create" ? (
                    <UsersCreate />
                  ) : null}

                  {pid[0] == "settings" && pid[1] == "general" ? (
                    <GeneralSettings />
                  ) : null}
                  {pid[0] == "settings" && pid[1] == "article" ? (
                    <ArticleSettings />
                  ) : null}
                  {pid[0] == "settings" && pid[1] == "comments" ? (
                    <CommentSettings />
                  ) : null}
                  {pid[0] == "settings" && pid[1] == "users" ? (
                    <UsersSettings />
                  ) : null}
                  {pid[0] == "settings" && pid[1] == "security" ? (
                    <SecuritySettings />
                  ) : null}
                </>
              )}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Wrapper>
  );
};

export default Indexo;
