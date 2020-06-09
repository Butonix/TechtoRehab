import { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Dropdown, Button, Menu, Divider, Avatar, Typography } from "antd";
import interact from "interactjs";

const wrapper = (props) => {
  var darkState = useStoreState((state) => state.site.dark);
  var setDark = useStoreActions((actions) => actions.site.setDark);

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
    <Menu onClick={() => {}} className="mr-20 pd-10" style={{ width: 160 }}>
      <Divider className="fs-14 mg-y-10">Create</Divider>

      <Menu.Item
        key="1"
        className="pd-10"
        icon={
          <i class="ri-edit-circle-fill fs-22 va-minus-6 green-gradient"></i>
        }
      >
        <Typography.Text strong>
          <Divider type="vertical" />
          Article
        </Typography.Text>
      </Menu.Item>
      <Menu.Item
        key="2"
        className="pd-10"
        icon={<i class="ri-focus-2-fill fs-22 blue-gradient va-minus-6"></i>}
      >
        <Typography.Text strong>
          <Divider type="vertical" />
          Highlight
        </Typography.Text>
      </Menu.Item>
      <Divider className="fs-14 mg-y-10">More</Divider>
      <Menu.Item
        key="6"
        className="pd-10"
        icon={
          <i
            class={
              darkState
                ? "ri-sun-fill sun-gradient" +
                  " " +
                  "fs-22 va-minus-6 standard-gradient"
                : "ri-moon-fill standard-gradient" + " " + "fs-22 va-minus-6"
            }
          ></i>
        }
        onClick={() => setDark(!darkState)}
      >
        <Typography.Text strong>
          <Divider type="vertical" />
          Go {darkState ? "Light" : "Dark"}
        </Typography.Text>
      </Menu.Item>

      <Menu.Item
        key="4"
        className="pd-10"
        icon={<i class="ri-user-line fs-22 ri-lg va-minus-6"></i>}
      >
        <Typography.Text strong>
          <Divider type="vertical" />
          Profile
        </Typography.Text>
      </Menu.Item>
      <Menu.Item
        key="5"
        className="pd-10"
        icon={<i class="ri-settings-line fs-22 va-minus-6"></i>}
      >
        <Typography.Text strong>
          <Divider type="vertical" />
          Settings
        </Typography.Text>
      </Menu.Item>
    </Menu>
  );

  /**                  */
  /**                  */
  /**                  */
  /**                  */
  /**                  */

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
