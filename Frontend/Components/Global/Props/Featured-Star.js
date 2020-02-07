import styled from "styled-components";

const Star = styled.div`
  margin: 0;
  padding: 0;

  .featured-holder {
    position: absolute;
    margin-left: 30px;
    margin-top: -26px;

    svg {
      height: 30px;
      width: 30px;
    }
  }

  .featured-star {
    border-radius: 50%;
    background-image: linear-gradient(135deg, #f6d242 10%, #ff52e5 100%);
    width: 24px;
    height: 24px;
    position: absolute;
    margin-top: -15px;
    margin-left: 33px;
    box-icon {
      fill: white;
      height: 16px;
      width: 16px;
      margin: 3px 4px;
      stroke-width: 2px;
    }
  }
`;

const FeaturedStar = () => {
  return (
    <Star>
      <div className="featured-holder">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 1000 437"
        >
          <path
            fill="#FFFFFF"
            stroke="none"
            d="M0 493.5C0 220.947 223.858 0 500 0s500 220.947 500 493.5C1000 766.052 776.142 987 500 987S0 766.052 0 493.5z"
          ></path>
        </svg>
      </div>

      <div className="featured-star">
        <box-icon type="solid" name="star"></box-icon>
      </div>
    </Star>
  );
};

export default FeaturedStar;
