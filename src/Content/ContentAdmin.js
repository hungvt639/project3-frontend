import React from 'react';
import './index.css';
import './general.scss'
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import HomePage from './home';
import Profile from './user/profile';
import Detail from './product/Detail'
import { Route, Switch } from 'react-router-dom';
import ProductsAdmin from './products-admin/ProductsAdmin';
const { Content } = Layout;


const ContentAdmin = ({ myuser, setUser }) => {
    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                maxHeight: '100vh',
                overflow: 'auto',
            }}
        >
            <Switch>
                <Route exact path="/home" component={() => <HomePage myuser={myuser} setUser={setUser} />} />
                <Route exact path="/home/profile" component={() => <Profile myuser={myuser} setUser={setUser} />} />
                <Route exact path="/home/detail/:id" component={() => <Detail myuser={myuser} setUser={setUser} />} />
                <Route exact path="/home/products" component={() => <ProductsAdmin myuser={myuser} setUser={setUser} />} />
            </Switch>
        </Content>
    )
}
export default ContentAdmin;