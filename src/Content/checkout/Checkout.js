/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './index.css';
import CheckoutAddress from './CheckoutAddress';
import getFactory from '../../request/index';
import errorNotification from '../../general/errorNotification';
import Products from './Products';
import Price from './Price';

const Checkout = ({ myuser }) => {
    const products = JSON.parse(localStorage.getItem('checkout'))
    const [productList, setProductList] = useState(products ? products : [])
    const [addressList, setAddressList] = useState([])
    const [address, setAddress] = useState({})
    const API = getFactory('address')
    useEffect(() => {
        const getAddress = async () => {
            try {
                const res = await API.getAdd()
                setAddressList(res.data)
                if (res.data.length) setAddress(res.data[0])
            } catch (e) {
                if (e.request.status && e.request.status === 0) {
                    errorNotification("Lỗi mạng!");
                } else if (e.request.status === 400) {
                    if (e.response.data.message) {
                        e.response.data.message.map(x => errorNotification(x))
                    }
                    else errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
                } else errorNotification(e.message);
            }
        }
        getAddress()
    }, [])
    const sum_product = (productList.length) ? (productList.map((c) => c.amount).reduce((per, next) => per + next)) : 0;
    const sum_price = (productList.length) ? (productList.map((c) => c.amount * c.product_detail.saleprice).reduce((per, next) => per + next)) : 0;
    // console.log(address)
    if (myuser) {
        // console.log(productList)
        const listProduct = productList.map(product => <Products key={product.id} product={product} />)
        return (
            <div className="checkout">
                <CheckoutAddress address={address} setAddress={setAddress} addressList={addressList} setAddressList={setAddressList} />
                <div className="checkout_content">
                    <div className="checkout_product">

                        <div className="cart_detail_item checkout_product_detail_item">
                            <div className="cart_product">
                                <p className="checkout_product_name">Sản phẩm</p>
                            </div>
                            <div className="cart_even_product">
                                <div className="cart_sum_price cart_price_color">
                                    <p>Đơn giá</p>
                                </div>
                                <div className="cart_amount_product">
                                    <p>Số lượng</p>
                                </div>
                                <div className="cart_action">
                                    <p className="cart_price_color">Thành tiền</p>
                                </div>
                            </div>
                        </div>
                        {listProduct}
                        <div className="cart_detail_item checkout_product_detail_item">
                            <div className="cart_product">
                                <p className="checkout_product_name">Tổng</p>
                            </div>
                            <div className="cart_even_product">
                                <div className="cart_sum_price cart_price_color">
                                    {/* <p><i style={{ 'textDecorationLine': 'underline' }}>đ</i></p> */}
                                </div>
                                <div className="cart_amount_product">
                                    <p>{sum_product}</p>
                                </div>
                                <div className="cart_action">
                                    <p className="cart_price_color"><i style={{ 'textDecorationLine': 'underline' }}>đ</i>{sum_price.toLocaleString('vi-VN')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Price address={address} productList={productList} />
                </div>
            </div>
        )
    } else {
        return (
            <p className="checkout_no_user">Vui lòng đăng nhập trước khi sử dụng chức năng này</p>
        )
    }

}
export default Checkout;