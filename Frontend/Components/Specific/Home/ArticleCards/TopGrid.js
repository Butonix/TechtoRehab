import styled from 'styled-components';
import { Devices } from '../../../Global/responsive';
import { useState,useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

const Grid = styled.div`
display: flex;
flex-flow: row;
padding: 10px;
width: 400px;
.card 
{
    display: flex;
    .header
    {
        background-size: cover;
        width: 70px;
        height: 70px;
        background-position: center;
        border-radius: 5px;
    }

    .body
    {
        display: flex;
        flex-flow: column;
        font-size: 14px;
        color: #333333;
        width: 340px;
        font-family: 'Source Sans Pro',sans-serif;

        .content
        {
            line-height: 1.4;
            margin: 0px 10px;
            font-size: 15px;
            font-weight: 600;
            text-transform: capitalize;
            font-family: 'Source Serif Pro',serif;

        }

        .author 
        {
            font-size: 14px;
            text-transform: capitalize;
            margin: 8px 11px;
            font-weight: 600;
        }
    }
}

`

const TopGrid = (props) => {
    return(
        <Grid>
        <div class="card">
        <div className="header"  style={{backgroundImage: `url(${props.url})`}}/>
        <div className="body">
            <div className="content">
                This is absolutely marvelous title for just a small content card Or so i think it
            </div>
            <div className="author">   
                Afzaal Afridi
            </div>
        </div>

        </div>   
        </Grid>
    )
}

export default TopGrid;