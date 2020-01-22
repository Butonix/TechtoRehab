import styled from 'styled-components';
import {useStoreState,useStoreActions} from 'easy-peasy';
import {Devices} from '../Global/responsive';

const Home = styled.div`
width: 1500px;
max-width: 100%;
`

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
margin: 15px auto;
width: 1000px;
max-width: 100%;

@media ${Devices.Mobile}
{
    flex-flow: column;
}

.homeSidebar 
{
    width: 50%;
    position: sticky;
    top: 10px;
    height: 100%;
}

.homeFeed 
{
    width: 50%;
    @media ${Devices.Mobile}
    {
    width: 100%;
    }
}

`

const HomeFeedArticle = styled.div`
display: flex;
flex-flow: column;
background-color: white;
margin: 40px 0px;
max-width: 400px;
@media ${Devices.Mobile}
    {
        flex-flow: column-reverse;
    }

.cover 
{
    background-position: center;
    background-size: cover;
    width: calc(100% - 0.1%);
    height: 250px;
    background-image: url('https://img.freepik.com/free-vector/hand-drawn-colorful-space-background_52683-12645.jpg?size=626&ext=jpg');

    @media ${Devices.Mobile}
    {
        margin: none;
        width: 200px;
        height: 200px;
    }
}

.body
{
    display: flex;
    flex-flow: column;
    margin-right: 30px;
    margin-top: 5px;
    line-height: 1.5;
    font-size: 1.8vh;
    padding: 15px;

    @media ${Devices.Mobile}
    {
        margin-right: 10px;
    }

    .title 
    {
        font-weight: 700;
        font-size: 2.4vh;
        text-transform: capitalize;
    }

    .excerpt
    {
        margin: 20px 0px;
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


const HomeComponent = () => {
    
    return(
        <>
    <TopGridContainer>
        <TopGridArticle>
            <div className="cover" />
            <div className="body">
                <div className="title">
                    This is just an amazing title for this particular usecase scenario
                </div>
                <div className="excerpt">
                    So, this is just a default palceholder excerpt that would make sense otherwise for this to exist
                </div>
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
                <div className="title">
                    This is just an amazing title for this particular usecase scenario
                </div>
                <div className="excerpt">
                    So, this is just a default palceholder excerpt that would make sense otherwise for this to exist
                </div>
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
                <div className="title">
                    This is just an amazing title for this particular usecase scenario
                </div>
                <div className="excerpt">
                    So, this is just a default palceholder excerpt that would make sense otherwise for this to exist
                </div>
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
                <div className="excerpt">
                    So, this is just a default palceholder excerpt that would make sense otherwise for this to exist
                </div>
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
            <div className="cover" />

                <div className="body">
                    <div className="title">
                        This is another title that we think should be seen with delicacy
                    </div>
                    <div className="excerpt">
                        This is another healthy excerpt brought to you by your convenient website of knowledge
                    </div>
                    <div className="meta">
                        <div className="author">
                            Afzaal Afridi
                        </div>
                    </div>
                </div>

            </HomeFeedArticle>

            <HomeFeedArticle>
            <div className="cover" />

                <div className="body">
                    <div className="title">
                        This is another title that we think should be seen with delicacy
                    </div>
                    <div className="excerpt">
                        This is another healthy excerpt brought to you by your convenient website of knowledge
                    </div>
                    <div className="meta">
                        <div className="author">
                            Afzaal Afridi
                        </div>
                    </div>
                </div>

            </HomeFeedArticle>


            <HomeFeedArticle>
            <div className="cover" />

                <div className="body">
                    <div className="title">
                        This is another title that we think should be seen with delicacy
                    </div>
                    <div className="excerpt">
                        This is another healthy excerpt brought to you by your convenient website of knowledge
                    </div>
                    <div className="meta">
                        <div className="author">
                            Afzaal Afridi
                        </div>
                    </div>
                </div>

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