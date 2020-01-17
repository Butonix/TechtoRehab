import styled from 'styled-components';

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
}
`

const NavWrapper = () => {

    return(
        <Nav>
        <div className="navLink">
            <img src="/Assets/Images/logo.svg" alt="Logo"/>
        </div>
        </Nav>
    )
}

export default NavWrapper;