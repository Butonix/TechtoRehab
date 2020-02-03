import styled from 'styled-components';
import TruncateMarkup from 'react-truncate-markup';

const HomeContainer = styled.div`
display: flex;
max-width: 1250px;
min-width: 350px;
margin:auto;

.sidebar 
{
    min-width: 200px;
}

.feed 
{
    min-width: 550px;
    max-width: 100%;
}
`

const FeedFeaturedArea = styled.div`
display: flex;
`

const FeedFeatured= styled.div`
width: 300px;
margin: 5px;
box-shadow: 0px 0px 1px 1px var(--black-25);
height: 350px;
.cover 
{
    width: 100%;
    height: 200px;
    background-size: cover;
    background-position: center;
    background-image: url('https://i.pinimg.com/736x/da/7c/c3/da7cc366c951480eb1db1160d92f1b1b.jpg');
}

.body 
{    
    padding: 10px;

    .title 
    {
        margin-bottom: 15px;
        font-weight: 700;
        
    }

    .excerpt 
    {
        margin-bottom: 10px;        
    }

    .meta 
    {
        .author 
        {

        }
    }
}
`

const FeedArticle = styled.div`

`

const Home = () => {

    return(
        <>
            {
                /**
                
                 */
            }

            <HomeContainer>
            <div className="sidebar">
                Sidebar 1
            </div>
            <div className="feed">
                <FeedFeaturedArea>
                    <FeedFeatured>
                        <div className="cover" />
                        <div className="body">
                        <TruncateMarkup lines={2}>

                            <h6 className="title">
                                Going from Zero to React In Just a Matter Of Days
                            </h6>
                            </TruncateMarkup>
                            <TruncateMarkup lines={2}>

                            <p className="excerpt">
                                This is a cool excerpt that i expect you to look at in the future when you have time 
                            </p>
                            </TruncateMarkup>
                            <div className="meta">
                                <p className="author">
                                    Afzaal Afridi
                                </p>
                            </div>
                        </div>
                    </FeedFeatured>

                    <FeedFeatured>
                        <div className="cover" />
                        <div className="body">
                        <TruncateMarkup lines={2}>
                            <h6 className="title">
                                How To Develop A Website In PHP With Security and Best Practices and Not Violate Security
                            </h6>
                            </TruncateMarkup>
                            <TruncateMarkup lines={2}>

                            <p className="excerpt">
                            This is a cool excerpt that i expect you to look at in the future when you have time 
                            </p>
                            </TruncateMarkup>

                            <div className="meta">
                                <p className="author">
                                    Afzaal Afridi
                                </p>
                            </div>
                        </div>
                    </FeedFeatured>
                </FeedFeaturedArea>


            </div>
            <div className="sidebar">
                Sidebar 2
            </div>
            </HomeContainer>
        </>
    )
}

export default Home;