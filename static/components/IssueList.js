import React from "react";
import { Link } from "react-router-dom";

import IssueAdd from "./IssueAdd";
import IssueFilter from "./IssueFilter";

function IssueTable(props) {
  const issueRows = props.issues.map(issue => React.createElement(IssueRow, { key: issue._id, issue: issue }));
  return React.createElement(
    "table",
    { className: "bordered-table" },
    React.createElement(
      "thead",
      null,
      React.createElement(
        "tr",
        null,
        React.createElement(
          "th",
          null,
          "ID"
        ),
        React.createElement(
          "th",
          null,
          "Status"
        ),
        React.createElement(
          "th",
          null,
          "Owner"
        ),
        React.createElement(
          "th",
          null,
          "Created"
        ),
        React.createElement(
          "th",
          null,
          "Effort"
        ),
        React.createElement(
          "th",
          null,
          "Completion Date"
        ),
        React.createElement(
          "th",
          null,
          "Title"
        )
      )
    ),
    React.createElement(
      "tbody",
      null,
      issueRows
    )
  );
}

const IssueRow = props => React.createElement(
  "tr",
  null,
  React.createElement(
    "td",
    null,
    React.createElement(
      Link,
      { to: `/issues/${props.issue._id}` },
      props.issue._id.substr(-4)
    )
  ),
  React.createElement(
    "td",
    null,
    props.issue.status
  ),
  React.createElement(
    "td",
    null,
    props.issue.owner
  ),
  React.createElement(
    "td",
    null,
    props.issue.created.toDateString()
  ),
  React.createElement(
    "td",
    null,
    props.issue.effort
  ),
  React.createElement(
    "td",
    null,
    props.issue.completionDate ? props.issue.completionDate.toDateString() : ""
  ),
  React.createElement(
    "td",
    null,
    props.issue.title
  )
);

export default class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };
    this.createIssue = this.createIssue.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate(prevProps) {
    const oldQuery = prevProps.location.search;
    const newQuery = this.props.location.search;
    if (oldQuery.status === newQuery.status) {
      return;
    }
    this.loadData();
  }
  loadData() {
    fetch(`/api/issues${this.props.location.search}`).then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log(`Total count of records: ${data._metadata.total_count}`);
          data.records.forEach(issue => {
            issue.created = new Date(issue.created);
            if (issue.completionDate) issue.completionDate = new Date(issue.completionDate);
          });
          this.setState({ issues: data.records });
        });
      } else {
        response.json().then(err => {
          console.error(`[API GET - Failed to fetch issues]: ${err.message}`);
        });
      }
    }).catch(err => {
      console.error(`[API GET - ERROR to fetch issues]: ${err}`);
    });
  }
  createIssue(newIssue) {
    fetch("/api/issues", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newIssue)
    }).then(response => response.json()).then(updatedIssue => {
      updatedIssue.created = new Date(updatedIssue.created);
      if (updatedIssue.completionDate) updatedIssue.completionDate = new Date(updatedIssue.completionDate);
      const newIssues = this.state.issues.concat(updatedIssue);
      this.setState({ issues: newIssues });
    }).catch(err => console.error(`Error in sending data to server: ${err.message}`));
  }
  render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        "Issue Tracker"
      ),
      React.createElement(IssueFilter, null),
      React.createElement("hr", null),
      React.createElement(IssueTable, { issues: this.state.issues }),
      React.createElement("hr", null),
      React.createElement(IssueAdd, { createIssue: this.createIssue })
    );
  }
}