import React from "react";
import ReactDOM from "react-dom";
import {
  Route,
  Redirect,
  BrowserRouter,
  Switch,
  withRouter
} from "react-router-dom";
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Glyphicon
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import IssueList from "./components/IssueList";
import IssueEdit from "./components/IssueEdit";

const contentNode = document.getElementById("contents");
const NoMatch = () => <p>Page Not Found</p>;
const Header = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>Issue Tracker</Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <LinkContainer to="/issues">
        <NavItem>Issues</NavItem>
      </LinkContainer>
      <LinkContainer to="/reports">
        <NavItem>Reports</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <NavItem>
        <Glyphicon glyph="plus" />
        Create Issue
      </NavItem>
      <NavDropdown
        id="user-dropdown"
        title={<Glyphicon glyph="option-horizontal" />}
        noCaret
      >
        <MenuItem>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </Navbar>
);
const App = () => (
  <div className="container-fluid">
    <Header />
    <main className="contents">
      <BrowserRouter>
        <Switch>
          <Route exact path="/issues" component={withRouter(IssueList)} />
          <Route exact path="/issues/:id" component={IssueEdit} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </BrowserRouter>
    </main>
    <footer className="footer">
      Full source code available at GitHub.com{" "}
      <a href="https://github.com/raion314/mern" target="_blank">
        Repo
      </a>
    </footer>
  </div>
);

const RoutedApp = () => (
  <BrowserRouter>
    <Switch>
      <Redirect exact from="/" to="/issues" />
      <Route path="/" component={App} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(<RoutedApp />, contentNode);
