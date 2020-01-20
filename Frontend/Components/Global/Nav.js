import styled from 'styled-components';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {Devices} from './responsive';
const Nav = styled.div`
display: flex;
flex-flow: row;
background: white;
align-items: center;

.navLink
{
    padding: 15px 10px;

    img 
    {
        width: 150px;
        max-width: 100%;
    }


    box-icon 
    {
        width: 30px;
        height: 30px;
        color: #40514e;
    }


}

.burger 
{
    display: none;
    padding: 15px 10px;

    @media ${Devices.Mobile}
    {
        display: block;
    }

    box-icon 
    {
        width: 32px;
        height: 32px;
        color: #40514e;
        margin-top: 2px;
    }
}
`



const NavWrapper = () => {

    var sidebar = useStoreState(states => states.mobileSidebar);
    const setMobileSidebar = useStoreActions(actions => actions.setMobileSidebar);

    return(
        <Nav>
        <div className="navLink" className="burger" onClick={() => setMobileSidebar(!sidebar)}>
        <box-icon name='menu'></box-icon>
        </div>
        <div className="navLink">
            <img src="/Assets/Images/logo.svg" alt="Logo"/>
        </div>
        </Nav>
    )
}

export default NavWrapper;