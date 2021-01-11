import React, { useState, useEffect } from 'react';
import './index.css';
import getFactory from '../../request/index';
import errorNotification from '../../general/errorNotification';
import OrderSearch from './OrderSearch'
import ListOrder from './ListOrder'
import { Empty } from 'antd';
import { Fragment } from 'react';

const Order = () => {
    const [orders, setOrders] = useState({})
    const [search, setSearch] = useState("")

    useEffect(() => {
        const getPurchases = async (data) => {
            const API = getFactory('order');
            try {
                const res = await API.getOrders(data)
                setOrders(res)
            } catch (e) {
                if (e.request.status && e.request.status === 0) {
                    errorNotification("Lỗi mạng!");
                } else if (e.response.data.message) {
                    e.response.data.message.map(x => errorNotification(x))
                } else errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
            }
        }
        getPurchases(search)
    }, [search])
    console.log(orders)
    return (
        <div className="checkout">
            <OrderSearch setSearch={setSearch} />
            <div className="purchase">
                <ListOrders orders={orders} setOrders={setOrders} />
            </div>
        </div>
    )
}
export default Order

const ListOrders = ({ orders, setOrders }) => {
    if (orders.data && orders.data.length) {
        return (
            <Fragment>
                {orders.data.map((order, index) => {
                    return (
                        <ListOrder key={index} order={order} index={index} orders={orders} setOrders={setOrders} />
                    )
                })}
            </Fragment>

        )
    }
    else {
        return (
            <Empty />
        )
    }
}