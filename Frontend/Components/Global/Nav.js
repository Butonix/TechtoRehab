import styled from 'styled-components';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {Devices} from './responsive';
const Nav = styled.div`
display: flex;
flex-flow: row;
align-items: center;
background-color: var(--white-50);
box-shadow: 0px 0px 3px 0px var(--black-25);
padding: 15px 0px;
width: 100%;
.navLink
{
    padding: 0px 10px;
    font-size: 16px;
    :nth-child(2)
    {
        margin-left: auto;
    }

    :last-child
    {
        margin-left: auto;
    }

    img 
    {
        width: 150px;
        max-width: 100%;
        margin-top: 0px;
    }


    box-icon 
    {
        width: 30px;
        height: 30px;
        color: #40514e;
    }


}
`



const NavWrapper = () => {

    var sidebar = useStoreState(states => states.mobileSidebar);
    const setMobileSidebar = useStoreActions(actions => actions.setMobileSidebar);

    return(
        <Nav>
        <div className="navLink">
            <img src="/Assets/Images/logo.svg" alt="Logo"/>
        </div>

        <div className="navLink">
            Hello World
        </div>

        <div className="navLink">
            Difference
        </div>
        <div className="navLink">
            Difference
        </div>
        <div className="navLink">
            Difference
        </div>
        </Nav>
    )
}

export default NavWrapper;