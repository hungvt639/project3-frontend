import React, { useState, useEffect } from 'react';
import './index.css';
import getFactory from '../../request/index';
import errorNotification from '../../general/errorNotification';
import OrderSearch from './OrderSearch'
import ListOrder from './ListOrder'
import { Empty, Pagination } from 'antd';
import { Fragment } from 'react';

const Order = () => {
    const [orders, setOrders] = useState({})
    const [search, setSearch] = useState("")
    const [pages, setPages] = useState({ limit: 5, page: 1 })
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
        getPurchases(`?page=${pages.page}&limit=${pages.limit}&${search}`)
    }, [search, pages])
    const onShowSizeChange = (current, pageSize) => {
        setPages({ ...pages, limit: pageSize })
    }

    console.log("order", orders)

    const onChange = (page, limit) => {
        setPages({ page: page, limit: limit })
    }
    return (
        <div className="orderss">
            <div className="order1x">Danh sách đơn hàng</div>
            <OrderSearch setSearch={setSearch} />
            <div className="purchase order_content">
                <ListOrders orders={orders} setOrders={setOrders} pages={pages} setPages={setPages} />
                <Pagination className="pagination"
                    showSizeChanger
                    pageSize={pages.limit}
                    pageSizeOptions={[5, 10, 20, 50]}
                    onShowSizeChange={onShowSizeChange}
                    defaultCurrent={orders.page}
                    current={pages.page}
                    onChange={onChange}
                    total={orders.total}
                />
            </div>
        </div>
    )
}
export default Order




const ListOrders = ({ orders, setOrders, pages, setPages }) => {


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