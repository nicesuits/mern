import React from "react";
import ReactDOM from "react-dom";
import { Route, HashRouter, Switch } from "react-router-dom";

import IssueList from "./components/IssueList";
import IssueEdit from "./components/IssueEdit";

const contentNode = document.getElementById("contents");
const NoMatch = () => <p>Page Not Found</p>;
const RoutedApp = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={IssueList} />
      <Route exact path="/issueEdit" component={IssueEdit} />
      <Route path="*" component={NoMatch} />
    </Switch>
  </HashRouter>
);

ReactDOM.render(<RoutedApp />, contentNode);
