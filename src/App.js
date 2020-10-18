import React from 'react';
import './App.scss';
import 'antd/dist/antd.css';
import Layouts from './Layouts'
import Login from './user/Login'
import Register from './user/register'
import { Route, BrowserRouter as Router } from 'react-router-dom';

function App() {

  return (
<Router>
    <Route exact path="/" component={Layouts } />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
</Router>
    
      // <Layouts />
  );
}

export default App;
