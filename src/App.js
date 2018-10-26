import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Logout from "./containers/Auth/Logout/Logout";
import { authCheckState } from "./store/actions/index";
import * as asyncComponents from './components/AsyncComponents';

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/auth" component={asyncComponents.AuthAsync}/>
                <Route exact path="/" component={BurguerBuilder}/>
                <Redirect to="/"/>
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={asyncComponents.CheckoutAsync}/>
                    <Route path="/orders" component={asyncComponents.OrdersAsync}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/auth" component={asyncComponents.AuthAsync}/>
                    <Route exact path="/" component={BurguerBuilder}/>
                    <Redirect to="/"/>
                </Switch>
            );
        }
        return (
            <div>
              <Layout>
                  {routes}
              </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
