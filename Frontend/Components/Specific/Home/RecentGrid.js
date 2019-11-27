import styled from 'styled-components';
import { Devices } from '../../Global/responsive';

const RecentGrid = styled.div`
display: flex;
flex-flow: column;
height: 290px;
z-index: -1;
width: 300px;
border-radius: 5px;
margin: 10px 8px;
box-shadow: 0px 2px 6px 1px #E0E0E0;
transition: transform 200ms ease 0s;
:first-child
{
margin-left: 2px;
}

.picture 
{
background-size: cover;
background-position: 95% 75%;
width: 300px;
clip-path: polygon(0px 0px, 100% 0px, 100% 53%, 0px 46%);
height: 100%;
border-radius: 5px;
}

.RecentDetails 
{
z-index: 1;
background: white;
color: #3c3c3c;
font-family: 'Source Sans Pro',sans-serif;
display: flex;
flex-flow: column;
margin-top: auto;
border-radius:0px 0px 5px 5px;
padding: 0px 15px 15px 15px;
transition: transform 200ms ease 0s;

.bookmark 
  {
    margin-left: 232px;
    margin-top: -156px;
    z-index: 1;
    background: white;
    border-radius: 50%;
    box-shadow: 0px 0px 10px 2px #E0E0E0;
    padding: 10px 12px;
    width: 19px;
    height: 22px;

    box-icon
    {
      height: 20px;
      width: 20px;
      margin-left: 0px;
      margin-top: 2px;
      fill: #F37EA6;

    }
  }


.title 
{
  font-size: 18px;
  margin-left: 5px;
  font-weight: 600;
  text-transform: capitalize;
  margin-top: -8px;
  width: 250px;
  height: 50px;
  overflow: hidden;
}



.excerpt 
{
  font-size: 14px;
  color: #999999;
  margin-left: 5px;
  margin-top: 10px;
  height: 35px;
  overflow: hidden;
}

.meta 
{
  display: flex;
  color: #999999;
  font-size: 14px;
  margin-left: 5px;
  margin-top: 15px;

  .author 
  {
    display: flex;
    .authorAvatar
    {
      border-radius: 50%;
      padding: 6px 6px;
      background: url('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRwl4jhpgX5rTwc64_VbYWSgQfgBnSy8xMqqERVM5FGb9KUcobk');
      height: 10px;
      width: 10px;
      background-position: center;
      background-size: cover;
    }

    .authorName
    {
      text-transform:capitalize;
      margin-left: 10px;
      line-height: 1.9;
      font-size: 14px;

    }
  }

  .date 
  {
    margin-left: 10px;
    display: flex;

    .dateIcon 
    {
      margin-top: 3px;
      box-icon
      {
        height: 16px;
        width: 16px;
        fill: #999999;
      }
    }

    .dateEntry 
    {
      line-height: 1.8;
      margin-left: 5px;
    }
  }

  .readTime 
  {
    margin-left: 10px;
    display: flex;

    .readIcon 
    {
      margin-top: 4px;
      box-icon
      {
        width: 16px;
        height: 16px;
        fill: #999999;
      }
    }

    .readingTime
    {
      line-height: 1.8;
      margin-left: 5px;
    }
  }

}

}
`

const Recent = (props) => {

    return(
        <RecentGrid style={{transform: `translateX(${props.translate}px)`}}>
        <div className="picture" style={{backgroundImage: `url(${props.cover})`}}/> 
          <div className="RecentDetails">
          <div className="bookmark">
          <box-icon name='bookmark'></box-icon>
              </div>
            <div className="title">
              Learn and Design A React App In Just Under 90 Days So SO Shwar Sherdfd hsdf!!
            </div>
            <div className="excerpt">
              This is a random excerpt suggesting that the space taken by this is not null and void and This is the 
            </div>
            <div className="meta">
              <div className="author">
                <div className="authorAvatar" />
                <div className="authorName">
                  Afzaal Afridi
                </div>
              </div>
              <div className="date">
                <div className="dateIcon">
                <box-icon name='calendar-alt' ></box-icon>
                </div>
                <div className="dateEntry">
                  2 Days
                </div>
              </div>
              <div className="readTime">
                <div className="readIcon">
                <box-icon name='time-five' ></box-icon>
                </div>

                <div className="readingTime">
                  2 Mins
                </div>
              </div>
            </div>
          </div>
          </RecentGrid>
    )
}

export default Recent;