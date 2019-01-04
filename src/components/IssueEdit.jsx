import React, { Component } from "react";
import { Link } from "react-router-dom";

import NumInput from "./NumInput.jsx";

export default class IssueEdit extends Component {
  constructor() {
    super();
    this.state = {
      issue: {
        _id: "",
        title: "",
        status: "",
        owner: "",
        effort: null,
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
    if (prevProps.match.params.id !== this.props.match.params.id)
      this.loadData();
  }
  onChange(e) {
    const issue = { ...this.state.issue };
    const value =
      convertedValue !== undefined ? convertedValue : event.target.value;
    issue[e.target.name] = value;
    this.setState({ issue });
  }
  loadData() {
    fetch(`/api/issues/${this.props.match.params.id}`).then(response => {
      if (response.ok) {
        response.json().then(issue => {
          issue.created = new Date(issue.created).toDateString();
          issue.completionDate =
            issue.completionDate != null
              ? new Date(issue.completionDate).toDateString()
              : "";
          this.setState({ issue });
        });
      } else {
        response.json().then(err => {
          console.error(
            `[MongoDB - Update ERROR]: Error in fetching data from server: ${
              err.message
            }`
          );
        });
      }
    });
  }
  render() {
    const issue = this.state.issue;
    return (
      <div>
        <form>
          ID: {issue._id}
          <br />
          Created: {issue.created}
          <br />
          Status:{" "}
          <select name="status" value={issue.status} onChange={this.onChange}>
            <option value="New">New</option>
            <option value="Open">Open</option>
            <option value="Assigned">Assigned</option>
            <option value="Fixed">Fixed</option>
            <option value="Verified">Verified</option>
            <option value="Closed">Closed</option>
          </select>
          <br />
          Owner:{" "}
          <input
            type="text"
            name="owner"
            value={issue.owner}
            onChange={this.onChange}
          />
          <br />
          Effort:{" "}
          <NumInput
            size={5}
            name="effort"
            value={issue.effort}
            onChange={this.onChange}
          />
          <br />
          Completion Date:{" "}
          <input
            type="text"
            name="completionDate"
            value={issue.completionDate}
            onChange={this.onChange}
          />
          <br />
          Title:{" "}
          <input
            type="text"
            size={50}
            name="title"
            value={issue.title}
            onChange={this.onChange}
          />
          <br />
          <button type="submit">Submit</button>
          <br />
          <Link to="/issues">Back to issue list</Link>
        </form>
      </div>
    );
  }
}
