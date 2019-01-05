import React from "react";
import { Button } from "react-bootstrap";

export default class IssueFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.initFilter.status || "",
      effort_gte: props.initFilter.effort_gte || "",
      effort_lte: props.initFilter.effort_lte || "",
      changed: false
    };
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeEffortGte = this.onChangeEffortGte.bind(this);
    this.onChangeEffortLte = this.onChangeEffortLte.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      status: newProps.initFilter.status || "",
      effort_gte: newProps.initFilter.effort_gte || "",
      effort_lte: newProps.initFilter.effort_lte || "",
      changed: false
    });
  }
  resetFilter() {
    this.setState({
      status: this.props.initFilter.status || "",
      effort_gte: this.props.initFilter.effort_gte || "",
      effort_lte: this.props.initFilter.effort_lte || "",
      changed: false
    });
  }
  clearFilter() {
    this.props.setFilter({});
  }
  onChangeStatus(e) {
    this.setState({ status: e.target.value, changed: true });
  }
  onChangeEffortGte(e) {
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/))
      this.setState({ effort_gte: e.target.value, changed: true });
  }
  onChangeEffortLte(e) {
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/))
      this.setState({ effort_lte: e.target.value, changed: true });
  }
  applyFilter() {
    const newFilter = {};
    if (this.state.status) newFilter.status = this.state.status;
    if (this.state.effort_gte) newFilter.effort_gte = this.state.effort_gte;
    if (this.state.effort_lte) newFilter.effort_lte = this.state.effort_lte;
    this.props.setFilter(newFilter);
  }
  render() {
    return (
      <div className="input-group">
        Status:
        <select value={this.state.status} onChange={this.onChangeStatus}>
          <option value="">(Any)</option>
          <option value="New">New</option>
          <option value="Open">Open</option>
          <option value="Assigned">Assigned</option>
          <option value="Fixed">Fixed</option>
          <option value="Verified">Verified</option>
          <option value="Closed">Closed</option>
        </select>
        &nbsp;Effort between:
        <input
          className="form-control"
          type="number"
          size={5}
          value={this.state.effort_gte}
          onChange={this.onChangeEffortGte}
        />
        &nbsp;-&nbsp;
        <input
          className="form-control"
          type="number"
          size={5}
          value={this.state.effort_lte}
          onChange={this.onChangeEffortLte}
        />
        <Button className="btn btn-primary" onClick={this.applyFilter}>
          Apply
        </Button>
        <Button
          className="btn btn-primary"
          onClick={this.resetFilter}
          disabled={!this.state.changed}
        >
          Reset
        </Button>
        <Button className="btn btn-primary" onClick={this.clearFilter}>
          Clear
        </Button>
      </div>
    );
  }
}
