import styled from "styled-components";
import { breakPoints } from "components/global/responsive";

export const Reactions = styled.div`
  display: flex;

  .reaction-holder {
    display: flex;
    margin: 0px 10px;
    .reaction {
      font-size: 20px;
      i {
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      margin-right: -24px;
    }
    .reaction-count {
      margin-left: 30px;
      @media ${breakPoints.mobile} {
        display: none;
      }
    }
  }

  .reaction-total {
    line-height: 2.5;
    margin-left: 25px;
  }

  .reaction-name {
    line-height: 2.5;

    @media ${breakPoints.mobile} {
      margin-left: 20px;
    }
  }
`;
