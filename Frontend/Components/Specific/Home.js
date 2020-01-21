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
margin: 0px auto;

:hover 
{
    cursor: grab;
}

::-webkit-scrollbar {
    height: 7px;
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
    margin-left: 15px;
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
    border-radius: 5px 5px 0px 0px;
}

.body 
{
    color: #40514e;
    padding: 15px 10px;
    font-size: 14px;
    background: white;
    border-radius: 0px 0px 10px 10px;

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
const HomeComponent = () => {
    
    return(
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
    </TopGridContainer>
    );


}

export default HomeComponent;