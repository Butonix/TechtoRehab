import { ApolloProvider } from "@apollo/react-hooks";
import { useApollo } from "../lib/apolloClient";
import "public/dark.scss";
import { DefaultSeo } from "next-seo";
import "public/light.scss";
import "public/style.scss";
import { createStore, StoreProvider, useStoreActions } from "easy-peasy";
import "remixicon/fonts/remixicon.css";
import { storage } from "../store/store";

const store = createStore(storage);

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <StoreProvider store={store}>
        <DefaultSeo
          openGraph={{
            type: "website",
            locale: "en_IE",
            url: "https://www.url.ie/",
            site_name: "SiteName",
          }}
          twitter={{
            handle: "@handle",
            site: "@site",
            cardType: "summary_large_image",
          }}
        />
        <Component {...pageProps} />
      </StoreProvider>
    </ApolloProvider>
  );
}
export default MyApp;
