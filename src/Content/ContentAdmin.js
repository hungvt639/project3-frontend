import React from 'react';
import './index.css';
import './general.scss'
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import HomepageAdmin from './home/HomeAdmin';
import Profile from './user/profile';
import Details from './product-admin/Details'
import { Route, Switch } from 'react-router-dom';
import ProductsAdmin from './products-admin/ProductsAdmin';
import Order from './order-admin/Order';
import Promotion from './promotion-admin/Promotion';

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
                <Route exact path="/detail/:id" component={Details} />
                <Route path="/products" component={ProductsAdmin} />
                <Route path="/orders" component={Order} />
                <Route path="/promotions" component={Promotion} />
            </Switch>
        </Content>
        // </div>
    )
}
export default ContentAdmin;