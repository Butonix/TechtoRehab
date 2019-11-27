import styled from 'styled-components';
import { useState } from 'react';
import Nav from './Nav';
const LayoutWrapper = styled.div`
width: 1300px;
max-width: 100%;
`

const Layout = (props) => {
    return (
        <>
            <Nav />
            <LayoutWrapper>
                {props.children}
            </LayoutWrapper>
        </>
    )
}