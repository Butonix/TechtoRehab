import { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Menu, Divider, Typography, Layout, Drawer } from "antd";
import Navbar from "./nav";
import { useSwipeable, Swipeable } from "react-swipeable";
import Link from "next/link";
import withSession from "lib/session";

const wrapper = (props) => {
  const darkState = useStoreState((state) => state.site.dark);
  const setDark = useStoreActions((actions) => actions.site.setDark);
  const setAuth = useStoreActions((actions) => actions.site.setAuth);
  const sidebar = useStoreState((state) => state.site.sidebar);
  const setSidebar = useStoreActions((actions) => actions.site.setSidebar);

  useEffect(() => {
    /** Get html */
    var hotml = document.documentElement;

    /**                  */
    /**                  */
    /**                  */
    /** DARK MODE TOGGLE */
    /**                  */
    /**                  */
    /**                  */
    /**                  */

    var mql = window.matchMedia("(prefers-color-scheme: dark)");
    mql.addEventListener("change", () => {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setDark(true);
      }

      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches
      ) {
        setDark(false);
      }
    });

    if (darkState) {
      if (hotml.classList.contains("light")) {
        hotml.classList.remove("light");
      }
      if (hotml.classList.contains("dark")) {
        hotml.classList.remove("dark");
      }
      hotml.classList.add("dark");
    } else {
      if (hotml.classList.contains("dark")) {
        hotml.classList.remove("dark");
      }
      hotml.classList.add("light");
    }

    // var cont = document.getElementsByClassName("mainLayout")[0];
    // var listener = SwipeListener(cont);
    // cont.addEventListener("swipe", function (e) {
    //   var directions = e.detail.directions;
    //   var x = e.detail.x;
    //   var y = e.detail.y;
    //   if (directions.right) {
    //     settingSide;
    //   }
    // });
  });

  const { Content } = Layout;

  return (
    <Layout>
      <Navbar user={props.user} />
      <Layout>
        <Drawer
          placement="left"
          visible={sidebar}
          closable={false}
          onClose={() => setSidebar(false)}
          bodyStyle={{ padding: 0 }}
        >
          {props.admin ? (
            <Menu
              theme="light"
              className="mt-20"
              defaultSelectedKeys={props.route ? `${props.route}` : ["home"]}
              style={{
                position: "sticky",
                height: "100vh",
                top: 10,
                borderRight: 0,
              }}
            >
              <Menu.Item
                key="home"
                icon={
                  <i
                    class="ri-dashboard-2-line ri-lg va-minus-4 mr-10"
                    style={{ color: "inherit" }}
                  ></i>
                }
              >
                <Link href="/admin">
                  <a>Dashboard</a>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="articles"
                icon={
                  <i
                    class="ri-book-open-line ri-lg va-minus-4 mr-10"
                    style={{ color: "inherit" }}
                  ></i>
                }
              >
                <Link href="/admin/articles">
                  <a>Articles</a>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="users"
                icon={
                  <i
                    class="ri-user-smile-line ri-lg va-minus-4 mr-10"
                    style={{ color: "inherit" }}
                  ></i>
                }
              >
                <Link href="/admin/users">
                  <a>Users</a>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="comments"
                icon={
                  <i
                    class="ri-question-answer-line ri-lg va-minus-4 mr-10"
                    style={{ color: "inherit" }}
                  ></i>
                }
              >
                <Link href="/admin/comments">
                  <a>Comments</a>
                </Link>
              </Menu.Item>
            </Menu>
          ) : null}
        </Drawer>

        <Layout className="mainLayout">
          <Content className="site-layout">
            <Swipeable onSwipedRight={(eventData) => setSidebar(true)}>
              {props.children}
            </Swipeable>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default wrapper;
