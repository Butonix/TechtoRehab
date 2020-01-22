import styled from 'styled-components';
//import gql from 'graphql-tag';
//import { Query } from 'react-apollo'
import { useState } from 'react';
import {useStoreState,useStoreActions} from 'easy-peasy';
import Head from 'next/head';
import Sidebar from '../../Components/Global/Sidebar';
import Nav from '../../Components/Global/Nav';
import { Devices } from '../../Components/Global/responsive';
import Home from '../../Components/Specific/Home';
const Button = styled.button`
background: ${(props) => props.theme.bg};
color: ${(props) => props.theme.fg};
padding: 10px;
margin: 20px 0px;
`




const Index = () => {
    var sidebar = useStoreState(state => state.sidebar);
    var mobileSidebar = useStoreState(states => states.mobileSidebar);
    const setSidebar = useStoreActions(actions => actions.setMobileSidebar);
const AppWrapper = styled.div`
height: 100%;
h1,h2,h3,h4,h5,h6
{
font-family: 'Public Sans',sans-serif;
color: #40514e;
}


p
{
    font-family: 'Source Sans Pro',sans-serif;
    color: #40514e;
}

div
{
    font-family: 'Source Sans Pro',sans-serif;
    color: #40514e;
}

.contentArea
{
    display: flex;
    flex-flow: row;
    height: 100%;
    .sidebarArea
    {
        display: flex;
        flex-flow: column;
        width: 110px;
        transition: all 200ms ease 0s;
        background: white;

        @media ${Devices.Mobile}
        {
            z-index: 1;
            position: absolute;
            display: ${mobileSidebar ? 'flex' : 'none'};
            height: 100%;
        }
    }

    .content 
    {
        width: calc(100% - 110px);
        background: #2f89fc1a;
        color: #40514e;
        padding: 15px 0px;

        @media ${Devices.Mobile}
        {
            width: 100%;
            display: block;
        }
    }
}
`
    return (
        <AppWrapper>
            <Head>
                <title>Hello</title>
            </Head>
            <Nav />
            <div className="contentArea">
                <div className="sidebarArea" style={{ width: sidebar ? '250px' : '110px'}}>
                    <Sidebar />
                </div>
                <div className="content" onClick={() => setSidebar(false)}>
                    <Home />
                </div>
            </div>
        </AppWrapper>
    );

}

export default Index;