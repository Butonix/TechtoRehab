import styled from 'styled-components';
import {useState} from 'react';
import Devices from './responsive';
import {useStoreActions,useStoreState} from 'easy-peasy';


const SidebarWrapper = (props) => {
    var sidebar = useStoreState(states => states.sidebar);
    const setSidebar = useStoreActions(actions => actions.setSidebar) ;

    const Sidebar = styled.div`
background: white;

ul
{
    list-style: none;
    padding: 0;
    li
    {
        font-size: 15px;
        font-weight: 600;
        color: #40514e;
        display: flex;
        padding: 20px;

        .icon 
        {
            margin: ${ sidebar ? 'unset' : '0px auto'};
            box-icon 
        {
            height: 30px;
            width: 30px;
            fill: #40514e;
        }

        }


        .text 
        {
            margin-left: 10px;
            font-size: 20px;
            font-weight: 600;
            line-height: 1.4;
            text-transform: uppercase;
            overflow: hidden;
            white-space: nowrap;
            padding: unset;
        }

        :hover 
            {
                background-color: #f0f0f0;
                cursor: pointer;
            }

        }

        .active
            {
                background-color: #f0f0f0;

            }

            .expand 
            {
                padding: 20px 0px;

                .icon 
                {
                    box-icon 
                    {
                        width: 34px;
                        height: 34px;
                    }
                }

                .text 
                {
                    line-height: 1.7;
                }
            :hover 
            {
                background-color: unset;
            }
            }

             
        .text 
        {
            line-height: 1.4;
            text-transform: uppercase;
            overflow: hidden;
            white-space: nowrap;
            padding: 15px;
            font-size: 20px;
            font-weight: 600;
            color: #40514e;

        }
    }
`

    return(
        <Sidebar>
        <ul>
            <li className="expand" onClick={() => setSidebar(!sidebar)}>
            <div className="icon">
            {
                !sidebar ?
            <box-icon name='chevron-right' style={{marginTop: '1rem',fill: '#40514e',margin: 'auto',cursor: 'pointer'}} />
            :             
            <box-icon name='chevron-left' style={{marginTop: '1rem',fill: '#40514e',margin: 'auto',cursor: 'pointer'}} />

            }
            </div>
            <div className="text">
            {
                sidebar ? 

                'Close'
                : 
                ''
            }
            </div>
            </li>

                <div className="text">
                    SORT BY
                </div>

            <li className="active">
                <div className="icon" style={{margin: !sidebar ? 'auto' : 'unset'}}>
                <box-icon name='heart' type="solid"></box-icon>
                </div>

                <div className="text" style={{display: sidebar ? 'block' : 'none'}}>
                     MOST Popular
                </div>
            </li>

            <li>
                <div className="icon" style={{margin: !sidebar ? 'auto' : 'unset'}}>
                <box-icon name='hot' type="solid" ></box-icon>
                </div>

                <div className="text" style={{display: sidebar ? 'block' : 'none'}}>
                     TOP TRENDING
                </div>
            </li>

            <li>
                <div className="icon" style={{margin: !sidebar ? 'auto' : 'unset'}}>
                <box-icon name='show-alt' type="solid"></box-icon>
                </div>

                <div className="text" style={{display: sidebar ? 'block' : 'none'}}>
                     HIGHEST VIEWS
                </div>
            </li>

            <li>
                <div className="icon" style={{margin: !sidebar ? 'auto' : 'unset'}}>
                <box-icon name='comment-dots' type="solid"></box-icon>
                </div>

                <div className="text" style={{display: sidebar ? 'block' : 'none'}}>
                     MOST COMMENTED
                </div>
            </li>
        </ul>
        </Sidebar>
    )
}

export default SidebarWrapper;