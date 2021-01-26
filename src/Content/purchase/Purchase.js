import React, { useState, useEffect } from 'react';
import './index.css';
import getFactory from '../../request/index';
import errorNotification from '../../general/errorNotification';
import ListPurchase from './ListPurchase';
import DetailPurchase from './DetailPurchase';

const Purchase = () => {
    const myuser = JSON.parse(localStorage.getItem('user'))
    const [purchases, setPurchases] = useState([])

    const getPurchases = async (data) => {
        const API = getFactory('order');
        try {
            const res = await API.getOrders(data)
            setPurchases(res.data)
        } catch (e) {
            if (e.request.status && e.request.status === 0) {
                errorNotification("Lỗi mạng!");
            } else if (e.response.data.message) {
                e.response.data.message.map(x => errorNotification(x))
            } else errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
        }
    }
    useEffect(() => {
        getPurchases("")
    }, [])

    console.log("pur", purchases)

    if (myuser) {
        const purs = purchases.map(purchase => <DetailPurchase key={purchase.id} setPurchases={setPurchases} purchase={purchase} purchases={purchases} />)
        return (
            <div className="checkout">
                <ListPurchase getPurchases={getPurchases} />
                <div className="purchase">
                    {purs}
                </div>
            </div>
        )
    } else {
        return (
            <p className="checkout_no_user">Vui lòng đăng nhập trước khi sử dụng chức năng này</p>
        )
    }
}
export default Purchase;