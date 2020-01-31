import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
                })

            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            }
        } finally {
            sheet.seal()
        }
    }

    render() {
        return (
            <Html style={{height: '100%'}}>
                <Head>
                <link href="https://fonts.googleapis.com/css?family=Public+Sans:200,300,400,500,600,700,800,900|Source+Sans+Pro:400,600,700,900|Poppins:400,500,600,700&display=swap" rel="stylesheet" />
                <script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>
                <link href='https://cdn.jsdelivr.net/npm/boxicons@2.0.4/css/boxicons.min.css' rel='stylesheet' />
                <link href='/static/Assets/style.css' rel='stylesheet'></link>
                <link rel="manifest" href="/manifest.json" />
                <style>
                    {`
                   #__next
                    {
                        height: 100%;
                    }
                    `}
                </style>
                </Head>
                <body style={{ margin: '0',backgroundColor: 'white'}}>
                    <Main />
                    <NextScript  />
                </body>
            </Html>
        )
    }
}