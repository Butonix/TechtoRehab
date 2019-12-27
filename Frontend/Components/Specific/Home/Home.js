import styled from 'styled-components';
import { Devices } from '../../Global/responsive';
import { useState,useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import TopGrid from './ArticleCards/TopGrid';
import CenterGrid from './ArticleCards/CenterGrid';

const Container = styled.div`
display: flex;
flex-flow:column;
max-width: 1366px;
margin: 10px auto;
padding: 5px 0px;
/** 
border: 1px solid #E0E0E0;
*/
@font-face {
font-family: 'AvenirNext';
font-style: normal;
font-weight: 400;
src: local('AvenirNextCyr-Regular'), url('/Assets/Fonts/Avenir-Next/AvenirNextCyr-Regular.woff') format('woff');
}

@font-face {
font-family: 'AvenirNext';
font-style: normal;
font-weight: 100;
src: local('AvenirNextCyr-Thin'), url('/Assets/Fonts/Avenir-Next/AvenirNextCyr-Thin.woff') format('woff');
}


@font-face {
font-family: 'AvenirNext';
font-style: normal;
font-weight: 200;
src: local('AvenirNextCyr-Light'), url('/Assets/Fonts/Avenir-Next/AvenirNextCyr-Light.woff') format('woff');
}



@font-face {
font-family: 'AvenirNext';
font-style: normal;
font-weight: 500;
src: local('AvenirNextCyr-Medium'), url('/Assets/Fonts/Avenir-Next/AvenirNextCyr-Medium.woff') format('woff');
}

@font-face {
font-family: 'AvenirNext';
font-style: normal;
font-weight: 600;
src: local('AvenirNextCyr-Demi'), url('/Assets/Fonts/Avenir-Next/AvenirNextCyr-Demi.woff') format('woff');
}


@font-face {
font-family: 'AvenirNext';
font-style: normal;
font-weight: 700;
src: local('AvenirNextCyr-Bold'), url('/Assets/Fonts/Avenir-Next/AvenirNextCyr-Bold.woff') format('woff');
}



@font-face {
font-family: 'AvenirNext';
font-style: normal;
font-weight: 900;
src: local('AvenirNextCyr-Heavy'), url('/Assets/Fonts/Avenir-Next/AvenirNextCyr-Heavy.woff') format('woff');
}

@font-face {
    font-family: 'TT Norms Pro';
    src: url('/Assets/Fonts/TT-Norms-Pro/TTNormsPro-Regular.woff2') format('woff2'),
        url('/Assets/Fonts/TT-Norms-Pro/TTNormsPro-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

@font-face {
    font-family: 'TT Norms Pro';
    src: url('/Assets/Fonts/TT-Norms-Pro/TTNormsPro-Medium.woff2') format('woff2'),
        url('/Assets/Fonts/TT-Norms-Pro/TTNormsPro-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
}

@font-face {
    font-family: 'TT Norms Pro';
    src: url('/Assets/Fonts/TT-Norms-Pro/TTNormsPro-Bold.woff2') format('woff2'),
        url('/Assets/Fonts/TT-Norms-Pro/TTNormsPro-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
}

@font-face {
    font-family: 'TT Norms Pro';
    src: url('/Assets/Fonts/TT-Norms-Pro/TTNormsPro-Light.woff2') format('woff2'),
        url('/Assets/Fonts/TT-Norms-Pro/TTNormsPro-Light.woff') format('woff');
    font-weight: 300;
    font-style: normal;
}

@font-face {
    font-family: 'TT Norms Pro';
    src: url('/Assets/Fonts/TT-Norms-Pro/TTNormsPro-Thin.woff2') format('woff2'),
        url('/Assets/Fonts/TT-Norms-Pro/TTNormsPro-Thin.woff') format('woff');
    font-weight: 100;
    font-style: normal;
}

@font-face {
    font-family: 'TT Norms Pro';
    src: url('/Assets/Fonts/TT-Norms-Pro/TTNormsPro-Black.woff2') format('woff2'),
        url('/Assets/Fonts/TT-Norms-Pro/TTNormsPro-Black.woff') format('woff');
    font-weight: 900;
    font-style: normal;
}

`


const TopGridContainer = styled.div`
display: flex;
width: 100%;
margin: 5px 0px;

:first-child
{
    margin-left: 10px;
}
@media ${Devices.Mobile}
{
    display: none;
}

@media ${Devices.smallMobile}
{
    display: none;
}

@media ${Devices.iPad}
{
    justify-content: flex-start;
    overflow-x: scroll;
}

@media ${Devices.iPadPro}
{
    justify-content: flex-start;
    overflow-x: scroll;

}
`

function useWindowSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }
    
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

const HomeGrid = styled.div`
display: flex;
max-width: 1100px;
width: 100%;
margin: 20px auto;

@media ${Devices.Mobile}
{
    flex-flow: column;
}

@media ${Devices.iPad}
{
    padding: 0px 0px;
}

@media ${Devices.iPadPro}
{
    padding: 0px 0px;
}

.sidebar 
{
 max-width: 400px;
 width: 100%;
 margin: 0px 7px;
 

 @media ${Devices.iPad}
 {
     max-width: 300px;
 }

}

.main 
{
    max-width: 700px;
    width: 100%;
    margin: 0px 7px;
    @media ${Devices.Mobile}
    {
    width: 95%;
    margin: 0px 10px;
    }

}

`



const Home = () => {

    {
        /**
         * SIDEBAR HANDLE CLOSE ON CLICKING BODY
         */
    }
    var size = useWindowSize();
    var setSize = useStoreActions(actions => actions.setWindowSize);
    setSize(size.width);
    var setSidebar = useStoreActions(actions => actions.base.setSidebar);
    var sidebar = useStoreState(state => state.base.sidebar);
    
    return (
        <Container onClick={() => setSidebar(false)}>
            <TopGridContainer>
            <TopGrid url='https://miro.medium.com/max/576/1*9yfan4glbJWu2ObxApdhaA.png' />
            <TopGrid url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdh-aRTGpAQe5apq1dE9zfOXwYaLqMSwfrozvhwTZvactr0UGL_g&s' />
            <TopGrid url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ2Ywvqsv_wTTq38TeohleRM4hJqRpEroldn2aJJRREIZHoKxX&s' />

            </TopGridContainer>     

            <CenterGrid />       
            <HomeGrid>
                <div className="main">
                    
                </div>
                <div className="sidebar">
                sidebar
                </div>
            </HomeGrid>
        </Container>

    )
}

export default Home;