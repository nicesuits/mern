import React from "react";
import { Link } from "react-router-dom";

export default class IssueFilter extends React.Component {
  render() {
    const Separator = () => React.createElement(
      "span",
      null,
      " | "
    );
    return React.createElement(
      "div",
      null,
      React.createElement(
        Link,
        { to: "/issues" },
        "All Issues"
      ),
      React.createElement(Separator, null),
      React.createElement(
        Link,
        { to: "/issues?status=Open" },
        "Open Issues"
      ),
      React.createElement(Separator, null),
      React.createElement(
        Link,
        { to: "/issues?status=Assigned" },
        "Assigned Issues"
      )
    );
  }
}