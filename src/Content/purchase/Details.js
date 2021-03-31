import React from 'react';
import { useHistory } from 'react-router-dom';
const Details = ({ purchase }) => {
    const history = useHistory()
    const reOrder = () => {
        localStorage.setItem('checkout', JSON.stringify(purchase.product))
        history.push('/checkout')
    }
    return (
        <div className="purchase_address">
            <div className="checkout_location_text">
                <svg width="20px" height="20px" fill="#ff3300" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000">
                    <g><path d="M500,10c-219.3,0-397,164.5-397,367.5C103,683.7,433.8,990,500,990c66.2,0,397-306.3,397-612.5C897,174.5,719.3,10,500,10z M500,598c-109.6,0-198.5-87.8-198.5-196c0-108.2,88.9-196,198.5-196c109.6,0,198.5,87.8,198.5,196C698.5,510.2,609.6,598,500,598z" /></g>
                </svg>
             Địa chỉ nhận hàng</div>
            <div className="checkout_address_add">
                <div className="purchase_addr">
                    <div className="checkout_address_address">
                        <div>{purchase.delivery_address.fullname} - {purchase.delivery_address.phone}</div>
                        <p>{purchase.delivery_address.address}</p>
                    </div>
                    <p className="purchase_message">Lời nhắn <span>{purchase.message}</span></p>
                </div>
                <button onClick={reOrder} className="purchase_reorder">Mua lần nữa</button>
            </div>
        </div>
    )
}
export default Details;