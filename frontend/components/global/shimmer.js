import styled from "styled-components";
import { useStoreState } from "easy-peasy";
import ContentLoader, { Instagram } from "react-content-loader";

const Shimmer = (props) => {
  var dark = useStoreState((state) => state.site.dark);
  return props.story ? (
    <ContentLoader
      uniqueKey="my-random-valye"
      animate={true}
      backgroundColor={dark ? "#272727" : "#F3F3F3"}
      foregroundColor={dark ? "#111111" : "#ECEBEB"}
      style={{ height: 500, width: 400 }}
    >
      <rect x="23" y="5" rx="0" ry="0" width="70%" height="500" />
      {/* <rect x="24" y="500" rx="0" ry="0" width="70%" height="11" />
      <rect x="24" y="480" rx="0" ry="0" width="50%" height="11" />
      <rect x="24" y="420" rx="0" ry="0" width="55" height="50" /> */}
    </ContentLoader>
  ) : props.editor ? (
    <ContentLoader
      uniqueKey="my-random-valye"
      animate={true}
      backgroundColor={dark ? "#272727" : "#F3F3F3"}
      foregroundColor={dark ? "#111111" : "#ECEBEB"}
      style={{ height: "400px", width: "100%" }}
    >
      <rect x="10" y="56" rx="0" ry="0" width="100%" height="500" />
      <rect x="10" y="19" rx="0" ry="0" width="287" height="22" />
    </ContentLoader>
  ) : props.storyEditor ? (
    <ContentLoader
      uniqueKey="my-random-valye"
      animate={true}
      backgroundColor={dark ? "#272727" : "#F3F3F3"}
      foregroundColor={dark ? "#111111" : "#ECEBEB"}
      style={{ height: "400px", width: "100%", margin: "auto" }}
    >
      <rect x="116" y="4" rx="0" ry="0" width="200" height="400" />
    </ContentLoader>
  ) : props.card ? (
    <ContentLoader
      uniqueKey="my-random-valye"
      animate={true}
      backgroundColor={dark ? "#272727" : "#F3F3F3"}
      foregroundColor={dark ? "#111111" : "#ECEBEB"}
      style={{ height: 300, width: 400 }}
    >
      <rect x="23" y="5" rx="0" ry="0" width="100%" height="300" />
      {/* <rect x="24" y="500" rx="0" ry="0" width="70%" height="11" />
      <rect x="24" y="480" rx="0" ry="0" width="50%" height="11" />
      <rect x="24" y="420" rx="0" ry="0" width="55" height="50" /> */}
    </ContentLoader>
  ) : null;
};

export default Shimmer;
