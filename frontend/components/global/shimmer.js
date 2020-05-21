import { useStoreState } from "easy-peasy";
import Skeleton, { Card, Form } from "@nejcm/react-skeleton";

const Shimmer = (props) => {
  var dark = useStoreState((state) => state.site.dark);
  return props.story ? (
    <Skeleton darkTheme={dark ? true : false} style={{ padding: 20 }}>
      <Skeleton.Rectangle height={500} width="300px" />
    </Skeleton>
  ) : props.editor ? (
    <Skeleton darkTheme={dark ? true : false} style={{ padding: 20 }}>
      <Card paragraph header />
    </Skeleton>
  ) : props.storyEditor ? (
    <Skeleton darkTheme={dark ? true : false} style={{ padding: 20 }}>
      <Form label widths={["100%", 150, "20rem", "100px", "50%"]} />
    </Skeleton>
  ) : props.card ? (
    <Skeleton darkTheme={dark ? true : false} style={{ padding: 20 }}>
      <Card image paragraph header />
    </Skeleton>
  ) : null;
};

export default Shimmer;
