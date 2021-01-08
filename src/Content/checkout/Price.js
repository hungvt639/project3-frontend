import React, { useState } from 'react';
import Notification from '../../general/Notification';
import errorNotification from '../../general/errorNotification';
import getFactory from '../../request/index';
import { useHistory } from 'react-router-dom';
const Price = ({ address, productList }) => {
    const sum_price = (productList.length) ? (productList.map((c) => c.amount * c.product_detail.saleprice).reduce((per, next) => per + next)) : 0;
    const [mess, setMess] = useState("");
    const history = useHistory()
    const createOrder = async (data) => {
        const API = getFactory('order')
        try {
            await API.createOrders(data)
            Notification('Đặt hàng thành công, bạn vui lòng vào danh sách đơn hàng để xem chi tiết')
            localStorage.removeItem('ordercart');
            localStorage.removeItem('checkout');
            history.push('/purchase')
        } catch (e) {
            if (e.request.status && e.request.status === 0) {
                errorNotification("Lỗi mạng!");
            } else if (e.response.data.message) {
                e.response.data.message.map(x => errorNotification(x))
            } else errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
        }
    }
    const orderProducts = () => {
        if (productList.length) {
            if (address) {
                const p = productList.map(product => { return { 'product_detail': product.product_detail.id, 'amount': product.amount } })
                const data = {
                    'delivery_address': address.id,
                    'message': mess,
                    'product': p
                }
                createOrder(data)
            } else {
                errorNotification("Vui longf thiết lập địa chỉ nhận hàng trước khi đặt hàng")
            }
        } else {
            errorNotification("Vui lòng chọn hàng trước khi đặt hàng")
        }
    }
    return (
        <div className="checkout_price">
            <div className="checkout_price_input">
                <label>Lời nhắn</label><input onBlur={(val) => setMess(val.target.value)} defaultValue={mess} />
            </div>

            <div className="checkout_price_submit">
                <p> Phí vận chuyển: <i style={{ 'textDecorationLine': 'underline' }}>đ</i> 30.000</p>
                <p>Tổng cộng: <i style={{ 'textDecorationLine': 'underline' }}>đ </i>{(sum_price + 30000).toLocaleString('vi-VN')}</p>
                <button onClick={orderProducts}>ĐẶT HÀNG</button>
            </div>

        </div>
    )
}
export default Price;