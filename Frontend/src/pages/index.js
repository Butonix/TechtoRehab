import styled from 'styled-components';
//import gql from 'graphql-tag';
//import { Query } from 'react-apollo'
import { useState } from 'react';
import Head from 'next/head';
import Sidebar from '../../Components/Global/Sidebar';
import Nav from '../../Components/Global/Nav';
const Button = styled.button`
background: ${(props) => props.theme.bg};
color: ${(props) => props.theme.fg};
padding: 10px;
margin: 20px 0px;
`

const AppWrapper = styled.div`
h1,h2,h3,h4,h5,h6
{
font-family: 'Public Sans',sans-serif;
}

p
{
    font-family: 'Source Sans Pro',sans-serif;
}

div
{
    font-family: 'Source Sans Pro',sans-serif;

}

.contentArea
{
    display: flex;
    flex-flow: row;
    .sidebarArea
    {
        display: flex;
        flex-flow: column;
        width: 300px;
    }

    .content 
    {
        display: flex;
        flex-flow: column;
        width: 100%;
        background: #2f89fc1a;
        color: #40514e;
    }
}
`

const Index = () => {
    
    return (
        <AppWrapper>
            <Head>
                <title>Hello</title>
            </Head>
            <Nav />
            <div className="contentArea">
                <div className="sidebarArea">
                    <Sidebar />
                </div>
                <div className="content">
                    Content
                </div>
            </div>
        </AppWrapper>
    );

}

export default Index;