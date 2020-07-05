import React, { useEffect } from "react";
import { debounce } from "lodash";
import ReactDOM from "react-dom";
import Editor from "rich-markdown-editor";
var element;
var savedText;
const defaultValue = savedText;

const docSearchResults = [
  {
    title: "Hiring",
    url: "/doc/hiring",
  },
  {
    title: "Product Roadmap",
    url: "/doc/product-roadmap",
  },
  {
    title: "Finances",
    url: "/doc/finances",
  },
  {
    title: "Super secret stuff",
    url: "/doc/secret-stuff",
  },
  {
    title: "Meeting notes",
    url: "/doc/meeting-notes",
  },
];

class YoutubeEmbed extends React.Component {
  render() {
    const { attrs } = this.props;
    const videoId = attrs.matches[1];

    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?modestbranding=1`}
      />
    );
  }
}

class Example extends React.Component {
  state = {
    readOnly: false,
    value: undefined,
  };

  handleToggleReadOnly = () => {
    this.setState({ readOnly: !this.state.readOnly });
  };

  handleToggleDark = () => {
    const dark = !this.state.dark;
    this.setState({ dark });
  };

  handleUpdateValue = () => {
    const existing = localStorage.getItem("saved") || "";
    const value = `${existing}\n\nedit!`;
    this.setState({ value });
  };

  handleChange = debounce((value) => {
    const text = value();
    console.log(text);
  }, 250);

  render() {
    return (
      <div>
        <div>
          <br />
        </div>
        <br />
        <br />
        <Editor id="example" defaultValue={defaultValue} />
      </div>
    );
  }
}

export default Example;
