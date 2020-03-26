import styled from "styled-components";


const Nav = styled.nav`


`


const Container = styled.div`
  display: flex;
  margin: 0px auto;
`;


const LogoContainer = styled.div`
  margin: 10px auto;
  margin-bottom: 40px;
  .circle {
    width: 100px;
    height: 100px;
    margin: 10px auto;
    border-radius: 50%;
    background: linear-gradient(269deg, #08aeea, #2af598);
    background-size: 400% 400%;

    -webkit-animation: gradientAnime 4s ease infinite;
    -moz-animation: gradientAnime 4s ease infinite;
    animation: gradientAnime 6s ease infinite;

    @-webkit-keyframes gradientAnime {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 51%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    @-moz-keyframes gradientAnime {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 51%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    @keyframes gradientAnime {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 51%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  }

  img {
    position: absolute;
    z-index: 2;
    width: 80px;
    margin: 0px 0px;
    margin-top: 21px;
    margin-bottom: 90px;
    margin-right: 0px;
    margin-left: 35px;
    top: 0;
  }
`;


const Homepage = () => {
  return (
    <Container>
      
    </Container>
  );
};

export default Homepage;
