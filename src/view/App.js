/**
 * Created by dfc on 2017/8/25.
 */

import React from "react";
import {Route, Link} from "react-router-dom";

import {Button} from 'antd';

import Home from "view/Home";
import Product from "view/Product";

const App = () => (
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
        <Link to="/product">Product</Link>
      </li>
    </ul>
    <hr/>
    <Button>我是内容</Button>
    <Route exact path="/" component={Home}/>
    <Route path="/product" component={Product}/>
  </div>
);
export default App;