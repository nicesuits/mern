import React from "react";
import { Button } from "react-bootstrap";

export default class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    let form = document.forms.issueAdd;
    this.props.createIssue({
      owner: form.owner.value,
      title: form.title.value,
      status: "New",
      created: new Date()
    });
    form.owner.value = "";
    form.title.value = "";
  }
  render() {
    return (
      <div>
        <form
          className="input-group"
          name="issueAdd"
          onSubmit={this.handleSubmit}
        >
          <input
            className="form-control"
            type="text"
            name="owner"
            placeholder="Owner"
          />
          <input
            className="form-control"
            type="text"
            name="title"
            placeholder="Title"
          />
          <Button className="btn btn-primary">Add</Button>
        </form>
      </div>
    );
  }
}
