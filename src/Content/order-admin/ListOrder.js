import React, { useState } from 'react'
import { CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons'
import { Form, Select, Button } from 'antd'
import DetailListProduct from './DetailListProduct'
import { Fragment } from 'react'
const ListOrder = ({ order, index, orders, setOrders }) => {
    const [care, setCare] = useState(false)
    const status = {
        1: "Chờ xác nhận",
        2: "Chờ lấy hàng",
        3: "Đang giao",
        4: "Đã nhận",
        5: "Đã hủy"
    }
    const stt = {
        "Chờ xác nhận": 1,
        "Chờ lấy hàng": 1,
        "Đang giao": 1,
        "Đã nhận": 1,
        "Đã hủy": 1
    }
    const colors = {
        1: "#fa8c16",
        2: "#fa8c16",
        3: "#fa8c16",
        4: "#0b8500",
        5: "#d60000"
    }
    function handleChange() {

    }
    function onFinish() {

    }


    const options = []
    for (const i in stt) {
        options.push(<Select.Option key={i} value={i}>{i}</Select.Option>)
    }
    return (
        <div className="order_list">
            <div className="order_list_top">
                <div className="flex_inline" onClick={() => setCare(!care)}>

                    <div className="flex_inline_a_center">
                        {care ? <CaretDownOutlined /> : <CaretRightOutlined />}
                        <div style={{ backgroundColor: colors[order.status] }} className="order_list_top_status" >{status[order.status]}</div>
                    </div>

                    <div className="order_list_top_name">{order.delivery_address.fullname}</div>
                    <div className="order_list_top_name">{order.delivery_address.phone}</div>
                    <div className="order_list_top_address">{order.delivery_address.address}</div>
                    <div className="order_list_top_price" >{order.price.toLocaleString('vi-VN')}₫</div>

                </div>
                <div className="order_list_top_change">
                    <Form className="order_list_top_form" onFinish={onFinish} initialValues={{ status: status[order.status] }}>
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
                                onChange={handleChange}
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

