import { withApollo } from "lib/apollo";
import "public/light.scss";
import "public/dark.scss";
import "public/style.scss";
import { createStore, StoreProvider, useStoreActions } from "easy-peasy";
import "remixicon/fonts/remixicon.css";
import { storage } from "../store/store";

const store = createStore(storage);

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider store={store}>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
export default withApollo({ ssr: true })(MyApp);
