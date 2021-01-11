import React, { useState } from 'react';


const OrderSearch = ({ setSearch }) => {

    const [orderStatus, setOrderStatus] = useState(0)

    const setOrderSearch = (val) => {
        if (val) {
            setSearch(`?status=${val}`)
        } else {
            setSearch("")
        }
        setOrderStatus(val)
    }
    return (
        <div className="purchase_list">
            <p className={(orderStatus === 0) ? "purchase_list_chose" : ""} onClick={() => setOrderSearch(0)}>Tất cả</p>
            <p className={(orderStatus === 1) ? "purchase_list_chose" : ""} onClick={() => setOrderSearch(1)} >Chờ xác nhận</p>
            <p className={(orderStatus === 2) ? "purchase_list_chose" : ""} onClick={() => setOrderSearch(2)}>Chờ lấy hàng</p>
            <p className={(orderStatus === 3) ? "purchase_list_chose" : ""} onClick={() => setOrderSearch(3)}>Đang giao</p>
            <p className={(orderStatus === 4) ? "purchase_list_chose" : ""} onClick={() => setOrderSearch(4)}>Đã nhận</p>
            <p className={(orderStatus === 5) ? "purchase_list_chose" : ""} onClick={() => setOrderSearch(5)}>Đã hủy</p>
        </div>
    )
}
export default OrderSearch;