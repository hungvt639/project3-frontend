import React from 'react';
import './index.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import HomePage from './home/home';
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
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/profile" component={() => <Profile myuser={myuser} setUser={setUser} />} />
                    <Route exact path="/detail/:id" component={() => <Detail myuser={myuser} setUser={setUser} cart={cart} setCart={setCart} />} />
                    <Route exact path="/cart" component={() => <Cart myuser={myuser} cart={cart} setCart={setCart} />} />
                    <Route exact path="/checkout" component={() => <Checkout myuser={myuser} />} />
                    <Route exact path="/purchase" component={Purchase} />
                    <Route exact path="/address" component={Address} />
                </Switch>
            </Content>
        </div>

    )
}
export default Contents;