import React from 'react';
import './index.css';
import { Checkbox } from 'antd';
import getFactory from '../../request/index';
import errorNotification from '../../general/errorNotification';
import Notification from '../../general/Notification';
import { useHistory } from 'react-router-dom'

const CartOrder = ({ cart, setCart, cartOrder, setCartOrder, cartProduct }) => {
    const API = getFactory('cart');
    const checkeds = (cart.length === cartOrder.length) ? true : false;
    const history = useHistory()

    const checkedChange = () => {
        if (cart.length === cartOrder.length) {
            localStorage.setItem("ordercart", JSON.stringify([]));
            setCartOrder([])
        } else {
            localStorage.setItem("ordercart", JSON.stringify(cartProduct));
            setCartOrder(cartProduct)
        }
    }
    const order_buy = () => {
        if (cartOrder.length) {
            localStorage.setItem('checkout', JSON.stringify(cartOrder))
            history.push('/home/checkout')
        } else {
            errorNotification("Vui lòng chọn sản phẩm trước khi mua hàng")
        }
    }

    const deleteListCart = async () => {
        if (cartOrder.length === 0) {
            errorNotification("Vui lòng chọn sản phẩm trước khi sử dụng chức năng này")
            return;
        }
        const data = { "ids": cartOrder.map((i) => i.id) }
        try {

            const res = await API.deleteList(data);

            localStorage.setItem("ordercart", JSON.stringify([]));
            setCart(res.data);
            setCartOrder([]);
            Notification(res.message)
        } catch (e) {
            if (e.request.status && e.request.status === 0) {
                errorNotification("Lỗi mạng!");
            } else if (e.response.data.message) {
                e.response.data.message.map(x => errorNotification(x))
            } else errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
        }
    }

    const sum_price = (cartOrder.length) ? (cartOrder.map((c) => c.amount * c.product_detail.saleprice).reduce((per, next) => per + next).toLocaleString('vi-VN')) : 0;

    const sum_product = (cartOrder.length) ? (cartOrder.map((c) => c.amount).reduce((per, next) => per + next)) : 0;

    return (
        <div className="sum_prices">
            <div className="cart_product cart_product_order">
                <div className="cart_checkbox">
                    <Checkbox checked={checkeds} onChange={checkedChange} className="cart_checkbox_product" />
                    <button onClick={checkedChange} className="cart_order-button">Chọn tất cả ({cart.length})</button>
                    <button onClick={deleteListCart} className="cart_order-button">Xóa</button>
                </div>
            </div>
            <div className="cart_even_order">
                <div className="cart_sum_price_text"><p>Tổng tiền hàng</p><p>({sum_product} sản phẩm)</p></div>
                <div className="cart_sum_price_num"><i style={{ 'textDecorationLine': 'underline' }}>đ</i>{sum_price}</div>
                <button onClick={order_buy} className="cart_order_buy">Mua hàng</button>
            </div>
        </div>

    )
}
export default CartOrder;