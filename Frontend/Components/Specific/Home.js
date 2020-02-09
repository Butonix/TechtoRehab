import styled from "styled-components";
import TruncateMarkup from "react-truncate-markup";
import { Devices } from "../Global/responsive";
import FeaturedStar from "../Global/Props/Featured-Star";
import FeedArticle from "./FeedArticle";
import FeaturedArticle from "./FeaturedArticle";

const HomeContainer = styled.div`
  display: flex;
  max-width: 1240px;
  margin: auto;

  .sidebar {
    width: 290px;
    position: sticky;
    top: 0px;
    height: 100%;
  }

  .sidebar1 {
    @media ${Devices.Mobile} {
      display: none;
    }
  }

  .sidebar2 {
    @media ${Devices.Mobile}, ${Devices.iPad} {
      display: none;
    }
  }

  .feed {
    min-width: 550px;
    max-width: 620px;

    @media ${Devices.Mobile} {
      max-width: 100%;
      min-width: unset;
      margin: auto;
    }
  }
`;

const FeedFeaturedArea = styled.div`
  display: flex;
  margin: 10px 0px;

  @media ${Devices.Mobile} {
    overflow-x: scroll;
  }
`;

const Widget = styled.div`
  background-color: white;
  margin: 10px 10px;
  padding: 15px;
  .title {
    font-weight: 700;
    margin-bottom: 10px;
  }

  .body {
    height: 300px;
  }
`;

const Home = () => {
  return (
    <>
      {/**
                
                 */}

      <HomeContainer>
        <div className="sidebar sidebar1">
          <Widget>
            <h6 className="title">choose your categories</h6>
            <div className="body">
              tis is body
            </div>
          </Widget>
        </div>
        <div className="feed">
          <FeedFeaturedArea>
            <FeaturedArticle />
            <FeaturedArticle />
          </FeedFeaturedArea>
          <FeedArticle />
          <FeedArticle />
          <FeedArticle />
          <FeedArticle />
        </div>
        <div className="sidebar sidebar2">
          <Widget>
            <h6 className="title">this is a title</h6>
          </Widget>
        </div>
      </HomeContainer>
    </>
  );
};

export default Home;
