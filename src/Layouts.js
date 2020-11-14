import React, {useState} from 'react';
import './App.scss';
import 'antd/dist/antd.css';
// import logo from './logo.svg';
import Siders from "./Sider/Siders"
import Headers from "./Header/Headers"
import  Contents from "./Content/Contents"
import { Layout } from 'antd';

const Layouts = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [myuser, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const toggle = () => {
    setCollapsed(!collapsed);
  };
    return(
        <Layout>
            <Siders collapsed={collapsed} />
            <Layout className="site-layout">
                <Headers toggle={toggle} collapsed={collapsed} myuser={myuser} setUser={setUser} />
                <Contents myuser={myuser} setUser={setUser} />
                {/* <Switch>
                    <Route exact path="/a" component={HomePage} />
                    <Route exact path="/profile" component={profile} />
                </Switch> */}
            </Layout>
        </Layout>
    )
}
export default Layouts;