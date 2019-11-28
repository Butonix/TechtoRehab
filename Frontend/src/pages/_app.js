import App, { Container } from 'next/app'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import withApollo from '../../lib/withApollo'
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { createStore, StoreProvider } from 'easy-peasy';
import { globalStore } from '../../redux-store/global';


const light = {
  bg: 'white',
  fg: '#3c3c3c'
}

const dark = {
  bg: '#3c3c3c',
  fg: 'white'
}

const AppWrapper = styled.div`


`

const store = createStore(globalStore);
class TechToRehab extends App {

  handleScroll = (defaultTop) => {
    /**
     
    const el = document.querySelector('.Feedbar');
    var Top = el.offsetTop;
    if (Top > defaultTop + 30) {
      el.style.boxShadow = '0px 0px 3px 3px #cecece';
      el.style.margin = '5px 0%';
      el.style.background = 'white';
    }

    else {
      el.style.boxShadow = 'none';
      el.style.margin = '5px 5%';
      el.style.background = 'none';
    }
    */
  }
  componentDidMount() {
    /** 
    var defaultTop = document.querySelector('.Feedbar').offsetTop;
    document.addEventListener('scroll', () => this.handleScroll(defaultTop));
    */
  }
  render() {
    const { Component, pageProps, apolloClient } = this.props
    return (
        <ApolloProvider client={apolloClient}>
          <StoreProvider store={store}>
            <ThemeProvider theme={dark}>
              <Component {...pageProps} />
            </ThemeProvider>
          </StoreProvider>
        </ApolloProvider>
    )
  }
}

export default withApollo(TechToRehab)
