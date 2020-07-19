import React from "react"
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {APPS} from "../../constants";
import {Routes} from "../../config/routes";
import {APPS_CONFIG} from "../../config/apps";

import App from "../App";
import InvalidPage from "../InvalidPage";


const getRoute = match => {
  return (appName, index) => {
    const RenderComponent = appName === APPS.NO_APP ? InvalidPage : App;
    return (
      <Route
        key={index}
        path={APPS_CONFIG[appName].getUrl(match)}
        render={() => <RenderComponent appName={appName}/>}
      />
    );
  };
};

const AppRouter = ({match}) => {
  return (
    <Switch>
      {Object.values(APPS).map(getRoute(match))}
      <Redirect
        to={{
          pathname: `${match.url}${Routes[APPS.NO_APP]}`,
          state: {isInternalApplicationRedirect: true}
        }}
      />
    </Switch>
  );
};

export default withRouter(AppRouter);
