import styled from 'styled-components';
import {useState} from 'react';
import Devices from './responsive';
import {useStoreActions,useStoreState} from 'easy-peasy';
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
        padding: 15px;

        box-icon 
        {
            height: 35px;
            width: 35px;
            fill: #43dde6;
        }

        .icon 
        {
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
        }

        }
    }
`


const SidebarWrapper = (props) => {
    var sidebar = useStoreState(states => states.sidebar);
    const setSidebar = useStoreActions(actions => actions.setSidebar) ;
    return(
        <Sidebar>
        <ul>
            <li>
            {
                !sidebar ?
            <box-icon name='right-arrow-alt' style={{marginTop: '1rem',fill: '#40514e',margin: 'auto',cursor: 'pointer'}} onClick={() => setSidebar(!sidebar)}/>
            :             
            <box-icon name='left-arrow-alt' style={{marginTop: '1rem',fill: '#40514e',margin: 'auto',cursor: 'pointer'}} onClick={() => setSidebar(!sidebar)}/>

            }
            </li>

            <li>
                <div className="text" style={{margin: !sidebar ? 'auto' : 'unset'}}>
                    SORT BY
                </div>
            </li>

            <li>
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