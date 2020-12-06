import React, { useState } from 'react';
import { Form, Button, Radio, Drawer } from 'antd';
import AddAddress from '../address/AddAddress'

const Address = ({ address, setChangAddress, setAddress, addressList, setAddressList }) => {
    const [showAddAddr, setShowAddAddr] = useState(false)
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
        <>
            <div className="checkout_addr_action">
                <a href="/home/address">Thiết lập địa chỉ</a>
                <button onClick={() => setShowAddAddr(true)}>+ Thêm địa chỉ mới</button>
            </div>
            <Form name="nest-messages" onFinish={onFinish} initialValues={address}>
                <Form.Item name="id" label="Địa chỉ:">
                    <Radio.Group name="addr" initialValues={address.id} >
                        {addressList.map(addr => <Radio style={radioStyle} key={addr.id} value={addr.id}><span className="checkout_select_addr">{addr.fullname} - {addr.phone}</span> : {addr.address} </Radio>)}
                    </Radio.Group>
                </Form.Item>
                <Form.Item >
                    <Button className="change_addr_submit" type="primary" htmlType="submit">
                        Chọn địa chỉ
                </Button >
                </Form.Item>
            </Form>
            <Drawer
                width="40%"
                title="Thêm địa chỉ mới"
                placement="right"
                closable={true}
                onClose={() => setShowAddAddr(false)}
                visible={showAddAddr}
                getContainer={false}
                style={{ position: 'absolute' }}
            >
                <AddAddress setAddressList={setAddressList} setShowAddAddr={setShowAddAddr} />
            </Drawer>
        </>
    )
}
export default Address;