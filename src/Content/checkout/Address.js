import React from 'react';
import { Form, Button, Radio } from 'antd'

const Address = ({ address, setChangAddress, setAddress, addressList }) => {
    const onFinish = (value) => {
        const index = addressList.filter(addr => addr.id === value.id)
        setAddress(index[0])
        setChangAddress(false)

    }
    const radioStyle = {
        display: 'block',
        lineHeight: '30px',
        width: "100%",
        whiteSpace: 'break-spaces',


    };
    return (
        <Form name="nest-messages" onFinish={onFinish} initialValues={address}>
            <Form.Item name="id" label="Địa chỉ:">
                <Radio.Group name="addr" initialValues={address.id} >
                    {addressList.map(addr => <Radio style={radioStyle} key={addr.id} value={addr.id}><span className="checkout_select_addr">{addr.fullname} - {addr.phone}</span> : {addr.address} </Radio>)}
                </Radio.Group>
            </Form.Item>
            <Form.Item >
                <Button className="change_profile_submit" type="primary" htmlType="submit">
                    Chỉnh sửa thông tin
                </Button>
            </Form.Item>
        </Form>
    )
}
export default Address;