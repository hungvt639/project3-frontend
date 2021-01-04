import React from 'react';
import './App.scss';
import 'antd/dist/antd.less';
import Layouts from './Layouts'
import Login from './user/Login'
import Register from './user/register'
// import Test1 from './test/test1';
import Sos from './sos';
import Home from './indexPage';
import { Route, BrowserRouter as Router } from 'react-router-dom';
function App() {
    return (
        <Router>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Layouts} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            {/* <Route exact path="/test1" component={Test1} /> */}
            <Route exact path="/sos" component={Sos} />
        </Router>
    );
}
export default App;
