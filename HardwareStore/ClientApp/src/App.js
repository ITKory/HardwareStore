import { createContext, useEffect, useState } from 'react'
import 'antd/dist/antd.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Home'
import PrivateRoute from './components/PrivateRoute';
import Auth from './pages/Login';
import { fakeAuth, authContext } from './constants/AuthConstants';
import   { GetProductList, Register} from './data/fetchs'
import AdminPanel from './pages/AdminPanel';
import Registration from './pages/Registration';
import { Card, Layout } from 'antd';

 
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const signin = cb => {
      return fakeAuth.signin(() => {
          setUser("user");
          cb();
      });
  };
  const signout = cb => {
      return fakeAuth.signout(() => {
          setUser(null);
          cb();
      });
  };

  return {
      user,
      signin,
      signout
  };
}



const App = () => {

  const [products, setProducts] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    GetProductList(setProducts)
    }, []) 
  



  return (
    <authContext.Provider value={useProvideAuth()}>
    <Router>
      <Switch>
        <PrivateRoute path="/admin">
          <AdminPanel products={products} /> 
        </PrivateRoute>
        <Route path="/login">
          <Auth/>
        </Route>
        <PrivateRoute path="/profile">
              <h1>Profile</h1>
        </PrivateRoute>
        <Route path="/">
        <Home products={products} /> 
        </Route>
      </Switch>
    </Router>
  </authContext.Provider>
   
  )
}

export default App