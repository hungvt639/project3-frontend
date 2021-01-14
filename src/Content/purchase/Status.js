import React from 'react';
import { Steps, Popconfirm } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import getFactory from '../../request/index';
import errorNotification from '../../general/errorNotification';
import Notification from '../../general/Notification';
const { Step } = Steps;

const Status = ({ purchase, setPurchases, purchases }) => {
    const stt = ["Chờ xác nhận", "Chờ lấy hàng", "Đang giao", "Đã nhận", "Đã hủy"]

    const confirm = async () => {
        const API = getFactory('order')
        try {
            const res = await API.editlOrder(purchase.id, { "status": 5 })
            const index = purchases.findIndex(x => x.id === res.id);
            setPurchases(purchases.slice(0, index).concat(res).concat(purchases.slice(index + 1)))
            Notification("Hủy đơn hàng thành công")
        } catch (e) {
            if (e.request.status && e.request.status === 0) {
                errorNotification("Lỗi mạng!");
            } else if (e.response.data.message) {
                e.response.data.message.map(x => errorNotification(x))
            } else errorNotification("Đã có lỗi sảy ra, bạn vui lòng đăng nhập lại");
        }
    }
    const current = (purchase.status >= 5) ? -1 : (purchase.status === 4) ? 5 : purchase.status;
    const cancel = (purchase.status === 1) ? <Popconfirm
        placement="topRight"
        title="Bạn có muốn hủy đơn hàng này?"
        onConfirm={confirm}
        okText="Có"
        cancelText="Không"
    >
        <button className="purchase_status_button">Hủy</button>
    </Popconfirm> : "";
    return (
        <div className="purchase_status">
            <Steps current={current}>
                <Step description={purchase.time_create} title="Đặt đơn" icon={<CheckCircleOutlined />} />
                <Step description={(purchase.status === 1) ? purchase.time_update : ""} title="Chờ xác nhận" icon={<CheckCircleOutlined />} />
                <Step description={(purchase.status === 2) ? purchase.time_update : ""} title="Chờ lấy hàng" icon={<CheckCircleOutlined />} />
                <Step description={(purchase.status === 3) ? purchase.time_update : ""} title="Đang giao" icon={<CheckCircleOutlined />} />
                <Step description={(purchase.status === 4) ? purchase.time_update : ""} title="Đã nhận" icon={<CheckCircleOutlined />} />
            </Steps>
            <div className="purchase_status_text">
                {cancel}
                <p className={(purchase.status === 4) ? "purchase_status_done" : (purchase.status === 5) ? "purchase_status_cancel" : ""}>{stt[purchase.status - 1]}</p>
            </div>
        </div>
    )
}
export default Status