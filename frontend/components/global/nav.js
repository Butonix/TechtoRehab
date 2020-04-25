import styled from "styled-components";
import { breakPoints } from "./responsive";
const Nav = styled.nav`
  display: inline-flex;
  background-color: white;
  padding: 10px 0px;
  justify-content: start;
  width: 100vw;
  @media ${breakPoints.mobile} {
    padding: 5px 0px;
  }

  img,
  .logo {
    width: 120px;
    margin-left: 10px;
  }

  .navItem {
    text-decoration: none;
    font-size: 16px;
    /* line-height: 1.8; */
    margin: 0px 15px !important;

    :first-child {
      margin-left: auto;
    }
    box-icon {
      height: 20px;
      width: 20px;
      margin-top: 4px;
    }
    @media ${breakPoints.mobile} {
      /* line-height: 3.2; */
    }
  }

  .composeButton {
    display: flex;
    margin-left: auto;
    margin-right: 15px;
    background-color: var(--accent-green);
    border: none;
    padding: 5px 10px;
    border-radius: 0px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

    .icon {
      box-icon {
        height: 15px;
        width: 15px;
      }
    }

    .text {
      margin-left: 5px;
      text-decoration: none;
    }

    @media ${breakPoints.mobile} {
      display: none;
    }
  }

  .sidebar {
    display: none;
    background: none;
    border: none;

    @media ${breakPoints.mobile} {
      display: block;
      margin-top: 5px;
      margin-right: 0px;
    }
  }
`;

const ComposeButton = styled.button``;

const NavBar = () => {
  return (
    <Nav>
      <button className="sidebar">
        <div className="icon">
          <box-icon name="menu"></box-icon>
        </div>
      </button>
      <img className="logo" src="/TECHTOREHAB.svg" />
      <a className="navItem">
        <box-icon name="home-smile" type="solid"></box-icon>{" "}
      </a>
      <a className="navItem">
        <box-icon name="grid-alt" type="solid"></box-icon>{" "}
      </a>
      <a className="navItem">
        <box-icon type="solid" name="info-circle"></box-icon>{" "}
      </a>
      <button class="composeButton">
        <div className="icon">
          <box-icon type="solid" name="pencil"></box-icon>
        </div>
        <a href="#" className="text">
          COMPOSE
        </a>
      </button>
    </Nav>
  );
};

export default NavBar;
