import styled from 'styled-components';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {Devices} from './responsive';
const Nav = styled.div`
display: flex;
flex-flow: row;
align-items: center;
background-color: var(--white-50);
box-shadow: 0px 0px 3px 0px var(--black-25);
.navLink
{
    padding: 15px 10px;

    img 
    {
        width: 170px;
        max-width: 100%;
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
        </Nav>
    )
}

export default NavWrapper;