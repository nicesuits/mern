import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class IssueEdit extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <p>
          This is a placeholder for editing issues{" "}
          {this.props.location.pathname}
        </p>
        <Link to="/issues">Back to issue list</Link>
      </div>
    );
  }
}
