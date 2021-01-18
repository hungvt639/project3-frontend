import React, { useState, useEffect } from 'react'
import { CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons'
import { Form, Select, Button } from 'antd'
import DetailListProduct from './DetailListProduct'
import { Fragment } from 'react'
import errorNotification from '../../general/errorNotification'
import getFactory from '../../request'
import Catch from '../../general/Catch'
import Notification from '../../general/Notification'

const ListOrder = ({ order, index, orders, setOrders }) => {

    const [care, setCare] = useState(false)
    const [form] = Form.useForm()

    const status = {
        1: "Chờ xác nhận",
        2: "Chờ lấy hàng",
        3: "Đang giao",
        4: "Đã nhận",
        5: "Đã hủy"
    }

    const stt = {
        "Chờ xác nhận": 1,
        "Chờ lấy hàng": 2,
        "Đang giao": 3,
        "Đã nhận": 4,
        "Đã hủy": 5
    }

    useEffect(() => {
        setCare(false)
    }, [order.id])

    useEffect(() => {
        form.setFieldsValue({ status: status[order.status] })
    }, [order, form, status])

    const colors = {
        1: "#fa8c16",
        2: "#fa8c16",
        3: "#fa8c16",
        4: "#0b8500",
        5: "#d60000"
    }

    async function onFinish(value) {
        value.status = stt[value.status]
        if (order.status === value.status) return
        if (order.status === 5) {
            order.product.forEach(p => {
                if (p.amount > p.product_detail.amount) {
                    errorNotification("Số lượng sản phẩm trong kho không đủ, không thể chuyển ngược trạng thái!")
                    return
                }
            })
        }
        try {
            const API = getFactory('order')
            const res = await API.editlOrder(order.id, value)
            setOrders({ ...orders, data: orders.data.slice(0, index).concat(res).concat(orders.data.slice(index + 1)) })
            Notification("Thay đổi trạng thái thành công")
            console.log(res)
        } catch (e) {
            Catch(e)
        }
    }

    const options = []
    for (const i in stt) {
        options.push(<Select.Option key={i} value={i}>{i}</Select.Option>)
    }
    return (
        <div className="order_list">
            <div className="order_list_top">
                <div className="flex_colum" onClick={() => setCare(!care)}>
                    <div className="flex_inline" >

                        <div className="flex_inline_a_center" style={{ marginBottom: "auto" }}>
                            {care ? <CaretDownOutlined /> : <CaretRightOutlined />}
                            <div style={{ backgroundColor: colors[order.status] }} className="order_list_top_status" >{status[order.status]}</div>
                        </div>
                        <div className="order_list_top_id">ID: <span>{order.id}</span></div>
                        <div className="order_list_top_time">Khởi tạo: <span>{order.time_create}</span></div>
                        <div className="order_list_top_time">Cập nhật: <span>{order.time_update}</span></div>
                        <div className="order_list_top_prices">Tổng giá: <span className="order_list_top_price" >{order.price.toLocaleString('vi-VN')}₫</span> (Cả phí ship 30.000₫)</div>
                    </div>
                    <div className="flex_inline" style={{ marginTop: "10px", paddingLeft: "20px" }} >
                        <svg width="20px" height="20px" fill="#ff3300" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000">
                            <g><path d="M500,10c-219.3,0-397,164.5-397,367.5C103,683.7,433.8,990,500,990c66.2,0,397-306.3,397-612.5C897,174.5,719.3,10,500,10z M500,598c-109.6,0-198.5-87.8-198.5-196c0-108.2,88.9-196,198.5-196c109.6,0,198.5,87.8,198.5,196C698.5,510.2,609.6,598,500,598z" /></g>
                        </svg>
                        <div className="order_list_top_name">{order.delivery_address.fullname}</div>
                        <div className="order_list_top_name">{order.delivery_address.phone}</div>
                        <div className="order_list_top_address">{order.delivery_address.address}</div>
                        <div className="order_list_top_mes">Lời nhắn: {order.message}</div>
                    </div>
                </div>
                <div className="order_list_top_change">
                    <Form form={form} className="order_list_top_form" onFinish={onFinish} >
                        <Form.Item className="order_list_top_form_item" name="status"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập size.',
                                },
                            ]}
                        >
                            <Select
                                style={{ width: '100%' }}
                                placeholder="Trạng thái"
                                // onChange={handleChange}
                                optionLabelProp="label"
                            >
                                {options}

                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button className="order_list_top_form_btn" type="primary" htmlType="submit">
                                Sửa
                    </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            {care ? <DetailListProduct order={order} /> : <Fragment />}
        </div>
    )
}
export default ListOrder

