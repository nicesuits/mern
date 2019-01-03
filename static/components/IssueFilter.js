import React from "react";

export default class IssueFilter extends React.Component {
  constructor() {
    super();
    this.clearFilter = this.clearFilter.bind(this);
    this.setFilterNew = this.setFilterNew.bind(this);
    this.setFilterOpen = this.setFilterOpen.bind(this);
    this.setFilterAssigned = this.setFilterAssigned.bind(this);
  }
  setFilterAssigned(e) {
    e.preventDefault();
    this.props.setFilter({ status: "Assigned" });
  }
  setFilterNew(e) {
    e.preventDefault();
    this.props.setFilter({ status: "New" });
  }
  setFilterOpen(e) {
    e.preventDefault();
    this.props.setFilter({ status: "Open" });
  }
  clearFilter(e) {
    e.preventDefault();
    this.props.setFilter({});
  }
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
        "a",
        { href: "#", onClick: this.clearFilter },
        "All Issues"
      ),
      React.createElement(Separator, null),
      React.createElement(
        "a",
        { href: "#", onClick: this.setFilterOpen },
        "Open Issues"
      ),
      React.createElement(Separator, null),
      React.createElement(
        "a",
        { href: "#", onClick: this.setFilterNew },
        "New Issues"
      ),
      React.createElement(Separator, null),
      React.createElement(
        "a",
        { href: "#", onClick: this.setFilterAssigned },
        "Assigned Issues"
      )
    );
  }
}