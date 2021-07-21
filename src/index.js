import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  SignUp,
  SignIn,
  Dashboard,
  AddEntry,
  Trends,
  UpdateProfile,
  ForgotPassword
} from './views';
import { AuthProvider } from './contexts/AuthContext.js';
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';
import reportWebVitals from './reportWebVitals';

const BASE_NAME = '/jfddr3-money-control-app';

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <Router basename={BASE_NAME}>
        <Switch>
          <AuthProvider>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute exact path="/add-entry" component={AddEntry} />
            <PrivateRoute exact path="/trends" component={Trends} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </AuthProvider>
        </Switch>
      </Router>
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
