import React, { Component } from 'react';
import Layout from "../src/components/Layout/Layout";
import BurgerBuilder from "../src/containers/BurgerBuilder/BurgerBuilder";
import {Switch, Route} from "react-router-dom";
import Checkout from './containers/Checkout/Checkout';
class App extends Component {
  render() {
    return (
      <div >
          <Layout>
            <Switch>
              <Route path = "/Checkout" component={Checkout} />
              <Route path = "/" component={BurgerBuilder} />
            </Switch>
          </Layout>        
      </div>
    );
  }
}

export default App;
