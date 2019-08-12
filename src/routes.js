import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login/index";
import Main from "./components/Main/index";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/dev/:id" component={Main} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
