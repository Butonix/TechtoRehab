import { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import Head from "next/head";

const wrapper = (props) => {
  var darkState = useStoreState((state) => state.site.dark);
  var setDark = useStoreActions((actions) => actions.site.setDark);

  useEffect(() => {
    var hotml = document.documentElement;

    // if (window.matchMedia("(prefers-color-scheme)").media) {
    //   if (
    //     window.matchMedia &&
    //     window.matchMedia("(prefers-color-scheme: dark)").matches
    //   ) {
    //     setDark(true);
    //     if (hotml.classList.contains("light")) {
    //       hotml.classList.remove("light");
    //     }
    //     if (hotml.classList.contains("dark")) {
    //       hotml.classList.remove("dark");
    //     }
    //     hotml.classList.add("dark");
    //   }

    //   if (
    //     window.matchMedia &&
    //     window.matchMedia("(prefers-color-scheme: light)").matches
    //   ) {
    //     setDark(false);
    //   }
    // }

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
  });
  return <div>{props.children}</div>;
};

export default wrapper;
