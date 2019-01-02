import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link, HashRouter, Switch } from "react-router-dom";

import IssueList from "./components/IssueList";
import IssueEdit from "./components/IssueEdit";

const contentNode = document.getElementById("contents");
const NoMatch = () => React.createElement(
  "p",
  null,
  "Page Not Found"
);
const RoutedApp = () => React.createElement(
  HashRouter,
  null,
  React.createElement(
    Switch,
    null,
    React.createElement(Route, { path: "/", component: IssueList }),
    React.createElement(Route, { path: "/issueEdit", component: IssueEdit }),
    React.createElement(Route, { path: "*", component: NoMatch })
  )
);

// ReactDOM.render(<IssueList />, contentNode);
ReactDOM.render(React.createElement(RoutedApp, null), contentNode);