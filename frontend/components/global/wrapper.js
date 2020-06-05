import { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Dropdown, Button, Menu, Divider, Avatar } from "antd";
import interact from "interactjs";

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
const menu2 = (
  <Menu onClick={() => {}} className="mr-20 pd-10" style={{ width: 140 }}>
    <Divider> Create</Divider>
    <Menu.Item
      key="1"
      className="pd-10"
      icon={<i class="ri-article-line mr-10 ri-lg"></i>}
    >
      Article
    </Menu.Item>
    <Menu.Item
      key="2"
      className="pd-10"
      icon={<i class="ri-chat-history-fill mr-10 ri-lg"></i>}
    >
      Highlight
    </Menu.Item>
    <Divider> More</Divider>

    <Menu.Item
      key="4"
      className="pd-10"
      icon={<i class="ri-user-line mr-10 ri-lg"></i>}
    >
      Profile
    </Menu.Item>
    <Menu.Item
      key="5"
      className="pd-10"
      icon={<i class="ri-settings-line mr-10 ri-lg"></i>}
    >
      Settings
    </Menu.Item>
  </Menu>
);

/**                  */
/**                  */
/**                  */
/**                  */
/**                  */

const wrapper = (props) => {
  var darkState = useStoreState((state) => state.site.dark);
  var setDark = useStoreActions((actions) => actions.site.setDark);

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

    /**                  */
    /**                  */
    /**                  */
    /**                  */
    /** Drag Mobile FAB  */
    /**                  */
    /**                  */
    /**                  */
    /**                  */

    const position = { x: 0, y: 0 };
    const slider = interact(".f-a-b");
    slider.draggable({
      inertia: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
          endOnly: true,
        }),
      ],
      listeners: {
        start(event) {
          console.log(event.type, event.target);
        },
        move(event) {
          position.x += event.dx;
          position.y += event.dy;

          event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
        },
        end(event) {
          console.log({ x: position.x, y: position.y });
        },
      },
    });

    /**                  */
    /**                  */
    /**                  */
    /**                  */
    /**                  */
  });
  return (
    <div>
      <div className="f-a-b">
        <Dropdown overlay={menu2} placement="topCenter" trigger="click">
          {/* <Button
            type="primary"
            shape="circle"
            style={{ height: 60, width: 60 }}
          >
            <i class="ri-add-line fs-26" style={{ color: "white" }}></i>
          </Button> */}
          <Avatar
            src="https://freelanceglobalgigs.com/wp-content/uploads/2020/04/9-768x435.jpg"
            size={60}
          />
        </Dropdown>
      </div>
      {props.children}
    </div>
  );
};

export default wrapper;
