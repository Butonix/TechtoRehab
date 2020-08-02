import { ApolloProvider } from "@apollo/client";
import { useApollo } from "lib/apolloClient";
import { DefaultSeo } from "next-seo";
import { storage } from "../store/store";
import { createStore, StoreProvider } from "easy-peasy";
// import "public/light.scss";
import "antd/dist/antd.min.css";
import "public/style.scss";
import "remixicon/fonts/remixicon.css";
// import "public/dark.scss";
import "../public/blur.css";

const store = createStore(storage);

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <StoreProvider store={store}>
        <DefaultSeo
          title="Tech To Rehab"
          description="The Open Source Collaboration Platform"
          openGraph={{
            type: "website",
            locale: "en_IE",
            url: "https://techtorehab.com",
            site_name: "Tech To Rehab",
          }}
          canonical="https://techtorehab.com"
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
