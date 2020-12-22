import React from 'react';
import './index.css';
import './general.scss'
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import HomepageAdmin from './HomeAdmin';
import Profile from './user/profile';
import Detail from './product-admin/Detail'
import { Route, Switch } from 'react-router-dom';
import ProductsAdmin from './products-admin/ProductsAdmin';
const { Content } = Layout;


const ContentAdmin = ({ myuser, setUser }) => {
    return (
        // <div className="content">
        <Content
            style={{
                // margin: '24px 16px',
                padding: 24,
                maxHeight: '100vh',
                overflow: 'auto',
                // maxWidth: 1250,
                height: '100%'
            }}
        >
            <Switch>
                <Route exact path="/home" component={HomepageAdmin} />
                <Route exact path="/home/profile" component={() => <Profile myuser={myuser} setUser={setUser} />} />
                <Route exact path="/home/detail/:id" component={Detail} />
                <Route path="/home/products" component={ProductsAdmin} />
            </Switch>
        </Content>
        // </div>
    )
}
export default ContentAdmin;