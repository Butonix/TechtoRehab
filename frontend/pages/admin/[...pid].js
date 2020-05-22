import { Layout, PageHeader } from "antd";
import Nav from "components/global/nav";
import Sidebar from "components/global/sidebar";
import Router, { useRouter } from "next/router";
import Announcements from "components/admin/announcements";
import Wrapper from "components/global/wrapper";

const { Content } = Layout;

const Indexo = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <Wrapper>
      <Layout>
        <Nav />
        <Layout>
          <Sidebar id={pid[0]} admin />
          <Layout className="mainLayout">
            <Content className="site-layout">
              <PageHeader
                onBack={() => Router.back()}
                title={pid[0].toUpperCase()}
              />

              {pid[0] == "announcements" && !pid[1] ? (
                <Announcements
                  pid={pid[0] == "announcements" ? pid[0] : null}
                />
              ) : null}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Wrapper>
  );
};

export default Indexo;
