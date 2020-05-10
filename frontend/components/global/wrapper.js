import { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

const wrapper = (props) => {
  var darkState = useStoreState((state) => state.site.dark);
  var setDark = useStoreActions((actions) => actions.site.setDark);

//   useEffect(() => {
//     if (
//       window.matchMedia &&
//       window.matchMedia("(prefers-color-scheme: dark)").matches
//     ) {
//     //   setDark(true);
//     } else if (
//       window.matchMedia &&
//       window.matchMedia("(prefers-color-scheme: light)").matches
//     ) {
//     //   setDark(false);
//     }

//     window
//       .matchMedia("(prefers-color-scheme: dark)")
//       .addEventListener("change", () => {
//         if (
//           window.matchMedia &&
//           window.matchMedia("(prefers-color-scheme: dark)").matches
//         ) {
//         //   setDark(true);
//         } else if (
//           window.matchMedia &&
//           window.matchMedia("(prefers-color-scheme: light)").matches
//         ) {
//         //   setDark(false);
//         }
//       });
//   });

  return <div className={darkState ? "dark" : "light"}>{props.children}</div>;
};

export default wrapper;
