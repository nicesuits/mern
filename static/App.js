import React from "react";
import ReactDOM from "react-dom";
import { Route, Redirect, BrowserRouter, Switch, withRouter } from "react-router-dom";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import IssueList from "./components/IssueList";
import IssueEdit from "./components/IssueEdit";

const contentNode = document.getElementById("contents");
const NoMatch = () => React.createElement(
  "p",
  null,
  "Page Not Found"
);
const Header = () => React.createElement(
  Navbar,
  null,
  React.createElement(
    Navbar.Header,
    null,
    React.createElement(
      Navbar.Brand,
      null,
      "Issue Tracker"
    )
  ),
  React.createElement(
    Nav,
    null,
    React.createElement(
      LinkContainer,
      { to: "/issues" },
      React.createElement(
        NavItem,
        null,
        "Issues"
      )
    ),
    React.createElement(
      LinkContainer,
      { to: "/reports" },
      React.createElement(
        NavItem,
        null,
        "Reports"
      )
    )
  ),
  React.createElement(
    Nav,
    { pullRight: true },
    React.createElement(
      NavItem,
      null,
      React.createElement(Glyphicon, { glyph: "plus" }),
      "Create Issue"
    ),
    React.createElement(
      NavDropdown,
      {
        id: "user-dropdown",
        title: React.createElement(Glyphicon, { glyph: "option-horizontal" }),
        noCaret: true
      },
      React.createElement(
        MenuItem,
        null,
        "Logout"
      )
    )
  )
);
const App = () => React.createElement(
  "div",
  { className: "container-fluid" },
  React.createElement(Header, null),
  React.createElement(
    "main",
    { className: "contents" },
    React.createElement(
      BrowserRouter,
      null,
      React.createElement(
        Switch,
        null,
        React.createElement(Route, { exact: true, path: "/issues", component: withRouter(IssueList) }),
        React.createElement(Route, { exact: true, path: "/issues/:id", component: IssueEdit }),
        React.createElement(Route, { path: "*", component: NoMatch })
      )
    )
  ),
  React.createElement(
    "footer",
    { className: "footer" },
    "Full source code available at GitHub.com",
    " ",
    React.createElement(
      "a",
      { href: "https://github.com/raion314/mern", target: "_blank" },
      "Repo"
    )
  )
);

const RoutedApp = () => React.createElement(
  BrowserRouter,
  null,
  React.createElement(
    Switch,
    null,
    React.createElement(Redirect, { exact: true, from: "/", to: "/issues" }),
    React.createElement(Route, { path: "/", component: App })
  )
);

ReactDOM.render(React.createElement(RoutedApp, null), contentNode);