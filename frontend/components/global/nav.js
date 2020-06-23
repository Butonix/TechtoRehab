import { Row, Col, Typography, Button } from "antd";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import { breakPoints } from "./responsive";

const Nav = styled.div`
  display: flex;
  padding: 10px 15px;
  background: white;
  box-shadow: 0px 2px 5px 1px #eeeeee;
  z-index: 2;

  @media ${breakPoints.mobile} {
    padding: 13px 15px 5px 15px;
  }

  .logo-holder {
    line-height: 2.7 !important;

    .logo {
      max-width: 130px;
    }
  }

  .sidebar {
    display: none;
    margin-top: 2px;
    @media ${breakPoints.mobile} {
      display: block;
    }

    @media ${breakPoints.iPad} {
      display: block;
    }
  }

  .navigation {
    line-height: 2.8;
  }
  .desktop-link {
    display: block;
    margin: 0px 10px;
    a {
      line-height: 2.3;
    }

    @media ${breakPoints.mobile} {
      display: none;
    }

    @media ${breakPoints.iPad} {
      display: none;
    }
  }
`;

const { Text } = Typography;

const Navigation = () => {
  const setSidebar = useStoreActions((actions) => actions.site.setSidebar);
  const sidebar = useStoreState((state) => state.site.sidebar);

  return (
    <Nav>
      <div className="navigation sidebar">
        <a onClick={(e) => e.preventDefault()}>
          <i
            className={
              sidebar
                ? "ri-menu-2-line " + "ri-lg  lh-2"
                : "ri-menu-3-line " + "ri-lg  lh-2"
            }
            onClick={() => setSidebar(!sidebar)}
          ></i>
        </a>
      </div>
      <div className="navigation logo-holder mr-auto ml-10">
        <a href="/">
          <img className="logo" src="/TTR-LIGHT.svg" />
        </a>
      </div>
      <div className="navigation desktop-link">
        <a>
          <Text>Categories</Text>
        </a>
      </div>
      <div className="navigation">
        <Button type="primary" shape="round">
          Create
        </Button>
      </div>
      <div className="navigation">
        <Button type="text">Sign out</Button>
      </div>
    </Nav>
  );
};

export default Navigation;
