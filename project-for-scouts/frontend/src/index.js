import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/homePage/home.jsx';
import Register from './pages/registerPage/register.jsx';
import Login from './pages/loginPage/login.jsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
  