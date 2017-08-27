import React, {Component} from "react";
import {render, findDOMNode} from "react-dom";
// import {Router, hashHistory, browserHistory} from 'react-router';
import {HashRouter,hashHistory} from "react-router-dom";


import {Provider} from 'react-redux';
//import routes from './routes';
import configureStore from './stores';

import App from "view/app";

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

class Index extends Component {
  static defaultProps = {
    x: 1
  };
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      x: 1
    }
  }

  componentWillMount() {
    //可以改变state，不会导致render
  }

  componentDidMount(e) {
    //findDOMNode()获得节点
    //e.nativeEvent.stopImmediatePropagation()
  }

  shouldComponentUpdate() {
  }

  componentWillUpdate() {
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <HashRouter>
        <App></App>
      </HashRouter>
    )
  }
}
render(<Index />, document.getElementById("app"));