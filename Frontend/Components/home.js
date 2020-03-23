import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 125px auto;
  grid-column-gap: 0px;
  margin: auto;
  grid-template-areas: "sidebar feed";
`;

const Sidebar = styled.aside`
  grid-area: sidebar;
  background-color: var(--black);
  height: 100vh;
  .sidebar-entry {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
`;


const LogoContainer = styled.div`

.circle 
{
  width: 60px;
  height: 60px;
  margin: 10px auto;
  border-radius: 50%;
  background: linear-gradient(269deg, #08aeea, #2af598);
background-size: 400% 400%;

-webkit-animation: gradientAnime 4s ease infinite;
-moz-animation: gradientAnime 4s ease infinite;
animation: gradientAnime 4s ease infinite;

@-webkit-keyframes gradientAnime {
    0%{background-position:0% 50%}
    50%{background-position:100% 51%}
    100%{background-position:0% 50%}
}
@-moz-keyframes gradientAnime {
    0%{background-position:0% 50%}
    50%{background-position:100% 51%}
    100%{background-position:0% 50%}
}
@keyframes gradientAnime {
    0%{background-position:0% 50%}
    50%{background-position:100% 51%}
    100%{background-position:0% 50%}
}
}


img 
    {
      position: relative;
      z-index: 2;
      width: 50px;
      margin: 0px 0px;
      margin-top: -90px;
      margin-bottom: 30px;
      margin-right: 0px;
      margin-left: 5px;
    }
`

const Main = styled.main`
  grid-area: feed;
  background: var(--white);
`;

const Homepage = () => {
  return (
    <Container>
      <Sidebar>
        <div className="sidebar-entry">
          <LogoContainer>
           <div className="circle" />
           <img src="/Assets/images/Dribbble-Shot-HD.svg" />
           </LogoContainer>
        </div>
      </Sidebar>
      <Main>Feed</Main>
    </Container>
  );
};

export default Homepage;
