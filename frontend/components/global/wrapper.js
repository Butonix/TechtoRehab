import { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import Head from "next/head";

const wrapper = (props) => {
  var darkState = useStoreState((state) => state.site.dark);
  var setDark = useStoreActions((actions) => actions.site.setDark);

  useEffect(() => {
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
  });

  return (
    <div>
      {/* <Head>
        {darkState ? (
          <link rel="stylesheet" href="/dark.css" />
        ) : (
          <link rel="stylesheet" href="/light.css" />
        )}
        <title>{darkState ? "dark" : "light"}</title>
      </Head> */}
      {props.children}
    </div>
  );
};

export default wrapper;
