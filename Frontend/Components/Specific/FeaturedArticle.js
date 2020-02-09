import styled from "styled-components";
import TruncateMarkup from "react-truncate-markup";
import { Devices } from "../Global/responsive";
import FeaturedStar from "../Global/Props/Featured-Star";

const FeedFeatured = styled.div`
  width: 300px;
  margin: 5px;
  box-shadow: 0px 0px 3px 0px var(--black-25);
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

  .body {
    padding: 10px;

    .title {
      margin-bottom: 10px;
      font-weight: 700;
    }

    .excerpt {
      margin-bottom: 10px;
    }

    .meta {
      display: flex;
      font-weight: 600;

      .reads {
        display: flex;

        .text {
        }

        .icon {
          margin-right: 5px;
          box-icon {
            margin-top: -2px;
            height: 22px;
            width: 22px;
            fill: var(--blue);

            @media ${Devices.Mobile} {
              width: 20px;
              height: 20px;
            }
          }
        }
      }
      .author {
        margin-left: auto;
        line-height: 1.3;
      }
    }
  }
`;

const FeaturedArticle = () => {
  return (
    <FeedFeatured>
      <div className="cover" />
      <FeaturedStar />
      <div className="body">
        <TruncateMarkup lines={2}>
          <h6 className="title">
            Going from Zero to React In Just a Matter Of Days
          </h6>
        </TruncateMarkup>
        <TruncateMarkup lines={2}>
          <p className="excerpt">
            This is a cool excerpt that i expect you to look at in the future
            when you have time
          </p>
        </TruncateMarkup>
        <div className="meta">
          <div className="reads">
            <div className="icon">
              <box-icon name="glasses"></box-icon>
            </div>
            <p className="text">20 Reads</p>
          </div>
          <p className="author">Afzaal Afridi</p>
        </div>
      </div>
    </FeedFeatured>
  );
};

export default FeaturedArticle;
