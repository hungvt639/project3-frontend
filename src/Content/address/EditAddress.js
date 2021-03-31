import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

const EditAddress = ({ addr, setShowEdit, editAddr }) => {
    var [d, setD] = useState(addr.default);
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };
    const onFinish = async (values) => {
        values.default = d
        editAddr(values)
        setShowEdit(false)
    }
    const onChangeDefault = (values) => {
        setD(values.target.checked)
    }
    return (
        <>
            <Form className="form_addr" {...layout} name="nest-messages" onFinish={onFinish} initialValues={addr}>

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
                        Chỉnh sửa
                    </Button>
                </Form.Item>
            </Form>
        </>

    )
}
export default EditAddress;