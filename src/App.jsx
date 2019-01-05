import React from "react";
import ReactDOM from "react-dom";
import {
  Route,
  Redirect,
  BrowserRouter,
  Switch,
  withRouter
} from "react-router-dom";

import IssueList from "./components/IssueList";
import IssueEdit from "./components/IssueEdit";

const contentNode = document.getElementById("contents");
const NoMatch = () => <p>Page Not Found</p>;
const App = () => (
  <div className="container-fluid">
    <header className="header">
      <h1>Issue Tracker</h1>
    </header>
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
