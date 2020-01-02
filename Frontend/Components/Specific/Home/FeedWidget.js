import styled from 'styled-components';
import { Devices } from '../../Global/responsive';
import { useState,useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

const FeedoWidget = styled.div`
display: flex;
flex-flow: column;
color: #333333;

.title
{
    font-family: 'Roboto',sans-serif;
    font-size: 20px;
    text-transform: capitalize;
    font-weight: 700;
}

.body 
{
    display: flex;
    flex-flow: column;
    font-family: 'Source Sans Pro',sans-serif;
    margin: 10px 20px;
    .entryType1
    {

    }

    .entryType2
    {

    }

    .list 
    {
        display: flex;
        flex-flow: column;
        overflow-y: scroll;
        height:300px;
        ::-webkit-scrollbar {
        width: 7px;
        border-radius: 5px;
        background-color: #dcd4d4;
        } 

        ::-webkit-scrollbar-thumb {
        background-color: #21FBA2;
        border-radius: 5px;
        }

        .entry 
        {
            font-size: 16px;
            font-weight: 700;
            padding: 5px 15px;
            height: 30px;
            margin: 10px 0px;

            ::first-letter
            {
                font-size: 18px;
            }
        }
    }
}
`

const FeedWidget = (props) => {
    return(
        <FeedoWidget>
        <div className="title">
            Categories
        </div>
        <div className="body">  
        {
            props.type == 'list' ? 
            <div className="list">
                {
                    props.data.map(mapped => (
                        <div className="entry">
                        {mapped}
                        </div>
                ))
                }
            </div>
            : null
        }
        </div>
    </FeedoWidget>
    )
}

export default FeedWidget;