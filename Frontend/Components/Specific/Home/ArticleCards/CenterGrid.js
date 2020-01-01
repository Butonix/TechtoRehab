import styled from 'styled-components';
import { Devices } from '../../../Global/responsive';
import { useState,useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

const CenterGridHolder = styled.div`
display: flex;
margin-top: 5px;
.bigArticleArea
{
 display: flex;
 flex-flow: column;
 width: 32%;
 margin-left: 10px;
 .cover 
    {
        background-size: cover;
        background-position: 21%;
        height: 205px;
        max-width: 100%;
        width: 432px;
        background-image: url('https://about.easil.com/wp-content/uploads/fredericka_the_great_twitter_image.jpg');
        border-radius: 2px;
    }

 .body
    {
        display: flex;
        flex-flow: column;
        width: 390px;
        margin: 15px 10px;
        color: #333333;
        font-family: 'Source Sans Pro',sans-serif;
        line-height: 1.5;
        margin-left:auto;

        .title 
        {
            font-size: 20px;
            font-weight: 700;
            text-transform: capitalize;
            font-family: 'Roboto',sans-serif;
            margin-bottom: 5px;
        }

        .excerpt 
        {
            font-size: 15px;
            font-weight: 400;
            margin: 10px 0px;
        }

        .meta 
        {
            display: flex;
                margin: 0px 0px;
                font-size: 14px;
                .date 
                {
        
                }

                .bookmark
                {
                    margin-left: auto;
                    box-icon 
                    {
                        fill: #757575;
                        height: 24px;
                    }
                }
        }
    }
}

.articleSidebar
{
  display: flex;
  flex-flow: column;
  width: 35%;
  margin-left: 10px;
    .smallArticle
    {
        display: flex;
        margin-bottom: 20px;
        .cover
        {
            background-size: cover;
            background-position: center;
            width: 95px;
            height: 95px;
            border-radius: 2px;
            background-image: url('https://i.udemycdn.com/course/750x422/1427466_f4f8.jpg');
        }

        .body 
        {
            display: flex;
            flex-flow: column;
            color: #333333;
            font-family: 'Source Sans Pro',sans-serif;
            line-height: 1.5;
            margin-left: 10px;
            width: 350px;
            .title 
            {
                font-family: 'Roboto',sans-serif;
                font-size: 16px;
                font-weight: 700;
                text-transform: capitalize;
            }

            .excerpt
            {
                font-size: 14px;
                margin: 3px 0px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }

            .meta
            {
                display: flex;
                font-size: 14px;  

                .date
                {

                }

                .bookmark 
                {
                    margin-left: auto;
                    box-icon
                    {
                        fill: #757575;
                        height: 22px;
                    } 
                }
            }
        }
    }
}

.lastSection
{
    width: 32%;
    display: flex;
    flex-flow: column;
    .mediumArticle
    {
        display: flex;
        flex-flow: column;
        .cover 
        {
            width: 435px;
            height: 205px;
            background-size: cover;
            background-position: center;
            background-image: url('https://hackr.io/blog/why-should-you-learn-angular-in-2019/thumbnail/large');
            border-radius: 2px;
        }

        .body 
        {
            display: flex;
            flex-flow: column;
            font-family: 'Source Sans Pro',sans-serif;
            color: #333333;
            line-height: 1.5;
            width:340px;
            margin-left: auto;
            .title 
            {
                font-size: 20px;
                font-weight: 700;
                font-family: 'Roboto',sans-serif;
                margin: 15px 0px;
                text-transform: capitalize;
            }

            .excerpt 
            {
                font-size: 15px;
            }

            .meta 
            {
                display: flex;
                margin: 10px 0px;
                font-size: 14px;
                .date 
                {
        
                }

                .bookmark
                {
                    margin-left: auto;
                    box-icon 
                    {
                        fill: #757575;
                        height: 24px;
                    }
                }
            }
        }
    }
}


`

const CenterGrid = (props) => {

    return(
        <CenterGridHolder>
        <div className="bigArticleArea">
            <div className="cover" style={{backgroundImage: `url(${props.covers[0]})`}}/>
            <div className="body">
                <div className="title">
                How To Optimize React App For Production And Deploy It To Heroku
                </div>
                <div className="excerpt">
                    So this is just a random excerpt that i think might or would fit in just a single line
                </div>
                <div className="meta">
                    <div className="date">
                        4th Feburary, 20
                    </div>
                    <div className="bookmark">
                    <box-icon name='bookmark'></box-icon>
                    </div>
                </div>
            </div>
        </div>

        <div className="articleSidebar">
            <div className="smallArticle">
                <div className="cover" style={{backgroundImage: `url(${props.covers[1]})`}}/>
                <div className="body">
                    <div className="title">
                    How To Optimize React App For Production And Deploy It To Heroku
                    </div>
                    <div className="excerpt">
                    So this is just a random excerpt that i think might or would fit in just a single line
                    </div>
                    <div className="meta">
                    <div className="date">
                        4th Feburary, 20
                    </div>
                    <div className="bookmark">
                    <box-icon type="solid" name='bookmark'></box-icon>
                    </div>
                </div>
                </div>
            </div>

            <div className="smallArticle">
                <div className="cover" style={{backgroundImage: `url(${props.covers[2]})`}}/>
                <div className="body">
                    <div className="title">
                    How To Optimize React App For Production And Deploy It To Heroku
                    </div>
                    <div className="excerpt">
                    So this is just a random excerpt that i think might or would fit in just a single line
                </div>
                <div className="meta">
                    <div className="date">
                        4th Feburary, 20
                    </div>
                    <div className="bookmark">
                    <box-icon name='bookmark'></box-icon>
                    </div>
                </div>
                </div>
            </div>


            <div className="smallArticle">
                <div className="cover" style={{backgroundImage: `url(${props.covers[3]})`}}/>
                <div className="body">
                    <div className="title">
                    How To Optimize React App For Production And Deploy It To Heroku
                    </div>
                    <div className="excerpt">
                    So this is just a random excerpt that i think might or would fit in just a single line
                </div>
                <div className="meta">
                    <div className="date">
                        4th Feburary, 20
                    </div>
                    <div className="bookmark">
                    <box-icon name='bookmark'></box-icon>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div className="lastSection">
            <div className="mediumArticle">
                <div className="cover" style={{backgroundImage: `url(${props.covers[4]})`}}/>
                <div className="body">
                <div className="title">
                How To Optimize React App For Production And Deploy It To Heroku
                </div>
                <div className="excerpt">
                    This is yet another excerpt that i think you should really consider reading
                </div>
                <div className="meta"> 
                <div className="date">  
                25 Feburary, 2020
                </div>
                <div className="bookmark">
                <box-icon name='bookmark'></box-icon>
                </div>
                </div>
                </div>
            </div>
        </div>
    </CenterGridHolder>
    )
}

export default CenterGrid;