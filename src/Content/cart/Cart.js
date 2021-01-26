import React, { useState } from 'react';
import './index.css'
import { Redirect } from 'react-router-dom';
import DetailCart from './DetailCart';
import { Empty } from 'antd';
import Cartorder from './CartOrder';
const Cart = ({ myuser, cart, setCart, }) => {
    const [cartProduct, setCartProduct] = useState(cart);
    const ordercart = JSON.parse(localStorage.getItem("ordercart"));
    const [cartOrder, setCartOrder] = useState(ordercart ? ordercart : []);
    console.log(cart)
    if (myuser) {
        if (cart.length) {

            const carts = cartProduct.map(cart_detail => <DetailCart key={cart_detail.id}
                cart_detail={cart_detail} cart={cart} setCart={setCart}
                cartProduct={cartProduct} setCartProduct={setCartProduct}
                cartOrder={cartOrder} setCartOrder={setCartOrder} />)
            return (
                <div className="cart">
                    <div className="cart_name">Giỏ hàng</div>
                    <div className="item_in_cart">
                        {carts}
                    </div>
                    <div className="sum_price">
                        <Cartorder cart={cart} cartProduct={cartProduct} setCart={setCart} cartOrder={cartOrder} setCartOrder={setCartOrder} />
                    </div>
                </div>
            )
        }
        else {
            return (
                <Empty />
            )
        }
    }
    else {
        return (<Redirect to='/sos' />)
    }
}
export default Cart;