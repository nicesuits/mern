import React from "react";
import ReactDOM from "react-dom";

import IssueList from "./components/IssueList";

const contentNode = document.getElementById("contents");

ReactDOM.render(React.createElement(IssueList, null), contentNode);