import styled from 'styled-components';
import TruncateMarkup from 'react-truncate-markup';

const HomeContainer = styled.div`
display: flex;
max-width: 1240px;
margin:auto;
background-color: var(--white-25);

.sidebar 
{
    width: 310px;
    background-color: var(--white-50);

}

.feed 
{
    min-width: 550px;
    max-width: 620px;
    background-color: var(--white-75);

}
`

const FeedFeaturedArea = styled.div`
display: flex;
margin: 20px 0px;
`

const Widget = styled.div`

`

const FeedFeatured= styled.div`
width: 300px;
margin: 5px;
box-shadow: 0px 0px 5px 0px var(--black-25);
height: 350px;
border-radius: 0px 0px 4px 4px;
background-color: white;
.cover 
{
    width: 100%;
    height: 200px;
    background-size: cover;
    background-position: center;
    background-image: url('https://i.pinimg.com/736x/da/7c/c3/da7cc366c951480eb1db1160d92f1b1b.jpg');
    border-radius: 4px 4px 0px 0px;
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
display: flex;
background-color: white;
box-shadow: 0px 0px 3px 0px var(--black-25);
width: 99%;
margin-right: 10px;
.cover 
{
    background-size: cover;
    background-position: center;
    background-image: url('https://image.freepik.com/free-vector/colorful-gradient-space-with-rocket-background_52683-7445.jpg');
    width:   160px;
    height:  160px;

}

.body 
{
    margin-right: auto;
    padding: 15px;
    width: 400px;

    .title 
    {
        font-weight: 700;
        margin-bottom: 15px;
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

const Home = () => {

    return(
        <>
            {
                /**
                
                 */
            }

            <HomeContainer>
            <div className="sidebar">
                <Widget>
                    Widget
                </Widget>
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

                <FeedArticle>
                    <div className="body">
                    <TruncateMarkup lines={2}>
                        <h6 className="title"> How to debug javascript and improve the runtime performance </h6>
                        </TruncateMarkup>
                        <TruncateMarkup lines={2}>
                        <p className="excerpt">
                            You will learn how to read and debug console logs and improve on performance bit by bit 
                        </p>
                        </TruncateMarkup>
                        <div className="meta">
                            <p className="author">
                                This is author
                            </p>
                        </div>
                    </div>
                    <div className="cover" />

                </FeedArticle>
            </div>
            <div className="sidebar">
            <Widget>
                    Widget
                </Widget>
            </div>
            </HomeContainer>
        </>
    )
}

export default Home;