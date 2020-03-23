import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 130px auto;
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
    padding: 10px 25px;
    .entry-container 
    {
      display: flex;

    .icon 
    {
      box-icon 
      {
        width: 16px;
        height: 16px;
        fill: var(--white);
      }
    }

    .text
    {
    color: var(--white);
    font-size: 12px;
    margin-left: 5px;
    font-weight: 600;
    line-height: 1.4;
    }

    }

    :hover 
    {
      background-color: var(--white-25);
      cursor: pointer;
    }
  }
`;


const LogoContainer = styled.div`
margin: 0px auto;
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
      margin-left: 40px;
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
          <LogoContainer>
           <div className="circle" />
           <img src="/Assets/images/Dribbble-Shot-HD.svg" />
           </LogoContainer>

        <div className="sidebar-entry">
          <div className="entry-container">
          <div className="icon">
          <box-icon name='home-smile' type="solid"></box-icon>
          </div>

          <div className="text">
            Newsfeed
          </div>
          </div>
        </div>

        <div className="sidebar-entry">
          <div className="entry-container">
          <div className="icon">
          <box-icon type='solid' name='book-content'></box-icon>
          </div>

          <div className="text">
            Courses
          </div>
          </div>
        </div>

        <div className="sidebar-entry">
          <div className="entry-container">
          <div className="icon">
          <box-icon type='solid' name='bookmark'></box-icon>
          </div>

          <div className="text">
            Saved
          </div>
          </div>
        </div>

        <div className="sidebar-entry">
          <div className="entry-container">
          <div className="icon">
          <box-icon name='star' type="solid"></box-icon>
          </div>

          <div className="text">
            Featured
          </div>
          </div>
        </div>

        <div className="sidebar-entry">
          <div className="entry-container">
          <div className="icon">
          <box-icon name='hot' type='solid'></box-icon>
          </div>

          <div className="text">
            Hot 
          </div>
          </div>
        </div>

        <div className="sidebar-entry">
          <div className="entry-container">
          <div className="icon">
          <box-icon name='moon' type='solid'></box-icon>
          </div>

          <div className="text">
           Dark Mode
          </div>
          </div>
        </div>

        <div className="sidebar-entry">
          <div className="entry-container">
          <div className="icon">
          <box-icon name='cog' type='solid' ></box-icon>
          </div>

          <div className="text">
            Settings
          </div>
          </div>
        </div>
      </Sidebar>
      <Main>Feed</Main>
    </Container>
  );
};

export default Homepage;
