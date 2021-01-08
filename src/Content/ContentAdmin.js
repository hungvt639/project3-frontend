import React from 'react';
import './index.css';
import './general.scss'
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import HomepageAdmin from './home/HomeAdmin';
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
                <Route exact path="/" component={HomepageAdmin} />
                <Route exact path="/profile" component={() => <Profile myuser={myuser} setUser={setUser} />} />
                <Route exact path="/detail/:id" component={Detail} />
                <Route path="/products" component={ProductsAdmin} />
            </Switch>
        </Content>
        // </div>
    )
}
export default ContentAdmin;