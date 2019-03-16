import React from "react";
import { Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AppliedRoute from "./components/AppliedRoute";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";

export default function Routes({ childProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Landing} props={childProps} />
      <AppliedRoute
        exact
        path="/register"
        component={Register}
        props={childProps}
      />
      <AppliedRoute exact path="/login" component={Login} props={childProps} />
      {/* <AppliedRoute
        exact
        path="/dashboard"
        component={Dashboard}
        props={childProps}
      /> */}
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/create-profile" component={CreateProfile} />
      <PrivateRoute exact path="/edit-profile" component={EditProfile} />
      <PrivateRoute exact path="/add-experience" component={AddExperience} />
    </Switch>
  );
}
