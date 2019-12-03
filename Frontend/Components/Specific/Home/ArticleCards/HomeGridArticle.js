import styled from 'styled-components';
import { Devices } from '../../../Global/responsive';
import Home from '../Home';


const HomeGridArticle = styled.div`
display: flex;
.cover 
{
    background-size: cover;
    background-position: center;
    background-image: url('https://img.freepik.com/free-vector/abstract-sales-background-flat-style_23-2148219516.jpg?size=338&ext=jpg');
    width: 150px;
    height: 150px;
    margin-left: auto;
    border-radius: 10px;

    @media ${Devices.Mobile}
    {
        width: 100px;
        height: 100px;
    }

    @media ${Devices.iPad}
    {
        width: 120px;
        height: 120px;
    }
}

.info
{
    display: flex;
    flex-flow: column;
    font-family: 'Source Sans Pro',sans-serif;
    @media ${Devices.Mobile}
    {
        width: 290px;
    }

    @media ${Devices.iPad}
    {
        max-width: 600px;
        width: 80%;
    }

    @media ${Devices.iPadPro}
    {
        width: 78%;
    }
  .title 
  {
    display: flex;
    font-size: 18px;
    font-weight: 700;
    color: #3c3c3c;
    width: 80%;
    line-height: 25px;
    text-transform: capitalize;
    font-family: 'AvenirNext',sans-serif;
    margin: 0;
    @media ${Devices.Mobile}
    {
        font-size: 14px;
        width: 90%;
        line-height: 20px;
    }

    @media ${Devices.iPad}
    {
        font-size: 1.7vw;
        width: 100%;
    }

  }

  .category 
  {
    color: #3c3c3c;
    font-weight: 600;
    text-transform: capitalize;
    font-size: 14px;
    margin: 10px 0px;

    @media ${Devices.Mobile}
    {
        font-size: 14px;
        margin: 5px 0px;
    }

    @media ${Devices.iPad}
    {
        font-size: 1.6vw;
        width: 90%;
        margin: 5px 0px;

    }

  }

  .excerpt 
  {
    color: #757575;
    font-weight: 600;
    text-transform: capitalize;
    font-size: 14px;
    width: 80%;
    @media ${Devices.Mobile}
    {
        display: none;
    }

    @media ${Devices.iPad}
    {
        font-size: 1.6vw;
        width: 90%;
    }
  }

  .author 
  {
    color: #3c3c3c;
    font-weight: 600;
    text-transform: capitalize;
    font-size: 14px;
    width: 80%;
    margin: 10px 0px;
    @media ${Devices.Mobile}
    {
        font-size: 14px;
        margin: 5px 0px;
    }

    @media ${Devices.iPad}
    {
        font-size: 1.6vw;
        width: 90%;
    }
  }
}
`




const Article = () => {
    return(
        <HomeGridArticle>
            <div className="info">
            <p className="title">
            You Don’t Need More Motivation — You Need A System
            </p>
            <div className="category"> Sonotherapy </div>
            <div className="excerpt">
            You Don’t Need More Motivation — You Need A System that can help you make yourself better
            </div>
            <div className="author">
                Afzaal Afridi
            </div>
            </div>


            <div className="cover" />
        </HomeGridArticle>
    )
}

export default Article;