import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {HashRouter as Router, Route, Switch } from 'react-router-dom';
import { getUserDetail } from '../Redux/User/UserAction';
import Home from './Home';
import SignIn from './SignIn';
import PrivateRoute from './PrivateRouter';
import SignUp from './SignUp';
import Profile from './Profile';
import AddProduct from './AddProduct';
import Product from './Product';

const Main = () => {
  const dispatch = useDispatch()
    useEffect(() => {
        let user = localStorage.getItem('userToken');
        if(user !== "" && user != null) {
            dispatch(getUserDetail())
        }
    })

  return <Fragment>
    <Router>
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/product" component={Product} />
        <PrivateRoute exact path="/addproduct" component={AddProduct} />
        <PrivateRoute exact path="/" component={Home} />
      </Switch>
    </Router>
  </Fragment>
}

export default Main;
