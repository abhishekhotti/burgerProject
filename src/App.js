import React, { Component } from 'react';
import Layout from "../src/components/Layout/Layout";
import BurgerBuilder from "../src/containers/BurgerBuilder/BurgerBuilder";
import {Switch, Route, withRouter} from "react-router-dom";
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from "./containers/Auth/Auth";
import Logout from './containers/Auth/Logout/Logout';
import * as actions from "./store/actions/index"
import {connect} from "react-redux";

class App extends Component {
  componentDidMount(){
    this.props.tryAutoLogin()
  }
  render() {
    return (
      <div >
          <Layout>
            <Switch>
              <Route path = "/Checkout" component={Checkout} />
              {this.props.isAuth ? <Route path = "/Orders" component={Orders} /> : null}
              <Route path = "/Auth" component={Auth} />
              <Route path = "/Logout" component={Logout} />
              <Route path = "/" component={BurgerBuilder} />
            </Switch>
          </Layout>        
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tryAutoLogin: () => dispatch(actions.autoLogin())
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.authReducer.token !== null
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
