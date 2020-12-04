import React, { useEffect, useState } from 'react';
import { Empty } from 'antd';
import './index.css';
import { PlusOutlined } from '@ant-design/icons';
import Addr from './Addr';
import getFactory from '../../request/index';
import errorNotification from '../../general/errorNotification';
import { Drawer } from 'antd';
import AddAddress from './AddAddress';
const Address = () => {
    const [addressList, setAddressList] = useState([])
    const [showAddAddr, setShowAddAddr] = useState(false)
    const API = getFactory('address')
    useEffect(() => {
        const getAddress = async () => {
            try {
                const res = await API.getAdd("")
                setAddressList(res.data)
            } catch (e) {
                if (e.request.status && e.request.status === 0) {
                    errorNotification("Lỗi mạng!");
                } else if (e.request.status === 400) {
                    if (e.response.data.message) {
                        e.response.data.message.map(x => errorNotification(x))
                    }
                    else errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
                } else errorNotification(e.message);
            }
        }
        getAddress()
    }, [])
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        const addrs = addressList.map(add => <Addr setAddressList={setAddressList} key={add.id} address={add} />)
        return (
            <>
                <div className="address">
                    <div className="address_up">
                        <button onClick={() => setShowAddAddr(true)}><PlusOutlined /> Thêm địa chỉ mới</button>
                        <div className="address_up_text">
                            Địa chỉ của tôi
                    </div>
                    </div>
                    <div className="address_down">
                        {addrs}
                    </div>
                </div>
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
    else {
        return (<Empty />)
    }
}
export default Address