import styled from 'styled-components';
import { Devices } from '../../../Global/responsive';
import { useState,useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

const Centergrid = styled.div`
display: flex;

.column 
{
    width: 455px;

    .bigCard 
    { 
        display: flex;
        flex-flow: column;
        .cover
        {
            background-size: cover;
            background-position: center;
            width: 450px;
            height: 200px;
            background-image: url('https://i.udemycdn.com/course/750x422/666914_6c60_3.jpg');
            border-radius: 5px;
        }

        .details
        {
            margin: 10px 0px;
            font-family: 'Source Sans Pro',sans-serif;
            color: #3c3c3c;
            .titleArea
            {
                display: flex;
                .title 
                {
                    font-size: 18px;
                    font-weight: 600;
                    text-transform: capitalize;
                    font-family: 'Merriweather',sans-serif;

                }

                .bookmark
                {
                    margin-left: auto;
                    margin-top: 3px;

                    box-icon
                    {
                        height: 26px;
                        width: 26px;
                        fill: #999999;
                    }
                }
            }

            .excerpt
            {
                margin: 5px 0px;
                font-weight: 500;
                font-size: 16px;
            }

            .meta
            {
                display: flex;
                font-weight: 600;
                font-size: 14px;
                .author
                {

                }

                .date 
                {
                    margin-left: auto;
                }
            }
        }
    }
}
`



const CenterGrid = () => {

    return(
        <Centergrid>
            <div className="column">
                <div className="bigCard">
                    <div className="cover" />
                    <div className="details">
                        <div className="titleArea">
                            <div className="title">
                                This is an absolutely wonderful title that i would love for you to see 
                            </div>
                            <div className="bookmark">
                            <box-icon name='bookmark' ></box-icon>
                            </div>
                        </div>
                        <div className="excerpt">
                            Hi ! this is just a random excerpt that you are reading so just keep some thing in mind
                        </div>
                        <div className="meta">
                            <div className="author">
                                Afzaal Afridi
                            </div>
                            <div className="date">
                                2 Days Ago
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="column">
                2
            </div>

            <div className="column">
                3
            </div>
            </Centergrid>
    )
}

export default CenterGrid;