import React from 'react';
import './App.scss';
import 'antd/dist/antd.css';
import Layouts from './Layouts'
import Login from './user/Login'
import Register from './user/register'
import test1 from './test/test1';
// import test2 from './test/test2';
import { Route, BrowserRouter as Router } from 'react-router-dom';
// function PrivateRoute({ children, ...rest }) {
//     return (
//         <Route   {...rest} render={() =>
//             children
//         }
//         />
//     );
// }
function App() {

  return (
<Router>
    <Route path="/home" component={Layouts} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/test1" component={test1} />
    {/* <PrivateRoute path="/">
        <Layouts/>
    </PrivateRoute> */}
    {/* <Route path="/test2" component={test2} /> */}
</Router>
    
      // <Layouts />
  );
}
export default App;
