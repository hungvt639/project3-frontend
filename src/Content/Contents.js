import React from 'react';
import './index.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import HomePage from './home';
import Profile from './user/profile';
import Detail from './product/Detail'
import { Route, Switch } from 'react-router-dom';
import Cart from './cart/Cart';
import Checkout from './checkout/Checkout';
import Purchase from './purchase/Purchase'
import Address from './address/Address';
const { Content } = Layout;


const Contents = ({ myuser, setUser, cart, setCart }) => {
    const url = window.location.href.split('/').pop();
    if (url !== 'cart') localStorage.removeItem('ordercart');
    if (url !== 'checkout' && url !== "address") localStorage.removeItem('checkout');

    return (
        <div className="content">
            <Content
                style={{
                    // margin: '24px 0px',
                    // padding: '24px 5px',
                    // maxHeight: '100vh',
                    // overflow: 'auto',
                    maxWidth: 1250,
                    height: '100%'
                    // marginTop: 50
                }}
            >
                <Switch>
                    <Route exact path="/home" component={() => <HomePage myuser={myuser} setUser={setUser} />} />
                    <Route exact path="/home/profile" component={() => <Profile myuser={myuser} setUser={setUser} />} />
                    <Route exact path="/home/detail/:id" component={() => <Detail myuser={myuser} setUser={setUser} cart={cart} setCart={setCart} />} />
                    <Route exact path="/home/cart" component={() => <Cart myuser={myuser} cart={cart} setCart={setCart} />} />
                    <Route exact path="/home/checkout" component={() => <Checkout myuser={myuser} />} />
                    <Route exact path="/home/purchase" component={Purchase} />
                    <Route exact path="/home/address" component={Address} />
                </Switch>
            </Content>
        </div>

    )
}
export default Contents;