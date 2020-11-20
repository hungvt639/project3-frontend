import React from 'react';
import './index.css'
import {Redirect} from 'react-router-dom';
import DetailCart from './DetailCart';
import {Empty} from 'antd';

const Cart = ({myuser, cart, setCart,}) => {
    // console.log(cart)
    if(myuser){
        if(cart.length){

            const carts=cart.map(cart_detail => <DetailCart key={cart_detail.id} cart_detail={cart_detail} cart={cart} setCart={setCart} />)
            return(
                <div className="cart">
                    <div className="item_in_cart">
                        {carts}
                    </div>
                    <div className="sum_price">
                        <p>Hihi</p>
                    </div>
                </div>
            )
        }
        else{
            return(
                <Empty />
            )
        }
    }
    else{
        return(<Redirect to='/sos' />)
    }
}
export default Cart;