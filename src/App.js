import React from 'react';
import './App.scss';
import 'antd/dist/antd.css';
import Layouts from './Layouts'
import Login from './user/Login'
import Register from './user/register'
import test1 from './test/test1';
import { Route, BrowserRouter as Router } from 'react-router-dom';
function App() {

  return (
<Router>

    <Route path="/home" component={Layouts} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/test1" component={test1} />
</Router>
  );
}
export default App;
