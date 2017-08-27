/**
 * Created by dfc on 2017/8/25.
 */
/*
 import React from "react";
 import {Route, IndexRedirect} from "react-router";
 import App from "./view/App";
 import Home from "./view/Home";

 const routes = (
 <Route path="/" component={App}>
 <IndexRedirect to="/Home"/>
 <Route path="home" component={Home}/>
 </Route>
 );
 export default routes;*/
import React from "react";
import {BrowserRouter, Router, HashRouter, Match, Route, hashHistory, IndexLink} from "react-router-dom";
import App from "./view/App";
import Home from "./view/Home";
const routes = (
  <HashRouter history={hashHistory}>
    <App>
      <Route exact path="/" component={Home}/>
      <Route exact path="/home" component={Home}/>
    </App>
  </HashRouter>
);
export  default routes;
