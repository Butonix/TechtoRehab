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
import { motion } from 'framer-motion';


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
    --source-sans: 'Source Sans Pro',sans-serif;
    --public-sans: 'Public Sans', sans-serif;
    --large-font: 24px;
    --medium-font: 18px;
    --small-font: 14px;
    --black: rgb(64, 81, 78);
    --black-75: rgb(64, 81, 78,0.75);
    --black-50: rgb(64, 81, 78,0.50);
    --black-25: rgb(64, 81, 78,0.25);
    --blue: rgb(47, 137, 252);
    --blue-75: rgb(47, 137, 252,0.75);
    --blue-50: rgb(47, 137, 252);
    --blue-25: rgb(47, 137, 252,0.25);
    --green: rgb(48, 227, 202);
    --green-75: rgb(48, 227, 202,0.75);
    --green-50: rgb(48, 227, 202,0.5);
    --green-25: rgb(48, 227, 202,0.25);
    --font-weight-extra-bold: 800;
    --font-weight-bold: 700;
    --font-weight-medium: 600;
    --font-weight-regular-medium:500;
    --font-weight-regular: 400;

h1,h2,h3,h4,h5,h6
{
font-family: var(--public-sans);
color: var(--black);
margin: 0;
font-weight: unset;
line-height: 1.5;
}


p
{
    font-family: var(--source-sans);
    color: var(--black);
}

div
{
    font-family: var(--source-sans);
    color: var(--black);
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
        background: white;
        transition: width 0.3s ease;

        @media ${Devices.Mobile}
        {
            z-index: 1;
            position: absolute;
            display: ${mobileSidebar ? 'flex' : 'none'};
            height: 100%;
        }
    }

    .expanded 
    {
        width: 250px;
        @keyframes expand
        {
            from
            {
                width: 110px;
            }

            to
            {
                width: 250px;
            }
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
const spring = {
    type: "spring",
    damping: 10,
    stiffness: 269
  };
    return (
        <AppWrapper>
            <Head>
                <title>Hello</title>
            </Head>
            <Nav />
            <div className="contentArea">
                <div className={ sidebar ? "sidebarArea" + " expanded" : "sidebarArea"}>
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