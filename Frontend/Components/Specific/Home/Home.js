import styled from 'styled-components';
import { Devices } from '../../Global/responsive';
import { useState,useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import TopGrid from './ArticleCards/TopGrid';
import CenterGrid from './ArticleCards/CenterGrid';
import FeedArticle from './ArticleCards/FeedArticle';
import FeedWidget from './FeedWidget';

/**
 * 
 * 
 *   CSS START
 * 
 * 
 */


 /** 
 *   CONTAINER
 * 
 * 
 * 
 * 
*/

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
/** 
 *   TOP GRID
 * 
 * 
 * 
 * 
*/

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
/** 
 *   CHOOSE A SIDE
 * 
 * 
 * 
 * 
*/


const Side = styled.div`
display: flex;
flex-flow: row;
.side
{
    display: inline-block;
    width: 100%;

}

`


/** 
 *   HOME GRID
 * 
 * 
 * 
 * 
*/

const HomeGrid = styled.div`
display: flex;
max-width: 1366px;
width: 100%;
margin: 20px 0px;

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
 max-width: 350px;
 width: 100%;
 margin: 0px 7px;
 position: sticky;
 height: 100%;
 top: 10px;

 @media ${Devices.iPad}
 {
     max-width: 300px;
 }

}

.main 
{
    max-width: 666px;
    width: 100%;
    margin: 0px 7px;
    @media ${Devices.Mobile}
    {
    width: 95%;
    margin: 0px 10px;
    }

}

`



/**
 * 
 * 
 *   CSS END
 * 
 * 
 */



/**
 * 
 * 
 *  JAVASCRIPT START
 * 
 * 
 */

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
            <TopGrid url='https://img.freepik.com/free-vector/gradient-liquid-shapes-effect-background_23-2148275809.jpg?size=626&ext=jpg' />
            <TopGrid url='https://static.vecteezy.com/system/resources/previews/000/664/462/non_2x/abstract-shapes-background-vector.jpg' />
            <TopGrid url='https://cdrai.com/wp-content/uploads/edd/2018/03/Vector-cool-geometric-backgrounds.jpg' />
            <TopGrid url='https://image.freepik.com/free-vector/colourful-abstract-background_23-2147782026.jpg' />

            </TopGridContainer>     
            
            <CenterGrid covers={['https://image.freepik.com/free-vector/colourful-abstract-background_23-2147782026.jpg','https://image.freepik.com/free-vector/abstract-colorful-flow-shapes-background-design_23-2148237713.jpg','https://image.freepik.com/free-vector/abstract-colorful-flow-shapes-background-design_23-2148237711.jpg','https://image.freepik.com/free-vector/abstract-colorful-flow-shapes-background_23-2148250398.jpg','https://i.pinimg.com/originals/09/ef/3a/09ef3afbd82d8b461d6abc6757814b4d.jpg']}/>
           
          
            { 
                /** 
            <Side>
                <div className="side" style={{background: 'red'}}>
                Side 1
                </div>
                <div className="side" style={{background: 'blue'}}>
                    Side 2
                </div>
            </Side>
            */
        }
            <HomeGrid>
            <div className="sidebar">
                <FeedWidget type={'list'} data={['React','Vue','Javascript','Musculoskeletal Physical Therapy','Angular','Styled Components','Polymer']} />
                </div>
                <div className="main">
                    <FeedArticle cover='https://i.pinimg.com/originals/37/72/89/377289f5fbed8c284a0a2cb2583eb8de.jpg' />
                    <FeedArticle cover='https://image.freepik.com/free-vector/abstract-colorful-background_23-2147991872.jpg' />
                    <FeedArticle cover='https://image.freepik.com/free-vector/abstract-colorful-background_23-2148007339.jpg' />
                    <FeedArticle cover='https://image.freepik.com/free-vector/abstract-colorful-background-with-frame_23-2147726951.jpg' />
                    <FeedArticle cover='https://image.freepik.com/free-vector/colorful-background-with-shapes_23-2147874529.jpg' />
                </div>
                <div className="sidebar">
                sidebar
                </div>
            </HomeGrid>
        </Container>

    )
}

export default Home;