import styled from 'styled-components';
//import gql from 'graphql-tag';
//import { Query } from 'react-apollo'
import { useState } from 'react';
import Nav from '../../Components/Global/Nav';
import Head from 'next/head';
import Home from '../../Components/Specific/Home/Home';

const Button = styled.button`
background: ${(props) => props.theme.bg};
color: ${(props) => props.theme.fg};
padding: 10px;
margin: 20px 0px;
`

const AppWrapper = styled.div`
font-family: 'Source Sans Pro',sans-serif;

`

const Index = () => {
    
    return (
        <AppWrapper>
            <Head>
                <title>Hello</title>
            </Head>
            <Nav />
            <Home />
        </AppWrapper>
    );

}

export default Index;