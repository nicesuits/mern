"use strict";

var _IssueList = require("./components/IssueList");

var _IssueList2 = _interopRequireDefault(_IssueList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contentNode = document.getElementById("contents");

ReactDOM.render(React.createElement(_IssueList2.default, null), contentNode);