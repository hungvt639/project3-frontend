/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './index.css';
import CheckoutAddress from './CheckoutAddress';
import getFactory from '../../request/index';
import errorNotification from '../../general/errorNotification';


const Checkout = ({ myuser }) => {
    const products = JSON.parse(localStorage.getItem('checkout'))
    const [productList, setProductList] = useState(products ? products : [])
    const [addressList, setAddressList] = useState([])
    const [address, setAddress] = useState([])
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
    console.log(address)
    if (myuser) {
        console.log(productList)
        return (
            <div className="checkout">
                <CheckoutAddress address={address} setAddress={setAddress} addressList={addressList} setAddressList={setAddressList} />
                <div className="checkout_content">
                    <div className="checkout_product">
                        <p>hihihih</p>
                        <p>hihihih</p>
                        <p>hihihih</p>
                        <p>hihihih</p>
                        <p>hihihih</p>
                        <p>hihihih</p>
                        <p>hihihih</p>
                        <p>hihihih</p>
                        <p>hihihih</p>
                        <p>hihihih</p>
                        <p>hihihih</p>
                        <p>hihihih</p>
                        <p>hihihih</p>
                        <p>hihihih</p>
                        <p>hihihih</p>
                        <p>hihihih</p>
                        <p>hihihih</p>
                        <p>hihihih</p>
                        <p>hihihih</p>
                        <p>hihihih</p>
                        <p>hihihih</p>
                        <p>hihihih</p>
                        <p>hihihih</p>
                        <p>hihihih</p>
                        <p>hihihih</p>
                        <p>hihihih</p>
                        <p>hihihih</p>
                        <p>hihihih</p>
                        <p>hihihih</p>

                    </div>
                    <div className="checkout_price"></div>
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