"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _IssueAdd = require("./IssueAdd");

var _IssueAdd2 = _interopRequireDefault(_IssueAdd);

var _IssueFilter = require("./IssueFilter");

var _IssueFilter2 = _interopRequireDefault(_IssueFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function IssueTable(props) {
  var issueRows = props.issues.map(function (issue) {
    return React.createElement(IssueRow, { key: issue._id, issue: issue });
  });
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

var IssueRow = function IssueRow(props) {
  return React.createElement(
    "tr",
    null,
    React.createElement(
      "td",
      null,
      props.issue._id
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
};

var IssueList = function (_React$Component) {
  _inherits(IssueList, _React$Component);

  function IssueList() {
    _classCallCheck(this, IssueList);

    var _this = _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).call(this));

    _this.state = { issues: [] };
    _this.createIssue = _this.createIssue.bind(_this);
    return _this;
  }

  _createClass(IssueList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function loadData() {
      var _this2 = this;

      fetch("/api/issues").then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log("Total count of records: " + data._metadata.total_count);
            data.records.forEach(function (issue) {
              issue.created = new Date(issue.created);
              if (issue.completionDate) issue.completionDate = new Date(issue.completionDate);
            });
            _this2.setState({ issues: data.records });
          });
        } else {
          response.json().then(function (err) {
            console.error("[API GET - Failed to fetch issues]: " + err.message);
          });
        }
      }).catch(function (err) {
        console.error("[API GET - ERROR to fetch issues]: " + err);
      });
    }
  }, {
    key: "createIssue",
    value: function createIssue(newIssue) {
      var _this3 = this;

      fetch("/api/issues", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newIssue)
      }).then(function (response) {
        return response.json();
      }).then(function (updatedIssue) {
        updatedIssue.created = new Date(updatedIssue.created);
        if (updatedIssue.completionDate) updatedIssue.completionDate = new Date(updatedIssue.completionDate);
        var newIssues = _this3.state.issues.concat(updatedIssue);
        _this3.setState({ issues: newIssues });
      }).catch(function (err) {
        return console.error("Error in sending data to server: " + err.message);
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          null,
          "Issue Tracker"
        ),
        React.createElement(_IssueFilter2.default, null),
        React.createElement("hr", null),
        React.createElement(IssueTable, { issues: this.state.issues }),
        React.createElement("hr", null),
        React.createElement(_IssueAdd2.default, { createIssue: this.createIssue })
      );
    }
  }]);

  return IssueList;
}(React.Component);

exports.default = IssueList;