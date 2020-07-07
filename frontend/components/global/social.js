import React from "react";
import SocialLogin from "react-social-login";
import { Button } from "antd";

class SocialButton extends React.Component {
  render() {
    return (
      <Button
        icon={this.props.icon}
        size="large"
        className="mg-y-10 socialButton"
        onClick={this.props.triggerLogin}
        style={{
          border: "none",
          background: "#2f3545",
          color: "white",
          boxShadow: `5px 5px rgba(24, 144, 255, 0.4),
          10px 10px rgba(24, 144, 255, 0.3),
          15px 15px rgba(24, 144, 255, 0.2),
          20px 20px rgba(24, 144, 255, 0.1),
          25px 25px rgba(24, 144, 255, 0.05)`,
        }}
        {...this.props}
      >
        {this.props.children}
      </Button>
    );
  }
}

export default SocialLogin(SocialButton);
