import { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Menu, Divider, Typography, Layout } from "antd";
import Navbar from "./nav";
import { useSwipeable, Swipeable } from "react-swipeable";

// import interact from "interactjs";

const wrapper = (props) => {
  const darkState = useStoreState((state) => state.site.dark);
  const setDark = useStoreActions((actions) => actions.site.setDark);
  const sidebar = useStoreState((state) => state.site.sidebar);
  const setSidebar = useStoreActions((actions) => actions.site.setSidebar);
  var handlers = useSwipeable({
    onSwipedRight: () => console.log("swiped"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });
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

  const { Content, Sider } = Layout;

  return (
    <Layout>
      <Navbar />
      <Layout>
        <Sider
          collapsed={sidebar}
          collapsedWidth={0}
          width={200}
          style={{
            zIndex: 1,
            height: "100vh",
            position: "sticky",
            top: "0px",
          }}
          theme="light"
        >
          <Menu style={{ height: "100vh" }}>
            <Menu.Item>Item</Menu.Item>
          </Menu>
        </Sider>
        <Layout className="mainLayout">
          <Content className="site-layout">
            <Swipeable
              onSwipedLeft={(eventData) => setSidebar(true)}
              onSwipedRight={sidebar ? (eventData) => setSidebar(false) : null}
            >
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
