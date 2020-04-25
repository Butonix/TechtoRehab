import Head from "next/head";
import styled from "styled-components";

const AppWrapper = styled.div`
  background-color: #f5f5f5;
  width: 100vw;
  height: 100vh;
  --accent-red: rgba(255, 48, 79, 1);
  --accent-red-50: rgba(255, 48, 79, 0.5);
  --accent-green: rgba(48, 245, 121, 1);
  --accent-green-50: rgba(48, 245, 121, 0.5);
  --accent-blue: rgba(36, 34, 248, 1);
  --accent-blue-50: rgba(36, 34, 248, 0.5);

  h1,
  h2 {
    font-family: "Source Serif Pro", serif;
    color: #000000;
  }

  h3,
  h4,
  h5,
  h6 {
    font-family: "Open Sans", sans-serif;
    color: #000000;
  }

  p,
  div,
  button,
  a {
    padding: 0;
    margin: 0;
    font-family: "Source Sans Pro", sans-serif;
    color: #000000;
  }
`;

const App = (props) => {
  return (
    <>
      <Head>
        <title>Hello World</title>
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800|Source+Sans+Pro:400,600,700|Source+Serif+Pro:400,600,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <AppWrapper>{props.children}</AppWrapper>
    </>
  );
};

export default App;
