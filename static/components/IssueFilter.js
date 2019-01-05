import React from "react";
import { Button, Col, Row, FormGroup, FormControl, ControlLabel, InputGroup, ButtonToolbar } from "react-bootstrap";

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
    if (effortString.match(/^\d*$/)) this.setState({ effort_gte: e.target.value, changed: true });
  }
  onChangeEffortLte(e) {
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/)) this.setState({ effort_lte: e.target.value, changed: true });
  }
  applyFilter() {
    const newFilter = {};
    if (this.state.status) newFilter.status = this.state.status;
    if (this.state.effort_gte) newFilter.effort_gte = this.state.effort_gte;
    if (this.state.effort_lte) newFilter.effort_lte = this.state.effort_lte;
    this.props.setFilter(newFilter);
  }
  render() {
    return React.createElement(
      Row,
      null,
      React.createElement(
        Col,
        { xs: 6, sm: 4, md: 3, lg: 2 },
        React.createElement(
          FormGroup,
          null,
          React.createElement(
            ControlLabel,
            null,
            "Status:"
          ),
          React.createElement(
            FormControl,
            {
              componentClass: "select",
              value: this.state.status,
              onChange: this.onChangeStatus
            },
            React.createElement(
              "option",
              { value: "" },
              "(Any)"
            ),
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
          )
        )
      ),
      React.createElement(
        Col,
        { xs: 6, sm: 4, md: 3, lg: 2 },
        React.createElement(
          FormGroup,
          null,
          React.createElement(
            ControlLabel,
            null,
            "Effort"
          ),
          React.createElement(
            InputGroup,
            null,
            React.createElement(FormControl, {
              type: "number",
              value: this.state.effort_gte,
              onChange: this.onChangeEffortGte
            }),
            React.createElement(
              InputGroup.Addon,
              null,
              "-"
            ),
            React.createElement(FormControl, {
              type: "number",
              value: this.state.effort_lte,
              onChange: this.onChangeEffortLte
            })
          )
        )
      ),
      React.createElement(
        Col,
        { xs: 6, sm: 4, md: 3, lg: 2 },
        React.createElement(
          FormGroup,
          null,
          React.createElement(
            ControlLabel,
            null,
            "\xA0"
          ),
          React.createElement(
            ButtonToolbar,
            null,
            React.createElement(
              Button,
              { bsStyle: "primary", onClick: this.applyFilter },
              "Apply"
            ),
            React.createElement(
              Button,
              { onClick: this.resetFilter, disabled: !this.state.changed },
              "Reset"
            ),
            React.createElement(
              Button,
              { onClick: this.clearFilter },
              "Clear"
            )
          )
        )
      )
    );
  }
}