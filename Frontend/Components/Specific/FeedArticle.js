import styled from "styled-components";
import TruncateMarkup from "react-truncate-markup";
import { Devices } from "../Global/responsive";
import FeaturedStar from "../Global/Props/Featured-Star";

const Feedarticle = styled.div`
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
    border-radius: 0px 3px 3px 0px;

    @media ${Devices.Mobile} {
      width: 130px;
      height: 130px;
    }
  }

  .body {
    margin-right: auto;
    padding: 11px;
    width: 400px;

    @media ${Devices.Mobile} {
      max-width: 250px;
      padding: 8px;
    }

    .title {
      font-weight: 700;
      margin-bottom: 15px;

      @media ${Devices.Mobile} {
        margin-bottom: 13px;
      }
    }

    .excerpt {
      margin-bottom: 15px;

      @media ${Devices.Mobile} {
        margin-bottom: 20px;
        height: 15px;
        overflow: hidden;
      }
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
        line-height: 1.5;
      }
    }
  }
`;

const FeedArticle = () => {
  return (
    <Feedarticle>
      <div className="body">
        <TruncateMarkup lines={2}>
          <h6 className="title">
            {" "}
            How to debug javascript and improve the runtime performance{" "}
          </h6>
        </TruncateMarkup>
        <TruncateMarkup lines={2}>
          <p className="excerpt">
            You will learn how to read and debug console logs and improve on
            performance bit by bit
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
      <div className="cover" />
    </Feedarticle>
  );
};

export default FeedArticle;
