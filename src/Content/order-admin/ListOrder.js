import React, { useState } from 'react'
import { CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons'
const ListOrder = ({ order, index, orders, setOrders }) => {
    const [care, setCare] = useState(false)
    const status = {
        1: "Chờ xác nhận",
        2: "Chờ lấy hàng",
        3: "Đang giao",
        4: "Đã nhận",
        5: "Đã hủy"
    }
    return (
        <div className="order_list">
            <div className="order_list_top">
                <div onClick={() => setCare(!care)}>
                    {care ? <CaretDownOutlined /> : <CaretRightOutlined />}
                </div>
                <div>{status[order.status]}</div>
                <div>{order.delivery_address.fullname}</div>
                <div>{order.delivery_address.phone}</div>
                <div>{order.delivery_address.address}</div>
            </div>
            <div className="order_list_buttom" style={care ? {} : { display: "none" }}>
                hello
            </div>
        </div>
    )

}
export default ListOrder