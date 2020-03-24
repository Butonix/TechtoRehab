import styled from 'styled-components';
import { useState } from 'react';
import {useStoreState,useStoreActions} from 'easy-peasy';
import Head from 'next/head';
import { Devices } from '../../Components/Global/responsive';
import Homepage from '../../Components/home';

const Index = () => {
const AppWrapper = styled.div`
    height: 100%;
    background-color: var(--white-25);
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
    --blue-50: rgb(47, 137, 252,0.50);
    --blue-25: rgb(47, 137, 252,0.25);
    --green: rgb(48, 227, 202);
    --green-75: rgb(48, 227, 202,0.75);
    --green-50: rgb(48, 227, 202,0.50);
    --green-25: rgb(48, 227, 202,0.25);
    --white: rgb(245, 245, 245);
    --white-75: rgb(245, 245, 245,0.75);
    --white-50: rgb(245, 245, 245,0.50);
    --white-25: rgb(245, 245, 245,0.25);
    --font-weight-extra-bold: 800;
    --font-weight-bold: 700;
    --font-weight-medium: 600;
    --font-weight-regular-medium:500;
    --font-weight-regular: 400;

h1,h2,h3,h4,h5,h6
{
font-family: 'Open Sans';
color: var(--black);
margin: 0;
font-weight: unset;
line-height: 1.5;
:first-letter
{
    text-transform: capitalize;
}

}

h1
{
    font-size: 26px;
} 

h2
{
    font-size: 24px;
} 

h3
{
    font-size: 22px;
} 

h4
{
    font-size: 20px;
} 

h5
{
    font-size: 18px;
} 

h6
{
    font-size: 16px;
} 


p
{
    font-family: var(--source-sans);
    color: var(--black);
    font-size: 14px;
    margin: 0;
    padding: 0;
}

div
{
    font-family: var(--source-sans);
    color: var(--black);
    font-size: 16px;
    transition: all .3 ease;
}
`
    return (
        <AppWrapper>
            <Head>
                <title>Hello</title>
            </Head>
            <Homepage />
        </AppWrapper>
    );

}

export default Index;