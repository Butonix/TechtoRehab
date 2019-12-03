import styled from 'styled-components';
import { Devices } from '../../../Global/responsive';
const TopGrid = styled.div`
display:flex;
font-family: 'Source Sans Pro',sans-serif;
max-width: 1100px;
width: 100%;
margin: auto;
padding: 30px;

@media ${Devices.Mobile}
{
    padding: 10px;
    width: 95%;
}
.cover 
{
    background-size: cover;
    background-position: 95% 75%;
    background-image: url('https://image.freepik.com/free-vector/blue-background-with-colorful-shapes-flat-design_23-2147646159.jpg');
    width: 400px;
    height: 400px;
    margin-left: auto;
    border-radius: 10px;

    @media ${Devices.Mobile}
    {
    width: 100px;
    height: 100px;
    margin-left: auto;
    }

    @media ${Devices.iPad}
    {
        width: 330px;
        height: 330px;
        margin-top: 20px;
        margin-left: 0;
    }

    @media ${Devices.iPadPro}
    {
        margin-left: 0;
    }
}

.details 
{
    display: flex;
    flex-flow: column;
    width: 50%;
    padding: 50px 10px;

    @media ${Devices.Mobile}
        {
        width: 70%;
        padding: 5px 0px;
        }

    .title 
    {
        font-weight: 700;
        font-size: 35px;
        color: #3c3c3c;
        text-transform: capitalize;
        width: 95%;
        margin:0px;
        font-family: 'AvenirNext',sans-serif;

        @media ${Devices.Mobile}
        {
        width: 100%;
        font-size: 14px;
        line-height: 20px;
        }

        @media ${Devices.iPad}
        {
        font-size: 26px;
        }

        @media ${Devices.iPadPro}
        {
        font-size: 30px;
        }

        ::first-line
        {
            background: #21FBA2;
            word-spacing: none;
        }
    }

    .category
    {
        color: #3c3c3c;
        font-weight: 600;
        margin: 20px 0px;
        text-transform: capitalize;
        font-size: 16px;

        @media ${Devices.Mobile}
        {
            font-size: 14px;
            margin: 10px 0px;
        }
    }

.excerpt
{
    width: 90%;
    color: #757575;
    font-weight: 600;
    font-size: 15px;
    text-transform: capitalize;
    @media ${Devices.Mobile}
        {
            display: none;
        }
}

.meta 
{
    display: flex;
    margin: 20px 0px;
    .author 
    {
        color: #3c3c3c;
        font-weight: 600;
        font-size: 16px;
        text-transform: capitalize;

        @media ${Devices.Mobile}
        {
        font-size: 14px;
        }
    }

    @media ${Devices.Mobile}
    {
        margin: 0px;
    }
}
}
`

const topGrid = () => {

    return(
        <TopGrid>
        <div className="details">

            <p className="title">
            Listening to DOM changes by Javascript Web API, Mutation Observer (hint: It’s the best practice)

            </p>
            <div className="category">
                Javascript
            </div>
            <div className="excerpt">
            Listening to DOM changes by Javascript Web API, Mutation Observer (hint: It’s the best practice)
            </div>
            <div className="meta">
                <div className="author">Afzaal Afridi</div>
            </div>
        </div>
        <div className="cover" />
        </TopGrid>

    )
}

export default topGrid;