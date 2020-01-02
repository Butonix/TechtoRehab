import styled from 'styled-components';
import { Devices } from '../../../Global/responsive';
import { useState,useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
const FeedoArticle = styled.div`
display: flex;
margin: 30px 0px;

:first-child 
{
    margin-top: 10px;
}
.cover 
{
    background-size: cover;
    background-position: center;
    width: 120px;
    height: 120px;
    border-radius: 2px;
}

.body
{
    display: flex;
    flex-flow: column;
    font-family: 'Source Sans Pro',sans-serif;
    color: #333333;
    width: 480px;
    max-width: 100%;
    margin-left: 10px;
    line-height: 1.5;
    .title 
    {
        font-family: 'Roboto',sans-serif;
        font-size: 18px;
        font-weight: 700;
        text-transform: capitalize;
    }

    .excerpt 
    {
        font-size: 15px;
        margin: 10px 0px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
                height: 24px;
                fill: #757575; 
            }
        }
    }
}

`

const FeedArticle = (props) => {
    return(
        <FeedoArticle>
        <div className="cover" style={{backgroundImage: `url(${props.cover})`}}/>
        <div className="body">
            <div className="title">
                This is a memorable title that i guess you should have a look at
            </div>
            <div className="excerpt">
                This is again a memorable excerpt that you should think of worth considering
            </div>
            <div className="meta">
                <div className="date">
                    20th Feb, 2019
                </div>
                <div className="bookmark">
                <box-icon name='bookmark'></box-icon>
                </div>
            </div>
        </div>
    </FeedoArticle>
    )
}

export default FeedArticle;