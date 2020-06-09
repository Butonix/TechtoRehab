import Document from "next/document";
import { ServerStyleSheet } from "styled-components";
import { Html, Head, Main, NextScript } from "next/document";
import { useStoreState } from "easy-peasy";

export default class MyDocument extends Document {
  state = {
    darko: false,
  };
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html className="dark">
        <Head>
          {/* <link href="https://cdn.jsdelivr.net/npm/remixicon@2.4.0/fonts/remixicon.css" rel="stylesheet" /> */}
          <link
            rel="stylesheet"
            href="https://unpkg.com/placeholder-loading/dist/css/placeholder-loading.min.css"
          />

          <script
            async
            key="amp-story"
            custom-element="amp-story"
            src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
          />
          <script
            async
            key="amp-story"
            custom-element="amp-story"
            src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
          />
          <script
            async
            key="amp-video"
            custom-element="amp-video"
            src="https://cdn.ampproject.org/v0/amp-video-0.1.js"
          />
        </Head>
        <body style={{ margin: 0 }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
