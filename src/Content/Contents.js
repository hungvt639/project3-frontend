import React from 'react';
import './index.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import HomePage from './home';
import Profile from './user/profile';
import Detail from './product/Detail'
import { Route, Switch } from 'react-router-dom';
import Cart from './cart/Cart';
const { Content } = Layout;


const Contents = ({myuser, setUser, cart, setCart}) => {
    const url = window.location.href.split('/').pop();
    if(url !== 'cart') localStorage.removeItem('ordercart');

    return(
            <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    maxHeight: '100vh',
                    overflow: 'auto',
                }}
            >
                <Switch>
                    <Route exact path="/home" component={()=><HomePage myuser={myuser} setUser={setUser}/>} />
                    <Route exact path="/home/profile" component={()=><Profile myuser={myuser} setUser={setUser}/>} />
                    <Route exact path="/home/detail/:id" component={()=><Detail myuser={myuser} setUser={setUser} cart={cart} setCart={setCart} />} />
                    <Route exact path="/home/cart" component={()=><Cart myuser={myuser} cart={cart} setCart={setCart} />} />
                </Switch>
            </Content>

            
 
        
    )
}
export default Contents;