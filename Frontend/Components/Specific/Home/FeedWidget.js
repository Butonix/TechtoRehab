import styled from 'styled-components';
import { Devices } from '../../Global/responsive';
import { useState,useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
const FeedoWidget = styled.div`
display: flex;
flex-flow: column;
color: #333333;
margin: 15px 0px;
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
            padding: 0px 0px;
            margin: 5px 0px;

            ::first-letter
            {
                font-size: 18px;
            }

            .subEntryHolder
            {
                display: flex;
                padding: 0px 0px;
                margin-top: 5px;

                .point 
                {
                    border-left: 2px solid #333333;
                    border-bottom: 2px solid #333333;
                    height: 0px;
                    padding: 10px;
                }

                .checkbox
                {
                    display: inline-flex;
                        input[type=checkbox] 
                        {
                        position: relative;
                        appearance: none;
                        font-size: 22px !important;
                        width: 1em;
                        margin: 0;
                        color: inherit;
                        outline: none;
                        font-family: 'boxicons';
                        transition: 300ms ease-out;
                        margin-top: 10px;
                        margin-left: 10px;

                        &::after {
                        display: inline-block;
                        text-align: center;
                        width: 1em;
                        }

                        &:checked::after {
                        font-weight: 900;
                        }
                        &:active {
                        transform: scale(.6);
                        }

                        + span {
                        margin-left: .35em;
                        }
                    }

                    input[type=checkbox]:checked::after {
                        }
                }

                .subEntry
                {
                    padding: 8px;
                    width: 120px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .subscribe
                {
                    margin-left: auto;
                    margin-right: 30px;
                    margin-top: 8px;
                    font-weight: 700;
                    border-radius: 5px;
                }
            }

            .subSubEntryHolder
                {
                    display: flex;
                    margin-left:30px;
                    padding: 0px 15px;

                    .point 
                    {
                    border-left: 2px solid #333333;
                    border-bottom: 2px solid #333333;
                    height: 0px;
                    padding: 10px;
                    }

                    .checkbox 
                    {
                        display: inline-flex;
                        input[type=checkbox] 
                        {
                        position: relative;
                        appearance: none;
                        font-size: 22px !important;
                        width: 1em;
                        margin: 0;
                        color: inherit;
                        outline: none;
                        transition: 300ms ease-out;
                        margin-top: 10px;
                        margin-left: 10px;

                        &::after {
                        display: inline-block;
                        text-align: center;
                        width: 1em;
                        }

                        &:checked::after {
                        font-weight: 900;
                        }
                        &:active {
                        transform: scale(.6);
                        }

                        + span {
                        margin-left: .35em;
                        }
                    }

                    input[type=checkbox]:checked::after {
                        }
                    }

                    .subSubEntry
                    {
                        padding: 8px;
                        width: 90px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    .subscribe
                    {
                    margin-left: auto;
                    margin-right: 14px;
                    margin-top: 8px;
                    }
                }
        }
    }
}
`

const FeedWidget = (props) => {
    const[sub,setSub] = useState(false);
    return(
        <FeedoWidget>
        <div className="title">
            Channels
        </div>
        <div className="body">  
        {
            props.type == 'list' ? 
            <div className="list">
                {
                    props.data.map(main => (
                        <div className="entry">
                        {
                            main.mainCat
                        }
                        {
                            main.subCats ? 
                            main.subCats.map(subCats => (
                                    <div className="subEntryHolder">
                                    <div className="point" />
                                    <label className="checkbox" onClick={ () => setSub(!sub)}>
                                    <input type="checkbox" class={sub ? "bx bxs-check-circle" : "bx bx-circle"} key={`${subCats.subCat}`} checked={sub == true ? true : false}/>
                                    </label>
                                    <div className="subEntry">
                                    { subCats.subCat }
                                    </div>
                                    <div className="subscribe">
                                        Subscribe
                                    </div>
                                    </div>
                                    )) : null
                        }
                                    {
                                        main.subCats.map(subCats => (
                                        subCats.subSubCats ? 
                                        subCats.subSubCats.map(subSubCat => (
                                            <div className="subSubEntryHolder">
                                            <div className="point" />
                                            <label className="checkbox" >
                                            <input type="checkbox"  class="bx bxs-check-circle" checked/>
                                            </label>
                                            <div className="subSubEntry">
                                                { subSubCat }
                                            </div>
                                            <div className="subscribe">
                                            Subscribe
                                            </div>
                                            </div>
                                        )) : null
                                        ))
                                    }                      
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