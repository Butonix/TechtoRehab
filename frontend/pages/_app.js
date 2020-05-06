// import { useStoreState } from "easy-peasy";
// import { createStore, StoreProvider } from "easy-peasy";
import "../public/style.scss";
import "../public/light.scss";
import "../public/dark.scss";
// import 'antd/dist/antd.css';
// import "../public/darkMode.scss";
import 'remixicon/fonts/remixicon.css';

export default function MyApp({ Component, pageProps }) {

  // const dark = useStoreState((state) => state.scheme.dark);
  return (
    // <StoreProvider store={store}>
      <Component {...pageProps} />
    // </StoreProvider>
  );
}
