import styled from 'styled-components';
import {useState} from 'react';
import {Devices} from './responsive';
import {useStoreActions,useStoreState} from 'easy-peasy';


const SidebarWrapper = (props) => {
    var sidebar = useStoreState(states => states.sidebar);
    const setSidebar = useStoreActions(actions => actions.setSidebar);
    const setMobileSidebar = useStoreActions(actions => actions.setMobileSidebar);

    const Sidebar = styled.div`
    background: white;
    height: 100%;
    ul
    {
    list-style: none;
    padding: 0;

    @media ${Devices.Mobile}
    {
    overflow-y: scroll;
    height: 90%;
    }
    li
    {
        font-size: 15px;
        font-weight: 600;
        color: #40514e;
        display: flex;
        padding: 20px;

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
                    margin: ${ sidebar ? '0px 0px' : '0px auto'};
                    margin-left: ${ sidebar ? '10px' : 'auto'};

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

            .close 
            {
                display: none;
                padding: 20px 0px;
                .icon 
                {
                    margin: ${ sidebar ? '0px auto' : '0px auto'};

                    box-icon 
                    {
                        width: 34px;
                        height: 34px;
                    }
                }

                :hover 
            {
                background-color: unset;
            }

            @media ${Devices.Mobile}
            {
                display: flex;
            }
            }

            .break 
            {
                .icon 
                {
                box-icon 
                {
                    width: 45px;
                    height: 45px;
                }
                }

                :hover 
                {
                    background: none;
                    cursor: auto;
                }
            }

            .caterHeading 
            {
                .text 
                {
                    cursor: normal;
                    margin-left: 0px;
                }

                :hover 
                {
                    background: none;
                    cursor: auto;
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
            <li className="close" onClick={() => setMobileSidebar(false)}>
                <div className="icon">
                <box-icon name='x'></box-icon>
                </div>
            </li>
            <li className="expand" onClick={() => setSidebar(!sidebar)}>
            <div className="icon">
            {
                !sidebar ?
            <box-icon name='right-arrow-alt' type="solid" style={{marginTop: '1rem',fill: '#40514e',margin: 'auto',cursor: 'pointer'}} />
            :             
            <box-icon name='left-arrow-alt' style={{marginTop: '1rem',fill: '#40514e',margin: 'auto',cursor: 'pointer'}} />

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
            <li className="break">
                <div className="icon" style={{margin: 'auto'}}>
                <box-icon name='dots-horizontal-rounded'></box-icon>
                </div>
            </li>
            <li className="caterHeading">
                <div className="text" style={{display: sidebar ? 'block' : 'none'}}>
                Customize
                </div>
            </li>
            <li>
                <div className="icon" style={{margin: !sidebar ? 'auto' : 'unset'}}>
                <box-icon name='sun' type='solid' ></box-icon>
                </div>

                <div className="text" style={{display: sidebar ? 'block' : 'none'}}>
                    Dark Mode
                </div>
            </li>

            <li>
                <div className="icon" style={{margin: !sidebar ? 'auto' : 'unset'}}>
                <box-icon name='font-size'></box-icon>
                </div>

                <div className="text" style={{display: sidebar ? 'block' : 'none'}}>
                    + Font Size
                </div>
            </li>
        </ul>
        </Sidebar>
    )
}

export default SidebarWrapper;