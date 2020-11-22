import React, {useState} from 'react';
import './index.css';
import urls from '../../const';
import {Button, Checkbox} from 'antd';
import {PlusOutlined, MinusOutlined} from '@ant-design/icons';
import getFactory from '../../request/index';
import errorNotification from '../../general/errorNotification';
import Notification from '../../general/Notification';
import {useHistory} from 'react-router-dom'

const CartOrder = ({cart, setCart, cartOrder, setCartOrder}) => {
    console.log(cart)
    console.log(cartOrder)
    // const checkeds = true;
    const checkeds = (cart.length === cartOrder.length)?true:false;
    const checkedChange = () =>{
        if(cart.length === cartOrder.length){
            localStorage.setItem("ordercart", JSON.stringify([]));
            setCartOrder([])
        }else{
            localStorage.setItem("ordercart", JSON.stringify(cart));
            setCartOrder(cart)
        }
    }


    return(
        <div className="sum_prices">
            <div className="cart_product">
                <div className="cart_checkbox">
                    <Checkbox checked={checkeds} onChange={checkedChange} className="cart_checkbox_product" />
                        <button onClick={checkedChange} className="cart_order-button">Chọn tất cả ({cart.length})</button>
                    <button className="cart_order-button">Xóa</button>
                </div>
            </div>
            <div className="cart_even_order">
                <div>Tổng tiền hàng</div>
                <button className="cart_order_buy">Mua hàng</button>
            </div>
            
        </div>
        
    )
}
export default CartOrder;