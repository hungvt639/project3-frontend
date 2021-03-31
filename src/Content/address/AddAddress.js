import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import getFactory from '../../request/index';
import errorNotification from '../../general/errorNotification';
import Notification from '../../general/Notification';
const AddAddress = ({ setAddressList, setShowAddAddr }) => {
    var [d, setD] = useState(false);
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };
    const onFinish = async (values) => {

        const API = getFactory('address')
        values.default = d
        try {
            const res = await API.addAddress(values)
            setAddressList(res.data)
            setShowAddAddr(false)
            Notification("Thêm địa chỉ mới thành công")
        }
        catch (e) {
            if (e.request.status && e.request.status === 0) {
                errorNotification("Lỗi mạng!");
            } else if (e.response.data.message) {
                e.response.data.message.map(x => errorNotification(x))
            } else errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
        }
    }
    const onChangeDefault = (values) => {
        setD(values.target.checked)
    }
    return (
        <>
            <Form className="form_addr" {...layout} name="nest-messages" onFinish={onFinish}>

                <Form.Item name="fullname" label="Họ & Tên:"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập Họ và Tên của bạn',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="phone" label="Số điện thoại:"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập Số Điện Thoại của bạn',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="address" label="Địa chỉ:"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập Địa Chỉ của bạn',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="default" label="Mặc định:">
                    <Checkbox checked={d} onChange={onChangeDefault} />
                </Form.Item>


                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button className="change_profile_submit" type="primary" htmlType="submit">
                        Thêm địa chỉ
                        </Button>
                </Form.Item>
            </Form>
        </>
    )
}
export default AddAddress;