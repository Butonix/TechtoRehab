import styled from 'styled-components';
import {useStoreState,useStoreActions} from 'easy-peasy';
import {Devices} from '../Global/responsive';



const TopGridContainer = styled.div`
display: flex;
overflow-x: auto;
max-width: 100%;
width: 1500px;
margin: 0px auto;

:hover 
{
    cursor: grab;
}

::-webkit-scrollbar {
    height: 10px;
    background-color: #F5F5F5;
    :hover 
    {
    cursor: pointer;
    }
} 

::-webkit-scrollbar-thumb {
    background-color: #2f89fc;
    border-radius: 10px;
}

::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
    margin-left: 30px;
}

@media ${Devices.Mobile}
{
::-webkit-scrollbar {
  display: none;
}
}
`

const TopGridArticle = styled.div`
max-width: 100%;
width: 350px;
margin: 25px 10px;
box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.75);

:first-child
{
    margin-left: 25px;

    @media ${Devices.Mobile}
    {
    margin-left: 15px;
    }
}

@media ${Devices.Mobile}
{
    margin: 25px 7px;
    width: 330px;
}

.cover 
{
    width: 350px;
    height: 200px;
    max-width: 100%;
    max-height: 100%;
    background-size: cover;
    background-position: center;
    background-image: url("https://image.freepik.com/free-vector/flat-design-earth-space_23-2147928242.jpg");
}

.body 
{
    color: #40514e;
    padding: 15px 10px;
    font-size: 14px;
    background: white;

    .title 
    {
        font-family: 'Public Sans',sans-serif;
        font-size: 16px;
        font-weight: 700;
        text-transform: capitalize;
        line-height: 1.5;
    }

    .excerpt 
    {
        margin: 15px 0px;
        font-family: var(--public-sans);
    }

    .meta 
    {
        display: flex;
        .author 
        {
            text-transform: capitalize;
        }
    }
}

`

const HomeContainer = styled.div`
display: flex;
margin: 15px 0px;
width: 1440px;
max-width: 100%;

@media ${Devices.Mobile}
{
    flex-flow: column;
}

.homeSidebar 
{
    width: 350px;
    position: sticky;
    top: 10px;
    height: 100%;
}

.homeFeed 
{
    width: 100%;
    margin: 0px 25px;
    @media ${Devices.Mobile}
    {
    width: 100%;
    }
}

`

const HomeFeedArticle = styled.div`
display: flex;
padding: 20px;
background: white;
max-width: 700px;
margin-left: 34px;
box-shadow: rgba(0, 0, 0, 0.75) 0px 0px 1px 0px;
.cover 
{
    margin-left: auto;
    background-size: cover;
    background-position: center;
    height: 150px;
    width: 150px;
    background-image: url('https://image.freepik.com/free-vector/hand-drawn-colorful-space-background_52683-12648.jpg');
}

.body 
{
    margin-right: 50px;
    width: 512px;
    max-width: 100%;
    font-size: 16px;

    .title
    {
        font-size: 20px;
        font-weight: 700;
    }

    .excerpt
    {
        overflow: hidden;
        height: 49x;
    }

    .meta
    {
        display: flex;

        .author 
        {

        }
    }
}

`


const HomeComponent = () => {
    
    return(
        <>
    <TopGridContainer>
        <TopGridArticle>
            <div className="cover" />
            
            <div className="body">
                <h2 className="title">
                    This is just an amazing title for this particular usecase scenario
                </h2>
                <p className="excerpt">
                    So, this is just a default palceholder excerpt that would make sense otherwise for this to exist
                </p>
                <div className="meta">
                    <div className="author">
                        Afzaal Afridi
                    </div>
                </div>
            </div>
        </TopGridArticle>

        <TopGridArticle>
            <div className="cover" />
            <div className="body">
                <h2  className="title">
                    This is just an amazing title for this particular usecase scenario
                </h2 >
                <p className="excerpt">
                    So, this is just a default palceholder excerpt that would make sense otherwise for this to exist
                </p>
                <div className="meta">
                    <div className="author">
                        Afzaal Afridi
                    </div>
                </div>
            </div>
        </TopGridArticle>

        <TopGridArticle>
            <div className="cover" />
            <div className="body">
                <h2  className="title">
                    This is just an amazing title for this particular usecase scenario
                </h2>
                <p className="excerpt">
                    So, this is just a default palceholder excerpt that would make sense otherwise for this to exist
                </p>
                <div className="meta">
                    <div className="author">
                        Afzaal Afridi
                    </div>
                </div>
            </div>
        </TopGridArticle>

        <TopGridArticle>
            <div className="cover" />
            <div className="body">
                <h2 className="title">
                    This is just an amazing title for this particular usecase scenario
                </h2>
                <p className="excerpt">
                    So, this is just a default palceholder excerpt that would make sense otherwise for this to exist
                </p>
                <div className="meta">
                    <div className="author">
                        Afzaal Afridi
                    </div>
                </div>
            </div>
        </TopGridArticle>
    </TopGridContainer>

       <HomeContainer>
            <div className="homeFeed">
            <HomeFeedArticle>
            {
                /** */
            }

            <div className="body">
                <h2 className="title">
                The software engineer’s guide to asserting dominance in the workplace
                </h2>

                <p className="excerpt">
                As a software engineer, changing jobs is a way of life. Every day, beautiful recruiters from top tech companies reach out to you on
                </p>
                <div className="meta">
                    <div className="author">
                        Afzaal Afridi
                    </div>
                </div>
            </div>
            <div className="cover" />

            </HomeFeedArticle>
            </div>
            <div className="homeSidebar">
                sidebar
            </div>
        </HomeContainer>
        </>
    );
}

export default HomeComponent;