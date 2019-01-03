import React from "react";
import ReactDOM from "react-dom";
import { Route, Redirect, HashRouter, Switch } from "react-router-dom";

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
    React.createElement(Redirect, { exact: true, from: "/", to: "/issues" }),
    React.createElement(Route, { exact: true, path: "/issues", component: IssueList }),
    React.createElement(Route, { exact: true, path: "/issues/:id", component: IssueEdit }),
    React.createElement(Route, { path: "*", component: NoMatch })
  )
);

ReactDOM.render(React.createElement(RoutedApp, null), contentNode);