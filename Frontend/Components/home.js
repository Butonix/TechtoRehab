import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 150px calc(99.8% - 150px);
  grid-column-gap: 2px;
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
    padding: 15px 15px;
    .entry-container {
      display: flex;

      .icon {
        box-icon {
          width: 25px;
          height: 25px;
          fill: var(--white);
        }
      }

      .text {
        color: var(--white);
        margin-left: 5px;
        font-weight: 600;
        line-height: 1.8;
        font-size: 14px;
      }
    }

    :hover {
      background-color: var(--white-25);
      cursor: pointer;
    }
  }
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

const Main = styled.main`
  grid-area: feed;
  background: var(--white);
`;

const Carousel = styled.div`
  display: flex;
  box-shadow: inset -4px 0px 4px 0px var(--black-25);
  margin: 0px;
  padding: 4px 5px;
  overflow: hidden;

  :last-child
    {
      margin-right: 7px;
    }

  .carousel-item {
    box-shadow: 0px 0px 2px 0px var(--black-25);
    height: 300px;
    width: 250px;
    display: flex;
    flex-flow: column;
    background-color: white;
    margin: 0px 10px;

    .cover {
      width: 250px;
      height: 150px;
      background-size: cover;
      background-position: center;
      background-image: url('https://img.freepik.com/free-vector/phisiotherapy-situations_23-2147539551.jpg?size=626&ext=jpg');
    }

    .body {
      padding: 10px;
        .title
        {
          font-size: 14px;
          font-weight: 700;
          text-transform: capitalize;
          height: 40px;
          overflow: hidden;
        }

        .summary 
        {
          font-size: 14px;
          margin: 12px 0px;
          overflow: hidden;
          height: 36px;
        }

        .footer 
        {
          display: flex;
          
          .author 
          {
            display: flex;
            .avatar 
            {
              width: 25px;
              height: 25px;
              border-radius: 50%;
              background-size: cover;
              background-position: center;
              background-image: url('https://img.freepik.com/free-vector/profile-icon-male-avatar-hipster-man-wear-headphones_48369-8728.jpg?size=338&ext=jpg');
            }

            .name 
            {
              font-size: 14px;
              margin-left: 10px;
              line-height: 1.9;
            }
          }


          .meta 
          {
          
          display: flex;
          margin-left: auto;
          .likes 
          {
            display: flex;

            .icon 
            {
              margin-top: 2px;
              box-icon 
              {
                height: 20px;
                width: 20px;
                fill: var(--black);
              }
            }

            .text 
            {
              font-size: 14px;
              margin-left: 5px;
              line-height: 1.8;
            }
          }

          .comments 
          {

          }

          }
        }
    }
  }

  .button {
    border-radius: 50%;
    box-shadow: 0px 0px 4px 0px var(--black-25);
    background: white;
    position: absolute;
    cursor: pointer;
    right: 0;
    margin-top: 120px;
    height: 30px;
    width: 30px;
    margin-right: 20px;
    box-shadow: 0px 0px 4px 1px var(--black-25);

    box-icon 
    {
      height: 30px;
      width: 30px;
    }
  }
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
              <box-icon name="home-smile" type="solid"></box-icon>
            </div>

            <h6 className="text">Newsfeed</h6>
          </div>
        </div>

        <div className="sidebar-entry">
          <div className="entry-container">
            <div className="icon">
              <box-icon type="solid" name="book-content"></box-icon>
            </div>

            <h6 className="text">Courses</h6>
          </div>
        </div>

        <div className="sidebar-entry">
          <div className="entry-container">
            <div className="icon">
              <box-icon type="solid" name="bookmark"></box-icon>
            </div>

            <h6 className="text">Saved</h6>
          </div>
        </div>

        <div className="sidebar-entry">
          <div className="entry-container">
            <div className="icon">
              <box-icon name="star" type="solid"></box-icon>
            </div>

            <h6 className="text">Featured</h6>
          </div>
        </div>

        <div className="sidebar-entry">
          <div className="entry-container">
            <div className="icon">
              <box-icon name="hot" type="solid"></box-icon>
            </div>

            <h6 className="text">Hot</h6>
          </div>
        </div>

        <div className="sidebar-entry">
          <div className="entry-container">
            <div className="icon">
              <box-icon name="moon" type="solid"></box-icon>
            </div>

            <h6 className="text">Dark Mode</h6>
          </div>
        </div>

        <div className="sidebar-entry">
          <div className="entry-container">
            <div className="icon">
              <box-icon name="cog" type="solid"></box-icon>
            </div>

            <h6 className="text">Settings</h6>
          </div>
        </div>
      </Sidebar>
      <Main>
        <Carousel>
          <div className="button">
            <box-icon name="chevron-right"></box-icon>
          </div>
          <div className="carousel-item">
            <div className="cover" />
            <div className="body">
              <h6 className="title">
                Learn on how to fix low back pain in under 10 days
              </h6>

              <p className="summary">
                This is a default summary that must be satisfied unless you think you are better
              </p>

              <div className="footer">
                <div className="author">
                  <div className="avatar" />
                  <p className="name">
                    Afzaal Afridi
                  </p>
                </div>
                <div className="meta">
                <div className="likes">
                  <div className="icon">
                  <box-icon name='like' ></box-icon>
                  </div>
                  <p className="text">
                    20
                  </p>
                </div>
                </div>
              </div>
            </div>
          </div>


          <div className="carousel-item">
            <div className="cover" />
            <div className="body">
              <h6 className="title">
                Learn on how to fix low back pain in under 10 days
              </h6>

              <p className="summary">
                This is a default summary that must be satisfied unless you think you are better
              </p>

              <div className="footer">
                <div className="author">
                  <div className="avatar" />
                  <p className="name">
                    Afzaal Afridi
                  </p>
                </div>
                <div className="meta">
                <div className="likes">
                  <div className="icon">
                  <box-icon name='like' ></box-icon>
                  </div>
                  <p className="text">
                    20
                  </p>
                </div>
                </div>
              </div>
            </div>
          </div>


          <div className="carousel-item">
            <div className="cover" />
            <div className="body">
              <h6 className="title">
                Learn on how to fix low back pain in under 10 days
              </h6>

              <p className="summary">
                This is a default summary that must be satisfied unless you think you are better
              </p>

              <div className="footer">
                <div className="author">
                  <div className="avatar" />
                  <p className="name">
                    Afzaal Afridi
                  </p>
                </div>
                <div className="meta">
                <div className="likes">
                  <div className="icon">
                  <box-icon name='like' ></box-icon>
                  </div>
                  <p className="text">
                    20
                  </p>
                </div>
                </div>
              </div>
            </div>
          </div>


          <div className="carousel-item">
            <div className="cover" />
            <div className="body">
              <h6 className="title">
                Learn on how to fix low back pain in under 10 days
              </h6>

              <p className="summary">
                This is a default summary that must be satisfied unless you think you are better
              </p>

              <div className="footer">
                <div className="author">
                  <div className="avatar" />
                  <p className="name">
                    Afzaal Afridi
                  </p>
                </div>
                <div className="meta">
                <div className="likes">
                  <div className="icon">
                  <box-icon name='like' ></box-icon>
                  </div>
                  <p className="text">
                    20
                  </p>
                </div>
                </div>
              </div>
            </div>
          </div>


          <div className="carousel-item">
            <div className="cover" />
            <div className="body">
              <h6 className="title">
                Learn on how to fix low back pain in under 10 days
              </h6>

              <p className="summary">
                This is a default summary that must be satisfied unless you think you are better
              </p>

              <div className="footer">
                <div className="author">
                  <div className="avatar" />
                  <p className="name">
                    Afzaal Afridi
                  </p>
                </div>
                <div className="meta">
                <div className="likes">
                  <div className="icon">
                  <box-icon name='like' ></box-icon>
                  </div>
                  <p className="text">
                    20
                  </p>
                </div>
                </div>
              </div>
            </div>
          </div>
         
        </Carousel>
      </Main>
    </Container>
  );
};

export default Homepage;
