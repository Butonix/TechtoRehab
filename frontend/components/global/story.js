import styled from "styled-components";
import { Typography, Space } from "antd";

const { Text } = Typography;
const Story = styled.div`
  display: flex;
  flex-flow: column;
  height: 615px;
  width: 369px;
  font-size: 14px;
  font-weight: 600;
  position: relative;
  margin: 0 20px;
  color: white;
  :after {
    position: absolute;
    z-index: 2;
  }
  .image {
    z-index: 1;
    background-image: url("https://dynaimage-cdn-cnn-com.cdn.ampproject.org/i/s/dynaimage.cdn.cnn.com/cnn/w_768,h_1024,c_scale/https%3A%2F%2Fdynaimage.cdn.cnn.com%2Fcnn%2Fx_552%2Cy_0%2Cw_798%2Ch_1064%2Cc_crop%2Fhttps%253A%252F%252Fstamp.static.cnn.io%252F5b3f861ad045070021cb6c51%252FAntarctica-cover%252520image.jpg");
    background-size: cover;
    background-position: center;
    height: 615px;
    width: 369px;
  }

  .filter {
    z-index: 2;
    position: absolute;
    height: 100%;
    width: 100%;
    background-image: linear-gradient(
      180deg,
      transparent,
      transparent 50%,
      rgba(11, 11, 11, 0.8)
    );
  }
  .content {
    position: absolute;
    bottom: 0;
    margin-bottom: 20px;
    width: 350px;
    z-index: 3;
    padding: 32px;

    .logo {
      margin: 10px 0px;
      img {
        height: 40px;
        width: 40px;
      }
    }

    .category {
      margin: 5px 0px;
      font-size: 14px;
    }

    .title {
      font-size: 20px;
      line-height: 1.3;
      font-weight: 700;
    }

    .author {
      margin: 5px 0px;
      font-size: 12px;
    }

    .date {
      font-size: 12px;
    }
  }
`;

const Stories = (props) => {
  return (
    <Story>
      <div
        className="image"
        style={{
          backgroundImage: `url(${props.image})`,
        }}
      />
      <div className="filter" />
      <div className="content">
        {props.logo ? (
          <div className="logo">
            <img src="http://localhost:3000/art.svg" />
          </div>
        ) : null}
        <div className="category">{props.category}</div>
        <div className="title">{props.title}</div>
        <div className="summary">{props.content}</div>
        <div className="author">
          {props.authors
            ? props.authors.map((mappedAuthor, index) => {
                return (
                  <Text style={{ color: "white", textDecoration: "none" }}>
                    {index == 0 ? "By" + " " : null}
                    {index < props.authors.length && index != 0
                      ? " and "
                      : null}
                    <a
                      href={`${process.env.NEXT_PUBLIC_WEB_ADDRESS}/authors/${mappedAuthor}`}
                    >
                      {mappedAuthor}
                    </a>
                  </Text>
                );
              })
            : null}
        </div>
        <div className="date">
          {props.date
            ? "Published" +
              " " +
              new Date(props.date)
                .toLocaleDateString("en-IN")
                .replace(" ", ",  ")
            : null}
        </div>
      </div>
    </Story>
  );
};

export default Stories;
