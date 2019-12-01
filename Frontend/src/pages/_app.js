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


const store = createStore(globalStore);
class TechToRehab extends App {
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
