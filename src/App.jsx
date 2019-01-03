import React from "react";
import ReactDOM from "react-dom";
import {
  Route,
  Redirect,
  HashRouter,
  Switch,
  withRouter
} from "react-router-dom";

import IssueList from "./components/IssueList";
import IssueEdit from "./components/IssueEdit";

const contentNode = document.getElementById("contents");
const NoMatch = () => <p>Page Not Found</p>;
const RoutedApp = () => (
  <HashRouter>
    <Switch>
      <Redirect exact from="/" to="/issues" />
      <Route exact path="/issues" component={withRouter(IssueList)} />
      <Route exact path="/issues/:id" component={IssueEdit} />
      <Route path="*" component={NoMatch} />
    </Switch>
  </HashRouter>
);

ReactDOM.render(<RoutedApp />, contentNode);
