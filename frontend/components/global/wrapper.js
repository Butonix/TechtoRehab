import { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Menu, Divider, Typography, Layout, Drawer } from "antd";
import Navbar from "./nav";
import { useSwipeable, Swipeable } from "react-swipeable";
import Link from "next/link";

const wrapper = (props) => {
  const darkState = useStoreState((state) => state.site.dark);
  const setDark = useStoreActions((actions) => actions.site.setDark);
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
      <Navbar />
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

/** EXTRA STUFF  */

/**                  */
/**                  */
/**                  */
/**                  */
/**  FAB DROP MENU   */
/**                  */
/**                  */
/**                  */
/**                  */
/**                  */
// const menu2 = (
//   <Menu onClick={() => {}} className="mr-20 pd-10" style={{ width: 160 }}>
//     <Divider className="fs-14 mg-y-10">Create</Divider>

//     <Menu.Item
//       key="1"
//       className="pd-10"
//       icon={
//         <i class="ri-edit-circle-fill fs-22 va-minus-6 green-gradient"></i>
//       }
//     >
//       <Typography.Text strong>
//         <Divider type="vertical" />
//         Article
//       </Typography.Text>
//     </Menu.Item>
//     <Menu.Item
//       key="2"
//       className="pd-10"
//       icon={<i class="ri-focus-2-fill fs-22 blue-gradient va-minus-6"></i>}
//     >
//       <Typography.Text strong>
//         <Divider type="vertical" />
//         Highlight
//       </Typography.Text>
//     </Menu.Item>
//     <Divider className="fs-14 mg-y-10">More</Divider>
//     <Menu.Item
//       key="6"
//       className="pd-10"
//       icon={
//         <i
//           class={
//             darkState
//               ? "ri-sun-fill sun-gradient" +
//                 " " +
//                 "fs-22 va-minus-6 standard-gradient"
//               : "ri-moon-fill standard-gradient" + " " + "fs-22 va-minus-6"
//           }
//         ></i>
//       }
//       onClick={() => setDark(!darkState)}
//     >
//       <Typography.Text strong>
//         <Divider type="vertical" />
//         Go {darkState ? "Light" : "Dark"}
//       </Typography.Text>
//     </Menu.Item>

//     <Menu.Item
//       key="4"
//       className="pd-10"
//       icon={<i class="ri-user-line fs-22 ri-lg va-minus-6"></i>}
//     >
//       <Typography.Text strong>
//         <Divider type="vertical" />
//         Profile
//       </Typography.Text>
//     </Menu.Item>
//     <Menu.Item
//       key="5"
//       className="pd-10"
//       icon={<i class="ri-settings-line fs-22 va-minus-6"></i>}
//     >
//       <Typography.Text strong>
//         <Divider type="vertical" />
//         Settings
//       </Typography.Text>
//     </Menu.Item>
//   </Menu>
// );

/**                  */
/**                  */
/**                  */
/**                  */
/**                  */

/**                  */
/**                  */
/**                  */
/**                  */
/** Drag Mobile FAB  */
/**                  */
/**                  */
/**                  */
/**                  */

// const position = { x: 0, y: 0 };
// const slider = interact(".f-a-b");
// slider.draggable({
//   inertia: true,
//   modifiers: [
//     interact.modifiers.restrictRect({
//       restriction: "parent",
//       endOnly: true,
//     }),
//   ],
//   listeners: {
//     start(event) {
//       console.log(event.type, event.target);
//     },
//     move(event) {
//       position.x += event.dx;
//       position.y += event.dy;

//       event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
//     },
//     end(event) {
//       console.log({ x: position.x, y: position.y });
//     },
//   },
// });

/**                  */
/**                  */
/**                  */
/**                  */
/**                  */
