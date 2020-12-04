import React, { useState } from 'react';
import getFactory from '../../request/index';
import errorNotification from '../../general/errorNotification';
import { Modal } from 'antd';
import EditAddress from './EditAddress';
const Addr = ({ setAddressList, address }) => {
    const API = getFactory('address');
    const [showEdit, setShowEdit] = useState(false);
    const defaults = (address.default) ? <span>Mặc định</span> : "";

    const editAddr = async (data) => {
        try {
            const res = await API.editAddress(address.id, data)
            setAddressList(res)
        }
        catch (e) {
            if (e.request.status && e.request.status === 0) {
                errorNotification("Lỗi mạng!");
            } else if (e.response.data.message) {
                e.response.data.message.map(x => errorNotification(x))
            } else errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
        }
    }
    const setDefault = () => {
        const data = address
        data.default = true
        editAddr(data)
    }
    const deleteAddr = async () => {
        try {
            const res = await API.deleteAddress(address.id)
            setAddressList(res)
        }
        catch (e) {
            if (e.request.status && e.request.status === 0) {
                errorNotification("Lỗi mạng!");
            } else if (e.response.data.message) {
                e.response.data.message.map(x => errorNotification(x))
            } else errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
        }
    }
    return (
        <>
            <div className="addr">
                <div className="addr_actions">
                    <div className="addr_delete-edit">
                        <button onClick={deleteAddr}>Xóa</button>
                        <button onClick={() => setShowEdit(true)} >Sửa</button>
                    </div>

                    <button onClick={(address.default) ? console.log("No") : setDefault} className={(address.default) ? "addr_default" : "addr_def"}>Đặt làm mặc định</button>
                </div>
                <table className="addr_table">
                    <tr className="addr_table_name">
                        <th>Họ & Tên</th>
                        <td>{address.fullname} {defaults}</td>
                    </tr>
                    <tr>
                        <th>Số Điện Thoại</th>
                        <td>{address.phone}</td>
                    </tr>
                    <tr>
                        <th>Địa Chỉ</th>
                        <td>{address.address}</td>
                    </tr>
                </table>
            </div>
            <Modal
                title="Chỉnh sửa địa chỉ"
                closable={true}
                onCancel={() => setShowEdit(false)}
                visible={showEdit}
                footer={null}
            >
                <EditAddress setShowEdit={setShowEdit} addr={address} editAddr={editAddr} />
            </Modal>
        </>
    )
}
export default Addr;