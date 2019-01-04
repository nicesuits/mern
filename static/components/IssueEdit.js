import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class IssueEdit extends Component {
  constructor() {
    super();
    this.state = {
      issue: {
        _id: "",
        title: "",
        status: "",
        owner: "",
        effort: "",
        completionDate: "",
        created: ""
      }
    };
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) this.loadData();
  }
  onChange(e) {
    const issue = Object.assign({}, this.state.issue);
    issue[e.target.name] = e.target.value;
    this.setState({ issue });
  }
  loadData() {
    fetch(`/api/issues/${this.props.match.params.id}`).then(response => {
      if (response.ok) {
        response.json().then(issue => {
          issue.created = new Date(issue.created).toDateString();
          issue.completionDate = issue.completionDate != null ? new Date(issue.completionDate).toDateString() : "";
          issue.effort = issue.effort != null ? issue.effort.toString() : "";
          this.setState({ issue });
        });
      } else {
        response.json().then(err => {
          console.error(`[MongoDB - Update ERROR]: Error in fetching data from server: ${err.message}`);
        });
      }
    });
  }
  render() {
    const issue = this.state.issue;
    return React.createElement(
      "div",
      null,
      React.createElement(
        "form",
        null,
        "ID: ",
        issue._id,
        React.createElement("br", null),
        "Created: ",
        issue.created,
        React.createElement("br", null),
        "Status:",
        " ",
        React.createElement(
          "select",
          { name: "status", value: issue.status, onChange: this.onChange },
          React.createElement(
            "option",
            { value: "New" },
            "New"
          ),
          React.createElement(
            "option",
            { value: "Open" },
            "Open"
          ),
          React.createElement(
            "option",
            { value: "Assigned" },
            "Assigned"
          ),
          React.createElement(
            "option",
            { value: "Fixed" },
            "Fixed"
          ),
          React.createElement(
            "option",
            { value: "Verified" },
            "Verified"
          ),
          React.createElement(
            "option",
            { value: "Closed" },
            "Closed"
          )
        ),
        React.createElement("br", null),
        "Owner:",
        " ",
        React.createElement("input", {
          type: "text",
          name: "owner",
          value: issue.owner,
          onChange: this.onChange
        }),
        React.createElement("br", null),
        "Effort:",
        " ",
        React.createElement("input", {
          type: "number",
          size: 5,
          name: "effort",
          value: issue.effort,
          onChange: this.onChange
        }),
        React.createElement("br", null),
        "Completion Date:",
        " ",
        React.createElement("input", {
          type: "text",
          name: "completionDate",
          value: issue.completionDate,
          onChange: this.onChange
        }),
        React.createElement("br", null),
        "Title:",
        " ",
        React.createElement("input", {
          type: "text",
          size: 50,
          name: "title",
          value: issue.title,
          onChange: this.onChange
        }),
        React.createElement("br", null),
        React.createElement(
          "button",
          { type: "submit" },
          "Submit"
        ),
        React.createElement("br", null),
        React.createElement(
          Link,
          { to: "/issues" },
          "Back to issue list"
        )
      )
    );
  }
}