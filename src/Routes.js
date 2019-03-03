import React from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
    </Switch>
  );
}
