import styled from 'styled-components';
import { Devices } from '../../Global/responsive';
import { useState,useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import TopGrid from './ArticleCards/TopGrid';

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

const CenterGridHolder = styled.div`
display: flex;
margin-top: 15px;
.bigArticleArea
{
 display: flex;
 flex-flow: column;
 width: 35%;
 align-items: center;
 .cover 
    {
        background-size: cover;
        background-position: center;
        height: 220px;
        max-width: 100%;
        width: 600px;
        background-image: url('https://about.easil.com/wp-content/uploads/fredericka_the_great_twitter_image.jpg');
        border-radius: 2px;
    }

 .body
    {
        display: flex;
        flex-flow: column;
        width: 440px;
        margin: 15px 0px;
        margin-left: auto;
        color: #333333;
        font-family: 'Source Sans Pro',sans-serif;
        line-height: 1.5;

        .title 
        {
            font-size: 20px;
            font-weight: 700;
            text-transform: capitalize;
            font-family: 'Roboto',sans-serif;
        }

        .excerpt 
        {
            font-size: 17px;
            font-weight: 400;
            margin: 10px 0px;
        }
    }
}

.articleSidebar
{
  display: flex;
  flex-flow: column;
  width: 40%;
  margin-left: 15px;
    .smallArticle
    {
        display: flex;
        margin-bottom: 10px;
        .cover
        {
            background-size: cover;
            background-position: center;
            width: 100px;
            height: 100px;
            border-radius: 2px;
            background-image: url('https://i.udemycdn.com/course/750x422/1427466_f4f8.jpg');
        }

        .body 
        {
            display: flex;
            flex-flow: column;
            color: #333333;
            font-family: 'Source Sans Pro',sans-serif;
            line-height: 1.5;
            margin-left: 10px;
            width: 390px;
            .title 
            {
                font-family: 'Roboto',sans-serif;
                font-size: 16px;
                font-weight: 700;
                text-transform: capitalize;
            }

            .excerpt
            {
                font-size: 15px;
                margin: 10px 0px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }

            .meta
            {
                display: flex;
                font-size: 14px;  

                .date
                {

                }

                .bookmark 
                {
                    margin-left: auto;
                    box-icon
                    {
                        fill: #757575;
                        height: 24px;
                    } 
                }
            }
        }
    }
}

.lastSection
{
    width: 25%;
    display: flex;
    flex-flow: column;
    .mediumArticle
    {
        display: flex;
        flex-flow: column;
        .cover 
        {
            width: 340px;
            height: 170px;
            background-size: cover;
            background-position: center;
            background-image: url('https://hackr.io/blog/why-should-you-learn-angular-in-2019/thumbnail/large');
            border-radius: 2px;
        }

        .body 
        {
            display: flex;
            flex-flow: column;
            font-family: 'Source Sans Pro',sans-serif;
            color: #333333;
            line-height: 1.5;
            .title 
            {
                font-size: 20px;
                font-weight: 700;
                font-family: 'Roboto',sans-serif;
                margin: 15px 0px;
                text-transform: capitalize;
            }

            .excerpt 
            {
                font-size: 15px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .meta 
            {
                display: flex;
                margin: 10px 0px;
                font-size: 14px;
                .date 
                {
        
                }

                .bookmark
                {
                    margin-left: auto;
                    box-icon 
                    {
                        fill: #757575;
                        height: 24px;
                    }
                }
            }
        }
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

            </TopGridContainer>     
            
            <CenterGridHolder>
                <div className="bigArticleArea">
                    <div className="cover" />
                    <div className="body">
                        <div className="title">
                        How To Optimize React App For Production And Deploy It To Heroku
                        </div>
                        <div className="excerpt">
                            So this is just a random excerpt that i think might or would fit in just a single line
                        </div>
                    </div>
                </div>

                <div className="articleSidebar">
                    <div className="smallArticle">
                        <div className="cover" />
                        <div className="body">
                            <div className="title">
                            How To Optimize React App For Production And Deploy It To Heroku
                            </div>
                            <div className="excerpt">
                            So this is just a random excerpt that i think might or would fit in just a single line
                            </div>
                            <div className="meta">
                            <div className="date">
                                4th Feburary, 20
                            </div>
                            <div className="bookmark">
                            <box-icon type="solid" name='bookmark'></box-icon>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="smallArticle">
                        <div className="cover" />
                        <div className="body">
                            <div className="title">
                            How To Optimize React App For Production And Deploy It To Heroku
                            </div>
                            <div className="excerpt">
                            So this is just a random excerpt that i think might or would fit in just a single line
                        </div>
                        <div className="meta">
                            <div className="date">
                                4th Feburary, 20
                            </div>
                            <div className="bookmark">
                            <box-icon name='bookmark'></box-icon>
                            </div>
                        </div>
                        </div>
                    </div>


                    <div className="smallArticle">
                        <div className="cover" />
                        <div className="body">
                            <div className="title">
                            How To Optimize React App For Production And Deploy It To Heroku
                            </div>
                            <div className="excerpt">
                            So this is just a random excerpt that i think might or would fit in just a single line
                        </div>
                        <div className="meta">
                            <div className="date">
                                4th Feburary, 20
                            </div>
                            <div className="bookmark">
                            <box-icon name='bookmark'></box-icon>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="lastSection">
                    <div className="mediumArticle">
                        <div className="cover" />
                        <div className="body">
                        <div className="title">
                        How To Optimize React App For Production And Deploy It To Heroku
                        </div>
                        <div className="excerpt">
                            This is yet another excerpt that i think you should really consider reading
                        </div>
                        <div className="meta"> 
                        <div className="date">  
                        25 Feburary, 2020
                        </div>
                        <div className="bookmark">
                        <box-icon name='bookmark'></box-icon>
                        </div>
                        </div>
                        </div>
                    </div>
                </div>
            </CenterGridHolder>
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