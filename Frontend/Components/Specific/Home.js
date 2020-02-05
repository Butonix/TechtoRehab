import styled from "styled-components";
import TruncateMarkup from "react-truncate-markup";
import { Devices } from "../Global/responsive";

const HomeContainer = styled.div`
  display: flex;
  max-width: 1240px;
  margin: auto;

  .sidebar {
    width: 310px;
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

const Widget = styled.div``;

const FeedFeatured = styled.div`
  width: 300px;
  margin: 5px;
  box-shadow: 0px 0px 3px 0px var(--black-25);
  height: 350px;
  border-radius: 0px 0px 4px 4px;
  background-color: white;

  @media ${Devices.Mobile} {
    min-width: 270px;
    :first-child {
      margin-left: 10px;
    }
  }
  .cover {
    width: 100%;
    height: 200px;
    background-size: cover;
    background-position: center;
    background-image: url("https://static.vecteezy.com/system/resources/previews/000/118/906/non_2x/free-space-vector-illustration.png");
    border-radius: 4px 4px 0px 0px;
  }

  .featured-holder {
    position: absolute;
    margin-left: 30px;
    margin-top: -25px;

    svg 
    {
        height: 30px;
        width: 30px;
    }
  }

  .featured-star 
  {
    border-radius: 50%;
    background-image: linear-gradient( 135deg, #F6D242 10%, #FF52E5 100%);    
    width: 24px;
    height: 24px;
    position: absolute;
    margin-top: -15px;
    margin-left: 33px;
    box-icon 
    {
        fill: white;
        height: 16px;
        width: 16px;
        margin: 3px 4px;
        stroke-width: 2px;
    }
  }

  .body {
    padding: 10px;

    .title {
      margin-bottom: 15px;
      font-weight: 700;
    }

    .excerpt {
      margin-bottom: 10px;
    }

    .meta {
      .author {
      }
    }
  }
`;

const FeedArticle = styled.div`
  display: flex;
  background-color: white;
  box-shadow: 0px 0px 3px 0px var(--black-25);
  width: 99%;
  margin: 20px 0px;
  margin-right: 10px;

  @media ${Devices.Mobile} {
    margin: 20px auto;
    max-width: 98%;
  }
  .cover {
    background-size: cover;
    background-position: center;
    background-image: url("https://image.freepik.com/free-vector/colorful-gradient-space-with-rocket-background_52683-7445.jpg");
    width: 160px;
    height: 160px;

    @media ${Devices.Mobile} {
      width: 140px;
      height: 140px;
    }
  }

  .body {
    margin-right: auto;
    padding: 15px;
    width: 400px;

    @media ${Devices.Mobile} {
      max-width: 250px;
      padding: 10px;
    }

    .title {
      font-weight: 700;
      margin-bottom: 15px;

      @media ${Devices.Mobile} {
        margin-bottom: 10px;
      }
    }

    .excerpt {
      margin-bottom: 10px;
    }

    .meta {
      .author {
      }
    }
  }
`;

const Home = () => {
  return (
    <>
      {/**
                
                 */}

      <HomeContainer>
        <div className="sidebar sidebar1">
          <Widget>Widget</Widget>
        </div>
        <div className="feed">
          <FeedFeaturedArea>
            <FeedFeatured>
              <div className="cover" />
              <div className="featured-holder">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 1000 437"
                >
                  <path
                    fill="#FFFFFF"
                    stroke="none"
                    d="M0 493.5C0 220.947 223.858 0 500 0s500 220.947 500 493.5C1000 766.052 776.142 987 500 987S0 766.052 0 493.5z"
                  ></path>
                </svg>
              </div>

              <div className="featured-star">
              <box-icon type='solid' name='star'></box-icon>
              </div>
              <div className="body">
                <TruncateMarkup lines={2}>
                  <h6 className="title">
                    Going from Zero to React In Just a Matter Of Days
                  </h6>
                </TruncateMarkup>
                <TruncateMarkup lines={2}>
                  <p className="excerpt">
                    This is a cool excerpt that i expect you to look at in the
                    future when you have time
                  </p>
                </TruncateMarkup>
                <div className="meta">
                  <p className="author">Afzaal Afridi</p>
                </div>
              </div>
            </FeedFeatured>

            <FeedFeatured>
              <div className="cover" />
              <div className="body">
                <TruncateMarkup lines={2}>
                  <h6 className="title">
                    How To Develop A Website In PHP With Security and Best
                    Practices and Not Violate Security
                  </h6>
                </TruncateMarkup>
                <TruncateMarkup lines={2}>
                  <p className="excerpt">
                    This is a cool excerpt that i expect you to look at in the
                    future when you have time
                  </p>
                </TruncateMarkup>

                <div className="meta">
                  <p className="author">Afzaal Afridi</p>
                </div>
              </div>
            </FeedFeatured>
          </FeedFeaturedArea>

          <FeedArticle>
            <div className="body">
              <TruncateMarkup lines={2}>
                <h6 className="title">
                  {" "}
                  How to debug javascript and improve the runtime performance{" "}
                </h6>
              </TruncateMarkup>
              <TruncateMarkup lines={2}>
                <p className="excerpt">
                  You will learn how to read and debug console logs and improve
                  on performance bit by bit
                </p>
              </TruncateMarkup>
              <div className="meta">
                <p className="author">This is author</p>
              </div>
            </div>
            <div className="cover" />
          </FeedArticle>

          <FeedArticle>
            <div className="body">
              <TruncateMarkup lines={2}>
                <h6 className="title">
                  {" "}
                  How to debug javascript and improve the runtime performance{" "}
                </h6>
              </TruncateMarkup>
              <TruncateMarkup lines={2}>
                <p className="excerpt">
                  You will learn how to read and debug console logs and improve
                  on performance bit by bit
                </p>
              </TruncateMarkup>
              <div className="meta">
                <p className="author">This is author</p>
              </div>
            </div>
            <div className="cover" />
          </FeedArticle>

          <FeedArticle>
            <div className="body">
              <TruncateMarkup lines={2}>
                <h6 className="title">
                  {" "}
                  How to debug javascript and improve the runtime performance{" "}
                </h6>
              </TruncateMarkup>
              <TruncateMarkup lines={2}>
                <p className="excerpt">
                  You will learn how to read and debug console logs and improve
                  on performance bit by bit
                </p>
              </TruncateMarkup>
              <div className="meta">
                <p className="author">This is author</p>
              </div>
            </div>
            <div className="cover" />
          </FeedArticle>

          <FeedArticle>
            <div className="body">
              <TruncateMarkup lines={2}>
                <h6 className="title">
                  {" "}
                  How to debug javascript and improve the runtime performance{" "}
                </h6>
              </TruncateMarkup>
              <TruncateMarkup lines={2}>
                <p className="excerpt">
                  You will learn how to read and debug console logs and improve
                  on performance bit by bit
                </p>
              </TruncateMarkup>
              <div className="meta">
                <p className="author">This is author</p>
              </div>
            </div>
            <div className="cover" />
          </FeedArticle>

          <FeedArticle>
            <div className="body">
              <TruncateMarkup lines={2}>
                <h6 className="title">
                  {" "}
                  How to debug javascript and improve the runtime performance{" "}
                </h6>
              </TruncateMarkup>
              <TruncateMarkup lines={2}>
                <p className="excerpt">
                  You will learn how to read and debug console logs and improve
                  on performance bit by bit
                </p>
              </TruncateMarkup>
              <div className="meta">
                <p className="author">This is author</p>
              </div>
            </div>
            <div className="cover" />
          </FeedArticle>
        </div>
        <div className="sidebar sidebar2">
          <Widget>Widget</Widget>
        </div>
      </HomeContainer>
    </>
  );
};

export default Home;
