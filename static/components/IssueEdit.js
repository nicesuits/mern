import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class IssueEdit extends Component {
  render() {
    console.log(this.props);
    return React.createElement(
      "div",
      null,
      React.createElement(
        "p",
        null,
        "This is a placeholder for editing issues",
        " ",
        this.props.location.pathname
      ),
      React.createElement(
        Link,
        { to: "/issues" },
        "Back to issue list"
      )
    );
  }
}